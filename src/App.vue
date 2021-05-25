<!--<template>-->
  <!--<div id="app">-->
    <!--<router-view v-if="isRouterAlive"/>-->

    <!--&lt;!&ndash;統一引入editor.md 樣式&ndash;&gt;-->
    <!--<link rel="stylesheet" href="/editor.md/css/editormd.min.css">-->
    <!--<link rel="stylesheet" href="/editor.md/css/google_code_prettify_themes/vibrant-ink.min.css">-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->

  <!--export default {-->
      <!--provide(){-->
          <!--return {-->
              <!--reload: this.reload,-->
          <!--}-->
      <!--},-->

      <!--data() {-->
          <!--return {-->
              <!--isRouterAlive: true-->
          <!--}-->
      <!--},-->

      <!--methods: {-->
          <!--reload() {-->
              <!--this.isRouterAlive =  false;-->
              <!--this.$nextTick(function (){-->
               <!--this.isRouterAlive = true;-->
              <!--})-->
          <!--}-->
      <!--}-->
  <!--}-->


<!--</script>-->

<!--<style lang="less">-->
  <!--/*::-webkit-scrollbar{background-color:transparent;width:10px}*/-->
  <!--/*::-webkit-scrollbar-thumb{background-color:#9aa5ad;border-radius:.15vw;width:10px}*/-->


<!--</style>-->




<template>
  <div id="app">

    <router-view  v-if="isRouterAlive"></router-view>

    <!--統一引入editor.md 樣式-->
    <link rel="stylesheet" href="/editor.md/css/editormd.min.css">
    <link rel="stylesheet" href="/editor.md/css/google_code_prettify_themes/vibrant-ink.min.css">
  </div>

</template>

<script>
    import Vue from 'vue';
    import {request, instance} from './service/api/ajax'
    import {getPermissons} from './service/api/index'
    // import instance from './api';
    import AllRoutesData from './router/fullpath';
    import * as util from './utils/permisson.js';
    import ls from '@/utils/localStorage'
    import bus from './views/admin/common/bus.js'


    export default {
        provide(){
            return {
              reload: this.reload,
              }
        },

        data() {
            return {
                menuData: null,
                userData: null,
                isRouterAlive: true,
                testApiData:{
                    "name": "管理端",
                    "resources": [
                        {
                            "id": "2c9180895e172348015e1740805d000d",
                            "name": "账号-获取",
                            "summary": null,
                            "url": "/accounts",
                            "method": "GET"
                        },
                        {
                            "id": "2c9180895e172348015e1740c30f000e",
                            "name": "账号-删除",
                            "summary": null,
                            "url": "/account/**",
                            "method": "DELETE"
                        },
                        {
                            "id": "2c9180895e172348015e1741148a000f",
                            "name": "账号-修改",
                            "summary": null,
                            "url": "/account/**",
                            "method": "PUT"
                        },
                        {
                            "id": "2c9180895e172348015e1840b98f0013",
                            "name": "账号-分配角色",
                            "summary": null,
                            "url": "/account/*/roles",
                            "method": "POST"
                        },
                        {
                            "id": "2c9180895e172348015e173cd55f0009",
                            "name": "角色-获取",
                            "summary": null,
                            "url": "/roles",
                            "method": "GET"
                        },
                        {
                            "id": "2c9180895e172348015e173e83ac000a",
                            "name": "角色-删除",
                            "summary": null,
                            "url": "/role/**",
                            "method": "DELETE"
                        },
                        {
                            "id": "2c9180895e172348015e173eb9a4000b",
                            "name": "角色-修改",
                            "summary": null,
                            "url": "/role/**",
                            "method": "PUT"
                        },
                        {
                            "id": "2c9180895e172348015e173f2fcc000c",
                            "name": "角色-添加",
                            "summary": null,
                            "url": "/role",
                            "method": "POST"
                        },
                        {
                            "id": "4028811a5e1820d9015e1824acf20000",
                            "name": "登录",
                            "summary": null,
                            "url": "/signin",
                            "method": "GET"
                        }
                    ],
                    "id": "2c9180895e172348015e1740805d000d",
                    "menus": [
                        {
                            "id": 1,
                            "name": "dashboard",
                            "parent_id": null,
                            "route": "dashboard",
                            "summary": null
                        },
                        {
                            "id": 11,
                            "name": "home",
                            "parent_id": 1,
                            "route": "home",
                            "summary": null
                        },
                        {
                            "id": 12,
                            "name": "progress",
                            "parent_id": 1,
                            "route": "progress",
                            "summary": null
                        },
                        {
                            "id": 13,
                            "name": "learn",
                            "parent_id": 1,
                            "route": "learn/:lesson_id",
                            "summary": null
                        },

                        {
                            "id": 2,
                            "name": "admin",
                            "parent_id": null,
                            "route": "admin",
                            "summary": null
                        },
                        {
                            "id": 21,
                            "name": "",
                            "parent_id": 2,
                            "route": "dashboard",
                            "summary": null
                        },{
                            "id": 22,
                            "name": "",
                            "parent_id": 2,
                            "route": "course",
                            "summary": null
                        },{
                            "id": 23,
                            "name": "",
                            "parent_id": 2,
                            "route": "createcourse",
                            "summary": null
                        },
                    ]

                    // "menus": [
                    //     {
                    //         "id": "2c9180895e13261e015e13469b7e0000",
                    //         "name": "平台-角色管理",
                    //         "parent_id": null,
                    //         "route": "roles",
                    //         "summary": null
                    //     },
                    //     {
                    //         "id": "2c9180895e13261e015e1346d40a0001",
                    //         "name": "平台-账户管理",
                    //         "parent_id": null,
                    //         "route": "accounts",
                    //         "summary": null
                    //     }
                    // ]
                }
            }
        },
        methods: {
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(function () {
                    this.isRouterAlive = true;
                })
            },

            setInterceptor: function(resourcePermission) {
                instance.interceptors.request.use(config => {
                    // Get request path

                    let perName = config.url.replace(config.baseURL, '').split('?')[0];
                    //RESTful type 1 /path/**
                    let reg1 = perName.match(/^(\/[^\/]+\/)[^\/]+$/);
                    if (reg1) {
                        perName = reg1[1] + '**';
                    }
                    //RESTful type 2 /path/*/path
                    let reg2 = perName.match(/^\/[^\/]+\/([^\/]+)\/[^\/]+$/);
                    if (reg2) {
                        perName = perName.replace(reg2[1], '*');
                    }

                    // Check permissions

                    if (!resourcePermission[config.method + ',' + perName]) {
                        this.$message({
                            message: '无访问权限，请联系企业管理员',
                            type: 'warning'
                        });
                        return Promise.reject({
                            message: 'no permission'
                        });
                    }
                    return config;
                });
            },
            getResources: function(userPermissions) {
                let resourceHash = {};
                if (Array.isArray(userPermissions.resources)) {
                    /*
                    * Input like this:
                    * [{
                    *   id: "2c9180895e172348015e1740805d000d"
                        method: "GET"
                        url: "/some-url"
                    * }]
                    */
                    userPermissions.resources.forEach(e => {
                        let key = e.method.toLowerCase() + ',' + e.url;
                        resourceHash[key] = true;
                    });
                }
                // Get hash structure
                return resourceHash;
            },
            getRoutes: function(userPermissions) {
                let routeHash = {};
                let setMenu2Hash = function(array, base) {
                    array.map(key => {
                        if (key.route) {
                            let hashKey = ((base ? base + '/' : '') + key.route).replace(/^\//, '');
                            routeHash['/' + hashKey] = true;
                            if (Array.isArray(key.children)) {
                                setMenu2Hash(key.children, (base ? base + '/' : '') + key.route);
                            }
                        }
                    });
                };
                if (Array.isArray(userPermissions.menus)) {
                    /*
                    * Input Like this:
                    * [{
                    *   id: "2c9180895e13261e015e13469b7e0000",
                    *   name: "账户管理",
                    *   parent_id: "2c9180895e13261e015e13469b7e0000",
                    *   route: "some-route"
                    * }]
                    */
                    let arrayMenus = util.buildMenu(userPermissions.menus);
                    setMenu2Hash(arrayMenus);
                }
                // Get hash structure
                return routeHash;

            },
            extendRoutes: function(routePermission) {

                // Filtering local routes, get actual routing

                let actualRouter = [];
                let findLocalRoute = function(array, base) {
                    let replyResult = [];
                    array.forEach(route => {
                        let pathKey = (base ? base + '/' : '') + route.path;
                        if (routePermission[pathKey]) {
                            if (Array.isArray(route.children)) {
                                route.children = findLocalRoute(route.children, (base ? base + '/' : '') + route.path);
                            }
                            replyResult.push(route);
                        }
                    });
                    if (base) {
                        return replyResult;
                    } else {
                        actualRouter = actualRouter.concat(replyResult);
                    }
                }
                findLocalRoute(AllRoutesData[0].children);

                // If the user does not have any routing authority
                console.log(actualRouter);

                if (!actualRouter || !actualRouter.length) {
                    // clear token, refresh page will jump to login screen.
                    // util.session('token','');  todo 修改为 使用ls  的  logout 方法
                    ls.logout();
                    // Interface hints
                    return document.body.innerHTML = ('<h1>账号访问受限，请联系系统管理员！</h1>');
                }

                actualRouter = actualRouter.map(e => {

                    // Copy 'children' to 'meta' for rendering menu.(This step is optional.)

                    if (e.children) {
                        if (!e.meta) e.meta = {};
                        e.meta.children = e.children;
                    }

                    return e
                });

                // Add actual routing to application

                let originPath = util.deepcopy(AllRoutesData);
                console.log(util.deepcopy(AllRoutesData));
                originPath[0].children = actualRouter;
                console.log(originPath);
                this.$router.addRoutes(originPath.concat([{
                    path: '*',
                    redirect: '/404'
                }]));




                console.log(this.$router.options.routes);

                // Save information for rendering menu.(This step is optional.)

                this.$root.menuData = actualRouter;

            },
            signin: function(callback) {
                let vm = this;
                /*
                * Step 1
                * Check whether the user has access
                */

                // let localUser = util.session('token');   todo。。。 修改为使用 ls 的  getSession 方法
                let localUser = ls.getToken();
                // if (!localUser || !localUser.token) {   todo ....   修改对应参数
                if (!localUser ) {
                    return vm.$router.push({ path: '/login', query: { from: vm.$router.currentRoute.path } });
                }

                /*
                * Step 2
                * Set Authorization
                */

                // instance.defaults.headers.common['Authorization'] = 'Bearer ' + localUser.token;

                /*
                * Step 2-1(This step is optional.)
                * Get user`s permissions
                * You can also get permission information upon user login, it depends on the implementation of the backend interface
                */

                // instance.get(`/signin`, {
                //     params: {
                //         Authorization: localUser.token
                //     }
                //     //  todo 直接封装Api 调用
                // })
                getPermissons().then(res => {
                    // let userPermissions = res.data;
                    let userPermissions = this.testApiData;   //测试数据

                    // Save information, if it is used elsewhere.
                    vm.$root.userData = userPermissions;

                    /*
                    * Step 3
                    * Get resourcePermission form user permissions
                    * Like this:
                    * { "get,/url1": true, "post,/url2": true, ... }
                    */

                    let resourcePermission = vm.getResources(userPermissions);

                    /*
                    * Step 4
                    * Get routePermission form user permissions
                    * Like this:
                    * { "/route1": true, "/route2": true, ... }
                    */

                    let routePermission = vm.getRoutes(userPermissions);

                    /*
                    * Step 5
                    * Setting request permission control through resourcePermission
                    */

                    vm.setInterceptor(resourcePermission);

                    /*
                    * Step 6
                    * Adding routing privileges to users
                    */

                    vm.extendRoutes(routePermission);

                    /*
                    * Step 7
                    * Implementing $_has function, support for the directive "has" (in /main.js)
                    * Input: Array, like this: ['get,/some-uri']
                    * Output: Boolean
                    */

                    Vue.prototype.$_has = function(rArray) {
                        let RequiredPermissions = [];
                        let permission = true;

                        if (Array.isArray(rArray)) {
                            rArray.forEach(e => {
                                if(e && e.p){
                                    RequiredPermissions = RequiredPermissions.concat(e.p);
                                }
                            });
                        } else {
                            if(rArray && rArray.p){
                                RequiredPermissions = rArray.p;
                            }

                        }

                        for(let i=0;i<RequiredPermissions.length;i++){
                            let p = RequiredPermissions[i];
                            if (!resourcePermission[p]) {
                                permission = false;
                                break;
                            }
                        }

                        return permission;
                    }

                    typeof callback === 'function' && callback();
                })
            },
            loginDirect: function(newPath){
                /*
                * Monitor login events
                * Will trigger the events in views/login.vue
                */

                this.signin(() => {
                    this.$router.replace({path: newPath || '/'});
                });
            },
            logoutDirect: function(){
                /*
                * Monitor logout events
                * Will trigger the events in views/index.vue
                */

                //Clear local user information

                // util.session('token','');  todo 修改为 使用ls  的  logout 方法
                ls.logout();
                // reload app
                window.location.href = process.env.BASE_URL || '/'
            }
        },
        created: function() {
            /*
            * Start from here!
            */
            this.signin();
        },
        mounted () {
            bus.$on('loginDirect', this.loginDirect);
            bus.$on('logoutDirect', this.logoutDirect);
        },
    }
</script>

<style scoped>

</style>
