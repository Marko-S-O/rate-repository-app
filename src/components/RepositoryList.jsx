import { FlatList, View, StyleSheet } from 'react-native'
import Text from './Text';
import { Link } from 'react-router-native'
//import { useState } from 'react';
import { useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem'
import {GET_REPOSITORIES} from '../graphql/queries'
import {useIsAuthenticated} from "../hooks/useAuthenticated"
import theme from '../theme'

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#EEEEEE'
  },
  boldText: {
    fontFamily: theme.fontFamily,
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.heading,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  bodyText: {
      fontFamily: theme.fontFamily,
      color: theme.colors.textPrimary,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.body,
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 5,
      paddingBottom: 5,

  },
  highlightText: {
      fontFamily: theme.fontFamily,
      color: theme.colors.textOnDarkBackground,
      backgroundColor:theme.colors.button,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.body,
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 2,
      paddingBottom: 4,
      borderRadius: 5,
      alignSelf: 'flex-start',
  }
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositoryNodes }) => {

    return(
      <FlatList 
        data={repositoryNodes} 
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => <RepositoryItem item={item} />}
        keyExtractor={item => item.id}
      />
    )

}

const RepositoryList = () => {

  const {data, error, loading} = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network'})
  const authenticated = useIsAuthenticated()

  if(error) {
    console.log('Error fetching server data: ' + error.message)
    return <View><Text>Error: {error.message}</Text></View>;
  }
  if(loading) {
    console.log('Loading data, please wait...')
    return <View><Text>Loading data...</Text></View>;
  }

  const repositoryNodes = data ?
     data.repositories.edges.map(edge => edge.node)
    : []

  //console.log('RepositoryList starting')
  //console.log(repositoryNodes)

  return (
    <View>
      {authenticated ?
        <RepositoryListContainer repositoryNodes={repositoryNodes} />
        :
        <Link to="/login" >
          <Text style={styles.boldText}>
            Sing in to view the repositories
          </Text>
        </Link>  
      }
    </View>
  )
}

export default RepositoryList;
