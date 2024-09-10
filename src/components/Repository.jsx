import { View, Pressable, StyleSheet } from 'react-native'
import { useParams } from 'react-router-native'
import { useQuery } from '@apollo/client';
import * as Linking from 'expo-linking';

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
    }
})

const Reposity = () => {


    const openUrl = (link) => {
        //console.log('---- opening URL: ' + link)
        Linking.openURL(link)
    }

    const { id } = useParams()

    //console.log('---- fetching repository -----')
    //console.log('id: ' + id)

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
    //console.log(data)

    return(
        <View>
        <ReposityItem item={data.repository} />

        <Pressable style={styles.button} onPress={() => openUrl(data.repository.url)} testID='githHubtButton'>
            <Text style={styles.button} >Open in GitHub</Text>
        </Pressable>
        </View>

    )
}

export default Reposity