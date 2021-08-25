import { Workflow } from "@temporalio/workflow";
import { CompleteOrderInput, CompleteOrderResult } from "../interfaces/graphql";

export interface CompleteOrder extends Workflow {
  main(input: CompleteOrderInput): Promise<CompleteOrderResult>;
}

export interface Timer extends Workflow {
  main(durationSec: number): Promise<boolean>;
  signals: {
    extend(durationSec: number): void;
  };
  queries: {
    timeRemaining(): number;
  };
}
