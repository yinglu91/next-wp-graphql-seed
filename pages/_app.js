import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';

import '../styles/globals.css';

export const wpApiUrlBase = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const wpAppUser = process.env.NEXT_PUBLIC_WORDPRESS_APPLICATION_USERNAME;
const wpAppPassword = process.env.NEXT_PUBLIC_WORDPRESS_APPLICATION_PASSWORD;

// Set WP application password auth header.
const wpAuthorization = Buffer.from(`${wpAppUser}:${wpAppPassword}`).toString(
  'base64'
);

const MyApp = ({ Component, pageProps }) => {
  /**
   * Wrap the app in the ApolloProvider component.
   *
   * @see https://www.apollographql.com/docs/react/api/react/hooks/#the-apolloprovider-component
   */

  const apolloClient = new ApolloClient({
    link: new HttpLink({
      uri: `${wpApiUrlBase}/graphql`, // http://localhost:10004/graphql
      headers: {
        authorization: `Basic ${wpAuthorization}`,
        // 'Content-Type': 'application/json',
      },
    }),

    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
