import {request, authRequest} from './ajax'


//自行设计代码
export function  logins(code) {
    return request('/socials/wechat/authorizations', {
        method: 'post',
        data: {
            code:code,
        }
    })
}

//调用刷新token接口
export function refresh(token) {
    return request('/authorizations/current', {
        method: 'put',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    })
}


// 获取当前用户信息
export function getCurrentUser() {
    return authRequest('/user')
}

// 退出登录
export function logout(token) {
    return request('/authorizations/current', {
        method: 'delete',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}


// 分类接口，测试使用
export function  getCategories() {
    return request('/categories')
}

// 创建课程
export function createCourses(value) {
    return authRequest('/courses',{
        method: 'post',
        data: value,
    })
}

// 课程列表
export function getCourses() {
    return request('/courses')
}

// 某个课程的详情
export function getCourse(id) {
    return request('/courses/'+id)
}

// 修改课程
export function updateCourse(id,value) {
    return authRequest('/courses/'+id,{
        method: 'patch',
        data:value,
    })
}

// 删除课程
export function delCourses(value) {
    return authRequest('/courses/'+value,{
        method: 'delete'
    })
}

//图片上传
export function upLoaderImages(value) {
    return authRequest('/images',{
        method: 'post',
        data: value,

    })
    
}


// 图片上传（自行设计）
export function upLoaderImagesTest(value) {
    return authRequest('/imagesTest',{
        method: 'post',
        data:value,
    })

}

// 文件上传
export function uploadFiles(value) {
    return authRequest('/files',{
        method: 'post',
        data:value,
    })

}


//新增章
export function createChapter(value) {
    return authRequest('/chapters',{
        method: 'post',
        data: value,
    })
}

// 修改章
export function updateChapter(id,value) {
    return authRequest('/chapters/'+id,{
        method: 'patch',
        data:value,
    })
}

// 删除章
export function delChapters(id) {
    return authRequest('/chapters/'+id,{
        method: 'delete'
    })
}

//新增节
export function createLesson(value) {
    return authRequest('/lessons',{
        method: 'post',
        data: value,
    })
}

// 修改节
export function updateLesson(id,value) {
    return authRequest('/chapters/'+id,{
        method: 'patch',
        data:value,
    })
}

// 删除节
export function delLesson(id) {
    return authRequest('/lessons/'+id,{
        method: 'delete'
    })
}

//获取目录
export function getchapters(course_id) {
    return request('/courses/'+course_id+'/chapters?include=lessons')
}


//新增section
export function createSection(value) {
    return authRequest('/sections',{
        method: 'post',
        data: value,
    })
}

//获取节对应的section
export function getsections(lesson_id) {
    return authRequest('/lessons/'+lesson_id+'/sections')
}

// 删除section
export function delSection(id) {
    return authRequest('/sections/'+id,{
        method: 'delete'
    })
}

// 修改section
export function updateSection(id,value) {
    return authRequest('/sections/'+id,{
        method: 'patch',
        data:value,
    })
}

// 调整section 顺序
export function updateSort(value) {
    return authRequest('/sections/sort', {
        method: 'post',
        data: value,
    })
}

// 学习页分段读取section内容
export function sectionLearn(lesson_id,value) {
    return authRequest('/sections/'+lesson_id+'/learn', {
        method: 'post',
        data: value,
    })
}

// 学习页下载节对应的学习资料
export function downloadFile(value) {
    return authRequest('/lessons/files', {
        method: 'post',
        data: value,
    })
}

// 测试Alipay 功能
export function testAlipay(order_id) {
    return authRequest('/payment/'+order_id+'/alipay', {
        method: 'get',
    })
}

// 测试Alipay 功能
export function getPermissons() {
    return authRequest('/user/permissions', {
        method: 'get',
    })
}

