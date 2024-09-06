import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {

    identifier = ':user:token'

    constructor(namespace = 'auth') {
        this.namespace = namespace
    }

    getKey() {
        const key = this.namespace + this.identifier
        return key
    }

    async getAccessToken() {
        const token = await AsyncStorage.getItem(this.getKey())
        return token
    }

    async setAccessToken(accessToken) {
        // Add the access token to the storage
        console.log('storing new access token: ' + accessToken)
        await AsyncStorage.setItem(this.getKey(), accessToken)
    }

    async removeAccessToken() {
        // Remove the access token from the storage
        await AsyncStorage.setItem(this.getKey(), '')
    }
}

export default AuthStorage