import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
    plugins: [createPersistedState()],
    state: {
        token: '',
        alert: {
            alertType: null,
            alertTitle: null,
            alertMessage: null
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setAlert(state, alert) {
            state.alert = alert
        }
    },
    actions: {
        setToken({commit}, token) {
            commit('setToken', token)
        },
        setAlert({commit}, alert) {
            commit('setAlert', alert)
        }
    },
    modules: {}
})
