// Had to isolate this to another file because of some lingering reference to 
// SignIn component somewhere. Clearing all caches and re-installing the app did not help.
import { TextInput, View, Pressable, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup';
import Text from './Text'
import theme from '../theme'
import { useNavigate } from 'react-router-native'
import {useCreateUser} from '../hooks/useCreateUser'
import {useSignIn} from '../hooks/useSignIn'

const styles = StyleSheet.create({

    textInput: {
        fontFamily: theme.fontFamily,
        color: theme.colors.textPrimary,
        fontWeight: theme.fontWeights.normal,
        fontSize: theme.fontSizes.input,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,    
        borderWidth: 1,         
        borderColor: '#cccccc', 
        borderRadius: 5,        
        marginTop: 10,       
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,       
    }, 
    textInputError: {
        color: theme.colors.error,
        fontWeight: theme.fontWeights.normal,
        fontSize: theme.fontSizes.input,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,    
        borderWidth: 1,         
        borderColor: '#d73a4a', 
        borderRadius: 5,        
        marginTop: 10,       
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,       
    }, 
    button: {
        color: theme.colors.buttonText,
        backgroundColor:theme.colors.button,
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.input,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 2,
        marginTop: 5,       
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,  
        alignItems: 'center'
    }
})


const SignUp = () => {

    const validationSchema = yup.object().shape({  
        username: yup
            .string()
            .min(5, 'Username must be 5-30 characters long')    
            .max(30, 'Username must be 5-30 characters long')    
            .required('Username is required'),  
        password: yup
            .string()    
            .min(5, 'Password must be 5-30 characters long')    
            .max(30, 'Password must be 5-30 characters long')    
            .required('Password is required'),
        passwordConfirmation: yup
            .string()    
            .oneOf([yup.ref('password'), null], 'Confirm password must match passowrd field') 
            .required('Password confirmation is required'),
    })
    
    const navigate = useNavigate()
    const [createUser] = useCreateUser()
    const [signIn] = useSignIn()

    const onSubmit = async (values) => {

        const { username, password } = values
  
        try {
            let data = await createUser({ username, password })
            if(data) {
                console.log('Signed up succesfully')  
                navigate('/')
            } 
            data = await signIn({ username, password })
            
            if(data && data.authenticate) {
                console.log('succesful automatic login after creating user')  
                navigate('/')
            } 
        } catch (e) {
            console.log('Sign up failed in JSX: ' + e.message)
        }
        
        console.log(username + ' logged in')
    }

    const initialValues = {
        username: '',
        password: '',
        passwordConfirmation: ''
      }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    return (
        <View>
            <TextInput 
                style={formik.touched.username && formik.errors.username ? styles.textInputError : styles.textInput}
                textContentType='username'   
                placeholder='username' 
                value={formik.values.username}
                testID='username'
                onChangeText={formik.handleChange('username')}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
            )}

            <TextInput 
                style={formik.touched.password && formik.errors.password ? styles.textInputError : styles.textInput}
                textContentType='password'
                placeholder='password' 
                secureTextEntry={true}
                value={formik.values.password}
                testID='password'
                onChangeText={formik.handleChange('password')}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
            )}

            <TextInput 
                style={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? styles.textInputError : styles.textInput}
                textContentType='password'
                placeholder='password confirmation' 
                secureTextEntry={true}
                value={formik.values.passwordConfirmation}
                testID='password'
                onChangeText={formik.handleChange('passwordConfirmation')}
            />
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                <Text style={{ color: 'red' }}>{formik.errors.passwordConfirmation}</Text>
            )}
            <Pressable style={styles.button} onPress={formik.handleSubmit} testID='submitButton'>
                <Text style={styles.button} >Sign up</Text>
            </Pressable>

        </View>
    )
}

export default SignUp