import React, { useState } from 'react';
import styled from 'styled-components';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { useRef } from 'react';
import { uploadImage } from '../utils/imageUpload';
import { StyledButton } from '../pages/RegisterPage';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import gql from 'graphql-tag';

const Container = styled.div`
  position: relative;
  background: #fff;
  /* height: 15rem; */
  width: 100rem;
  border-radius: 1.5rem;
  border: 1px solid #dbdbdb;
  padding: 1rem;
  transition: all 5.5s;
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

const Image = styled.img`
  height: 150px;
  width: 150px;
  object-fit: cover;
`;

const Div = styled.div`
  position: relative;
  height: 100%;
  width: 150px;
`;

const Overlay = styled.div`
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all 0.3s;

  &:hover {
    opacity: 1;
  }
`;

const CloseIcon = styled.i`
  font-size: 2.5rem;
  color: #fff;
  cursor: pointer;
`;

const TagContainer = styled.div`
  padding: 0.5rem;
  width: 100%;
  display: flex;
  border: 1px solid #ccc;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 5px;
    height: 4px;
  }

  ::-webkit-scrollbar:hover {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #080f37;
  }
`;

const Tag = styled.div`
  display: flex;
  background: #45c4b2;
  color: #fff;
  padding: 0.5rem;
  font-size: 1.3rem;
  width: auto;
  min-width: 150px;
  max-width: 300px;
  align-items: center;
  justify-content: space-between;
  margin: 0 0.5rem;

  &:first-child {
    margin: 0;
  }
`;

const TagIcon = styled.i`
  cursor: pointer;
`;

const TagInput = styled.input`
  border: none;
  width: 80px;
  outline: none;
  padding: 1rem;
`;

const initState = {
  image: null,
  desc: '',
  imageName: '',
  tags: [],
  currentTag: '',
};

export default function NewPost() {
  const [values, setValues] = useState(initState);

  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      image: values.image,
      description: values.desc,
      tags: values.tags,
    },
    onCompleted: (data) => {
      console.log(data);
      toast.success('Successfully created post!', {
        autoClose: true,
      });
      setValues(initState);
    },
  });

  if (error) {
    toast.error(`Something went wrong : ${error}`, {
      autoClose: true,
    });
  }

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

  const handleTagInput = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      tags: [...values.tags, values.currentTag.split(' ').join('')],
      currentTag: '',
    });
  };

  const submitPost = (e) => {
    toast.info('Uploading post', {
      autoClose: true,
    });
    console.log(values);
    createPost();
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
      {values.image && (
        <ImagePicker>
          <Div>
            <Image src={values.image} />
            <Overlay>
              <CloseIcon
                className='fas fa-times'
                onClick={() =>
                  setValues({
                    ...values,
                    image: null,
                  })
                }
              ></CloseIcon>
            </Overlay>
          </Div>
        </ImagePicker>
      )}
      <ImagePicker>
        <TagContainer>
          {values.tags.map((tag) => {
            return (
              <Tag key={tag}>
                <p>#{tag}</p>
                <TagIcon
                  onClick={(e) => {
                    setValues({
                      ...values,
                      tags: values.tags.filter((t) => t != tag),
                    });
                  }}
                  className='fas fa-times'
                ></TagIcon>
              </Tag>
            );
          })}
          <form onSubmit={handleTagInput}>
            <TagInput
              placeholder='Add a tag'
              onChange={handleChange}
              name='currentTag'
              value={values.currentTag}
            />
            <button type='submit' style={{ display: 'none' }}></button>
          </form>
        </TagContainer>
        <StyledButton onClick={submitPost} style={{ width: '15%' }}>
          Post
        </StyledButton>
      </ImagePicker>
    </Container>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION(
    $image: String!
    $description: String!
    $tags: [String]
  ) {
    createPost(image: $image, description: $description, tags: $tags) {
      id
      tags
      description
      image
      createdAt
      updatedAt
      postedBy {
        id
        username
        profile {
          id
          bio
        }
      }
    }
  }
`;
