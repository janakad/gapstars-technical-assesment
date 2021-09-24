import axios from 'axios'
import {backendUrl} from '../constants'

/**
 *
 * @param email
 * @param password
 * @return {Promise<*>}
 */
async function login(email, password) {
    try {
        const loginResponse = await axios.post(`${backendUrl}login`, {
            email: email,
            password: password,
            device_name: new Date()
        })
        if (loginResponse.data) {
            return loginResponse.data
        } else {
            throw new Error('Login failed')
        }
    } catch (e) {
        console.error(e)
        console.error(e.response || '')
        throw e
    }
}

export default login;
