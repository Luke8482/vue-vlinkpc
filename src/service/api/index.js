import {request, authRequest} from './ajax'


//自行设计代码
export function  logins(code) {
    return request('/socials/wechat/authorizations/', {
        method: 'post',
        data: {
            code:code,
        }
    })
}

//调用刷新token接口
export function refresh(token) {
    return request('/authorizations/current/', {
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
    return request('/authorizations/current/', {
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

//新增章
export function updateChapterSort(value) {
    return authRequest('/chapters/sort/',{
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

//调整节的顺序
export function updateLessonSort(value) {
    return authRequest('/lessons/sort/',{
        method: 'post',
        data: value,
    })
}

// 修改节
export function updateLesson(id,value) {
    return authRequest('/lessons/'+id,{
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
    return authRequest('/courses/'+course_id+'/chapters?include=lessons')
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
    return authRequest('/sections/sort/', {
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
    return authRequest('/lessons/files/', {
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

// 获取权限
export function getPermissons() {
    return authRequest('/user/permissions/', {
        method: 'get',
    })
}

// 创建学习记录API
export function setRecord(value) {
    return authRequest('/records', {
        method: 'post',
        data: value,
    })
}

// 获取本节已学习的内容
export function getLearnedSections(lesson_id) {
    return authRequest('/lessons/'+lesson_id+'/record', {
        method: 'get',
    })
}

// 获取本节section 的总数（供学习进度使用）
export function getSectionsCount(lesson_id) {
    return authRequest('/lessons/'+lesson_id+'/progress', {
        method: 'get',
    })
}


//  首页API
//  首页获取最近学习记录API
export function getLastLearnedRecord() {
    return authRequest('/records/current/?include=lessons', {
        method: 'get',
    })
}

//  首页获取已购买课程&热门课程列表
export function getHomeCourses() {
    return authRequest('/home/courses/', {
        method: 'get',
    })
}

//  获取推荐课程
export function getRcmCourses() {
    return authRequest('/recommended/courses/', {
        method: 'get',
    })
}


//新课程轮播图
export function createCarousel(value) {
    return authRequest('/carousels',{
        method: 'post',
        data: value,
    })
}

//  获取课程所属的轮播图
export function getCarousels(id) {
    return authRequest('/courses/'+id+'/carousels',{
        method: 'get',
    })
}


// 修轮播图
export function updateCarousel(id,value) {
    return authRequest('/carousels/'+id,{
        method: 'patch',
        data:value,
    })
}

// 删除Carousel
export function delCarousel(id) {
    return authRequest('/carousels/'+id,{
        method: 'delete'
    })
}

//  调整轮播图顺序
export function updateCarouselSort(value) {
    return authRequest('/carousels/sort/',{
        method: 'post',
        data: value,
    })
}

//新增课程SKU
export function createCourseSku(value) {
    return authRequest('/courseskus',{
        method: 'post',
        data: value,
    })
}

// 修改课程sku
export function updateCourseSku(id,value) {
    return authRequest('/courseskus/'+id,{
        method: 'patch',
        data:value,
    })
}

//  获取课程所属的Sku
export function getCourseSkus(id) {
    return authRequest('/courses/'+id+'/skus',{
        method: 'get',
    })
}


// 删除section
export function delCourseSku(id) {
    return authRequest('/courseskus/'+id,{
        method: 'delete'
    })
}

//新增课程详情图
export function createDetail(value) {
    return authRequest('/details',{
        method: 'post',
        data: value,
    })
}

// 修改课程详情图
export function updateDetail(id,value) {
    return authRequest('/details/'+id,{
        method: 'patch',
        data:value,
    })
}

//  获取课程所属的详情图
export function getDetails(id) {
    return authRequest('/courses/'+id+'/details',{
        method: 'get',
    })
}


// 删除详情图
export function delDetail(id) {
    return authRequest('/details/'+id,{
        method: 'delete'
    })
}

//  调整详情图顺序
export function updateDetailSort(value) {
    return authRequest('/details/sort/',{
        method: 'post',
        data: value,
    })
}

//   前台  h5课程详情页  获取详情图及sku信息
export function getDetailsAndSku(id) {
    return request('/coursesku/'+id+'/details', {
        method: 'get',
    })
}

//  创建订单
export function createOrder(value) {
    return authRequest('/orders',{
        method: 'post',
        data: value,
    })
}

//  微信cart 页获取课程及sku 信息
export function wxGetCourse(value) {
    return authRequest('/wx/courses/sku',{
        method: 'get',
    })
}

//  创建协议
export function createAgreement(value) {
    return authRequest('/agreements',{
        method: 'post',
        data: value,
    })
}

//  获取协议列表
export function getAgreements() {
    return authRequest('/agreements',{
        method: 'get',
    })
}

//  获取某个协议的详情
export function getAgreement(id) {
    return request('/agreements/'+id,{
        method: 'get',
    })
}


// 删除协议
export function delAgreement(id) {
    return authRequest('/agreements/'+id,{
        method: 'delete'
    })
}

// 修改协议
export function updateAgreement(id,value) {
    return authRequest('/agreements/'+id,{
        method: 'patch',
        data:value,
    })
}

//  创建教师
export function createTeacher(value) {
    return authRequest('/teachers',{
        method: 'post',
        data: value,
    })
}

// 修改教师信息
export function updateTeacher(id,value) {
    return authRequest('/teachers/'+id,{
        method: 'patch',
        data:value,
    })
}

//  获取教师列表
export function getTeachers() {
    return authRequest('/teachers',{
        method: 'get',
    })
}

// 删除教师
export function delTeacher(id) {
    return authRequest('/teachers/'+id,{
        method: 'delete'
    })
}

//  获取课程版本列表
export function getVersions(id) {
    return authRequest('/courses/'+id+'/versions',{
        method: 'get',
    })
}

//  切换课程版本
export function changeVersion(id) {
    return authRequest('/versions/'+id+'/chooseVersion',{
        method: 'get',
    })
}

// 删除教师
export function delVersion(id) {
    return authRequest('/versions/'+id,{
        method: 'delete'
    })
}


//  创建课程版本
export function createVersion(value) {
    return authRequest('/versions',{
        method: 'post',
        data: value,
    })
}

// 修改教师信息
export function updateVersion(id,value) {
    return authRequest('/versions/'+id,{
        method: 'patch',
        data:value,
    })
}

// 获取用户列表
export function getUsers(value) {
    return authRequest('/users?filter[id]='+value.id
        +'&filter[name]='+value.name
        +'&filter[create_before]='+value.createBefore
        +'&filter[create_after]='+value.createAfter
        +'&include=roles',{
        method: 'get',
    })
}


//  指派用户为管理员
export function toBeMaintainer(value) {
    return authRequest('/users/maintainer/',{
        method: 'post',
        data: value,
    })
}