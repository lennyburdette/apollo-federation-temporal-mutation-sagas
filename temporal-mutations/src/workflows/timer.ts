import { Context, sleep } from "@temporalio/workflow";
import { Timer } from "../interfaces/workflows";
import { GraphQLClientDependencies } from "../interfaces/dependencies";

const { logger } = Context.dependencies<GraphQLClientDependencies>();

let timeRemaining = 0;
async function main(durationSec: number): Promise<boolean> {
  timeRemaining = durationSec * 1000;

  while (timeRemaining > 0) {
    logger.info(`${Date.now()} - time remaining ${timeRemaining}`);
    await sleep(1000 * 10);
    timeRemaining -= 1000 * 10;
  }

  return true;
}

const signals = {
  extend(durationSec: number) {
    timeRemaining += durationSec * 1000;
  },
};

const queries = {
  timeRemaining() {
    console.log("QUERY", timeRemaining);
    return timeRemaining;
  },
};

export const workflow: Timer = {
  main,
  signals,
  queries,
};
