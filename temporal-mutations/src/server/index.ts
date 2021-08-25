import { ApolloServer } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";
import { readFileSync } from "fs";
import { resolve } from "path";
import { Connection, WorkflowClient } from "@temporalio/client";
import { parse } from "graphql";
import { Resolvers } from "../interfaces/graphql";
import { CompleteOrder } from "../interfaces/workflows";

const typeDefs = readFileSync(
  resolve(__dirname, "../../schema.graphql"),
  "utf-8"
);

interface Context {
  connection: Connection;
  workflows: WorkflowClient;
}

const resolvers: Resolvers<Context> = {
  Mutation: {
    async completeOrder(_, args, ctx, _info) {
      const workflow = ctx.workflows.stub<CompleteOrder>("completeOrder", {
        taskQueue: "my-queue",
        workflowId: args.input.clientMutationId,
      });

      try {
        const runId = await workflow.start(args.input);
        console.log(workflow.workflowId, runId);
      } catch (e) {
        if (e.code === 6) {
          console.log("idempotency!");
        } else {
          throw e;
        }
      }

      return workflow.result();
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema({
    typeDefs: parse(typeDefs),
    resolvers,
  }),
  context() {
    const connection = new Connection({
      address: process.env.TEMPORAL_GRPC_ENDPOINT ?? "temporal:7233",
    });
    return {
      connection,
      workflows: new WorkflowClient(connection.service),
    };
  },
});

server
  .listen(process.env.PORT ?? 4000)
  .then(({ url }) => console.log(`listening on ${url}`));
