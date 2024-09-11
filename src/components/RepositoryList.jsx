import { FlatList, View, StyleSheet } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-native'
//import { useState, useEffect } from 'react'
import {Picker} from '@react-native-picker/picker'
import { Searchbar } from 'react-native-paper'
import { useQuery } from '@apollo/client'
import { useDebounce } from 'use-debounce'
import RepositoryItem from './RepositoryItem'
import {GET_REPOSITORIES} from '../graphql/queries'
import {useIsAuthenticated} from "../hooks/useAuthenticated"
import theme from '../theme'
import Text from './Text'

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
  },
  orderMenu: {
    paddingTop: 10,
    paddingBottom: 10, 
    paddingLeft: 10, 
    paddingRight: 10, 
    backgroundColor: '#DDDDDD',
    opacity: 0.8,
  },
  orderMenuPicker: {
    fontFamily: theme.fontFamily,
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.normal,
    fontSize: theme.fontSizes.heading,
    paddingTop: 5,
    paddingBottom: 5, 
    paddingLeft: 10, 
    paddingRight: 10
  },
  searchBar: {
    fontFamily: theme.fontFamily,
    color: theme.colors.textPrimary,
    backgroundColor: '#FFFFFF',
    fontWeight: theme.fontWeights.normal,
    fontSize: theme.fontSizes.bodyText,
    paddingLeft: 10, 
    paddingRight: 10,
    marginBottom: 5,
    borderRadius: 3
  }
})

const ItemSeparator = () => <View style={styles.separator} />

const SORT_TERM_LATEST_REPOSITORIES = 'Latest repositories'
const SORT_TERM_HIGHERS_RATED = 'Highest rated'
const SORT_TERM_LOWEST_RATED = 'Lowest rated'

const OrderAndSortMenu = ({changeSortTerm, sortTerm, changeSearchTerm, searchTerm}) => {

  const sortTermValue = sortTerm? sortTerm : SORT_TERM_LATEST_REPOSITORIES
  const searchBarRef = useRef()
  //const [searchFocus, setSearchFocus] = useState(false)

  // without maintaing the focus information in state, we would either lose
  // focus from the searchbar on each render or require two clicks for menu items in mobile devices
  // => does not work, for some weird reason searchFocus gets set to inital state with every render
  // clicking another component twice to make it work seems to be the least bad solution here
  //useEffect(() => {
  //  console.log(searchFocus)
  //  if(searchFocus && searchBarRef.current){
  //    searchBarRef.current.focus()
  //  }
  //}, [searchFocus])

  useEffect(() => {
    if(searchBarRef.current){
        searchBarRef.current.focus()
    }
  })

  return(
    <View style={styles.orderMenu}>
      <Searchbar 
        ref={searchBarRef}
        style={styles.searchBar}
        placeholder="Enter search term here"
        onChangeText={changeSearchTerm}
        value={searchTerm}
      />
      <Picker
        style={styles.orderMenuPicker}
        selectedValue={sortTermValue}
        onValueChange={(itemValue, itemIndex) => {
            console.log(itemValue)
            console.log(itemIndex)
            changeSortTerm(itemIndex, itemValue)
          }
        }>
        <Picker.Item label={SORT_TERM_LATEST_REPOSITORIES} value={SORT_TERM_LATEST_REPOSITORIES} style={styles.orderMenuPicker} />
        <Picker.Item label={SORT_TERM_HIGHERS_RATED} value={SORT_TERM_HIGHERS_RATED} style={styles.orderMenuPicker} />
        <Picker.Item label={SORT_TERM_LOWEST_RATED} value={SORT_TERM_LOWEST_RATED} style={styles.orderMenuPicker} />
      </Picker>
    </View>
  )
}

export const RepositoryListContainer = ({ repositories, changeSortTerm, sortTerm, changeSearchTerm, searchTerm }) => {
  
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <RepositoryItem item={item} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={<OrderAndSortMenu 
        changeSortTerm={changeSortTerm} 
        sortTerm={sortTerm}
        changeSearchTerm={changeSearchTerm} 
        searchTerm={searchTerm}
      />}
    />
  )
}

const RepositoryList = () => {

  const changeSortTerm = (sortTermIndex, sortTermValue) => {
    if(sortTermIndex == 1) {
      setOrderBy('RATING_AVERAGE')
      setOrderDirection('DESC')
    } else if (sortTermIndex == 2) {
      setOrderBy('RATING_AVERAGE')
      setOrderDirection('ASC')
    } else {
      setOrderBy('CREATED_AT')
      setOrderDirection('DESC')
    }
    setSortTerm(sortTermValue)
  }

  const changeSearchTerm = (searchTermValue) => {
    setSearchTerm(searchTermValue)
    console.log(searchTermValue)
  }

  const [orderDirection, setOrderDirection] = useState()
  const [orderBy, setOrderBy] = useState()
  const [sortTerm, setSortTerm] = useState(SORT_TERM_LATEST_REPOSITORIES)
  const [searchTerm, setSearchTerm] = useState('')

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)

  const {data, error, loading} = useQuery(GET_REPOSITORIES, {  
    variables: {
      orderDirection, 
      orderBy,        
      searchKeyword: debouncedSearchTerm
    },
    fetchPolicy: 'cache-and-network'
  })
  const authenticated = useIsAuthenticated()

   
  if(error) {
    console.log('Error fetching server data: ' + error.message)
    return <View><Text>Error: {error.message}</Text></View>;
  }
  if(loading) {
    console.log('Loading data, please wait...')
    return <View><Text>Loading data...</Text></View>;
  }

  return (
    <View>
      {authenticated ?
        <RepositoryListContainer 
          repositories={data.repositories} 
          changeSortTerm={changeSortTerm} 
          sortTerm={sortTerm}
          changeSearchTerm={changeSearchTerm} 
          searchTerm={searchTerm}
        />
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
