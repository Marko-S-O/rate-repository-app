import { render, screen, fireEvent, waitFor } from '@testing-library/react-native'
import SignInContainer from '../../components/SignInContainer'


describe('SignInContainer', () => {
    describe('SignInContainer', () => {
      it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {

        const mockHandler = jest.fn( () => {
            console.log('mockHandler')
        })

        render(<SignInContainer submitFunction={mockHandler} />)

        const usernameField = screen.getByTestId('username')
        const passwordField = screen.getByTestId('password')
        fireEvent.changeText(usernameField, 'username') // test user data in DB
        fireEvent.changeText(passwordField, 'password')

        const submitButton = screen.getByTestId('submitButton')
        fireEvent.press(submitButton)

        await waitFor(() => {
            expect(mockHandler).toHaveBeenCalledTimes(1)
            expect(mockHandler.mock.calls[0][0]).toEqual({
                username: 'username',
                password: 'password',
            })
        })
      })
    })
  })