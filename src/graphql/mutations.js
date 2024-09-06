import { gql } from '@apollo/client'

export const SIGN_IN_MUTATION = gql`
  mutation authenticate($input: AuthenticateInput!) {
    authenticate(credentials: $input) {
      accessToken
      user {
        id
        username
      }
    }
  }
`