<template>
    <div>
        <div class="periodBOXss cl-fss f-cbss">
            <span class="cclass f-flss">课时{{index+1}}</span>
            <span class="ccNumss f-flss"></span>

            <div class="f-flss j-addChapterss"
                 @mouseenter="showDealButton=!showDealButton"
                 @mouseleave="showDealButton=!showDealButton"
            >
                <div class="lessonsTitles">
                    {{lesson.title}}
                </div>


                <div class="dealButtons" v-show="showDealButton" >
                    <el-button icon="el-icon-arrow-up"></el-button>
                    <el-button icon="el-icon-arrow-down"></el-button>
                    <el-button @click="pushToCreateSectionPage">预览</el-button>
                    <el-button @click="showUpdateLesson=!showUpdateLesson">修改</el-button>
                    <el-button @click="handleDelLesson">删除</el-button>
                </div>

            </div>

        </div>

        <!--// 修改节的input框-->
        <div class="addLessonss">
            <div class="createchapterss cl-prss f-cbss" v-if="showUpdateLesson">
                <span class="cclass f-flss"></span>
                <span class="ccNumss f-flss"></span>
                <div  class="f-flss j-addChapterss">
                    <div >
                        <el-form :inline="true" :model="updateLesson" class="demo-form-inlines"
                                 abel-width="80px" style="width: 100%;">

                            <el-form-item label="课时名称" style="width: 70%;">
                                <el-input v-model="updateLesson.title" style="width: 300px"
                                          :placeholder=lesson.title
                                ></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="saveData">保存</el-button>
                                <el-button @click="cancelShowInput">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {delLesson,updateLesson} from "../../../../../service/api";

    export default {
        name: "LessonCard",
        data(){
            return {
                showDealButton:false,
                showUpdateLesson:false,
                updateLesson: {
                  title: '',
                  chapter_id: '',
                },

            }
        },

        props: {
            lesson: Object,
            index: Number,
        },

        inject: ['reload'],

        methods: {
            handleDelLesson(){
                delLesson(this.lesson.id).then(res=>{
                    console.log(res);
                    this.reload();
                }).catch(err=>{
                    console.log(err);
                })
            },

            saveData:function(){
                updateLesson(this.lesson.id,this.updateLesson).then(res=>{
                        this.cancelShowInput();
                        this.reload();
                        console.log(res);
                    }).catch(err=>{
                        console.log(err);
                    })

            },

            cancelShowInput(){
                    this.showUpdateLesson = false;
                    this.updateLesson.title = '';
            },

            pushToCreateSectionPage(){
                this.$router.push('/admin/createsection/'+this.lesson.id);
            }
        }
    }
</script>

<style scoped>
    .f-cbss, .f-cbliss li {
        zoom: 1;
    }

    .f-cbss:after, .f-cbliss li:after {
        display: block;
        clear: both;
        visibility: hidden;
        height: 0;
        overflow: hidden;
        content: ".";
    }

    .cclass{
        display: block;
        width: 38px;
        height: 40px;
        line-height: 30px;
        margin: 4px 0 0;
    }

    .periodBOXss  .cclass {
        color: #999;
        font-size: 12px;
        font-family: "宋体";
    }

    .ccNumss{
        background: url(//s.stu.126.net/res/images/createCourse/ui.png?f8f931864f66ffce077e676445f8d32b) no-repeat 4449px 4449px ;

        display: block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        background-position: 0 -26px;
        text-align: center;
        margin: 5px 10px 0 0;
    }

    .lessons .ccNumss,.addLessonss .ccNumss{
        background-position: -32px -20px;
    }


    .j-addChapterss{
        background-color: #fafafa;
        width: 554px;
        padding: 8px;
        margin-left: 20px;
    }


    .f-flss{
        float: left;
    }

    .cl-fss{
        clear: both;
    }


    .dealButtons{
        display: inline;
        float: right;
    }

    .lessonsTitles{
        display: inline;
    }
</style>