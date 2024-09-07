import { View, StyleSheet, Pressable } from 'react-native'
import { Link } from 'react-router-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 0, 
    backgroundColor: theme.colors.darkBackground,
    opacity: 0.8,
    // ...
  },
  containerText: {
    fontFamily: theme.fontFamily,
    color: theme.colors.textOnDarkBackground,
    backgroundColor: theme.colors.darkBackground,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.heading,
  }
})

const AppBarTab = ({tabText, link}) => {
  //console.log('tabText: ' + tabText)
  //console.log('link: ' + link)
  return (
    <View style={styles.container}>
        <Pressable>
            <Link to={link} >
                <Text style={styles.containerText}>{tabText}</Text>
            </Link>
        </Pressable>
    </View>
  )
}

export default AppBarTab;