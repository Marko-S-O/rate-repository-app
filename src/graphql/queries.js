import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
      edges {
        node {
          description
          forksCount
          fullName
          id
          language
          name
          ownerName
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`
export const GET_ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating
            text
            createdAt
            repository {
              id
              name
              fullName
            }
          }
        }
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      id
      ownerName
      name
      fullName
      ratingAverage
      reviewCount
      stargazersCount
      watchersCount
      forksCount
      openIssuesCount
      url
      ownerAvatarUrl
      description
      language
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`
