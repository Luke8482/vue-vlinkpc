<template>
    <!--顶部订单栏-->
    <div  class="lesson-title" >
        <div  class="title">
            <div class="title-content">
                <!---->
                <span >
                       《 {{lastLearnedLesson.course_title}} 》
                    </span>
            </div>
        </div>
        <div  id="progressRef">
            <div class="progress-wrap">
                <div  class="progress-bar">
                    <div  class="move-progress" :style="{width: lastLearnedLesson.course_progress}"></div>
                    <div class="progress-num" :style="{left: progressLeft}">
                        <span>{{lastLearnedLesson.course_progress}}</span>
                    </div>
                </div>
                <div class="divider"></div>
                <div  class="recent-level"  >
                    <div @click="goToLearning">
                        <div  class="button">继续闯关</div>
                    </div>
                    <div  class="level-hint-container">
                        <div >最近解锁关卡:&nbsp;</div>
                        <div  id="anchor_base">
                            第{{lastLearnedLesson.lesson.sort_int}}关  {{lastLearnedLesson.lesson.title}}
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div  class="fixed_progress"  v-show="showMiniHeader">

            <has_catalog_header />

            <div  class="fade-container" >
                <div  class="fade-content">
                    <div  class="fade-recent-level" >
                        <div @click="goToLearning">
                            <div  class="button">
                                继续闯关
                            </div>
                        </div>
                        <div  class="level-hint-container">
                            <div >
                                最近解锁关卡:&nbsp;
                            </div>
                            <div >
                                第{{lastLearnedLesson.lesson.sort_int}}关  {{lastLearnedLesson.lesson.title}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import has_catalog_header  from './../../has_catalog_header'
    import bus from '@/views/admin/common/bus';


    export default {
        name: "lesson-title",
        data(){
            return{
                progressLeft: '', // 控制进度条滑块的位置
                showMiniHeader: false,
            }
        },
        components:{
            has_catalog_header
        },
        props:{
            lastLearnedLesson: Object,
        },
        created(){
          this.progressLeft = 'calc('+this.lastLearnedLesson.course_progress+' - 2.6042vw)'
        },
        mounted () {
            window.addEventListener('scroll', this.handleScroll)
        },
        watch: {
            // 如果 `showMiniHeader` 发生改变，触发目录事件
            showMiniHeader: function () {
                bus.$emit('showMiniHeader');
            }
        },
        methods:{
            goToLearning(){
                console.log(this.lastLearnedLesson.lesson.id);
                this.$router.push('/dashboard/learn?course_id='+this.$route.query.course_id+'&lesson_id='+this.lastLearnedLesson.lesson.id)
            },

            //  处理头部栏，吸顶显示
            handleScroll () {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                let offsetTop = document.querySelector('#progressRef').offsetTop;
                if (scrollTop > offsetTop ){
                    this.showMiniHeader = true;
                } else  {
                    this.showMiniHeader = false;
                }
            },
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll)
        },
    }
</script>

<style scoped>


    .lesson-title {
        position: relative;
        width: 54.45vw;
        padding-bottom: 1vw;
        margin: 1.15vw auto 0;
    }

    .title {
        position: relative;
        color: #fff;
        display: block;
        border-radius: 1.58vw 1.58vw 0 0;
        height: 6.54vw;
        background-color: #0F375A;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        padding-left: 2.86vw;
    }

    .title-content {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .title div span {
        position: relative;
        font-size: 1.54vw;
        font-weight: 600;
        font-stretch: normal;
        line-height: 2.5vw;
        letter-spacing: .15vw;
        color: #fff;
    }

    .progress-wrap {
        position: relative;
        padding: 2.5vw 2.68vw 0;
        border-radius: 0 0 1.58vw 1.58vw;
        background-color: #fff;
    }

    .progress-bar {
        position: relative;
        width: 100%;
        height: .5208vw;
        background-color: #eee;
        border-radius: .32vw;
    }

    .move-progress {
        width: 0;
        height: .5208vw;
        background-image: -webkit-gradient(linear,right top,left top,from(#f26622),to(#ffd23b));
        background-image: linear-gradient(-90deg,#f26622,#ffd23b);
        border-radius: .32vw;
    }

    .progress-num {
        z-index: 2;
        font-weight: 600;
        width: 2.6042vw;
        position: absolute;
        height: 1.12vw;
        background: -webkit-gradient(linear,left top,left bottom,from(#f26622),to(#ffd23b));
        background: linear-gradient(#f26622,#ffd23b);
        border-radius: .2604vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        top: -.2208vw;
    }

    .progress-num>span {
        font-size: .57vw;
        font-weight: 700;
        font-stretch: normal;
        letter-spacing: 0;
        color: #fff;
    }

    .divider {
        background: #eee;
        height: 1px;
        width: 100%;
        margin-top: 2.4479vw;
        margin-bottom: 1.4063vw;
    }

    .recent-level {
        padding-bottom: 1.4583vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .fixed_progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        background-color: #fff;
        z-index: 20;
    }

    .goback {
        background-color: #fff;
        height: 3.3333vw;
    }

    .goback_content {
        width: 54.45vw;
        height: 100%;
        margin: 0 auto;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .icon {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        cursor: pointer;
    }

    .goback_icon {
        height: 20px;
        width: 20px;
    }

    img {
        pointer-events: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .goback_icon>img {
        width: 100%;
    }

    .goback_text {
        margin-left: .5vw;
        font-size: 1.0417vw;
        font-weight: 700;
        font-stretch: normal;
        color: #0F375A;
    }

    .btn {
        color: #1fae9d;
        padding: .3125vw 1.3542vw;
        font-size: .625vw;
        border-radius: .8333vw;
        border: 1px solid #1fae9d;
        display: inline-block;
        cursor: pointer;
        font-weight: 700;
    }



    .fade-container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-shadow: 0 1px 1px 1px #eee;
        box-shadow: 0 1px 1px 1px #eee;
    }

    .fade-content {
        width: 54.45vw;
    }

    .fade-recent-level {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: .9375vw 0;
        border-top: 1px solid #eee;
    }

    .button {
        border: 0;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        outline: none;
        padding: 0 1.8vw;
        background: -webkit-gradient(linear,left top,left bottom,from(#ffd23b),to(#f26622));
        background: linear-gradient(#ffd23b,#f26622);
        border-radius: 1.05vw;
        font-family: SourceHanSansCN;
        font-size: .9375vw;
        font-weight: 700;
        font-stretch: normal;
        letter-spacing: .19vw;
        color: #fefefe;
        line-height: 2.6042vw;
    }

    .level-hint-container {
        margin-left: 1.0417vw;
    }

    .level-hint-container>div:first-child {
        color: #6c747a;
        font-size: .625vw;
        font-family: SourceHanSansCN;
    }

    .level-hint-container>div:last-child {
        color: #385061;
        font-size: 1.0417vw;
        margin-top: .5208vw;
        font-family: SourceHanSansCN;
    }
</style>