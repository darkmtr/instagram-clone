import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from '../context/AuthContext';

const LoginPage = ({ history }) => {
  const setToken = useContext(AuthContext).setToken;

  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const [loginUser] = useMutation(LOGIN_MUTATION, {
    variables: { username: values.username, password: values.password },
    onError: (err) => {
      console.log(err);
    },
    onCompleted: (data) => {
      console.log(data);
      setToken(data.login.token);
      history.push('/');
    },
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div>
      <form onSubmit={handleClick}>
        <input
          name='username'
          value={values.username}
          onChange={handleChange}
        />
        <input
          name='password'
          value={values.password}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;
