// Had to isolate this to another file because of some lingering reference to 
// SignIn component somewhere. Clearing all caches and re-installing the app did not help.
import { TextInput, View, Pressable, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup';
import Text from './Text'
import theme from '../theme'

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


const SignInContainer = ({submitFunction}) => {

    const validationSchema = yup.object().shape({  
        username: yup
            .string()
            .min(3, 'Username must be at least 3 characters')    
            .required('Username is required'),  
        password: yup
            .string()    
            .min(6, 'Password must be at least 6 characters')    
            .required('Password is required'),
    })
    
    const initialValues = {
        username: '',
        password: '',
      }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: submitFunction,
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
            <Pressable style={styles.button} onPress={formik.handleSubmit} testID='submitButton'>
                <Text style={styles.button} >Sign in</Text>
            </Pressable>

        </View>
    )
}

export default SignInContainer