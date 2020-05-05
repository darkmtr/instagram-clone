import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    hello: String!
    test: String!
    getCurrentUser: User!
    getPostsByUser(userId: Int!): [Post!]!
  }

  type Mutation {
    createUser(username: String!, password: String!, slug: String!): Auth!
    login(username: String!, password: String!): Auth!
    createPost(description: String, image: String!, tags: [String]): String!
    updatePost(postId: Int!, description: String, tags: [String]): String!
    deletePost(postId: Int!): Status!
  }

  type User {
    id: ID!
    username: String!
    profile: Profile!
    slug: Slug!
    createdAt: String!
    updatedAt: String!
  }

  type Status {
    ok: Boolean!
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

  type Post {
    id: ID!
    tags: [String]
    description: String
    image: String!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`;
