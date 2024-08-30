import {View, Image, StyleSheet} from 'react-native'
import Text from './Text'

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
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
    },
    bodyText: {
        color: '#000000',
        fontWeight: 'normal',
        fontSize: 15,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,

    },
    highlightText: {
        color: '#FFFFFF',
        backgroundColor:'#007ACC',
        fontWeight: 'normal',
        fontSize: 15,
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

    return( 
        <View style={styles.row}>
            <View style={styles.horizontalComponents}>
                <Image
                    style={styles.smallImage}
                    source={{uri: item.ownerAvatarUrl}} />
                <View style={styles.verticalComponents}>
                    <Text style={styles.boldText}>{item.fullName}</Text>
                    <Text style={styles.bodyText}>{item.description}</Text>
                    <Text style={styles.highlightText}>{item.language}</Text>
                </View>
            </View>
            <View style={[
                styles.horizontalComponents,
                {justifyContent: 'space-between'}]}>    
                <TwoRowText topText={starsText} bottomText='Stars' />
                <TwoRowText topText={forksText} bottomText='Forks' />
                <TwoRowText topText={reviewsText} bottomText='Reviews' />
                <TwoRowText topText={item.ratingAverage} bottomText='Ratings' />
            </View>
        </View>
    )
}

export default ReposityItem