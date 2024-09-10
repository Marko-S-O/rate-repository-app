import { useNavigate } from 'react-router-native'
import {useSignIn} from '../hooks/useSignIn'
import SignInContainer from './SignInContainer'

const SignIn = () => {

    const navigate = useNavigate()
    const [signIn] = useSignIn()

    const onSubmit = async (values) => {

        const { username, password } = values
  
        try {
            const data = await signIn({ username, password })
            if(data && data.authenticate) {
                console.log('succesful login in JSX')  
                navigate('/')
            } 
        } catch (e) {
            console.log('Sign in failed in JSX: ' + e.message)
        }
        
        console.log(username + ' logged in')
    }
    return(
        <SignInContainer submitFunction={onSubmit} />    )
 
}

export default SignIn