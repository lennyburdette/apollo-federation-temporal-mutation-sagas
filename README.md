# Apollo Federation + Temporal Mutation Orchestration

## Run it

```sh
docker compose -f docker-compose.yaml -f docker-compose-temporal.yaml up --build -d
cd temporal-mutations && yarn dev:worker
```

(For some reason I'm having trouble running the worker in docker compose.)

Try it out:

First, visit [https://studio.apollographql.com/sandbox/explorer?endpoint=http%3A%2F%2Flocalhost%3A4000%2F].

Execute this operation:

```graphql
mutation CompleteOrderMutation($completeOrderInput: CompleteOrderInput!) {
  completeOrder(input: $completeOrderInput) {
    ... on CompleteOrderError_PaymentFailed {
      failureReason
    }
    ... on CompleteOrderError_SeatsUnavailable {
      seatsAvailable {
        id
      }
      seatsUnavailable {
        id
      }
    }
    ... on CompleteOrderSuccess {
      confirmationCode
      order {
        id
        seats {
          id
        }
      }
    }
  }
}
```

with these variables:

```json
{
  "completeOrderInput": {
    "clientMutationId": "1b3e6f31-8288-450d-b927-b790134b74f0",
    "orderId": "1",
    "paymentNonce": "fc7d958a-8883-4f11-aaec-1562cbdf9221"
  }
}
```

Check out the state of workflows in the Temporal UI: [http://localhost:8088/].

## Project overview

- services/ - GraphQL "subgraphs" composed together into a single GraphQL API using Apollo Federation. These subgraphs provide low-level mutations that are intended to be hidden from users with Apollo Contracts.
- temporal-mutations/ - Two things:
  - A GraphQL subgraph that provides high-level mutations that trigger Temporal workflows.
  - The Temporal worker than runs workflows. Workflows call "activities", which are generated automatically by `@graphql-codegen` from the `.graphql` files in activities/.
- docker-compose-temporal.yaml - lightly edited from https://github.com/temporalio/docker-compose
- docker-compose.yaml - the federated graph and worker containers

## Making changes

- After changing any GraphQL schemas, run `bash compose.sh` to create a new supergraph schema for the gateway.
- After changing the temporal-mutations/schema.graphql, run `yarn gql:server` to codegen resolver types.
- After changing an activity .graphql file, run `yarn gql:client` to codegen activity functions.
