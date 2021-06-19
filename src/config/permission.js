const permission = {
    resources: [
        {
            "id": "1",
            "name": "微信登录",
            "url": "/socials/wechat/authorizations/",
            "method": "POST"
        },{
            "id": "2",
            "name": "刷新token接口",
            "url": "/authorizations/current/",
            "method": "PUT"
        },{
            "id": "3",
            "name": "获取当前用户信息",
            "url": "/user",
            "method": "GET"
        },{
            "id": "4",
            "name": "退出登录",
            "url": "/authorizations/current/",
            "method": "DELETE"
        },{
            "id": "5",
            "name": "分类接口",
            "url": "/categories",
            "method": "GET"
        },{
            "id": "7",
            "name": "课程列表",
            "url": "/courses",
            "method": "GET"
        },{
            "id": "8",
            "name": "某个课程的详情",
            "url": "/courses/**",
            "method": "GET"
        },{
            "id": "19",
            "name": "获取目录",
            "url": "/courses/*/chapters",
            "method": "GET"
        },{
            "id": "21",
            "name": "获取节对应的section",
            "url": "/lessons/*/sections",
            "method": "GET"
        },{
            "id": "25",
            "name": "学习页分段读取section内容",
            "url": "/sections/*/learn",
            "method": "POST"
        },{
            "id": "26",
            "name": "学习页下载节对应的学习资料",
            "url": "/lessons/files/",
            "method": "POST"
        },{
            "id": "27",
            "name": "测试Alipay 功能",
            "url": "/payment/*/alipay",
            "method": "GET"
        },{
            "id": "28",
            "name": "获取权限",
            "url": "/user/permissions/",
            "method": "GET"
        },{
            "id": "29",
            "name": "创建学习记录",
            "url": "/records",
            "method": "POST"
        },{
            "id": "30",
            "name": "获取本节已学习的内容",
            "url": "/lessons/*/record",
            "method": "GET"
        },{
            "id": "31",
            "name": "获取本节section 的总数（供学习进度使用）",
            "url": "/lessons/*/progress",
            "method": "GET"
        },{
            "id": "32",
            "name": "首页获取最近学习记录",
            "url": "/records/current/",
            "method": "GET"
        },{
            "id": "33",
            "name": "首页获取已购买课程&热门课程列表",
            "url": "/home/courses/",
            "method": "GET"
        }
    ],
    resources_manage_contents: [
        {
            "id": "6",
            "name": "创建课程",
            "url": "/courses",
            "method": "POST"
        },{
            "id": "9",
            "name": "修改课程",
            "url": "/courses/**",
            "method": "PATCH"
        },{
            "id": "10",
            "name": "删除课程",
            "url": "/courses/**",
            "method": "DELETE"
        },{
            "id": "11",
            "name": "图片上传",
            "url": "/images",
            "method": "POST"
        },{
            "id": "12",
            "name": "图片上传（自行设计）",
            "url": "/imagesTest",
            "method": "POST"
        },{
            "id": "13",
            "name": "文件上传",
            "url": "/files",
            "method": "POST"
        },{
            "id": "14",
            "name": "新增章",
            "url": "/chapters",
            "method": "POST"
        },{
            "id": "15",
            "name": "修改章",
            "url": "/chapters/**",
            "method": "PATCH"
        },{
            "id": "15",
            "name": "删除章",
            "url": "/chapters/**",
            "method": "DELETE"
        },{
            "id": "16",
            "name": "新增节",
            "url": "/lessons",
            "method": "POST"
        },{
            "id": "17",
            "name": "修改节",
            "url": "/lessons/**",
            "method": "PATCH"
        },{
            "id": "18",
            "name": "删除节",
            "url": "/lessons/**",
            "method": "DELETE"
        },{
            "id": "20",
            "name": "新增section",
            "url": "/sections",
            "method": "POST"
        },{
            "id": "22",
            "name": "删除section",
            "url": "/sections/**",
            "method": "DELETE"
        },{
            "id": "23",
            "name": "修改section",
            "url": "/sections/**",
            "method": "PATCH"
        },{
            "id": "24",
            "name": "调整section 顺序",
            "url": "/sections/sort/",
            "method": "POST"
        }
    ],
    resources_users: [],
    resources_settings: [],
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


    ],
    menus_manage_contents: [
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
        },{
            "id": 24,
            "name": "",
            "parent_id": 2,
            "route": "createchapter/:course_id",
            "summary": null
        },{
            "id": 25,
            "name": "",
            "parent_id": 2,
            "route": "createsection/:lesson_id",
            "summary": null
        },{
            "id": 26,
            "name": "",
            "parent_id": 2,
            "route": ":id",
            "summary": null
        },
    ],
    menus_users: [],
    menus_settings: [],

};

export {
    permission,
};