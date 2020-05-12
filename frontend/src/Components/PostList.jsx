import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Post from './Post';

const Section = styled.section`
  margin-top: 1rem;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 5rem;
  grid-row-gap: 5rem;

  @media (max-width: 700px) {
    grid-template-columns: repeat(3, 180px);
  }
`;

export default function PostList({ id }) {
  const { data, loading, error } = useQuery(FETCH_USER_POSTS, {
    variables: { userId: id },
  });

  if (loading || error) {
    return <div>either loading or error</div>;
  }

  if (data) {
    console.log(data);
    return (
      <Section>
        <Grid>
          {data.getPostsByUser.map((post) => {
            return <Post key={post.id} {...post} />;
          })}
        </Grid>
      </Section>
    );
  }
}

const FETCH_USER_POSTS = gql`
  query getPostsByUser($userId: Int!) {
    getPostsByUser(userId: $userId) {
      id
      tags
      description
      image
      postedBy {
        id
        username
        profile {
          id
          avatar
        }
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
