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

function RegisterForm({ history }) {
  const setToken = useContext(AuthContext).setToken;

  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION, {
    variables: { username: values.username, password: values.password },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    onCompleted: (data) => {
      console.log(data);
      setToken(data.createUser.token);
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
    createUser();
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
        error={errors && errors.username && errors.username.msg}
      />
      <Input
        label='Password'
        handler={handleChange}
        value={values.pass}
        name='password'
        placeholder='Password'
        type='password'
        error={errors && errors.password && errors.password.msg}
      />

      <StyledButton
        disabled={loading || !values.username.length || !values.password.length}
        disabled={loading || !values.username.length || !values.password.length}
      >
        Sign Up
      </StyledButton>
    </Form>
  );
}

export default withRouter(RegisterForm);

const CREATE_USER_MUTATION = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      token
    }
  }
`;
