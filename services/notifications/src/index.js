import { ApolloServer } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { resolve } from "path";
import { parse } from "graphql";

const typeDefs = readFileSync(
  resolve(fileURLToPath(import.meta.url), "../../schema.graphql"),
  "utf-8"
);

const resolvers = {
  Mutation: {
    /**
     * @param {any} _
     * @param {{ [key:string]: any }} args
     */
    sendOrderConfirmation(_, { input }) {
      console.log("[sendOrderConfirmation]", JSON.stringify(input));
      return {
        __typename: "SendOrderConfirmationSuccess",
        success: true,
      };
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema({
    typeDefs: parse(typeDefs),
    resolvers,
  }),
});

const { url } = await server.listen(process.env.PORT ?? 4000);
console.log(`listening on ${url}`);
