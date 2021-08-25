import { Context } from "@temporalio/workflow";
import {
  capturePayment,
  getOrder,
  isCapturePaymentError,
  isReserveSeatsError_SeatsUnavailable,
  releaseSeats,
  reserveSeats,
  sendOrderConfirmation,
} from "@activities";
import { CompleteOrderInput, CompleteOrderResult } from "../interfaces/graphql";
import { CompleteOrder } from "../interfaces/workflows";
import { GraphQLClientDependencies } from "../interfaces/dependencies";

const { client } = Context.dependencies<GraphQLClientDependencies>();

async function main(input: CompleteOrderInput): Promise<CompleteOrderResult> {
  const clientOptions = client.options();

  const { order } = await getOrder(clientOptions, { orderId: input.orderId });
  assert(order, "order missing");

  const { reserveSeats: reservation } = await reserveSeats(clientOptions, {
    input: { seatIds: order.seats.map((s) => s.id) },
  });

  if (reservation.__typename === "ReserveSeatsError_SeatsUnavailable") {
    return {
      ...reservation,
      __typename: "CompleteOrderError_SeatsUnavailable",
    };
  }

  const { capturePayment: payment } = await capturePayment(clientOptions, {
    input: { paymentNonce: input.paymentNonce },
  });

  if (payment.__typename === "CapturePaymentError") {
    await releaseSeats(clientOptions, {
      input: { reservationId: reservation.reservationId },
    });

    return {
      __typename: "CompleteOrderError_PaymentFailed",
      failureReason: payment.message,
    };
  }

  await sendOrderConfirmation(clientOptions, {
    input: { email: "test@example.com" },
  });

  return {
    __typename: "CompleteOrderSuccess",
    order,
    confirmationCode: payment.confirmationCode,
  };
}

export const workflow: CompleteOrder = { main };

function assert(condition: any, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
