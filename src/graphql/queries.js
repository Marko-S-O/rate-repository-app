import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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
