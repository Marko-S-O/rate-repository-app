import { useMutation } from "@apollo/client"
import { SIGN_IN_MUTATION } from '../graphql/mutations'

export const useSignIn = () => {

    const [mutate, result] = useMutation(SIGN_IN_MUTATION)

    const signIn = async ({ username, password }) => {

        try {
            const response = await mutate({
                variables: {
                    input: {
                        username, 
                        password
                    }
                }
            })
            console.log('login succeeded in the hook')
            //console.log(response)
            return response.data
        } catch(exception) {
            console.log('login failed, mutation exception: ' + exception.message)
        }
    }
    return [signIn, result]
}  
