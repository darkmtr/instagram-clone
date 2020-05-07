import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

import { useMutation } from '@apollo/react-hooks';

import { StyledButton } from '../pages/RegisterPage';
import { AuthContext } from '../context/AuthContext';

const Form = styled.form`
  margin: 2.5rem 0 1rem 0;
  text-align: left;
`;

const InputGroup = styled.div``;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 1.5rem;
  border: none;
  background-color: #fafafa;
  border-bottom: 3px solid transparent;
  border-radius: 1.5px;
  transition: all 0.4s;

  &:focus {
    outline: none;
    border-bottom: 3px solid green;
  }

  &:focus:invalid {
    outline: none;
    border-bottom: 3px solid red;
  }
`;

const Label = styled.label`
  display: block;
  margin: 1rem 0;
  font-weight: bold;
  font-size: 1.2rem;
`;

const ErrorLabel = styled(Label)`
  font-size: 1rem;
  color: red;
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
      <InputGroup>
        <Label>Username</Label>
        <Input
          name='username'
          value={values.username}
          onChange={handleChange}
          password
          placeholder='Username'
          type='text'
          required
        />
        {errors.username && <ErrorLabel>{errors.username.msg}</ErrorLabel>}
      </InputGroup>
      <InputGroup>
        <Label>Password</Label>
        <Input
          name='password'
          value={values.password}
          onChange={handleChange}
          placeholder='Password'
          type='password'
          required
          minLength={6}
        />
        {errors.password && <ErrorLabel>{errors.password.msg}</ErrorLabel>}
      </InputGroup>
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
