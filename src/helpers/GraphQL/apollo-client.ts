import { split, HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { logErrorMessages } from "@vue/apollo-util";
import { onError } from "@apollo/client/link/error";
import {
  GRAPHQL_API,
  GRAPHQL_WS,
  GRAPHQL_SECRET_KEY,
  IS_PRODUCTION,
} from "@wanin/shared/constant";

const httpLink = new HttpLink({
  uri: GRAPHQL_API,
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret": GRAPHQL_SECRET_KEY,
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: GRAPHQL_WS,
    lazy: true,
    connectionParams: () => {
      return {
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret": GRAPHQL_SECRET_KEY,
        },
      };
    },
  })
);

const errorLink = onError((error) => {
  if (!IS_PRODUCTION) logErrorMessages(error);
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  errorLink.concat(wsLink),
  errorLink.concat(httpLink)
);

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  connectToDevTools: !IS_PRODUCTION,
});

export default apolloClient;
