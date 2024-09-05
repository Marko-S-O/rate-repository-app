import { FlatList, View, StyleSheet, Text } from 'react-native'
//import { useState } from 'react';
import { useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem'
import {GET_REPOSITORIES} from '../graphql/queries'

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#EEEEEE'
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {

  //const [repositories, setRepositories] = useState();

  /*
  useEffect(() => {
    fetchRepositories()
  }, [])
  */

  const {data, error, loading} = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network'})

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
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <RepositoryItem item={item} />}
      keyExtractor={item => item.id}
    />
  )
}

export default RepositoryList;
