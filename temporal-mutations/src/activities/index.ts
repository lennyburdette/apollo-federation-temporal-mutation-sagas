import fetch from "make-fetch-happen";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  join__FieldSet: any;
};

export type CapturePaymentError = {
  __typename?: "CapturePaymentError";
  message: Scalars["String"];
};

export type CapturePaymentInput = {
  paymentNonce: Scalars["String"];
};

export type CapturePaymentResult = CapturePaymentError | CapturePaymentSuccess;

export type CapturePaymentSuccess = {
  __typename?: "CapturePaymentSuccess";
  confirmationCode: Scalars["String"];
};

export type CompleteOrderError_PaymentFailed = {
  __typename?: "CompleteOrderError_PaymentFailed";
  failureReason: Scalars["String"];
};

export type CompleteOrderError_SeatsUnavailable = {
  __typename?: "CompleteOrderError_SeatsUnavailable";
  seatsAvailable: Array<Seat>;
  seatsUnavailable: Array<Seat>;
};

export type CompleteOrderInput = {
  clientMutationId: Scalars["ID"];
  orderId: Scalars["ID"];
  paymentNonce: Scalars["String"];
};

export type CompleteOrderResult =
  | CompleteOrderError_PaymentFailed
  | CompleteOrderError_SeatsUnavailable
  | CompleteOrderSuccess;

export type CompleteOrderSuccess = {
  __typename?: "CompleteOrderSuccess";
  confirmationCode: Scalars["String"];
  order: Order;
};

export type Mutation = {
  __typename?: "Mutation";
  capturePayment: CapturePaymentResult;
  completeOrder: CompleteOrderResult;
  releaseSeats: ReleaseSeatsResult;
  reserveSeats: ReserveSeatsResult;
  sendOrderConfirmation: SendOrderConfirmationResult;
};

export type MutationCapturePaymentArgs = {
  input: CapturePaymentInput;
};

export type MutationCompleteOrderArgs = {
  input: CompleteOrderInput;
};

export type MutationReleaseSeatsArgs = {
  input: ReleaseSeatsInput;
};

export type MutationReserveSeatsArgs = {
  input: ReserveSeatsInput;
};

export type MutationSendOrderConfirmationArgs = {
  input: SendOrderInput;
};

export type Order = {
  __typename?: "Order";
  id: Scalars["ID"];
  seats: Array<Seat>;
};

export type Query = {
  __typename?: "Query";
  order?: Maybe<Order>;
};

export type QueryOrderArgs = {
  id: Scalars["ID"];
};

export type ReleaseSeatsError = {
  __typename?: "ReleaseSeatsError";
  message: Scalars["String"];
};

export type ReleaseSeatsInput = {
  reservationId: Scalars["ID"];
};

export type ReleaseSeatsResult = ReleaseSeatsError | ReleaseSeatsSuccess;

export type ReleaseSeatsSuccess = {
  __typename?: "ReleaseSeatsSuccess";
  success: Scalars["Boolean"];
};

export type ReserveSeatsError_SeatsUnavailable = {
  __typename?: "ReserveSeatsError_SeatsUnavailable";
  seatsAvailable: Array<Seat>;
  seatsUnavailable: Array<Seat>;
};

export type ReserveSeatsInput = {
  seatIds: Array<Scalars["ID"]>;
};

export type ReserveSeatsResult =
  | ReserveSeatsError_SeatsUnavailable
  | ReserveSeatsSuccess;

export type ReserveSeatsSuccess = {
  __typename?: "ReserveSeatsSuccess";
  reservationId: Scalars["ID"];
};

export type Seat = {
  __typename?: "Seat";
  id: Scalars["ID"];
};

export type SendOrderConfirmationError = {
  __typename?: "SendOrderConfirmationError";
  message: Scalars["String"];
};

export type SendOrderConfirmationResult =
  | SendOrderConfirmationError
  | SendOrderConfirmationSuccess;

export type SendOrderConfirmationSuccess = {
  __typename?: "SendOrderConfirmationSuccess";
  success: Scalars["Boolean"];
};

export type SendOrderInput = {
  email: Scalars["String"];
};

export enum Join__Graph {
  Inventory = "INVENTORY",
  Mutations = "MUTATIONS",
  Notifications = "NOTIFICATIONS",
  Orders = "ORDERS",
}

export type CapturePaymentMutationVariables = Exact<{
  input: CapturePaymentInput;
}>;

export type CapturePaymentMutation = {
  __typename?: "Mutation";
  capturePayment:
    | { __typename: "CapturePaymentError"; message: string }
    | { __typename: "CapturePaymentSuccess"; confirmationCode: string };
};

export type GetOrderQueryVariables = Exact<{
  orderId: Scalars["ID"];
}>;

export type GetOrderQuery = {
  __typename?: "Query";
  order?: Maybe<{
    __typename?: "Order";
    id: string;
    seats: Array<{ __typename?: "Seat"; id: string }>;
  }>;
};

export type ReleaseSeatsMutationVariables = Exact<{
  input: ReleaseSeatsInput;
}>;

export type ReleaseSeatsMutation = {
  __typename?: "Mutation";
  releaseSeats:
    | { __typename: "ReleaseSeatsError"; message: string }
    | { __typename: "ReleaseSeatsSuccess"; success: boolean };
};

export type ReserveSeatsMutationVariables = Exact<{
  input: ReserveSeatsInput;
}>;

export type ReserveSeatsMutation = {
  __typename?: "Mutation";
  reserveSeats:
    | {
        __typename: "ReserveSeatsError_SeatsUnavailable";
        seatsAvailable: Array<{ __typename?: "Seat"; id: string }>;
        seatsUnavailable: Array<{ __typename?: "Seat"; id: string }>;
      }
    | { __typename: "ReserveSeatsSuccess"; reservationId: string };
};

export type SendOrderConfirmationMutationVariables = Exact<{
  input: SendOrderInput;
}>;

export type SendOrderConfirmationMutation = {
  __typename?: "Mutation";
  sendOrderConfirmation:
    | { __typename: "SendOrderConfirmationError"; message: string }
    | { __typename: "SendOrderConfirmationSuccess"; success: boolean };
};

interface ClientOptions {
  url: string;
}

interface GraphQLRequest {
  url: string;
  headers?: { [key: string]: string };
  query: string;
  variables: { [key: string]: any };
  operationName: string;
}

async function graphqlFetch<T>({
  url,
  headers = {},
  query,
  variables,
  operationName,
}: GraphQLRequest): Promise<T> {
  const response = await fetch(url, {
    headers: { "content-type": "application/json", ...headers },
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
      operationName,
    }),
  });

  if (
    response.ok &&
    response.headers.get("Content-Type")?.startsWith("application/json")
  ) {
    const { data, errors } = await response.json();

    if (errors?.length) {
      throw new Error(errors.map((e: any) => e.message).join("\n"));
    }

    return data;
  }

  throw new Error(
    `bad response: ${response.ok} (${response.headers.get("Content-Type")})
    ${await response.text()}
    `
  );
}

export function isCapturePaymentError(
  o: CapturePaymentResult
): o is CapturePaymentError {
  return o?.__typename === "CapturePaymentError";
}

export function isCapturePaymentSuccess(
  o: CapturePaymentResult
): o is CapturePaymentSuccess {
  return o?.__typename === "CapturePaymentSuccess";
}

export function isCompleteOrderError_PaymentFailed(
  o: CompleteOrderResult
): o is CompleteOrderError_PaymentFailed {
  return o?.__typename === "CompleteOrderError_PaymentFailed";
}

export function isCompleteOrderError_SeatsUnavailable(
  o: CompleteOrderResult
): o is CompleteOrderError_SeatsUnavailable {
  return o?.__typename === "CompleteOrderError_SeatsUnavailable";
}

export function isCompleteOrderSuccess(
  o: CompleteOrderResult
): o is CompleteOrderSuccess {
  return o?.__typename === "CompleteOrderSuccess";
}

export function isReleaseSeatsError(
  o: ReleaseSeatsResult
): o is ReleaseSeatsError {
  return o?.__typename === "ReleaseSeatsError";
}

export function isReleaseSeatsSuccess(
  o: ReleaseSeatsResult
): o is ReleaseSeatsSuccess {
  return o?.__typename === "ReleaseSeatsSuccess";
}

export function isReserveSeatsError_SeatsUnavailable(
  o: ReserveSeatsResult
): o is ReserveSeatsError_SeatsUnavailable {
  console.log(
    o,
    o.__typename,
    o.__typename === "ReserveSeatsError_SeatsUnavailable"
  );
  return o?.__typename === "ReserveSeatsError_SeatsUnavailable";
}

export function isReserveSeatsSuccess(
  o: ReserveSeatsResult
): o is ReserveSeatsSuccess {
  return o?.__typename === "ReserveSeatsSuccess";
}

export function isSendOrderConfirmationError(
  o: SendOrderConfirmationResult
): o is SendOrderConfirmationError {
  return o?.__typename === "SendOrderConfirmationError";
}

export function isSendOrderConfirmationSuccess(
  o: SendOrderConfirmationResult
): o is SendOrderConfirmationSuccess {
  return o?.__typename === "SendOrderConfirmationSuccess";
}

const CapturePaymentSdl = `#graphql
mutation CapturePayment($input: CapturePaymentInput!) {
  capturePayment(input: $input) {
    __typename
    ... on CapturePaymentError {
      message
    }
    ... on CapturePaymentSuccess {
      confirmationCode
    }
  }
}`;

export function capturePayment(
  options: ClientOptions,
  variables: CapturePaymentMutationVariables
): Promise<CapturePaymentMutation> {
  return graphqlFetch({
    url: options.url,
    query: CapturePaymentSdl,
    variables,
    operationName: "CapturePayment",
  });
}

const GetOrderSdl = `#graphql
query GetOrder($orderId: ID!) {
  order(id: $orderId) {
    id
    seats {
      id
    }
  }
}`;

export function getOrder(
  options: ClientOptions,
  variables: GetOrderQueryVariables
): Promise<GetOrderQuery> {
  return graphqlFetch({
    url: options.url,
    query: GetOrderSdl,
    variables,
    operationName: "GetOrder",
  });
}

const ReleaseSeatsSdl = `#graphql
mutation ReleaseSeats($input: ReleaseSeatsInput!) {
  releaseSeats(input: $input) {
    __typename
    ... on ReleaseSeatsError {
      message
    }
    ... on ReleaseSeatsSuccess {
      success
    }
  }
}`;

export function releaseSeats(
  options: ClientOptions,
  variables: ReleaseSeatsMutationVariables
): Promise<ReleaseSeatsMutation> {
  return graphqlFetch({
    url: options.url,
    query: ReleaseSeatsSdl,
    variables,
    operationName: "ReleaseSeats",
  });
}

const ReserveSeatsSdl = `#graphql
mutation ReserveSeats($input: ReserveSeatsInput!) {
  reserveSeats(input: $input) {
    __typename
    ... on ReserveSeatsSuccess {
      reservationId
    }
    ... on ReserveSeatsError_SeatsUnavailable {
      seatsAvailable {
        id
      }
      seatsUnavailable {
        id
      }
    }
  }
}`;

export function reserveSeats(
  options: ClientOptions,
  variables: ReserveSeatsMutationVariables
): Promise<ReserveSeatsMutation> {
  return graphqlFetch({
    url: options.url,
    query: ReserveSeatsSdl,
    variables,
    operationName: "ReserveSeats",
  });
}

const SendOrderConfirmationSdl = `#graphql
mutation SendOrderConfirmation($input: SendOrderInput!) {
  sendOrderConfirmation(input: $input) {
    __typename
    ... on SendOrderConfirmationError {
      message
    }
    ... on SendOrderConfirmationSuccess {
      success
    }
  }
}`;

export function sendOrderConfirmation(
  options: ClientOptions,
  variables: SendOrderConfirmationMutationVariables
): Promise<SendOrderConfirmationMutation> {
  return graphqlFetch({
    url: options.url,
    query: SendOrderConfirmationSdl,
    variables,
    operationName: "SendOrderConfirmation",
  });
}
