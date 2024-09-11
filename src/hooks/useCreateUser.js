import { useMutation } from "@apollo/client"
import { CREATE_USER_MUTATION } from '../graphql/mutations'
import { useApolloClient } from '@apollo/client'

export const useCreateUser = () => {

    const [mutate, result] = useMutation(CREATE_USER_MUTATION)
    const apolloClient = useApolloClient()

    const createUser = async ({ username, password }) => {

        try {
            const { data } = await mutate({
                variables: {
                    user: {
                        username, 
                        password
                    }
                }
            })
            console.log('created user succesfully')
            console.log(data)
            apolloClient.resetStore()
            return data
        } catch(exception) {
            console.log('Create user failed: ' + exception.message)
        }
    }
    return [createUser, result]
}  
