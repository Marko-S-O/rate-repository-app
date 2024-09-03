import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 15, 
    paddingLeft: 10, 
    paddingRight: 10, 
    backgroundColor: theme.colors.darkBackgroud,
    opacity: 0.8,
    flexDirection: 'row',
  },
  containerText: {
    fontFamily: theme.fontFamily,
    color: theme.colors.textOnDarkBackground,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.heading,
  }
  
});

const AppBar = () => {
  return(
    <View style={styles.container}>
        <ScrollView horizontal>
            <AppBarTab tabText={'Repositories'} link={'/'} />
            <AppBarTab tabText={'Sign in'} link={'/login'} />
        </ScrollView>
    </View>
  )
}

export default AppBar;