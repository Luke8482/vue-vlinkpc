<template>
    <div class="body"  >
    <!--头部内容-->
    <learnHeader
            :course_id = course_id
            :lesson = lesson

    />



    <!--<div>内容学习区-->
    <!--<div>进度组件</div>-->
    <!--<div>-->
    <!--<div>内容框架</div>-->
    <!--<div>内容组件</div>-->
    <!--</div>-->
    <!--<div>底部按钮</div>-->
    <!--<div>目录组件</div>-->
    <!--<div>下载按钮</div>-->
    <!--</div>-->


    <div class="main_wrap" ref="mainBox">
        <reLearnBtn
                v-on:relearn = relearn
        />
        <practiceProgress
                :progressData = progressData
        />


        <div  id="mainBox" class="content">
            <!--<div class="header"></div>-->

            <div >
                <div id="content">
                    <div
                           v-for="section in sectionData"
                           :class= "['text_node',section.type === 'image'
                           ||section.type === 'downloadFile'
                           ||section.type === 'video'
                           ||section.type === 'graphic'
                           ?'imageSection':'dialogueSection']"
                           :id = "'vlinkpc'+ section.id">
                        <div class="icon_wrap">
                            <div  class="icon_avatar ban-select">
                                <img  :src="teacher.avatar">
                            </div>
                            <div  class="nickname">

                                {{teacher.nickname}}

                            </div>
                        </div>
                        <div  class="vertical_line"></div>
                        <div class="text_content pre-break-line markdown-body" >
                            <div v-html="section.content" v-if="section.type ==='dialogue'"></div>
                            <videoBox v-if="section.type ==='video'" :content="section.content"/>
                            <audio  autoplay="" controls=""  v-if="section.type ==='audio'" style="width: 35vw;">
                                <source :src="section.content" />
                            </audio>
                            <pdfBox v-if="section.type ==='graphic'" :content="section.content"/>
                            <div class="demo-image__preview" v-if="section.type ==='image'" >
                                <el-image
                                        class="images"
                                        :src="section.content"
                                        :preview-src-list=[section.content]>
                                </el-image>
                            </div>
                            <div  v-if="section.type ==='downloadFile'"
                                  @click="downloadFile"
                            >
                                <el-image
                                        class="images-downloadFile"
                                        :src="section.content"
                                >
                                </el-image>
                            </div>
                            <div v-if="section.type === 'content1'"
                                 class="section_content"
                            >
                                <h3>{{section.markdown}}</h3>
                            </div>
                            <div v-if="section.type === 'content2'"
                                 class="section_content"
                            >
                                <h5>{{section.markdown}}</h5>
                            </div>
                            <exerciseBox
                                    v-if="section.type ==='exercise'"
                                    :exerciseId="section.content"
                                    :isLearningPage = 'true'
                                    :learned = "learned"
                                    v-on:continueLearning = continueLearning
                            />
                        </div>

                    </div>

                    <!--学习完成，跳转下一关按钮-->
                    <div class="_2YkAGZyGWj_HlqwLKJs-Yc _1b1IPQFbr_kkPFVhzFfDtf"
                         v-if="finishLearnd&&!finishedAll"
                    >
                        <div>下一关 &gt;&gt;&gt;</div>
                        <div class="_1Q1tqxXKpWiTTVZ3VTa2E1"
                             @click="learnNextLesson"
                        >
                            <img class="_2jKZPi31gbt6254PWqRUru" :src="nextLesson.cover" :alt="nextLesson.title">
                            <div class="_1AcqqNB8S_mBTSAa87zjAI">{{nextLesson.title}}</div>
                        </div>
                    </div>

                </div>
                <div  id="SectionBottom" class="section_bottom" style="height: 25vh;"></div>
            </div>

        </div>
        <div  class="bottom_btn ban-select" style="" @click="sectionLearn" v-if="!finishLearnd">
            <div style="font-size: 1.5vw; color: #294354; font-weight: bolder; padding-right: 0.4vw">Enter</div>
            <img  src="/enter_icon.png" class="">
        </div>

        <div  class="bottom_btn ban-select" style="" @click="learnNextLesson" v-if="finishLearnd">
            <div style="font-size: 1.5vw; color: #294354; font-weight: bolder; padding-right: 0.4vw"
                 v-if="!finishedAll"
            >下一关</div>
            <div style="font-size: 1.5vw; color: #294354; font-weight: bolder; padding-right: 0.4vw"
                 v-if="finishedAll"
            >已学完</div>
            <img  src="/enter_icon.png" class="">
        </div>



        <!--资料下载&版本切换-->
        <fileAndVersionBtn
                :lesson =lesson
        />
    </div>

        <!--目录-->
        <rightSideContent
                :contentSections = contentSections
                :notLearned = notLearned
                :bugfixed = bugfixed
        />
    </div>
</template>

<script>
    import bus from '@/views/admin/common/bus';
    import videoBox from '@/views/admin/common/VideoBox'
    import pdfBox from '@/views/admin/common/PdfBox'
    import exerciseBox from '@/views/admin/common/ExerciseBox'
    import learnHeader from './components/learnHeader'
    import practiceProgress from './components/practiceProgress'
    import reLearnBtn from './components/reLearnBtn'
    import rightSideContent from './components/rightSideContent'
    import changeVersion from './components/changeVersion'
    import fileAndVersionBtn from './components/fileAndVersionBtn'
    import Pubsub from 'pubsub-js'

    import {
        sectionLearn,
        setRecord,
        getLearnedSections,
        getSectionsCount
    } from "../../../service/api";

    export default {
        name: "Learn",
        components:{
            videoBox,
            pdfBox,
            learnHeader,
            practiceProgress,
            reLearnBtn,
            rightSideContent,
            changeVersion,
            fileAndVersionBtn,
            exerciseBox,
        },
        data(){
            return{
                lesson_id: '',
                course_id: '',
                resData: [],
                middleResData: [],
                sectionData: [],
                teacher: {},   //  课程相关教师信息
                lesson: {},  //  本节的信息
                nextLesson: {},  // 下一节信息
                sectionIndex: 0,
                sort: {},
                recordData: {},
                sectionsCount: '',    //  记录本节的总共section 数量，供计算进度使用
                progressData: '',
                continueLearn:true,   //出现习题时控制是否可以继续显示内容，回答正确后赋值为true，可继续学习
                learned:true,  //控制习题显示正确答案，如果已经学过的习题显示正确答案。
                contentSections:[],  // 记录本节目录信息
                notLearned: true,  //控制目录组件“序言 ”是否已学
                bugfixed: true,
                lastDomId:'',    //初步加载后，最后一个显示的dom id
                finishLearnd: false,  // 控制 本节 是否学完
                finishedAll: false,  // 控制 本课 是否学完
            }
        },
        inject:['reload'],
        created(){
            this.lesson_id = this.$route.query.lesson_id;
            this.course_id = this.$route.query.course_id;
            getLearnedSections(this.lesson_id).then(res=>{
                this.sectionData = res.sections;
                this.teacher = res.teacher;
                this.lesson = res.lesson;
                this.contentSections = res.contentSections;
                if (res.nextLesson !== null){
                    this.nextLesson = res.nextLesson;
                }

                //页面创建判断，是否已开始学过&给目录添加是否学过信息
                if (this.sectionData.length !== 0) {
                    this.notLearned = false;

                    // 页面加载完毕后定位到最后的section
                    this.lastDomId = 'vlinkpc'+this.sectionData[this.sectionData.length-1].id;

                }
                this.contentIsLearned();


                getSectionsCount(this.lesson_id).then(res=>{
                    this.sectionsCount = res;
                    //  计算百分比
                    this.progressData = Math.round(this.sectionData.length/res * 100) / 1.00 + "%";

                    // 如果学习进度为100%，那么进入页面后就已经学完了
                    if (this.sectionData.length === res){
                        this.finishLearnd = true;
                    }

                }).catch(err=>{
                    console.log(err);
                });
            }).catch(err=>{
                console.log(err);
            });

            sectionLearn(this.lesson_id).then(res=>{
                this.resData = res;
                this.middleResData = res;
                console.log(this.middleResData);

            }).catch(err=>{
                console.log(err);
            });

            // 键盘事件监听
            var _self = this;
            document.onkeyup = function (e) {
                var key = window.event.keyCode;
                if (key === 13 || key === 32) {
                    _self.sectionLearn();
                }
            }
        },
        mounted(){
            // 发布事件，供目录调用
            Pubsub.subscribe('scrollto',(msg,token)=>{
                this.scrollToTarget(token)
            });

        },

        // watch:{
        //     'sectionData':'scrollToBottom'
        // },
        updated(){
            // 更新界面时，定位到最后学习的section
            if (this.lastDomId !== '') {
                console.log(1);
                this.scrollToTarget(this.lastDomId);
            }

            // let element = document.getElementById("mainBox");
            // element.scrollTop = document.getElementById('content').scrollHeight;

            // this.$nextTick(()=>{
            //     let element = document.getElementById("mainBox");
            //     element.scrollTop = element.scrollHeight;
            //     console.log(2);
            //
            //     // this.$refs.mainBox.scrollTop = this.$refs.mainBox.scrollHeight;
            // });


        },

        methods: {
            sectionLearn() {
                if (this.continueLearn){   //判断是否可以继续学习
                    var showSection = this.resData[this.sectionIndex];

                    if (!showSection) {
                        this.finishLearnThisLesson();
                    } else {
                        // 判断当前准备学习的section和 sectionData 的最后一项是否相同。如果不一样，则可以插入；如果一样，说明网络未请求到学习数据。
                        var lastShowSection = this.sectionData[this.sectionData.length - 1];
                        if (showSection !== lastShowSection) {
                            //  往sectionData 内添加数据  即显示内容；
                            this.sectionData.push(showSection);
                            this.notLearned = false; // 控制目录里的序言为已学过

                            this.bugfixed = !this.bugfixed;  //辅助参数，解决更新了contentSections后，无法更新目录的bug
                            this.contentIsLearned();

                            if (showSection.type === 'exercise'){   // 如果插入的是习题，那么禁用回车继续学习功能，直到答对或跳过为止
                                this.continueLearn = false;
                                this.learned = false;
                            }

                            // 每次插入新的section，都要保证页面中央显示新section
                            this.lastDomId = 'SectionBottom';

                            // if (lastShowSection) {
                            //     this.scrollToTarget('vlinkpc'+lastShowSection.id);
                            // }



                            //  计算百分比
                            this.progressData = Math.round(this.sectionData.length/this.sectionsCount * 100) / 1.00 + "%";

                            // 显示后，调用学习记录API
                            this.recordData.section_id = showSection.id;
                            this.recordData.lesson_id = this.lesson_id;
                            setRecord(this.recordData).then(res => {
                                console.log(res);
                                // 对响应无需处理。
                            }).catch();


                            //  如果学习到当前resData 的第一项，那么就立即请求后端获取学习数据
                            if (this.sectionIndex === 0) {
                                this.sort.sort = this.resData[this.resData.length - 1].sort;
                                sectionLearn(this.lesson_id, this.sort).then(res => {
                                    this.middleResData = res;
                                }).catch();
                            }

                            //  如果学习到当前 resData 的最后一项，需要判断resData 和middleResData 是否相等，相等则说明是第一次学习，不需要处理；  不等则判断是否为空，为空则说明已经学习完毕。
                            if (this.sectionIndex === 5) {
                                if (this.resData !== this.middleResData) {
                                    if (this.middleResData === null) {
                                        this.finishLearnThisLesson();
                                    } else {
                                        this.resData = this.middleResData;
                                        this.sectionIndex = 0;
                                    }
                                }

                            } else {
                                this.sectionIndex++;
                            }
                        } else {   // 未及时请求到数据，则需要判断是否请求到了数据，请求得到数据后对数据进行操作

                            //  解决网络延迟，造成学习无法继续bug
                            if (this.resData !== this.middleResData) {
                                this.resData = this.middleResData;
                                this.sectionIndex = 0;
                            }

                        }

                    }
                }

            },


            //  重新学习的逻辑
            relearn(){
                this.continueLearn = true; //修复学习到习题后，点击“重新学习”无法继续学习的Bug
                //  只有学过内容，才能调用重学机制
                if (this.sectionData !== []){
                    //  1.1、获取本节第一个section 对应的sort 值
                    this.sort.sort = this.sectionData[0].sort-1;
                    //  1.2、 调用分步获取学习内容Api 获取学习内容
                    sectionLearn(this.lesson_id, this.sort).then(res => {
                        this.resData = res;
                        this.middleResData = res;
                    }).catch();

                    //  1.3、 将sectionData 置空（即不显示任何内容）
                    this.sectionData = [];

                    this.contentIsLearned();  // 控制目录显示样式
                    this.notLearned = true;

                    this.finishLearnd = false;
                    this.finishedAll = false;
                    this.lastDomId = '';

                    //  1.4、 将sectionIndex 置0,
                    this.sectionIndex = 0;
                }

            },

            // 继续学习机制 (遇到习题，被锁定）
            continueLearning(value){
                this.continueLearn = true;
                if (value = true) {
                    this.sectionLearn();
                }
            },

            // 练习文件下载逻辑
            downloadFile(){
                bus.$emit('downloadFile')
            },

            // 控制目录是否显示学过的样式
            contentIsLearned(){
                var i = 0;
                var section = {};
                var contentSection = {};
                for (i; i < this.contentSections.length; i++) {
                    contentSection = this.contentSections[i];
                    this.contentSections[i].notLearned = true;

                    var j = 0;
                    for (j; j < this.sectionData.length; j++) {
                        section = this.sectionData[j];
                        if(contentSection.id === section.id){
                            this.contentSections[i].notLearned = false;
                            break;
                        }
                    }

                }


            },

            // 滚动到对应位置
            scrollToTarget(token){
                let element = document.getElementById("mainBox");
                let height = document.getElementById(token).offsetTop;
                element.scroll({
                    top: height, //向上移动的距离，如果有fixede布局， 直接减去对应距离即可
                    behavior: 'smooth', // 平滑移动
                });
            },

            scrollToBottom(){
                this.$nextTick(()=>{
                    let element = document.getElementById("mainBox");
                    element.scrollTop = element.scrollHeight;
                    console.log(2);

                    // this.$refs.mainBox.scrollTop = this.$refs.mainBox.scrollHeight;
                });
            },

            // 进入下一关学习
            learnNextLesson(){
                console.log(JSON.stringify(this.nextLesson) !== {});
                if (JSON.stringify(this.nextLesson) !== {}) {
                    this.$router.replace('/dashboard/learn?course_id='+this.course_id+'&lesson_id='+this.nextLesson.id);
                    this.reload();
                } else {
                    // 学完本课跳转回进度页
                    this.$router.replace('/dashboard/progress?course_id='+this.course_id);
                }

            },

            // 学习完本节Section，后的处理逻辑
            finishLearnThisLesson(){
                this.finishLearnd = true;
                if (JSON.stringify(this.nextLesson) === '{}') {
                    this.finishedAll = true;
                }
            }



        }
    }
</script>

<style scoped>
    /*主体框架样式*/
    .body{
        background-image: url(/learnPageBackground1.png);
        width: 100%;
        height: 100vh;/*TODO*/
        position: relative;
        background-color: #0a080f;
        /*background-color: #19181e;*/
        display: -webkit-box;
        display: -ms-flexbox;
         -webkit-box-pack: start;
        display: flex;
         -ms-flex-pack: start;
        justify-content: flex-start;
         -webkit-box-align: start;
         -ms-flex-align: start;
        align-items: flex-start;
        background-size: 91.5% 95%;
        background-repeat: no-repeat;
        background-position-x: 100%;
        background-position-y: 130%;
        overflow: hidden;
        /*color: red; !*TODO*!*/




    }



    /*内容区样式*/
    .main_wrap {
        color: #c2c1c6;
        position: relative;
        top: 6vh;
        background-image: url(/learnPageBackground2.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        z-index: 15;
        width: 92%;
        height: 94vh;
    }

    /*显示区样式*/
    .content {
        overflow-y: scroll;
        overflow-x: hidden;
        height: 98%;
        padding-top: 1.24vw;
        margin: 0 auto;
        position: relative;
        top: .3vw;
        margin-right: 6vw;
        padding-left: 8vw;
    }

    .content::-webkit-scrollbar {
        width: 15px;
    }

    ::-webkit-scrollbar {
        background-color: transparent;
        width: 10px;
    }

    .content::-webkit-scrollbar-thumb {
        height: 2vw;
        background-color: rgba(47,46,54,.8);
    }

    ::-webkit-scrollbar-thumb {
        background-color: #9aa5ad;
        border-radius: .15vw;
        width: 10px;
    }

    .header {
        height: 3vw;
        width: 100%;
    }

    .text_node {
        left: 3vw;
    }

    .text_node {
        margin-top: 6vh;
        margin-bottom: 1vh;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
         -webkit-box-pack: start;
         -ms-flex-pack: start;
        justify-content: flex-start;
         -webkit-box-align: center;
         -ms-flex-align: center;
        align-items: center;
        position: relative;
    }

    .icon_avatar,.icon_wrap {
        align-self: flex-start;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
         -webkit-box-pack: center;
        justify-content: center;
         -webkit-box-align: center;
        align-items: center;
    }

    .icon_avatar {
        width: 1.55vw;
        height: 1.55vw;
        border-radius: 1.55vw;
         -ms-flex-item-align: start;
        position: relative;
        background: #fff;
        border: 1px solid #fcd17b;
         -ms-flex-align: center;
         -ms-flex-pack: center;
    }

    .icon_avatar>img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }

    .christmashat {
        position: absolute;
        top: -1vw;
        left: .5vw;
         -webkit-transform: rotate(10deg);
        transform: rotate(10deg);
    }

    img {
        pointer-events: none;
         -webkit-user-select: none;
         -webkit-touch-callout: none;
         -moz-user-select: none;
         -ms-user-select: none;
        user-select: none;
    }

    .nickname {
        position: absolute;
        top: 1.65vw;
        font-size: 12px;
        width: 3vw;
        text-align: center;
        color: hsla(0,0%,100%,.4);
    }

    .vertical_line {
        width: 2px;
        height: 100%;
        border-radius: .1vw;
        position: absolute;
        background-color: #fcd17b;
        left: 2.4vw;
    }

    .text_content {
        max-width: 90%;
        margin-left: .8vw;
        line-height: 2;
        margin-top: .2vw;
        margin-bottom: .2vw;
        font-family: inherit;
        font-size: 20px;
        letter-spacing: 0;
        color: silver;
        font-weight: lighter;
    }

    .pre-break-line {
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
    }

    pre {
        display: block;
        font-family: monospace;
        white-space: pre;
        margin: 1em 0px;
    }


    /*title node*/
    .title_node {
        left: 3vw;
    }

    .title_node {
        margin-bottom: 2vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
         -webkit-box-pack: start;
         -ms-flex-pack: start;
        justify-content: flex-start;
         -webkit-box-align: center;
         -ms-flex-align: center;
        align-items: center;
        position: relative;
    }

    .icon_avatar {
        width: 1.55vw;
        margin-right: .52vw;
    }


    .ban-select {
        moz-user-select: -moz-none;
         -moz-user-select: none;
         -o-user-select: none;
         -webkit-user-select: none;
         -ms-user-select: none;
        user-select: none;
    }

    .title_content {
        margin-left: .8vw;
        line-height: 2;
        max-width: 55vw;
        color: #ffcb7c;
        font-weight: 550;
    }

    .ban-select {
        moz-user-select: -moz-none;
         -moz-user-select: none;
         -o-user-select: none;
         -webkit-user-select: none;
         -ms-user-select: none;
        user-select: none;
    }

    .section_bottom {
        width: 100%;
    }

    /*按钮*/
    .bottom_btn>div, .bottom_btn {
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

    .bottom_btn {
        position: fixed;
        bottom: 0;
        left: 50%;
         -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        cursor: pointer;
        z-index: 799;
        background-image: url(/enterBtn2.png);
        background-repeat: no-repeat;
        background-size: cover;
        width: 24.58vw;
        height: 3.27vw;
    }

    .ban-select {
        moz-user-select: -moz-none;
         -moz-user-select: none;
         -o-user-select: none;
         -webkit-user-select: none;
         -ms-user-select: none;
        user-select: none;
    }

    .bottom_btn>img {
        width: 2vw;
    }

    img {
        pointer-events: none;
         -webkit-user-select: none;
         -webkit-touch-callout: none;
         -moz-user-select: none;
         -ms-user-select: none;
        user-select: none;
    }

    .bottom_btn_hover>div, .bottom_btn_hover {
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

    .bottom_btn_hover {
        position: fixed;
        bottom: 0;
        left: 50%;
         -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        cursor: pointer;
        background-image: url(/enterBtn.png);
        background-repeat: no-repeat;
        background-size: cover;
        width: 24.58vw;
        height: 3.27vw;
        z-index: 999;
    }

    .bottom_btn_hover>img {
        width: 2vw;
    }

    /*分类目录样式*/
    .catalog_main {
        position: absolute;
        max-height: 82%;
        right: -8vw;
        z-index: 10;
        top: 21%;
        overflow-y: scroll;
        z-index: 1;
        overflow-x: hidden;
    }

    .ban-select {
        moz-user-select: -moz-none;
         -moz-user-select: none;
         -o-user-select: none;
         -webkit-user-select: none;
         -ms-user-select: none;
        user-select: none;
    }

    .main_box {
        height: 100%;
        position: relative;
        overflow-x: hidden;
    }

    .catalog_wrap {
        width: 13.35vw;
    }

    .catalog_body {
        position: relative;
        color: #c2c1c6;
        letter-spacing: 0;
    }

    .footer {
        height: 3vw;
    }



    /*自行设计*/
    .images{
        border-radius: 10px;
        max-width: 60vw;
    }
    .images-downloadFile{
        border-radius: 10px;
        max-width: 60vw;
        cursor: pointer;
    }
    .section_content{
        color: rgba(255,204,51);
    }

    ._2YkAGZyGWj_HlqwLKJs-Yc {
        margin: 3vh 5vw;
    }

    ._1b1IPQFbr_kkPFVhzFfDtf {
        color: #fff;
    }

    ._1Q1tqxXKpWiTTVZ3VTa2E1 {
        position: relative;
        width: 18vw;
        margin-top: 8px;
        cursor: pointer;
    }

    ._2jKZPi31gbt6254PWqRUru {
        width: 100%;
        border-radius: 16px;
    }

    img {
        vertical-align: middle;
        border-style: none;
    }

    ._1AcqqNB8S_mBTSAa87zjAI {
        position: absolute;
        top: 16px;
        right: 16px;
        left: 16px;
        padding: 0 16px;
        color: #385061;
        font-weight: bolder;
        font-size: 18px;
        line-height: 30px;
        background-color: #fff;
        border-radius: 15px;
    }
    .imageSection:last-child{
        min-height: 50vh;
    }
    .dialogueSection:last-child{
        margin-bottom: 10vh;
    }




</style>


