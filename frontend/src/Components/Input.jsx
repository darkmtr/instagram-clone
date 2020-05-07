import React from 'react';
import styled from 'styled-components';

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

export default function CustomInput({
  placeholder,
  name,
  label,
  handler,
  error,
  value,
  type,
}) {
  return (
    <InputGroup>
      <Label>{label}</Label>
      <Input
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={handler}
        value={value}
        required
      />
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </InputGroup>
  );
}
