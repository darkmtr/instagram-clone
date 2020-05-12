import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NewPost from '../Components/NewPost';
import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function HomePage() {
  return (
    <Section>
      <NewPost />
      <h1>asds</h1>
    </Section>
  );
}
