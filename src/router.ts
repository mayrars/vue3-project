import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Country from "./views/Country.vue";
const routes = [
    { path: "/", component: Home, name:'home' },
    { path: "/country/:name", component: Country, name:'country'}
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router;