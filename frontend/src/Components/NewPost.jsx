import React, { useState } from 'react';
import styled from 'styled-components';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { useRef } from 'react';
import { uploadImage } from '../utils/imageUpload';

const Container = styled.div`
  position: relative;
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

const PickerIcon = styled.i`
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 2rem;
  z-index: 10;
  color: #e91f35;
  cursor: pointer;

  &:hover {
    color: #eeb32e;
  }
`;

const ImagePicker = styled.div`
  padding: 1rem 2rem;
`;

const Icon = styled.i`
  font-size: 2.5rem;
  cursor: pointer;
`;

const ImageFile = styled.input`
  display: none;
`;

export default function NewPost() {
  const [values, setValues] = useState({
    image: '',
    desc: '',
    imageName: '',
  });

  const inpRef = useRef(null);

  const [showPicker, setShowPicker] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = await uploadImage(file);
    setValues({
      ...values,
      imageName: file.name,
      image: data.url,
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const addEmoji = (e) => {
    console.log(e.native);
    setValues({
      ...values,
      desc: `${values.desc} ${e.native}`,
    });
  };

  const handleIconClick = (e) => {
    inpRef.current.click();
  };

  return (
    <Container>
      <PostInput
        value={values.desc}
        name='desc'
        type='text'
        onChange={handleChange}
        placeholder='Tell us about the photo'
      />
      <PickerIcon
        className='far fa-laugh'
        onClick={() => setShowPicker(!showPicker)}
      ></PickerIcon>
      {showPicker && (
        <Picker
          onSelect={addEmoji}
          title='Pick your emoji…'
          emoji='point_up'
          style={{ position: 'absolute', top: '5rem', right: '2rem' }}
        />
      )}
      <ImagePicker>
        <Icon onClick={handleIconClick} className='fas fa-images'></Icon>
        <ImageFile ref={inpRef} type='file' onChange={handleImageChange} />
        {values.imageName && (
          <span style={{ marginLeft: '5px' }}>
            Image selected : {values.imageName}
          </span>
        )}
      </ImagePicker>
    </Container>
  );
}
