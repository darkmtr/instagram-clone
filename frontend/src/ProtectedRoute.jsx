import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

export default function ProtectedRoute({
  component: Component,
  ...otherProps
}) {
  const authToken = useContext(AuthContext).token;

  const token = localStorage.getItem('token');

  return (
    <Route
      {...otherProps}
      render={(props) => {
        if (token || authToken) {
          return <Component {...props} />;
        }

        return <Redirect to='/login' />;
      }}
    />
  );
}
