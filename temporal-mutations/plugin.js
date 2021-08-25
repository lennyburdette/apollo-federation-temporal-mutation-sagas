// @ts-check

const { isUnionType } = require("graphql");

/** @type {import('@graphql-codegen/plugin-helpers').CodegenPlugin<*>} */
module.exports = {
  plugin(schema, documents, config, info) {
    const types = `
interface ClientOptions {
  url: string;
}

interface GraphQLRequest {
  url: string;
  headers?: { [key: string]: string },
  query: string;
  variables: { [key: string]: any },
  operationName: string;
}
`;

    const unions = Object.values(schema.getTypeMap()).filter(isUnionType);
    const predicates = new Map();
    for (const union of unions) {
      const possibleTypes = schema.getPossibleTypes(union);
      for (const possibleType of possibleTypes) {
        predicates.set(
          possibleType.name,
          `export function is${possibleType.name}(o: ${union.name}): o is ${possibleType.name} {
  return o?.__typename === '${possibleType.name}';
}
`
        );
      }
    }

    const helpers = `
async function graphqlFetch<T>({ url, headers = {}, query, variables, operationName }: GraphQLRequest): Promise<T> {
  const response = await fetch(url, {
    headers: { 'content-type': 'application/json', ...headers },
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
      operationName
    })
  });

  if (response.ok && response.headers.get('Content-Type')?.startsWith('application/json')) {
    const { data, errors } = await response.json();

    if (errors?.length) {
      throw new Error(errors.map((e: any) => e.message).join('\\n'));
    }

    return data;
  }

  throw new Error(
    \`bad response: \${response.ok} (\${response.headers.get("Content-Type")})
    \${await response.text()}
    \`
  );
}

`;

    const fns = documents.map((doc) => {
      const operation = doc.document.definitions.find(
        /** @type {(_: any) => _ is import('graphql').OperationDefinitionNode} */ (
          (f) => f.kind === "OperationDefinition"
        )
      );

      const kind = operation.operation === "query" ? "Query" : "Mutation";

      const name = operation.name.value;
      const fnName = name.replace(/^(.)/, (a) => a.toLowerCase());
      const variablesName = `${name}${kind}Variables`;
      const resultName = `${name}${kind}`;
      const docName = `${name}Sdl`;

      return `
const ${docName} = \`#graphql
${doc.rawSDL}\`;

export function ${fnName}(
  options: ClientOptions,
  variables: ${variablesName}
): Promise<${resultName}> {
  return graphqlFetch({
    url: options.url,
    query: ${docName},
    variables,
    operationName: '${name}'
  });
}
`;
    });

    return {
      prepend: ['import fetch from "make-fetch-happen";'],
      content: [types, helpers, ...predicates.values(), ...fns].join("\n"),
    };
  },
};
