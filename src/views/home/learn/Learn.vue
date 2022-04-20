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


    <div class="main_wrap">
        <reLearnBtn
                v-on:relearn = relearn
        />
        <practiceProgress
                :progressData = progressData
        />
        <div  id="mainBox" class="content">
            <!--<div class="header"></div>-->
            <div >
                <div >
                    <div   class="text_node" v-for="section in sectionData">
                        <div class="icon_wrap">
                            <div  class="icon_avatar ban-select">
                                <img  :src="teacher.avatar">
                            </div>
                            <div  class="nickname">

                                {{teacher.nickname}}

                            </div>
                        </div>
                        <div  class="vertical_line"></div>
                        <div class="text_content pre-break-line markdown-body">
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
                    <!--<div  class="title_node">-->
                    <!--<div  class="icon_avatar ban-select">&lt;!&ndash;&ndash;&gt;</div>-->
                    <!--<div  class="title_content ban-select">-->
                    <!--&lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt;-->
                    <!--</div>-->
                    <!--</div>-->
                </div>
                <!----> <!----> <!----> <!---->

            </div> <!---->
            <div  id="SectionBottom" class="section_bottom" style="height: 252.661px;"></div>
        </div>
        <div  class="bottom_btn ban-select" style="" @click="sectionLearn">
            <div style="font-size: 1.5vw; color: #294354; font-weight: bolder; padding-right: 0.4vw">Enter</div>
            <img  src="/enter_icon.png" class="">
        </div>
        <div   class="catalog_main ban-select">
            <div  class="main_box">
                <div  class="catalog_wrap">
                    <div  class="catalog_body">
                        <div  class="footer"></div>
                    </div>
                </div>
            </div>
        </div>



        <!--资料下载&版本切换-->
        <fileAndVersionBtn
                :lesson =lesson
        />
    </div>

        <!--目录-->
        <rightSideContent
                :contentSections = contentSections
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
                sectionIndex: 0,
                sort: {},
                recordData: {},
                sectionsCount: '',    //  记录本节的总共section 数量，供计算进度使用
                progressData: '',
                continueLearn:true,   //出现习题时控制是否可以继续显示内容，回答正确后赋值为true，可继续学习
                learned:true,  //控制习题显示正确答案，如果已经学过的习题显示正确答案。
                contentSections:[]  // 记录本节目录信息
            }
        },
        created(){
            this.lesson_id = this.$route.query.lesson_id;
            this.course_id = this.$route.query.course_id;
            getLearnedSections(this.lesson_id).then(res=>{
                this.sectionData = res.sections;
                this.teacher = res.teacher;
                this.lesson = res.lesson;
                this.contentSections = res.contentSections;
                console.log(this.sectionData);
                getSectionsCount(this.lesson_id).then(res=>{
                    this.sectionsCount = res;
                    //  计算百分比
                    this.progressData = Math.round(this.sectionData.length/res * 100) / 1.00 + "%";
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
        methods: {
            sectionLearn() {
                if (this.continueLearn){   //判断是否可以继续学习
                    var showSection = this.resData[this.sectionIndex];

                    if (!showSection) {
                        //  TODO....完成学习的逻辑
                    } else {
                        // 判断当前准备学习的section和 sectionData 的最后一项是否相同。如果不一样，则可以插入；如果一样，说明网络未请求到学习数据。
                        var lastShowSection = this.sectionData[this.sectionData.length - 1];
                        if (showSection !== lastShowSection) {
                            //  往sectionData 内添加数据  即显示内容；
                            this.sectionData.push(showSection);

                            if (showSection.type === 'exercise'){   // 如果插入的是习题，那么禁用回车继续学习功能，直到答对或跳过为止
                                this.continueLearn = false;
                                this.learned = false;
                            }


                            //  计算百分比
                            this.progressData = Math.round(this.sectionData.length/this.sectionsCount * 100) / 1.00 + "%";

                            // 显示后，调用学习记录API
                            // if (lastShowSection) {    //记录上一次学习的内容（修复刷新后，习题未做完便跳转到下一个section的bug
                                this.recordData.section_id = showSection.id;
                                this.recordData.lesson_id = this.lesson_id;
                                setRecord(this.recordData).then(res => {
                                    console.log(res);
                                    // 对响应无需处理。
                                }).catch();
                            // }


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
                                        //  TODO/....完成学习的逻辑

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
                    //  1.2、 调用分布获取学习内容Api 获取学习内容
                    sectionLearn(this.lesson_id, this.sort).then(res => {
                        this.resData = res;
                        this.middleResData = res;
                    }).catch();

                    //  1.3、 将sectionData 置空（即不显示任何内容）
                    this.sectionData = [];
                    //  1.4、 将sectionIndex 置0,
                    this.sectionIndex = 0;
                }

            },

            // 继续学习机制
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
        height: 100%;
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

</style>


