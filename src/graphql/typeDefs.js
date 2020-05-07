import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    hello: String!
    getCurrentUser: User!
    getPostsByUser(userId: Int!): [Post!]!
    getPostById(postId: Int!): Post!
    getCommentsByPost(postId: Int!, limit: Int, page: Int): [Comment!]!
  }

  type Mutation {
    createUser(username: String!, password: String!): Auth!
    login(username: String!, password: String!): Auth!
    createPost(description: String, image: String!, tags: [String]): Post!
    updatePost(postId: Int!, description: String, tags: [String]): Post!
    deletePost(postId: Int!): Status!
    createComment(postId: Int!, text: String!): Comment!
    deleteComment(commentId: Int!): Status!
    likePost(postId: Int!): Status!
    followUser(userId: Int!): Status!
  }

  type User {
    id: ID!
    username: String!
    profile: Profile!
    followers: Int!
    following: Int!
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

  type Auth {
    token: String!
  }

  type Post {
    id: ID!
    tags: [String]
    description: String
    image: String!
    postedBy: User!
    comments: [Comment!]!
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    id: ID!
    text: String!
    createdAt: String!
    updatedAt: String!
    author: User!
  }
`;
