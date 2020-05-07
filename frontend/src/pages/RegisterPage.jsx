import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import RegisterForm from '../Components/RegisterForm';

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
  height: 70%;
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
        <SoftText>Sign up to see photos and videos from your friends.</SoftText>
        <StyledButton disabled>
          {' '}
          <i className='fab fa-facebook' style={{ marginRight: '1rem' }} />
          Log in with facebook
        </StyledButton>
        <RegisterForm />
        <SoftText size={1.2}>
          By signing up, you agree to our Terms , Data Policy and Cookies Policy
          .
        </SoftText>
      </FormContainer>
      <MiniSection>
        <SoftText size={1.5}>
          Already have an account? <ClientLink to='/login'>log in</ClientLink>
        </SoftText>
      </MiniSection>
    </Section>
  );
};

export default RegisterPage;
