import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import store from '../store/index'
import AddNewCustomer from "../views/AddNewCustomer";
import EditCustomer from "../views/EditCustomer";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {auth: true}
    },
    {
        path: '/customers/:id',
        name: 'Edit Customer',
        component: EditCustomer,
        meta: {auth: true}
    },
    {
        path: '/add-new-customer',
        name: 'Add New Customer',
        component: AddNewCustomer,
        meta: {auth: true}
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.state.token) {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})

export default router
