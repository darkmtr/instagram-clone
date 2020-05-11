import React, { useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import PostList from '../Components/PostList';
import { uploadImage } from '../utils/imageUpload';
import Avatar from '../Components/Avatar';

const Section = styled.section`
  max-width: 1000px;
  margin: 4rem auto;
`;

const UserInfo = styled.div`
  display: flex;
  height: 200px;
  padding: 0 5rem;
  /* background: red; */
  align-items: center;
`;

const Info = styled.div`
  margin: 2.5rem 0 0 10rem;
  align-self: flex-start;
`;

const UsernameContainer = styled.div`
  margin: ${(props) => props.margin && props.margin}rem 0rem;
  display: flex;
  flex-direction: ${(props) => props.direction && props.direction};
`;

const Text = styled.h1`
  font-family: 'Raleway', sans-serif;
  font-size: 4rem;
  font-weight: 300;
`;

const EditButton = styled.button`
  display: block;
  border: 1px solid #dadada;
  margin-left: 2rem;
  padding: 1rem 2rem;
  border-radius: 5px;
  background: transparent;
  font-size: 1.5rem;
  cursor: pointer;
`;

const SubText = styled.p`
  font-size: 1.5rem;
  margin-right: 2rem;
`;

const TextSpan = styled.span`
  font-weight: bold;
`;

const ExternalLink = styled.a`
  font-size: 2rem;
  margin: 0.5rem 0;
  text-decoration: none;
  color: blue;

  &:visited {
    color: blue;
  }
`;

export default function UserPage() {
  const { data, loading, error } = useQuery(GET_CURRENT_USER);

  if (error) {
    return <div>{JSON.stringify(error.graphQLErrors[0])}</div>;
  }

  if (loading || !data) {
    return <div>loading</div>;
  }

  if (data) {
    console.log(data);
    const {
      id,
      username,
      profile: { avatar, bio, website },
      followers,
      following,
    } = data.getCurrentUser;
    return (
      <Section>
        <UserInfo>
          <Avatar src={avatar} />
          <Info>
            <UsernameContainer>
              <Text>{username}</Text>
              <EditButton>Edit profile</EditButton>
            </UsernameContainer>
            <UsernameContainer margin={1.5}>
              <SubText>
                <TextSpan>{followers} </TextSpan> followers
              </SubText>
              <SubText>
                <TextSpan>{following} </TextSpan> followers
              </SubText>
            </UsernameContainer>
            <UsernameContainer margin={1.5} direction={'column'}>
              {bio && <SubText>{bio}</SubText>}
              {website && (
                <ExternalLink target='_blank' href={website}>
                  {website}
                </ExternalLink>
              )}
            </UsernameContainer>
          </Info>
        </UserInfo>
        <PostList id={parseInt(id)} />
      </Section>
    );
  }
}

export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      username
      profile {
        id
        bio
        website
        avatar
        createdAt
        updatedAt
      }
      followers
      following
      createdAt
      updatedAt
    }
  }
`;
