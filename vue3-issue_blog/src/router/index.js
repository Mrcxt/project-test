import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
    path: '/',
    component: () =>
        import ('@/views/Layout/index.vue'),
    children: [{
        path: "/",
        // path: "article",
        name: "详情页",
        component: () =>
            import ('@/views/Article/index.vue')
    }, {
        path: '/timeline',
        name: '时间线',
        component: () =>
            import ('@/views/TimeLine/index.vue')
    }, {
        path: '/about',
        name: '关于',
        component: () =>
            import ('@/views/About/index.vue')
    }]
}, {
    path: '/home',
    name: '首页',
    component: () =>
        import ('@/views/Home/index.vue')
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router