import axios from 'axios'
import {backendUrl} from '../constants'

/**
 *
 * @param id
 * @param token
 * @return {Promise<any>}
 */
async function customer(id = 0, token) {
    try {
        const customersResponse = await axios.get(`${backendUrl}customers/${id}`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if (customersResponse.data) {
            return customersResponse.data
        } else {
            throw new Error('Get customers failed')
        }
    } catch (e) {
        console.error(e)
        console.error(e.response || '')
        throw e
    }
}

export default customer;
