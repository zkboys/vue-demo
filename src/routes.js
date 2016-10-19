import Hello from './components/hello';
import Login from './components/login';
import Home from './components/home';

export default [
    {path: '/', component: Home},
    {path: '/hello', component: Hello},
    {path: '/login', component: Login},
];
