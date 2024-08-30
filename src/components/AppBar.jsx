import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 15, 
    paddingLeft: 10, 
    paddingRight: 10, 
    backgroundColor: '#24292e',
    opacity: 0.8,
    flexDirection: 'row',
  },
  containerText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 20,
  }
  
});

const AppBar = () => {
  return(
    <View style={styles.container}>
        <AppBarTab tabText={'Repositories'} link={'/'} />
        <AppBarTab tabText={'Sign in'} link={'/login'} />
    </View>
  )
}

export default AppBar;