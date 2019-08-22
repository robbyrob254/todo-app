import Welcome from './view/Welcome.vue';
import App from './view/App.vue';
import Register from './auth/Register.vue';
import Login from './auth/Login.vue';
import Logout from './auth/Logout.vue';

const routes = [
    {
        path: '/',
        component: Welcome
    },
    {
        path: '/register',
        component: Register,
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/logout',
        component: Logout
    },
    {
        path: '/tasks',
        component: App,
        meta: {
            requiresAuth: true,
        }
    },
]

export default routes
