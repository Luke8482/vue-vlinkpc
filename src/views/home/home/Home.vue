<template>
    <div class="page-container">
        <div class="main_page main_background">
            <div class="top">
                <div class="page_header">
                    <div class="header-content">
                        <div class="header_left">
                            <img data-v-58fa0a4a="" src="//cdn.pyhot.cn/app/program/resource/cdn/logo_black.338832addf5132718d7245ac1a4700c4.png" class="triangle-icon">
                            <img data-v-58fa0a4a="" src="//cdn.pyhot.cn/app/program/resource/cdn/wechatlog.7b412cf0c3fb63567bb0ab4d8bbc1577.png" class="wx_icon">
                        </div>
                        <div>
                            <logoutButton/>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="top-container">
                        <div class="study-progress-container">
                            <div class="new-bottom-panel-btn punch-btn" @click="goToLearning">继续闯关</div>
                            <div class="hint-container">
                                <div class="hint-course-name">
                                    <div>最近解锁关卡</div>
                                </div>
                                <div class="hint-progress-name">
                                    <div>第{{lastLearnedLesson.sort}}关  {{lastLearnedLesson.title}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main-container">
                        <div class="user-info-wrapper">
                            <img :src="avatar" class="new-avator">
                        <div class="new-username" style="color: rgb(56, 80, 97);">{{username}}</div>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <div class="course_cards_section">
                    <div class="purchased_cards">
                        <div class="course-sort-title card_title">我的课程 ({{myCourseCount}})</div>
                        <div class="purchase_cards">
                            <course-card
                                    v-for="myCourse in coursesData.myCourses"
                                    :Course = "myCourse"
                                    :notInMyCourse = "false"
                            />
                        </div>
                        <div>
                            <div class="course-sort-title card_title">热门课程  ({{hotCourseCount}})</div>
                            <div class="purchase_cards">
                                <course-card
                                        v-for="hotCourse in coursesData.hotCourses"
                                        :Course = "hotCourse"
                                        :notInMyCourse = "true"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-container">
            <footerContainer :isShow="isShow"/>
        </div>
    </div>

</template>

<script>
    import logoutButton from './../components/logoutButton'
    import courseCard from './../components/courseCard'
    import FooterContainer from "../components/footerContainer";
    import ls from '@/utils/localStorage'

    import {getLastLearnedRecord, getHomeCourses} from "../../../service/api";

    export default {
        name: "Home",
        data(){
            return{
                isShow:false, //配置页面底部是否显示地址
                lastLearnedLesson: {},  // 登录用户最近学习记录
                coursesData: {},  // 课程数据
            }
        },
        components:{
            FooterContainer,
            logoutButton,
            courseCard,
        },
        created(){
            getLastLearnedRecord().then(res=>{
                this.lastLearnedLesson = res;
            });
            getHomeCourses().then(res=>{
                this.coursesData = res;
                console.log(res);
            })
        },
        computed: {
            username() {
                let user = ls.getItem('user');
                return user.name;
            },
            avatar(){
                let user = ls.getItem('user');
                return user.avatar;
            },
            myCourseCount(){
                let $count = 0;
                if (this.coursesData.myCourses) {
                    $count = this.coursesData.myCourses.length;
                }

                return $count;
            },
            hotCourseCount(){
                let $count = 0;
                if (this.coursesData.hotCourses) {
                    $count = this.coursesData.hotCourses.length;
                }

                return $count;
            }


        },
        methods:{
            goToLearning(){
                this.$router.replace('/dashboard/learn/'+this.lastLearnedLesson.id)
            }
        }

    }
</script>

<style scoped>
    .page-container {
        width: 100%;
        min-height: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
    }

    .main_background {
        background: #f5f5f5;
    }

    .main_page {
        color: #fff;
        font-family: SourceHanSansCN;
        width: 100%;
        position: relative;
        overflow: hidden;
        -webkit-box-flex: 1;
        -ms-flex: auto;
        flex: auto;
    }

    .page_header {
        font-family: SourceHanSansCN;
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        background: #fff;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    .header-content .header_left, .header-content .header_vip, .header-content {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }

    .header-content {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 60vw;
        height: 3.3333vw;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }

    .triangle-icon {
        width: 7.8125vw;
        height: 2.6042vw;
    }

    img {
        pointer-events: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .wx_icon {
        height: 2.6042vw;
        margin-left: 1vw;
    }

    .top-container {
        position: relative;
        width: 100%;
        background: #fff;
    }

    .study-progress-container {
        height: 5.5208vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
        width: 60vw;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        border-top: 1px solid #eee;
    }

    .punch-btn {
        color: #fff;
        background: -webkit-gradient(linear,left top,left bottom,from(#ffc937),to(#faac1c));
        background: linear-gradient(#ffc937,#faac1c);
    }

    .new-bottom-panel-btn {
        font-size: .93vw;
        width: 7.8125vw;
        font-weight: 600;
        letter-spacing: .048vw;
        height: 2.616vw;
        line-height: 2.616vw;
        text-align: center;
        border-radius: 1.289vw;
        cursor: pointer;
        margin-left: 2.0833vw;
    }

    .hint-container {
        margin-left: 1.0417vw;
    }

    .hint-course-name {
        color: #6c747a;
        font-size: .625vw;
    }

    .hint-progress-name {
        color: #385061;
        font-size: 1.0417vw;
        margin-top: .5208vw;
    }

    .main-container {
        position: relative;
        margin-top: 3.6458vw;
        width: 60vw;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
    }

    .user-info-wrapper {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
    }

    .magic_hat {
        width: 5vw;
        height: 4.2vw;
        position: absolute;
        top: -2vw;
        left: 1.4vw;
    }

    .new-avator {
        width: 5.2083vw;
        height: 5.2083vw;
        border-radius: 50%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: .3125vw solid #fff;
    }

    .new-username {
        font-size: 1.5625vw;
        padding-left: 1.0417vw;
        font-weight: 700;
        font-family: SourceHanSansCN;
    }

    .course_cards_section {
        position: relative;
        margin-top: 3.6458vw;
        width: 66vw;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        overflow-x: hidden;
    }

    .purchased_cards {
        padding: 0 3vw;
    }

    .course-sort-title {
        margin-bottom: 1.4vw;
        font-size: 1.0417vw;
        font-weight: 700;
        font-family: SourceHanSansCN;
    }

    .card_title {
        color: #385061;
    }

    .purchase_cards {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }

    .footer-container {
        height: 5vh;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background: #f5f5f5;
    }
</style>