import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as HeartSVG } from '../assets/heart.svg';
import PostOverlay from './PostOverlay';

const Div = styled.div`
  position: relative;

  @media (max-width: 700px) {
    height: '180px';
  }
`;

const Image = styled.img`
  height: 280px;
  position: relative;

  @media (max-width: 700px) {
    height: 50px;
  }
`;

const Overlay = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 1;
  }
`;

const HeartImg = styled.i`
  color: #fff;
  font-size: 3rem;
`;

const Number = styled.p`
  font-size: 3rem;
  margin: 0 1rem;
`;

export default function Post({ image }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Div onClick={() => setShow(true)}>
        <Image src={image} />
        <Overlay>
          <HeartImg className='fas fa-heart' />
          <Number>0</Number>
        </Overlay>
      </Div>
      {show && <PostOverlay />}
    </>
  );
}
