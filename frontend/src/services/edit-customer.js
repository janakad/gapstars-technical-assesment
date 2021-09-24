import axios from 'axios'
import {backendUrl} from '../constants'

/**
 *
 * @param data
 * @param token
 * @return {Promise<any>}
 */
async function editCustomer(data = {}, token) {
    try {
        const customersResponse = await axios.put(`${backendUrl}customers/${data.id}`, data, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if (customersResponse) {
            return customersResponse
        } else {
            throw new Error('Customer update failed')
        }
    } catch (e) {
        console.error(e)
        console.error(e.response || '')
        throw e
    }
}

export default editCustomer;
