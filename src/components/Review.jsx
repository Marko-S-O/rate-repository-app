import { TextInput, View, Pressable, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { useNavigate } from 'react-router-native'
import Text from './Text'
import theme from '../theme'
import { useCreateReview } from '../hooks/useCreateReview'

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

const Review = () => {

    //const navigate = useNavigate()
    const validationSchema = yup.object().shape({  
        ownerName: yup
            .string()
            .required('Owner name is required'),  
        repositoryName: yup
            .string()    
            .required('Repository name is required'),
        rating: yup
            .number()
            .min(0, 'The score must be between 0 and 100')
            .max(100, 'The score must be between 0 and 100')
    })

    const navigate = useNavigate()
    const [createReview] = useCreateReview()

    const onSubmit = async (values, {setFieldError}) => {

        const { repositoryName, ownerName, rating, text } = values

        //console.log('---- osSubmit() ----')
        //console.log(repositoryName)
        //console.log(ownerName)
        //console.log(rating)
        //console.log(text)

        try {
            const data = await createReview({ 
                repositoryName,
                ownerName,
                rating, 
                text 
            })
            //console.log('---back from mutate---')
            //console.log(data)
            if(data) {
                const link = '/repository/' + String(data.createReview.repository.id)
                console.log('navigating to: ' + link)
                navigate(link)
            }
        } catch(exception) {
            console.log('error creating review: ' + exception.message)
            setFieldError('repositoryName', 'Error creating review: ' + exception.message);
        } 

    }

    const initialValues = {
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: ''
      }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    return(
        <View>
            <TextInput 
                style={formik.touched.ownerName && formik.errors.ownerName ? styles.textInputError : styles.textInput} 
                placeholder='Repository owner name' 
                value={formik.values.ownerName}
                testID='ownerName'
                onChangeText={formik.handleChange('ownerName')}
            />
            {formik.touched.owner && formik.errors.owner && (
                <Text style={{ color: 'red' }}>{formik.errors.ownerName}</Text>
            )}

            <TextInput 
                style={formik.touched.repositoryName && formik.errors.repositoryName ? styles.textInputError : styles.textInput}
                placeholder='Repository name' 
                value={formik.values.repositoryName}
                testID='repositoryName'
                onChangeText={formik.handleChange('repositoryName')}
            />
            {formik.touched.repositoryName && formik.errors.repositoryName && (
                <Text style={{ color: 'red' }}>{formik.errors.repositoryName}</Text>
            )}

            <TextInput 
                style={formik.touched.rating && formik.errors.rating ? styles.textInputError : styles.textInput} 
                placeholder='Rating between 0 and 100' 
                value={formik.values.rating}
                testID='rating'
                onChangeText={formik.handleChange('rating')}
            />
            {formik.touched.rating && formik.errors.rating && (
                <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
            )}

            <TextInput 
                style={formik.touched.text && formik.errors.text ? styles.textInputError : styles.textInput}
                placeholder='Review' 
                value={formik.values.text}
                testID='text'
                onChangeText={formik.handleChange('text')}
            />

            <Pressable style={styles.button} onPress={formik.handleSubmit} testID='submitButton'>
                <Text style={styles.button} >Create a review</Text>
            </Pressable>

        </View>
    )
        
 
}

export default Review