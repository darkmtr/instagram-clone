import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import RegisterForm from '../Components/RegisterForm';
import LoginForm from '../Components/LoginForm';

const Section = styled.section`
  padding: 30px;
  background-color: ${(props) => props.theme.colors.background};
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
`;

const FormContainer = styled.div`
  background-color: ${(props) => props.theme.colors.container};
  width: 350px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 50%;
  padding: 50px 30px;
  text-align: center;
`;

const MiniSection = styled(FormContainer)`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  height: 100px;
`;

const InstaIcon = styled.i`
  font-size: 5rem;
  margin-bottom: 1.5rem;
`;

export const SoftText = styled.h2`
  color: #8e8e8e;
  font-weight: bold;
  font-size: ${(props) => (props.size ? props.size : 1.9)}rem;
  margin: 0 1rem;
`;

export const StyledButton = styled.button`
  margin: ${(props) => (props.margin ? props.margin : 2)}rem 0;
  border: none;
  background-color: ${(props) => (props.disabled ? '#b2dffc' : '#0095f6')};
  width: 100%;
  cursor: ${(props) => (props.disabled ? 'auto' : 'pointer')};
  padding: 0.8rem;
  border-radius: 0.5rem;
  color: #fff;
  outline: none;
`;

const ClientLink = styled(Link)`
  text-decoration: none;
`;

const RegisterPage = ({ history }) => {
  return (
    <Section>
      <FormContainer>
        <InstaIcon className='fab fa-instagram' />
        <LoginForm />
      </FormContainer>
      <MiniSection>
        <SoftText size={1.5}>
          Don't have an account? <ClientLink to='/register'>log in</ClientLink>
        </SoftText>
      </MiniSection>
    </Section>
  );
};

export default RegisterPage;
