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
    reserveSeats(_, { input }) {
      console.log("[reserveSeats]", JSON.stringify(input));
      return {
        __typename: "ReserveSeatsSuccess",
        reservationId: "reservation-id-xxx",
      };
    },
    /**
     * @param {any} _
     * @param {{ [key:string]: any }} args
     */
    releaseSeats(_, { input }) {
      console.log("[releaseSeats]", JSON.stringify(input));
      return {
        __typename: "ReleaseSeatsSuccess",
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
