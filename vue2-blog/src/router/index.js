/*
 * @LastEditTime: 2020-04-17 17:33:48
 * @Description: 
 * @Date: 2020-04-16 15:30:37
 * @Author: @虾哔哔
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: () =>
            import ('@/views/Layout/Layout.vue'),
        children: [{
            path: '/',
            name: '首页',
            component: () =>
                import ('@/views/Home/Home.vue'),
            meta: {
                navIsShow: true
            }
        }, {
            path: '/timeline',
            name: '时间线',
            component: () =>
                import ('@/views/TimeLine/TimeLine.vue'),
            meta: {
                navIsShow: true
            }
        }, {
            path: '/article',
            name: '详情页',
            component: () =>
                import ('@/views/Article/Article.vue'),
            meta: {
                navIsShow: false
            }
        }, {
            path: '/about',
            name: '关于',
            component: () =>
                import ('@/views/About/About.vue'),
            meta: {
                navIsShow: true
            }
        }, ]
    },

]

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        console.log(to.hash)

        if (to.hash) {
            console.log(to.hash)
            return {
                selector: to.hash
            }
        }
    }
})

export default router