import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import Router from './Router';
import { AuthContext } from './context/AuthContext';
import Navbar from './Components/Navbar';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const QUERY = gql`
  query hello {
    hello
  }
`;

function App({ location }) {
  const setToken = useContext(AuthContext).setToken;
  const [loading, setLoading] = useState(true);

  const fetchToken = async () => {
    const res = await axios.post('http://localhost:4000/refresh_token', null, {
      withCredentials: true,
    });
    const { data } = res;
    setLoading(false);
    if (data.token !== '') {
      setToken(data.token);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      {!['/login', 'register'].includes(location.pathname) && <Navbar />}
      <Router />
      <ToastContainer />
    </div>
  );
}

export default withRouter(App);
