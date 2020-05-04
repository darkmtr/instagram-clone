import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    hello: String!
    test: String!
  }

  type Mutation {
    createUser(username: String!, password: String!, slug: String!): Auth!
  }

  type Profile {
    id: ID!
    bio: String
    website: String
    avatar: String!
    createdAt: String!
    updatedAt: String!
    user: User!
    slug: Slug!
  }

  type User {
    id: ID!
    username: String!
  }

  type Slug {
    id: ID!
    slug: String!
    userId: ID!
  }

  type Auth {
    token: String!
  }
`;
