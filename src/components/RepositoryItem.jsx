import {View, Image, StyleSheet} from 'react-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
    smallImage: {
        width: 60,
        height: 60,
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

})

const TwoRowText = ({topText, bottomText}) => {
    return(
        <View style={[
            styles.verticalComponents, {
                justifyContent: 'center', 
                alignItems: 'center'
            }
            ]}>
            <Text style={styles.boldText}>{topText}</Text>
            <Text style={styles.bodyText}>{bottomText}</Text>
        </View>
    )
}

const ReposityItem = ({item}) => {

    const starsText = item.stargazersCount <1000 ? item.stargazersCount : Math.round(item.stargazersCount/100)/10 + 'k'
    const forksText = item.forksCount <1000 ? item.forksCount : Math.round(item.forksCount/100)/10 + 'k'
    const reviewsText = item.reviewCount <1000 ? item.reviewCount : Math.round(item.reviewCount/100)/10 + 'k'
    const ratingAverageText = '' + item.ratingAverage //needed to make Jest tests work

    return( 
        <View style={styles.row} testID='repositoryItem'>
            <View style={styles.horizontalComponents}>
                <Image
                    style={styles.smallImage}
                    source={{uri: item.ownerAvatarUrl}} />
                <View style={styles.verticalComponents}>
                    <Text style={styles.boldText} id='fullName'>{item.fullName}</Text>
                    <Text style={styles.bodyText} id='description'>{item.description}</Text>
                    <Text style={styles.highlightText} id='language'>{item.language}</Text>
                </View>
            </View>
            <View style={[
                styles.horizontalComponents,
                {justifyContent: 'space-between'}]}>    
                <TwoRowText topText={starsText} bottomText='Stars' />
                <TwoRowText topText={forksText} bottomText='Forks' />
                <TwoRowText topText={reviewsText} bottomText='Reviews' />
                <TwoRowText topText={ratingAverageText} bottomText='Ratings' />
            </View>
        </View>
    )
}

export default ReposityItem