import { View, Pressable, StyleSheet, FlatList } from 'react-native'
import { useParams } from 'react-router-native'
import { useQuery } from '@apollo/client';
import * as Linking from 'expo-linking';
import ReviewItem from "./ReviewItem"
import ReposityItem from "./RepositoryItem"
import Text from './Text'
import theme from '../theme'
import {GET_REPOSITORY} from '../graphql/queries'

const styles = StyleSheet.create({
       button: {
        color: theme.colors.buttonText,
        backgroundColor:theme.colors.button,
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.input,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 2,
        marginTop: 5,       
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,  
        alignItems: 'center'
    },
    separator: {
        height: 10,
        backgroundColor: '#EEEEEE'
    },
    row: {
        flexDirection: 'column',
        padding: 10,
    },
    horizontalComponents: {
        flexDirection: 'row',

    },
    verticalComponents: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5
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
        alignSelf: 'flex-start'
    },
    ratingNumber: {
        width: 40,               
        height: 40,
        lineHeight: 40,
        borderWidth: 3,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20, 
        borderColor: theme.colors.button,
        color: theme.colors.button,
        fontWeight: theme.fonts.bold,
        textAlign: 'center'
      }
})

const ItemSeparator = () => <View style={styles.separator} />



const RepositoryContainer = ({repository}) => {

    const openUrl = (link) => {
        //console.log('---- opening URL: ' + link)
        Linking.openURL(link)
    }

    //console.log('---- rendering repository ----')
    //console.log(repository.ownerName)
    //console.log(repository.fullName)

    return(
        <View>
            <ReposityItem item={repository} />

            <Pressable style={styles.button} onPress={() => openUrl(repository.url)} testID='githHubtButton'>
                <Text style={styles.button} >Open in GitHub</Text>
            </Pressable>
        </View>
    )
}

const Reposity = () => {

    const { id } = useParams()

    const {data, error, loading} = useQuery(
        GET_REPOSITORY, 
        {
            fetchPolicy: 'cache-and-network',
            variables: {id}
        }
    )

    if(error) {
        console.log('error fetching repository ' + id + ': ' + error.message)
        return(
            <Text>error fetching repository {id}: {error.message}</Text>
        )
    }

    if(loading) {
        return(
            <Text>Loading repository...</Text>
        )
    }

    //console.log('---- rendering repository ----')
    //console.log(data.repository)

    const reviewNodes = data
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : []

    return(

        <View style={{ flex: 1 }}>
            <FlatList
                ListHeaderComponent={() => <RepositoryContainer repository={data.repository} />}
                data={reviewNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({item}) => <ReviewItem item={item} />}
                keyExtractor={item => item.id}
            />          
        </View>
    )
}

export default Reposity