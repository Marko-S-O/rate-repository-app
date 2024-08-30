import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingBottom: 0, 
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

const AppBarTab = ({tabText}) => {
  return <View>
    <Pressable>
        <Text style={styles.containerText}>{tabText}</Text>
    </Pressable>
  </View>;
};

export default AppBarTab;