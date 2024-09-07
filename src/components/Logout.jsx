import { View, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme'
import useAuthStorage from '../hooks/useAuthStorage'
import { useApolloClient } from '@apollo/client'

const styles = StyleSheet.create({
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


const Logout = () => {

    const apolloClient = useApolloClient()
    const authStorage = useAuthStorage()

    authStorage.removeAccessToken()
    apolloClient.resetStore()

    return(
        <View>
            <Text style={styles.boldText}>
                Logged out succesfully
            </Text>
        </View>
    )
}

export default Logout

