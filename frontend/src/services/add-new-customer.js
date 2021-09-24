import axios from 'axios'
import {backendUrl} from '../constants'

/**
 *
 * @param data
 * @param token
 * @return {Promise<any>}
 */
async function addNewCustomer(data = {}, token) {
    try {
        const customersResponse = await axios.post(`${backendUrl}customers`, data,{
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if (customersResponse.data) {
            return customersResponse.data
        } else {
            throw new Error('Customer save failed')
        }
    } catch (e) {
        console.error(e)
        console.error(e.response || '')
        throw e
    }
}

export default addNewCustomer;
