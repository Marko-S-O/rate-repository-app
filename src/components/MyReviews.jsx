
import { View, FlatList, StyleSheet, Pressable, Alert } from 'react-native'
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native'
import { useApolloClient } from '@apollo/client'
import Text from './Text'
import {GET_ME} from '../graphql/queries'
import {DELETE_REVIEW_MUTATION} from '../graphql/mutations'
import theme from '../theme'

const ItemSeparator = () => <View style={styles.separator} />

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

const MyReviewItem = ({item, refetch}) => {

    //console.log("---MyReviewItem---")
    //console.log(item)

    const navigate = useNavigate()

    const [deleteReviewMutation] = useMutation(DELETE_REVIEW_MUTATION)
    const apolloClient = useApolloClient()

    const deleteReview = async (id) => {
        console.log('deleting review: ' + id)
        await deleteReviewMutation({
            variables: {id}
        })
        console.log('deletion ready')
        apolloClient.resetStore()
        refetch()
    }

    const deletePressed = (id) => {
                
        Alert.alert('Delete review', 'Are you sure you want to delete this review', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
                text: 'OK', 
                onPress: () => deleteReview(id)
            }
          ])
    }
    
    return(
        <View style={styles.row} testID='reviewItem'>
            <View style={styles.horizontalComponents}>
                <Text style={styles.ratingNumber}>{item.rating}</Text>
                <View style={styles.verticalComponents}>
                    <Text style={styles.boldText}>{item.repository.fullName}</Text>
                    <Text style={styles.bodyText}>{item.createdAt}</Text>
                    <Text style={styles.bodyText}>{item.text}</Text>
                </View>
            </View>
            <View style={styles.horizontalComponents}>
                <Pressable style={styles.button} onPress={() => navigate(`/repository/${item.repository.id}`)} testID='viewRepositoryButton'>
                    <Text style={styles.button} >View repository</Text>
                </Pressable>
                <Pressable style={[styles.button,{backgroundColor: '#EE5555'}]} onPress={()=> deletePressed(item.id)} testID='viewRepositoryButton'>
                    <Text style={[styles.button,{backgroundColor: '#EE5555'}]} >Delete review</Text>
                </Pressable>
            </View>

        </View>
    )
}

const MyReview = () => {

    const {data, error, loading, refetch} = useQuery(GET_ME, {
        fetchPolicy: 'cache-and-network',
        variables: {includeReviews: true}
    })

    if(error) {
        console.log('Error fetching my reviews: ' + error.message)
        return <View><Text>Error: {error.message}</Text></View>;
    }
    if(loading) {
        console.log('Loading data, please wait...')
        return <View><Text>Loading data...</Text></View>;
    }

    // console.log(data)

    const reviewNodes = data.me.reviews
        ? data.me.reviews.edges.map((edge) => edge.node)
        : []    

    console.log('---rendering review list---')
    console.log(reviewNodes[0])
    console.log(reviewNodes[1])
    console.log(reviewNodes[2])
    return(
        <View style={{ flex: 1 }}>
            <FlatList
                data={reviewNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({item}) => <MyReviewItem item={item} refetch={refetch} />}
                keyExtractor={item => item.id}
            />          
        </View>
    )
}

export default MyReview
