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

let i = 0;

const resolvers = {
  Query: {
    /**
     * @param {any} _
     * @param {{ [key:string]: any }} args
     */
    order(_, { id }) {
      return { id, seats: [{ id: "1" }, { id: "2" }] };
    },
  },
  Mutation: {
    /**
     * @param {any} _
     * @param {{ [key:string]: any }} args
     */
    capturePayment(_, { input }) {
      console.log("[CapturePayment]", JSON.stringify(input));

      i++;
      if (i % 3 !== 0) {
        console.log("[CapturePayment] random failure");
        throw new Error(`random failure! ${i}`);
      }

      return {
        __typename: "CapturePaymentSuccess",
        confirmationCode: "confirmation-code-xxx",
      };
    },
  },
  Order: {
    /**
     * @param {any} order
     */
    __resolveReference(order) {
      return { ...order, seats: [{ id: "1" }, { id: "2" }] };
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
