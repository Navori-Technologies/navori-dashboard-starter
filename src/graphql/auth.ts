import { gql } from '@apollo/client';

// These documents match Keystone 6's standard `createAuth({ listKey: 'User', ... })`
// output (see @keystone-6/auth). Adjust the `sessionData` fields below to match
// your actual `User` list once GraphQL Codegen is wired in against your schema.

export const SESSION_QUERY = gql`
  query Session {
    authenticatedItem {
      ... on User {
        id
        name
        email
        role
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
          role
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    endSession
  }
`;

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginMutationData {
  authenticateUserWithPassword:
    | { __typename: 'UserAuthenticationWithPasswordSuccess'; item: SessionUser }
    | { __typename: 'UserAuthenticationWithPasswordFailure'; message: string };
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}
