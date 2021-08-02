<template>

            <!--章节（循环）-->
            <div class="m-createChapters" >
                <div class="chapters f-cbs">
                    <span class="cclas f-fls">章节</span>
                    <span class="ccNums f-fls">{{index+1}}</span>

                    <div class="f-fls j-addChapters"
                         @mouseenter="showDealButton=!showDealButton"
                         @mouseleave="showDealButton=!showDealButton"
                    >
                        <span>
                            {{chapter.title}}
                        </span>

                        <div class="dealButton" v-show="showDealButton" >
                            <el-button icon="el-icon-arrow-up"  @click="delUpdateSort('上移')"></el-button>
                            <el-button icon="el-icon-arrow-down"  @click="delUpdateSort('下移')"></el-button>
                            <el-button @click="showUpdateChapter = !showUpdateChapter">修改</el-button>
                            <el-button @click="handleDelChapter">删除</el-button>
                        </div>

                    </div>

                </div>
                <!--修改章的输入框-->
                <div class="createchapters f-prs  f-cbs" v-if="showUpdateChapter">
                    <span class="cclas f-fls"></span>
                    <span class="ccNums f-fls"></span>
                    <div class="f-fls j-addChapters" >
                        <div >
                            <el-form :inline="true" :model="updateChapter"
                                     class="demo-form-inlines"
                                     label-width="80px"
                                     style="width: 100%;">

                                <el-form-item label="章节名称" style="width: 70%;">
                                    <el-input v-model="updateChapter.title"
                                              style="width: 300px" :placeholder=chapter.title></el-input>
                                </el-form-item>



                                <el-form-item>
                                    <el-button type="primary" @click="saveData">保存</el-button>
                                    <el-button @click="cancelShowInput">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>

                </div>



                <!--节（循环）-->
                <LessonCard
                        class="lessons"
                        v-for="(lesson, index) in data"
                        :lesson = lesson
                        :index = index
                />


                <div class="addLessons">
                    <div class="createchapters cl-prs f-cbs">
                        <span class="cclas f-fls"></span>
                        <span class="ccNums f-fls"></span>
                        <div  class="f-fls j-addChapters">
                            <div  v-if="showCreateLesson"
                                 @click="showCreateLesson=!showCreateLesson" >
                                <p class="addChapters">
                                    <em>+</em>
                                    添加新课时
                                </p>
                            </div>

                            <LessonTable
                                    v-if="!showCreateLesson"
                                    :chapter = chapter
                                    v-on:shiftShowTable = "shiftShowTable()"
                            />
                        </div>
                    </div>
                </div>

            </div>

</template>

<script>
    import LessonCard from "./LessonCard"
    import LessonTable from "./LessonTable";

    import {createLesson,delChapters,updateChapter, updateChapterSort} from "@/service/api";


    export default {
        name: "ChapterCard",

        props: {
            chapter: Object,
            index: Number,
        },

        components:{
            LessonCard,
            LessonTable
        },

        inject: ['reload'],

        data(){
            return {
                showCreateLesson: true,
                showUpdateChapter: false,
                showDealButton:false,
                data: [],
                updateChapter: {
                    title: '',
                    course_id:'',
                },
                lesson: {
                    title: '',
                    chapter_id:'',

                },
                // 调整排序的API 的参数
                updateSort: {
                    type: '',
                    chapter_id: '',
                },
            }
        },


        created(){
          this.lesson.chapter_id = this.chapter.id;
          this.updateSort.chapter_id = this.chapter.id;
          this.updateChapter.course_id = this.chapter.course_id;
            if (this.chapter.lessons){
              this.data =this.chapter.lessons;
          }
        },

        methods:{
            saveData:function(type){
                if (type === "lessons"){
                    createLesson(this.lesson).then(res=>{
                        this.cancelShowInput("lessons");
                        this.data.push(res);
                        console.log(res);
                    }).catch(err=>{
                        console.log(err);
                    })
                } else {
                    updateChapter(this.chapter.id, this.updateChapter).then(res=>{
                        console.log(res);
                        this.cancelShowInput();
                        this.reload();

                    }).catch(err=>{
                        console.log(err);
                    })
                }


            },

            shiftShowTable(){
                this.showCreateLesson = !this.showCreateLesson;
            },

            cancelShowInput:function(type){
                if (type==="lessons"){
                    this.showCreateLesson = true;
                    this.lesson.title = '';
                } else {
                    this.showUpdateChapter = false;
                    this.updateChapter.title = '';

                }

            },

            delUpdateSort(type){
                this.updateSort.type = type;
                updateChapterSort(this.updateSort).then(res=>{
                    this.reload();
                }).catch(err=>{
                    console.log(err);
                })
            },

            handleDelChapter(){
                delChapters(this.chapter.id).then(res=>{
                    console.log(res);
                    this.reload();
                }).catch(

                )
            },
        }
    }
</script>

<style scoped>
    .chapterAreas,.createchapters{
        /*max-width: 1205px;*/
        /*min-width: 960px;*/


    }

    .chapters {
        font-family: '微软雅黑';
        font-size: 15px;
        color: #666;
        margin: 0 0 15px;
        padding-top: 15px;
    }


    .lines {
        border-left: 1px solid #dfdfdf;
        left: 52px;
        top: 30px;
        right: 500px;
        bottom: -20px;
        z-index: 0;
    }

    .f-pas{
        position: absolute;

    }

    .f-prs{
        position: relative;
    }

    .f-cbs, .f-cblis li {
        zoom: 1;
    }

    .f-cbs:after, .f-cblis li:after {
        display: block;
        clear: both;
        visibility: hidden;
        height: 0;
        overflow: hidden;
        content: ".";
    }

    .cclas{
        display: block;
        width: 38px;
        height: 40px;
        line-height: 30px;
        margin: 4px 0 0;
    }

    .periodBOXs  .cclas {
        color: #999;
        font-size: 12px;
        font-family: "宋体";
    }

    .ccNums{
        background: url(//s.stu.126.net/res/images/createCourse/ui.png?f8f931864f66ffce077e676445f8d32b) no-repeat 4449px 4449px ;

        display: block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        background-position: 0 -26px;
        text-align: center;
        margin: 5px 10px 0 0;
    }

    .lessons .ccNums,.addLessons .ccNums{
        background-position: -32px -20px;
    }


    .j-addChapters{
        background-color: #fafafa;
        width: 554px;
        padding: 8px;
        margin-left: 20px;
    }


    .f-fls{
        float: left;
    }

    .cl-fs{
        clear: both;
    }


    .addChapters{
        text-align: center;
        cursor: pointer;
    }

    .dealButton{
        display: inline;
        float: right;
    }

    button{
        padding: 5px 10px;
    }

    .lessonsTitle{
        display: inline;
    }


</style>