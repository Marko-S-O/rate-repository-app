import { useMutation } from "@apollo/client"
import { CREATE_REVIEW_MUTATION } from '../graphql/mutations'
import { useApolloClient } from '@apollo/client'

export const useCreateReview = () => {

    const [mutate, result] = useMutation(CREATE_REVIEW_MUTATION)
    const apolloClient = useApolloClient()

    const createReview = async ({ repositoryName, ownerName, rating, text }) => {

        console.log('---- createReview() ----')
        console.log(repositoryName)
        console.log(ownerName)
        console.log(rating)
        console.log(text)


        const { data } = await mutate({
            variables: {
                review: {
                    repositoryName, 
                    ownerName,
                    rating: parseInt(rating, 10),
                    text                        
                }
            }
        })
        console.log('Succesfully stored review')
        console.log(data)
        apolloClient.resetStore()
        console.log(data)

        return data
    }
    return [createReview, result]
}  
