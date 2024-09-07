import {useQuery} from '@apollo/client'
import {GET_ME} from '../graphql/queries'

export const useIsAuthenticated = () => {
  const { data, error, loading } = useQuery(GET_ME, {fetchPolicy: 'cache-and-network'})

  if (loading) {
    console.log('useIsAuthenticated() loading...')
    return false
  }

  if (error) {
    console.error('Error fetching user data:', error.message)
    return false
  }

  console.log('authenticated data:')
  console.log(data)
  const authenticated = data && data.me ? true : false
  console.log('authenticated: ' + authenticated)
  return authenticated
}