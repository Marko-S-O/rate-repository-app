import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingBottom: 15, 
    backgroundColor: '#24292e',
    opacity: 0.8,
    // ...
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
        <AppBarTab tabText={'Repositories'} />
    </View>
  )
}

export default AppBar;