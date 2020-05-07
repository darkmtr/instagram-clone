import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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
    return <div>{JSON.stringify(data.getCurrentUser)}</div>;
  }
}

const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      username
      profile {
        avatar
      }
      followers
      following
      createdAt
      updatedAt
    }
  }
`;
