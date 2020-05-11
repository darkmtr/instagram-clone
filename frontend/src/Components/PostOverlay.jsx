import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  height: 100vh;
  width: 100%;
  background: black;
`;

export default function PostOverlay() {
  return <Container>ok</Container>;
}
