import { Worker, ApplyMode, Core } from "@temporalio/worker";
import { GraphQLClientDependencies } from "../interfaces/dependencies";

async function run() {
  await Core.install({
    serverOptions: {
      address: process.env.TEMPORAL_GRPC_ENDPOINT ?? "localhost:7233",
    },
  });

  const worker = await Worker.create<{
    dependencies: GraphQLClientDependencies;
  }>({
    workDir: __dirname,
    taskQueue: "my-queue",
    dependencies: {
      logger: {
        info: {
          fn(info, ...args) {
            console.log(...args);
          },
          applyMode: ApplyMode.ASYNC_IGNORED,
        },
      },
      client: {
        options: {
          fn(info) {
            return {
              url: process.env.GATEWAY_URL ?? "http://localhost:4000/graphql",
            };
          },
          arguments: "copy",
          applyMode: ApplyMode.SYNC,
        },
      },
    },
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
