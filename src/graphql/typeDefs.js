import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    hello: String!
    test: String!
    getCurrentUser: User!
  }

  type Mutation {
    createUser(username: String!, password: String!, slug: String!): Auth!
    login(username: String!, password: String!): Auth!
    createPost(description: String, image: String!, tags: [String]): String!
  }

  type User {
    id: ID!
    username: String!
    profile: Profile!
    slug: Slug!
    createdAt: String!
    updatedAt: String!
  }

  type Profile {
    id: ID!
    bio: String
    website: String
    avatar: String
    createdAt: String!
    updatedAt: String!
  }

  type Slug {
    id: ID!
    slug: String!
    createdAt: String!
    updatedAt: String!
  }

  type Auth {
    token: String!
  }
`;
