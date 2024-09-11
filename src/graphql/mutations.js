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

export const CREATE_REVIEW_MUTATION = gql`
  mutation Mutation($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      repository {
        id
      }
    }
  }
`

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
    }
  }
`

export const DELETE_REVIEW_MUTATION = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`   