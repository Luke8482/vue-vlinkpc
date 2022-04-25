<template>
    <div id="main_practice_header" class="top_tab">
        <div class="goback" @click="goToProgress">
            <div class="goback_origin">返回</div>
        </div>
        <div class="level_detail current_practice">
            <div class="level_num">
                <span class="level_index">{{lesson.sort_int}}</span>
            </div>
            <div title="" class="level_name">
                第{{lesson.sort_int}}关 {{lesson.title}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "learnHeader",
        props:{
            course_id: String,
            lesson: Object,
        },
        methods:{
            goToProgress(){
                console.log(this.course_id);
                this.$router.push('/dashboard/progress?course_id='+this.course_id)
            }
        }
    }
</script>

<style scoped>
    /*头部样式*/
    .goback, .top_tab {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .top_tab {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 10;
        background-color: #0a080f;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        width: 100%;
        height: 6vh;
        font-size: .8vw;
        font-weight: 400;
        font-stretch: normal;
        letter-spacing: .04vw;
        color: #fff;
    }

    .goback {
        cursor: pointer;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        position: absolute;
        left: 1.19vw;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        background: url(/back.png);
        background-size: cover;
        background-repeat: no-repeat;
        width: 4.3vw;
        height: 2.05vw;
    }

    .goback_origin {
        position: relative;
        left: 4.2vw;
        word-break: keep-all;
        color: #fff;
        font-size: 1vw;
        line-height: 1;
    }



    .level_detail {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        margin-right: .85vw;
        background: url(/headTitle.png);
        background-size: 100% 70%;
        background-position-y: 70%;
        background-repeat: no-repeat;
        height: 6vh;
        cursor: pointer;
        padding-left: 2vw;
        padding-right: 2vw;
    }

    .level_num {
        margin-top: .6vh;
        text-align: center;
        line-height: 1.24vw;
        z-index: 1;
        width: 1.71vw;
        height: 1.62vw;
        opacity: .8;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .level_index, .level_index_lock {
        font-size: 1.02vw;
        line-height: 1.62vw;
        color: #484750;
        width: 1.49vw;
        height: 1.3vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .level_index {
        background: url(/titleIndex.png);
        background-size: cover;
        background-repeat: no-repeat;
    }

    .level_name {
        margin-top: .5vh;
        margin-left: .6vw;
        z-index: 1;
        color: #e7e7ea;
        opacity: .7;
        font-size: 1.02vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>