import { View, StyleSheet, Pressable } from 'react-native'
import { Link } from 'react-router-native'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 0, 
    backgroundColor: '#24292e',
    opacity: 0.8,
    // ...
  },
  containerText: {
    color: '#FFFFFF',
    backgroundColor: '#24292e',
    fontWeight: '700',
    fontSize: 20,
  }
})

const AppBarTab = ({tabText, link}) => {
  console.log('tabText: ' + tabText)
  console.log('link: ' + link)
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