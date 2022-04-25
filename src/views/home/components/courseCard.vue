<template>
    <div class="course_card"
         @mouseenter="showLock=!showLock"
         @mouseleave="showLock=!showLock"
         @click="showCarousels"
    >
        <img  :src="Course.cover" alt="Excel实战训练营" class="course_card_bg">
        <div  class="unlock-card_mask" v-if="showLock && notInMyCourse">
            <div class="mask_lock">
                <i class="el-icon-sell"></i>
            </div>
            <!--<img  src="" alt="" class="mask_lock">-->
            <div  class="mask_message">解锁课程</div>
        </div>
        <div class="top">
            <div class="summary_btn" v-if="Course.label">{{Course.label}}</div>
            <div class="title">《 {{Course.title}}》</div>
        </div>
        <div class="content">
            <div class="content_text">{{Course.subtitle}}</div>
        </div>
        <div class="progress-bar-info" v-if="Course.progress">
            <div class="progress-bar-info-word">学习进度</div>
            <div class="progress-bar-container">
                <div class="progress-bar-rate-text">{{Course.progress}}</div>
                <div class="new-progress-bar">
                    <div class="new_move_progress" :style="{width: Course.progress}"></div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import bus from '@/views/admin/common/bus';

    export default {
        name: "courseCard",

        data(){
            return{
                showLock: false,
            }
        },

        props: {
            Course: Object,
            notInMyCourse: Boolean,
        },
        methods:{
            showCarousels(){
                if (this.notInMyCourse){
                    bus.$emit('showCarousels', this.Course )
                } else {
                    this.$router.push('/dashboard/progress?course_id='+this.Course.id)
                }

            }
        }
    }
</script>

<style scoped>
    .course_card {
        font-family: SourceHanSansCN;
        width: 19vw;
        min-height: 19.727vw;
        border-radius: .95vw;
        background: 50%/cover no-repeat;
        margin-bottom: 2.6vw;
        cursor: pointer;
        position: relative;
        background: #fff;
    }

    .course_card:hover {
        -webkit-box-shadow: 0 0 30px 0 rgba(56, 80, 97, 0.15);
        -moz-box-shadow: 0 0 30px 0 rgba(56, 80, 97, 0.15);
        box-shadow: 0 0 30px 0 rgba(56, 80, 97, 0.15);
        -webkit-transition: all 0.2s ease-out;
        transition: all 0.2s ease-out;
    }

    .course_card .course_card_bg {
        width: calc(100% + 2px);
        position: absolute;
        height: 10.5vw;
        border-radius: .95vw .95vw 5px 5px;
        top: 0;
        left: -1px;
        display: block;
    }

    .top {
        padding-top: 11.5vw;
        width: inherit;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        color: #0b0b0b;
    }

    .summary_btn {
        display: inline-block;
        font-size: .7292vw;
        font-weight: 600;
        letter-spacing: .05vw;
        line-height: 1.25vw;
        height: 1.25vw;
        color: #fff;
        background-color: #0F375A;
        border-radius: .3125vw;
        margin-left: 1vw;
        padding-left: .5208vw;
        padding-right: .5208vw;
        text-align: center;
        min-width: 5vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .title {
        font-family: SourceHanSansCN;
        font-size: 1.0417vw;
        margin-left: .5208vw;
        margin-right: .5208vw;
        color: #0F375A;
        font-weight: 600;
        width: 12.5vw;
        word-break: break-all;
        word-wrap: break-word;
    }

    .content {
        padding-top: .8vw;
        width: inherit;
    }

    .content_text {
        margin-left: 1.28vw;
        margin-right: 1vw;
        line-height: 1.2vw;
        letter-spacing: .07vw;
        color: #6c747a;
        font-size: .7292vw;
        font-family: SourceHanSansCN;
    }

    .progress-bar-info {
        padding-left: 1.28vw;
        padding-right: 1vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        margin-top: 1.0417vw;
    }

    .progress-bar-info-word {
        color: #6c747a;
        font-size: .625vw;
    }

    .progress-bar-container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .progress-bar-rate-text {
        color: #f26622;
        font-size: .625vw;
        margin-right: .5208vw;
    }

    .new-progress-bar {
        position: relative;
        width: 8.3333vw;
        height: .4167vw;
        border-radius: .2083vw;
        background: #eee;
    }

    .new_move_progress {
        height: .4167vw;
        background-color: #f26622;
        border-radius: .2083vw;
    }

    .unlock-card_mask {
        position: absolute;
        left: -1px;
        width: calc(100% + 2px);
        height: 10.5vw;
        border-radius: 0.95vw 0.95vw 0 0;
        background-color: rgba(0,0,0,0.7);
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .mask_lock {
        width: 2.0833vw;
        height: 2.0833vw;
        font-size: 2.0417vw;
    }

    .mask_message {
        font-weight: 700;
        font-size: 1.0417vw;
        margin-top: 0.5208vw;
        color: #fff;
    }
</style>