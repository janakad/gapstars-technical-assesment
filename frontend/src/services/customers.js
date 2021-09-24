import axios from 'axios'
import {backendUrl} from '../constants'

/**
 *
 * @param query
 * @param token
 * @return {Promise<any>}
 */
async function customers(query = {}, token) {
    try {
        let queryString = `?`

        if (query.firstName !== '' && query.firstName !== null) {
            queryString += `&first_name=${query.firstName}`
        }

        if (query.lastName !== '' && query.lastName !== null) {
            queryString += `&last_name=${query.lastName}`
        }

        if (query.email !== '' && query.email !== null) {
            queryString += `&email=${query.email}`
        }

        if (query.page !== '' && query.page !== null) {
            queryString += `&page=${query.page}`
        }

        const customersResponse = await axios.get(`${backendUrl}customers${queryString}`, {
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

export default customers;
