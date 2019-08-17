import Welcome from './static/Welcome.vue';
import About from './static/About.vue';
import Register from './auth/Register.vue';
import Login from './auth/Login.vue';
import App from './App.vue';

const routes = [
    { path: '/', component: Welcome },
    { path: '/about', component: About },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/todo', component: App },
]

export default routes
