import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri:
    process.env.REACT_APP_ENV === "PROD"
      ? process.env.REACT_APP_GRAHQL_PROD
      : process.env.REACT_APP_GRAHQL_LOCAL,
});
console.log("env", process.env.REACT_APP_ENV);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token_raw = localStorage.getItem("okta-token-storage");
  const token = JSON.parse(token_raw!);

  return {
    headers: {
      ...headers,
      ...(token?.accessToken?.accessToken && {
        Authorization: `Bearer ${token.accessToken.accessToken}`,
      }),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
