import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter as Router } from 'react-router-dom';
import { setContext } from 'apollo-link-context';
import { ApolloLink, Observable } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';

import AuthProvider from './context/AuthContext';
import App from './App';

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle;
      Promise.resolve(operation)
        .then((oper) => {
          const token = localStorage.getItem('token');
          oper.setContext({
            headers: {
              authorization: token ? token : '',
            },
          });
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: 'token',
      isTokenValidOrUndefined: () => {
        const token = localStorage.getItem('token');

        if (!token) {
          return true;
        }

        try {
          const { exp } = jwtDecode(token);
          if (Date.now() >= exp * 1000) {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      },
      fetchAccessToken: () => {
        return fetch('http://localhost:4000/refresh_token', {
          method: 'POST',
          credentials: 'include',
        });
      },
      handleFetch: (accessToken) => {
        localStorage.setItem('token', accessToken);
      },
      handleError: (err) => {
        // full control over handling token fetch Error
        console.warn('Your refresh token is invalid. Try to relogin');
        console.error(err);
      },
    }),
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
    }),
    requestLink,
    new HttpLink({
      uri: 'http://192.168.1.9:4000/graphql',
      credentials: 'include',
    }),
  ]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
