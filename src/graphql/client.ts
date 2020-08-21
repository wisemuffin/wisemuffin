import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri:
    process.env.REACT_APP_ENV === "PROD"
      ? process.env.REACT_APP_GRAHQL_PROD
      : process.env.REACT_APP_GRAHQL_LOCAL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token_raw = localStorage.getItem("okta-token-storage");
  const token = JSON.parse(token_raw!);
  console.log("token", token.accessToken.accessToken);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token.accessToken.accessToken}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
