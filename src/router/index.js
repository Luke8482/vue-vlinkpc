import Vue from 'vue'
import VueRouter from 'vue-router'

//1、引入一级组件
import DashBoard from './../views/home/dashboard/DashBoard'
import Home from './../views/home/home/Home'
import Progress from './../views/home/progress/Progress'
import Learn from './../views/home/learn/Learn'
import Login from './../views/home/login/Login'



Vue.use(VueRouter);

const routes = [
    {path: '/', redirect: '/dashboard'},
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashBoard,
        children: [
            {path: '/dashboard', redirect: '/dashboard/home'},
            {path: 'home', name:'home', component: Home},
            {path: 'progress', name:'progress', component: Progress},
            {path: 'learn/:lesson_id', name:'learn', component: Learn},

        ],

    },

    {path: '/login', name: 'login', component: Login, },


    //后台路由
    {
        path: '/admin',
        redirect: '/admin/dashboard'
    },
    {
        path: '/admin',
        component: () => import(/* webpackChunkName: "home" */ '../views/admin/common/Home.vue'),
        meta: { title: '自述文件' },
        children: [
            {
                path: '/admin/dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/page/Dashboard.vue'),
                meta: { title: '系统首页' }
            },
            {
                path: '/admin/course',
                component: () => import(/* webpackChunkName: "table" */ '../views/admin/page/course/CourseList.vue'),
                meta: { title: '课程列表' }
            },

            {
                path: '/admin/createcourse',

                component: () => import(/* webpackChunkName: "table" */ '../views/admin/page/course/CreateCourse.vue'),
                meta: { title: '新增课程' }
            },



            {
                path: '/admin/createchapter/:course_id',

                component: () => import(/* webpackChunkName: "table" */ '../views/admin/page/course/createChapter/CreateChapter.vue'),
                meta: { title: '新增章节' }
            },

            {
                path: '/admin/createsection/:lesson_id',

                component: () => import(/* webpackChunkName: "table" */ '../views/admin/page/course/createSection/CreateSection.vue'),
                meta: { title: '新增section' }
            },

            {
                path: '/admin/:id',

                component: () => import(/* webpackChunkName: "table" */ '../views/admin/page/course/UpdateCourse.vue'),
                meta: { title: '修改课程' }
            },

            ]
    },
    {
        path: '/admin/login',
        component: () => import(/* webpackChunkName: "login" */ '../views/admin/page/Login.vue'),
        meta: { title: '登录' }
    },
    {
        path: '*',
        redirect: '/404'
    }
]

const router = new VueRouter({
  routes
})

export default router

router.beforeEach((to, from, next)=>{
    // 获取仓库里的登录信息
    const auth =router.app.$options.store.getters.isLoggedIn;
    const code = to.query.code;
    console.log(auth);

    if (to.path !== '/login'){  //验证是否登录
        if (auth){  //已经登录
            next();
        } else if(code) {  // 如果未登录，且跳转路径不是登录界面，但是包含code，则调用仓库的login方法，并放行。
            console.log(code);
            // console.log(router.app.$options.store.dispatch('login',code));
             router.app.$options.store.dispatch('login',code);//todo 是否要考虑容错机制



            next();
        }else{
            console.log('重定向到login');

            next ('/login?redirect='+ to.path);
        }
    } else {  //不需要验证
        next();
    }
    // 放行
    // next();   //出现导航报错，Navigation canceled from  ...  to ...
});
