import { TextInput, View, Pressable, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import Text from './Text'

const styles = StyleSheet.create({

    textInput: {
        color: '#000000',
        fontWeight: 'normal',
        fontSize: 20,
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
    button: {
        color: '#FFFFFF',
        backgroundColor:'#007ACC',
        fontWeight: 'bold',
        fontSize: 20,
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

const initialValues = {
    username: '',
    password: '',
  };

const SignIn = ({onSubmit}) => {


    const formik = useFormik({
        initialValues,
        onSubmit,
    })

    return (
        <View>
            <TextInput style={styles.textInput}
                textContentType='username'   
                placeholder='username' 
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
            />
            <TextInput style={styles.textInput}
                textContentType='password'
                placeholder='password' 
                secureTextEntry={true}
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
            />
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.button}>Sign in</Text>
            </Pressable>

        </View>
    )
}

export default SignIn