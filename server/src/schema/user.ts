import { buildSchema } from "graphql";

export const userGQLSchema = buildSchema(`
  type User {
    id:String!
    username: String!
    email: String!
    password: String!
  }

  type Query {
    users:userInfoResponse!
    user(id:String!):User!
  }

  type userInfoResponse {
    success: Boolean!
    total:Int!
    users:[User!]!
  }

  type Mutataion {
    regUser(username: String!, email: String!, password: String!): User!
    loginUser(email: String!, password: String!): User!
    updateUser(id: String!, username: String, email: String, password: String): User!
    deleteUser(id: String!): deleteResponse!
  }

  type deleteResponse {
    success: Boolean!
    message: String!
    id: String!  
  }
`);
