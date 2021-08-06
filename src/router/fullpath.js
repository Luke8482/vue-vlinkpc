// export default [{
//     path: '/',
//     name: '首页',
//     component: (resolve) => require(['./../views/home/home/Home'], resolve),
//     children: [{
//         path: '/roles',
//         name: '平台-角色管理',
//         meta: {
//             name: '角色管理'
//         },
//         component: (resolve) => require(['./../views/home/home/Home'], resolve)
//     }, {
//         path: '/accounts',
//         name: '平台-账号管理',
//         meta: {
//             name: '账号管理'
//         },
//         component: (resolve) => require(['./../views/home/home/Home'], resolve)
//     }, {
//         path: '/goods',
//         name: '商品管理',
//         meta: {
//             icon: '&#xe62e;'
//         },
//         component: (resolve) => require(['./../views/home/home/Home'], resolve),
//         // component: Abstract,
//         children: [{
//             path: 'list',
//             name: '商品信息',
//             meta: {
//
//             },
//             component: (resolve) => require(['./../views/home/home/Home'], resolve)
//         }]
//     }]
// }];



export default  [
    // {
    //     path: '/dashboard',
    //     redirect: '/dashboard/home',
    //     component: () => import( './../views/home/dashboard/DashBoard'),
    //     children: [
    //         {path: 'home',
    //             component: () => import( './../views/home/home/Home'),
    //         },
    //         {path: 'progress',
    //             component: () => import('./../views/home/progress/Progress'),
    //         },
    //         {path: 'learn/:lesson_id',
    //             component: () => import( './../views/home/learn/Learn'),
    //         },
    //
    //     ],
    //
    // },



    {path: '/',
        component: () => import( './../views/home/dashboard/RootDashboard'),
        children: [
            {
                path: '/dashboard',
                redirect: '/dashboard/home',
                component: () => import( './../views/home/dashboard/DashBoard'),
                // component: () => import( './../views/home/home/Home'),
                children: [
                    {path: 'home',
                        component: () => import( './../views/home/home/Home'),
                    },
                    {path: 'progress',
                        component: () => import('./../views/home/progress/Progress'),
                    },
                    {path: 'learn',
                        component: () => import( './../views/home/learn/Learn'),
                    },

                ],

            },

            // 后台路由
            {
                path: '/admin',
                redirect: '/admin/dashboard',
                component: () => import('../views/admin/common/Home.vue'),
                meta: { title: '自述文件' },
                children: [
                    {
                        path: 'dashboard',
                        component: () => import( '../views/admin/page/Dashboard.vue'),
                        meta: { title: '系统首页' }
                    },
                    {
                        path: 'course',
                        component: () => import('../views/admin/page/course/CourseList.vue'),
                        meta: { title: '课程列表' }
                    },

                    {
                        path: 'createcourse',

                        component: () => import( '../views/admin/page/course/CreateCourse.vue'),
                        meta: { title: '新增课程' }
                    },



                    {
                        path: 'createchapter/:course_id',

                        component: () => import('../views/admin/page/course/createChapter/CreateChapter.vue'),
                        meta: { title: '新增章节' }
                    },

                    {
                        path: 'createsection',

                        component: () => import( '../views/admin/page/course/createSection/CreateSection.vue'),
                        meta: { title: '新增section' }
                    },

                    {
                        path: 'createcarousel/:course_id',

                        component: () => import( '../views/admin/page/course/createCarousel/CreateCarousel.vue'),
                        meta: { title: '新增轮播图' }
                    },

                    {
                        path: 'createcoursesku/:course_id',

                        component: () => import( '../views/admin/page/course/createCourseSku/CreateCourseSku.vue'),
                        meta: { title: '新增课程sku' }
                    },

                    {
                        path: 'createdetails/:course_id',

                        component: () => import( '../views/admin/page/course/createDetail/CreateDetail.vue'),
                        meta: { title: '新增详情图' }
                    },
                    {
                        path: 'createversions/:course_id',

                        component: () => import( '../views/admin/page/course/createVersion/CreateVersion.vue'),
                        meta: { title: '新增课程版本' }
                    },

                    {
                        path: 'course/:course_id',

                        component: () => import( '../views/admin/page/course/UpdateCourse.vue'),
                        meta: { title: '修改课程' }
                    },

                    {
                        path: 'users',
                        component: () => import('../views/admin/page/users/UsersList.vue'),
                        meta: { title: '用户列表' }
                    },

                    {
                        path: 'teachers',
                        component: () => import('../views/admin/page/users/TeacherList.vue'),
                        meta: { title: '教师列表' }
                    },

                    {
                        path: 'createteachers',

                        component: () => import( '../views/admin/page/users/CreateTeacher.vue'),
                        meta: { title: '新增教师' }
                    },

                    {
                        path: 'orders',
                        component: () => import('../views/admin/page/orders/OrdersList.vue'),
                        meta: { title: '订单列表' }
                    },

                    {
                        path: 'files',
                        component: () => import('../views/admin/page/files/FilesList.vue'),
                        meta: { title: '文件列表' }
                    },

                    {
                        path: 'agreements',
                        component: () => import('../views/admin/page/website/AgreementList.vue'),
                        meta: { title: '协议列表' }
                    },

                    {
                        path: 'createagreement',

                        component: () => import( '../views/admin/page/website/CreateAgreement.vue'),
                        meta: { title: '新增协议' }
                    },


                ]
            },


        ]

    },

]



//
//
//
// export default  [
//     {path: '/', redirect: '/dashboard'},
//     {
//         path: '/dashboard',
//         name: 'dashboard',
//         component: () => import(/* webpackChunkName: "home" */ './../views/home/dashboard/DashBoard'),
//         children: [
//             {path: '/dashboard', redirect: '/dashboard/home'},
//             {path: 'home',
//                 name:'home',
//                 component: () => import(/* webpackChunkName: "home" */ './../views/home/home/Home'),
//             },
//             {path: 'progress',
//                 name:'progress',
//                 component: () => import(/* webpackChunkName: "home" */ './../views/home/progress/Progress'),
//             },
//             {path: 'learn/:lesson_id',
//                 name:'learn',
//                 component: () => import(/* webpackChunkName: "home" */ './../views/home/learn/Learn'),
//             },
//
//         ],
//
//     },
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
//         ]
//     },
//
// ]



