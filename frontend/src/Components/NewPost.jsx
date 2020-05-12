import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #fff;
  height: 15rem;
  width: 100rem;
  border-radius: 1.5rem;
  border: 1px solid #dbdbdb;
  padding: 1rem;
`;

const Group = styled.div`
  margin: 20px 0;
`;

const Label = styled.label`
  font-size: 2rem;
  display: block;
  top: 1rem;
  margin: 0.5rem 0;
`;

const PostInput = styled.input`
  padding: 2rem 2rem;
  border: none;
  outline: none;
  width: 100%;
  font-size: 2rem;

  ::-webkit-input-placeholder {
    /* color: peachpuff; */
    font-size: 2rem;
  }
`;

export default function NewPost() {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        setImage(this.result);
      };
    }
  };

  return (
    <Container>
      <PostInput placeholder='Tell us about the photo' />
    </Container>
  );
}
