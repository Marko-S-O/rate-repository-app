import { useMutation } from "@apollo/client"
import { SIGN_IN_MUTATION } from '../graphql/mutations'
import { useApolloClient } from '@apollo/client'
import useAuthStorage from '../hooks/useAuthStorage'

export const useSignIn = () => {

    const [mutate, result] = useMutation(SIGN_IN_MUTATION)
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient()

    const signIn = async ({ username, password }) => {

        try {
            const { data } = await mutate({
                variables: {
                    input: {
                        username, 
                        password
                    }
                }
            })
            console.log('login succeeded in the hook')
            console.log('token: ' + data.authenticate.accessToken)
            await authStorage.setAccessToken(data.authenticate.accessToken)
            apolloClient.resetStore()
            return data
        } catch(exception) {
            console.log('login failed, mutation exception: ' + exception.message)
        }
    }
    return [signIn, result]
}  
