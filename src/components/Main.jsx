import Constants from 'expo-constants'
import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import SignIn from './SignIn'
import Logout from './Logout'
import Repository from './Repository'
import Review from './Review'
import SignUp from './SignUp'

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
})

const Main = () => {
  console.log('Main starting')
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>        
        <Route path="/" element={<RepositoryList />} />        
        <Route path="/login" element={<SignIn />} />  
        <Route path="/logout" element={<Logout />} />  
        <Route path="/repository/:id" element={<Repository />} />     
        <Route path="/review" element={<Review />} />     
        <Route path="/signup" element={<SignUp />} />     
        <Route path="*" element={<Navigate to="/" replace />} />      
      </Routes>
    </View>
  )
}

export default Main;