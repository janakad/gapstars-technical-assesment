import axios from 'axios'
import {backendUrl} from '../constants'

/**
 *
 * @param data
 * @param token
 * @return {Promise<any>}
 */
async function deleteCustomer(id,token) {
    try {
        const customersResponse = await axios.delete(`${backendUrl}customers/${id}`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if (customersResponse) {
            return customersResponse
        } else {
            throw new Error('Customer delete failed')
        }
    } catch (e) {
        console.error(e)
        console.error(e.response || '')
        throw e
    }
}

export default deleteCustomer;
