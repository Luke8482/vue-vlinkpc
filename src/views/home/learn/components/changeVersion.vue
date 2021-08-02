<template>
    <div class="main_wrap" v-if="showChangeVersion">
        <div  class="feedback_root">
            <div  class="top_title">
                <div >切换课程版本</div>
                <div  class="x_btn" @click="showBtn">
                    <img  src="//cdn.pyhot.cn/app/program/resource/cdn/share_x_icon.59c12239bb382b7df8f8775ce46123fc.png">
                </div>
            </div>
            <div  class="top_part">
                <p  class="first_p">
                     您好,为了满足每个学员的学习需求，<br >我们制作了多个课程版本，方便您随时切换。<br >更换版本会重置本关的学习进度哦~
                </p>
                <div  class="filelist_title">
                    课程版本:
                </div>
                <div  class="my_feedback_wrap">
                    <div  class="my_feedback" v-for="version in versions">
                        <img  :src="lesson.cover" class="my_feedback_img">
                        <div  class="feedback_detail">
                            {{lesson.title}}-{{version.name}}版
                            <div  class="introduction"></div>
                        </div>
                        <div  class="switch-btn" @click="changeVersion(version.id)" v-if="!version.choosed">
                            <div >切换</div>
                        </div>
                        <el-button disabled  class="switch-btn" v-if="version.choosed" style="background-color:gainsboro; color: gray;">
                            <div >当前版本</div>
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div  class="mask"></div>
    </div>
</template>

<script>
    import bus from '@/views/admin/common/bus';
    import {getVersions, changeVersion} from "../../../../service/api";


    export default {
        name: "changeVersion",
        data(){
            return{
                showChangeVersion: false,
                lesson: {},  //  本节基本数据
                versions: [],  //  课程的版本信息
            }
        },
        inject: ['reload'],
        created(){
            bus.$on('showChangeVersion', msg=>{
                this.showChangeVersion = !this.showChangeVersion;
                this.lesson = msg[0];
                var course_id = msg[1];
                getVersions(course_id).then(res=>{
                    this.versions = res;
                    console.log(this.versions);
                }).catch(err=>{
                    console.log(err);
                });

            });

        },
        methods:{
            showBtn(){
                this.showChangeVersion = !this.showChangeVersion;
                bus.$emit('showBtn');
            },
            changeVersion(version_id){
                changeVersion(version_id).then(res=>{
                    this.reload();   //  切换完成后，刷新界面；
                }).catch(err=>{
                    console.log(err);
                })
            }
        }
    }
</script>

<style scoped>

    @media screen and (min-aspect-ratio: 5/4){
        .main_wrap {
            color: #c2c1c6;
            position: relative;
            top: 3vh;
            background-image: url(//cdn.pyhot.cn/app/program/resource/cdn/course_wrap.8372cbaf1559006ab0d15a5d8ac328fc.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            z-index: 5;
            width: 92%;
            height: 100%;
        }
    }

    .main_wrap {
        width: 33.46vw;
        height: 100vh;
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
    }

    .feedback_root {
        position: absolute;
        width: 23.46vw;
        height: 100%;
        background: #cdcc8e;
        top: 0;
        left: 0;
        z-index: 999;
    }
    .top_title {
        height: 4vw;
        font-size: 1.4vw;
        font-weight: 400;
        font-stretch: normal;
        letter-spacing: 0;
        color: #000;
        line-height: 1;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-bottom: .11vw solid rgba(10,8,15,.1);
        margin-right: .74vw;
        position: relative;
        font-weight: 600;
    }
    .x_btn {
        position: absolute;
        width: 1.17vw;
        height: 1.17vw;
        opacity: .5;
        right: .43vw;
        top: 45%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        cursor: pointer;
        z-index: 10;
    }
    .x_btn>img {
        width: 100%;
        height: 100%;
    }
    .top_part {
        position: relative;
        width: 100%;
        height: calc(100% - 7.1vw);
        overflow-y: auto;
    }
    .top_part::-webkit-scrollbar-thumb {
        background-color: rgba(0,0,0,.3);
        border-radius: .15vw;
    }

    .first_p {
        text-align: center;
        font-size: 1.06vw;
        font-weight: 400;
        line-height: 1.5;
        letter-spacing: 0;
        color: #000;
        margin-bottom: 3vw;
        position: relative;
    }
    p {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
    .filelist_title {
        font-size: .99vw;
        font-weight: 540;
        letter-spacing: 0;
        color: #000;
        line-height: 1;
        margin-left: 1.97vw;
        position: relative;
    }
    .my_feedback_wrap {
        margin: 0 1.2vw;
        position: relative;
        margin-top: 1vw;
        margin-bottom: 5vw;
    }
    .my_feedback {
        line-height: 1;
        position: relative;
        margin-bottom: .46vw;
        width: 19.21vw;
        height: 6.66vw;
        border-radius: 1vw;
        background-color: #dfde9d;
        -webkit-box-shadow: 0 0.1vw 0.42vw 0 rgba(15,13,11,.1);
        box-shadow: 0 0.1vw 0.42vw 0 rgba(15,13,11,.1);
    }
    .my_feedback {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
        padding: 1vw;
    }
    .my_feedback_img {
        width: 6vw;
    }
    .feedback_detail {
        font-weight: 600;
        line-height: 1vw;
        font-size: .99vw;
        color: #000;
        padding: .5vw;
        overflow: hidden;
        width: 70%;
    }
    .introduction {
        margin-top: .5vw;
        color: #6c747a;
        font-size: .8333vw;
    }
    .switch-btn {
        border-radius: .11vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        line-height: 1;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        position: absolute;
        right: 1.33vw;
        bottom: 1.1vw;
        width: 7.61vw;
        height: 2.03vw;
        background-color: #fcd17b;
        -webkit-box-shadow: 0.03vw 0.1vw 0.22vw 0 rgba(15,13,11,.2);
        box-shadow: 0.03vw 0.1vw 0.22vw 0 rgba(15,13,11,.2);
        font-size: .96vw;
        font-stretch: normal;
        letter-spacing: 0;
        color: rgba(0,0,0,.8);
        border-radius: .5vw;
    }
    .mask {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: transparent;
        z-index: 800;
    }
</style>