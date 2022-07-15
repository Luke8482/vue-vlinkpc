// import Vue from 'vue'
// import VueRouter from 'vue-router'
//
// //1、引入一级组件
// import DashBoard from './../views/home/dashboard/DashBoard'
// import Home from './../views/home/home/Home'
// import Progress from './../views/home/progress/Progress'
// import Learn from './../views/home/learn/Learn'
// import Login from './../views/home/login/Login'
//
//
//
// Vue.use(VueRouter);
//
// const routes = [
//     {path: '/', redirect: '/dashboard'},
//     {
//         path: '/dashboard',
//         name: 'dashboard',
//         component: DashBoard,
//         children: [
//             {path: '/dashboard', redirect: '/dashboard/home'},
//             {path: 'home', name:'home', component: Home},
//             {path: 'progress', name:'progress', component: Progress},
//             {path: 'learn/:lesson_id', name:'learn', component: Learn},
//
//         ],
//
//     },
//
//     {path: '/login', name: 'login', component: Login, },
//
//
//     //后台路由
//     {
//         path: '/admin',
//         redirect: '/admin/dashboard'
//     },
//     {
//         path: '/admin',
//         component: () => import(/* webpackChunkName: "home" */ '../views/admin/common/Home.vue'),
//         meta: { title: '自述文件' },
//         children: [
//             {
//                 path: '/admin/dashboard',
//                 component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/page/Dashboard.vue'),
//                 meta: { title: '系统首页' }
//             },
//             {
//                 path: '/admin/course',
//                 component: () => import(/* webpackChunkName: "table" */ '../views/admin/page/course/CourseList.vue'),
//                 meta: { title: '课程列表' }
//             },
//
//             {
//                 path: '/admin/createcourse',
//
//                 component: () => import(/* webpackChunkName: "table" */ '../views/admin/page/course/CreateCourse.vue'),
//                 meta: { title: '新增课程' }
//             },
//
//
//
//             {
//                 path: '/admin/createchapter/:course_id',
//
//                 component: () => import(/* webpackChunkName: "table" */ '../views/admin/page/course/createChapter/CreateChapter.vue'),
//                 meta: { title: '新增章节' }
//             },
//
//             {
//                 path: '/admin/createsection/:lesson_id',
//
//                 component: () => import(/* webpackChunkName: "table" */ '../views/admin/page/course/createSection/CreateSection.vue'),
//                 meta: { title: '新增section' }
//             },
//
//             {
//                 path: '/admin/:id',
//
//                 component: () => import(/* webpackChunkName: "table" */ '../views/admin/page/course/UpdateCourse.vue'),
//                 meta: { title: '修改课程' }
//             },
//
//             ]
//     },
//
//     {
//         path: '*',
//         redirect: '/404'
//     }
// ]
//
// const router = new VueRouter({
//   routes
// })
//
// export default router
//
// router.beforeEach((to, from, next)=>{
//     // 获取仓库里的登录信息
//     const auth =router.app.$options.store.getters.isLoggedIn;
//     const code = to.query.code;
//     console.log(auth);
//
//     if (to.path !== '/login'){  //验证是否登录
//         if (auth){  //已经登录
//             next();
//         } else if(code) {  // 如果未登录，且跳转路径不是登录界面，但是包含code，则调用仓库的login方法，并放行。
//             console.log(code);
//             // console.log(router.app.$options.store.dispatch('login',code));
//              router.app.$options.store.dispatch('login',code);//todo 是否要考虑容错机制
//
//
//
//             next();
//         }else{
//             console.log('重定向到login');
//
//             next ('/login?redirect='+ to.path);
//         }
//     } else {  //不需要验证
//         next();
//     }
//     // 放行
//     // next();   //出现导航报错，Navigation canceled from  ...  to ...
// });
//


import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

let baseRoute = [
    {path: '/', redirect: '/dashboard'},

    {
    path: '/login',
    name: '登录',
    component: () => import('../views/home/login/Login.vue' )
    },{
        path: '/program/lesson-detail',
        name: '课程介绍',
        component: () => import('../views/home/wechatPage/LessonDetail.vue' )
    },{
        path: '/program/course-cart',
        name: '课程购物车',
        component: () => import('../views/home/wechatPage/CourseCart.vue' )
    },{
        path: '/program/refund',
        name: '退款界面',
        component: () => import('../views/home/refundPage/RefundPage.vue' )
    },{
        path: '/program/user-order-list',
        name: '用户订单列表',
        component: () => import('../views/home/refundPage/UserOrderList.vue' )
    },{
        path: '/program/agreements',
        name: '网站协议',
        component: () => import('../views/home/agreements/Agreement.vue' )
    }, {
    path: '/401',
    name: '无权访问',
    component: () => import('../views/admin/page/403.vue' )
    }, {
    path: '/404',
    name: '找不到页面',
    component: () => import('../views/admin/page/404.vue' )
    },


];

let router = new Router({
    routes: baseRoute,
});

// router.beforeEach((to, from, next) => {
//     let routeName = to.meta.name || to.name;
//     window.document.title = (routeName ? routeName + ' - ' : '') + 'Vue-Access-Control';
//     next();
// });


    router.beforeEach((to, from, next)=> {
        // 获取仓库里的登录信息
        const auth = router.app.$options.store.getters.isLoggedIn;
        const code = to.query.code;

        let routeName = to.meta.name || to.name;
        window.document.title = (routeName ? routeName + ' - ' : '') + 'VlinkPc';

        if (to.path !== '/login' && to.path !== '/dashboard/home' && to.path !== '/program/agreements') { //验证是否登录

           // 增加判断是否为微信界面路由，以及是否在微信端打开，如果是对应路由，且不再微信打开，就next到wxError界面
            var isWxRouter = to.path === '/program/lesson-detail'
                || to.path === '/program/course-cart'
                || to.path === '/program/refund'
                || to.path === '/program/user-order-list';

            var useragent = navigator.userAgent;
            if (isWxRouter && useragent.match(/MicroMessenger/i) != 'MicroMessenger') {  // 注意：使用 != 而不是!==
                window.location.href = "/wxError.html";
            } else {
                if (auth) {  //已经登录
                    next();
                } else if (code) {  // 如果未登录，且跳转路径不是登录界面，但是包含code，则调用仓库的login方法，并放行。
                    // console.log(router.app.$options.store.dispatch('login',code));

                    var loginData = {          //   登录携带不同微信应用的appId
                        code: code,
                        appId: to.query.appId
                    };
                    router.app.$options.store.dispatch('login', loginData).then(res=>{
                                            next();
                                        });//todo 是否要考虑容错机制

                } else {
                    if(isWxRouter){
                        //判断路由是否是微信页面，那么直接跳转到授权页  配置公众号相关信息，最好是配置到环境变量内
                        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
                            +to.query.appId
                            +'&redirect_uri='
                            +process.env.VUE_APP_REDIRECT_URL+to.path
                            +'&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect';
                    } else {  //  否则跳转到登录页面，扫码登录
                        console.log('重定向到login');
                        next('/login?redirect=' + to.path);
                    }
                }
            }

        } else {  //不需要验证
            next();
        }
    });

export default router;
