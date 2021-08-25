import { ExternalDependencies } from "@temporalio/workflow";

export interface GraphQLClientDependencies extends ExternalDependencies {
  logger: {
    info(message: string): void;
  };
  client: {
    options(): { url: string };
  };
}
