import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants'

const uri = Constants.expoConfig.extra.apollo_uri

const createApolloClient = () => {
  return new ApolloClient({
    uri: uri,
    cache: new InMemoryCache(),
  })
}

export default createApolloClient;