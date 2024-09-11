import { View, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme'

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


const ReviewItem = ({item}) => {

    return(
        <View style={styles.row} testID='reviewItem'>
            <View style={styles.horizontalComponents}>
                <Text style={styles.ratingNumber}>{item.rating}</Text>
                <View style={styles.verticalComponents}>
                    <Text style={styles.boldText}>{item.user.username}</Text>
                    <Text style={styles.bodyText}>{item.cratedAt}</Text>
                    <Text style={styles.bodyText}>{item.text}</Text>
                </View>
            </View>
        </View>
    )
}

export default ReviewItem