import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

import { useMutation } from '@apollo/react-hooks';

import { StyledButton } from '../pages/RegisterPage';
import { AuthContext } from '../context/AuthContext';
import Input from './Input';

const Form = styled.form`
  margin: 2.5rem 0 1rem 0;
  text-align: left;
`;

function LoginForm({ history }) {
  const setToken = useContext(AuthContext).setToken;

  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState('');

  const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    variables: { username: values.username, password: values.password },
    onError: (err) => {
      console.log(err);
      setErrors(err.graphQLErrors[0].message);
    },
    onCompleted: (data) => {
      console.log(data);
      setToken(data.login.token);
      history.push('/user');
    },
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label='Username'
        handler={handleChange}
        value={values.username}
        name='username'
        placeholder='Username'
        type='text'
        error={errors && errors}
      />
      <Input
        label='Password'
        handler={handleChange}
        value={values.pass}
        name='password'
        placeholder='Password'
        type='password'
      />

      <StyledButton
        disabled={loading || !values.username.length || !values.password.length}
        disabled={loading || !values.username.length || !values.password.length}
      >
        Log in
      </StyledButton>
    </Form>
  );
}

export default withRouter(LoginForm);

const LOGIN_USER_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;
