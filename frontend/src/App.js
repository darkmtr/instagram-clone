import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Router from './Router';
import { Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import './App.css';

const QUERY = gql`
  query hello {
    hello
  }
`;

function App() {
  const setToken = useContext(AuthContext).setToken;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    })
      .then(async (d) => {
        const data = await d.json();
        console.log(data);
        // setToken(data.token);
        setLoading(false);
      })
      .catch((err) => {
        console.dir(err);
      });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
