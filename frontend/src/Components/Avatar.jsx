import React, { useRef } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { uploadImage } from '../utils/imageUpload';
import { GET_CURRENT_USER } from '../pages/UserPage';
import { toast } from 'react-toastify';

const ImageContainer = styled.div`
  cursor: pointer;
  position: relative;
  height: 150px;
  width: 150px;
  border-radius: 50%;
`;

const Layer = styled.div`
  position: absolute;
  background: transparent;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  border-radius: 50%;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.5);
  }
`;

const AvatarImg = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
`;

const EditButton = styled.button`
  padding: 0.5rem 2.5rem;
  border-radius: 4rem;
  background: #fff;
  color: #000;
  border: none;
  cursor: pointer;
  outline: none;
  /* font-size: 0.9rem; */

  &:hover {
    border: 1.5px solid #ccc;
  }
`;

export default function Avatar({ src }) {
  const input = useRef(null);

  const [updateAvatar] = useMutation(UPDATE_AVATAR, {
    onCompleted: () => {
      toast.success('🚀 Updated Avatar!', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const handleClick = (e) => {
    const inp = input.current;
    inp.click();
  };

  const handleAvatarChange = async (e) => {
    console.log('change');
    const data = await uploadImage(e.target.files[0]);
    updateAvatar({ variables: { avatar: data.url } });
  };

  return (
    <>
      <ImageContainer onClick={handleClick}>
        <AvatarImg src={src} />
        <Layer>
          <EditButton>
            <i className='fas fa-cog'></i> Update
          </EditButton>
        </Layer>
      </ImageContainer>
      <input
        ref={input}
        type='file'
        style={{ display: 'none' }}
        onChange={handleAvatarChange}
      />
    </>
  );
}

const UPDATE_AVATAR = gql`
  mutation changeAvatar($avatar: String!) {
    changeAvatar(avatar: $avatar) {
      id
      profile {
        id
        avatar
      }
    }
  }
`;
