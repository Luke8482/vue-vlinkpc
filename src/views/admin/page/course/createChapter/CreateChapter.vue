<template>
    <div>


    <div class="m-courseChapContent " style="display: block;">


        <!--自行设计开发-->
        <div class="container1">
            <!--<div class="ccNum" style="margin-top: 50px ;height:400px"> </div>-->
            <div class="chapterArea f-pr f-cb">
                <div class="line f-pa"></div><!--暂时忽略-->
                <div class="chapterList f-pr">

                    <ChapterCard
                            v-for="(chapter, index) in data"
                            :chapter = "chapter"
                            :index = index
                    />

                </div>
            </div>

            <div class="createchapter f-pr  f-cb">
                <span class="ccla f-fl"></span>
                <span class="ccNum f-fl"></span>

                <div class="f-fl j-addChapter" >
                    <div v-if="showCreateChapter" @click="showCreateChapter=!showCreateChapter">
                        <p class="addChapter" >
                            <em>+</em>
                            添加新章节
                        </p>
                    </div>

                    <!--点击后自动切换显示的内容-->
                    <div v-if="!showCreateChapter">
                        <el-form :inline="true" :model="chapter" class="demo-form-inline" label-width="80px" style="width: 100%;">

                                <el-form-item label="章节名称" style="width: 70%;">
                                    <el-input v-model="chapter.title" style="width: 300px"></el-input>
                                </el-form-item>



                            <el-form-item>
                                <el-button type="primary" @click="saveData">保存</el-button>
                                <el-button @click="cancelShowInput">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>

                </div>


            </div>
            <div class="cl-f"></div>

        </div>




    </div>

    </div>
</template>

<script>
    import ChapterCard from "./ChapterCard"
    import {createChapter,getchapters} from "../../../../../service/api";

    export default {
        name: "CreateChapter",
        data() {
            return {
                showCreateChapter:true,
                data: [],
                chapter: {
                    title: '',
                    course_id:'',

                }
            }
        },

        components:{
          ChapterCard,
        },

        created(){
          this.chapter.course_id = this.$route.params.course_id;
            getchapters(this.$route.params.course_id).then(res=>{
                this.data = res;
            })
        },

        methods:{
            saveData(){
                createChapter(this.chapter).then(res=>{
                    this.cancelShowInput();
                    this.data.push(res);
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                })

            },

            cancelShowInput(){
                this.showCreateChapter = true;
                this.chapter.title = '';
            }
        }

    }
</script>

<style scoped>
    .container1{
        background-color: #fff;
        width: 690px;
        margin: 0 auto;
    }


    .m-courseChapContent{
        width: 900px;
        margin: 0 auto 100px auto;
        background-color: white;
    }

    .chapterArea,.createchapter{
        /*max-width: 1205px;*/
        /*min-width: 960px;*/


    }

    .chapter {
        font-family: '微软雅黑';
        font-size: 15px;
        color: #666;
        margin: 0 0 15px;
        padding-top: 15px;
    }


    .line {
        border-left: 1px solid #dfdfdf;
        left: 52px;
        top: 30px;
        right: 500px;
        bottom: -20px;
        z-index: 0;
    }

    .f-pa{
        position: absolute;

    }

    .f-pr{
        position: relative;
    }

    .f-cb, .f-cbli li {
        zoom: 1;
    }

    .f-cb:after, .f-cbli li:after {
        display: block;
        clear: both;
        visibility: hidden;
        height: 0;
        overflow: hidden;
        content: ".";
    }

    .ccla{
        display: block;
        width: 38px;
        height: 40px;
        line-height: 30px;
        margin: 4px 0 0;
    }

    .periodBOX  .ccla {
        color: #999;
        font-size: 12px;
        font-family: "宋体";
    }

    .ccNum{
        background: url(//s.stu.126.net/res/images/createCourse/ui.png?f8f931864f66ffce077e676445f8d32b) no-repeat 4449px 4449px ;

        display: block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        background-position: 0 -26px;
        text-align: center;
        margin: 5px 10px 0 0;
    }

    .lesson .ccNum,.addLesson .ccNum{
        background-position: -32px -20px;
    }


    .j-addChapter{
        background-color: #fafafa;
        width: 554px;
        padding: 8px;
        margin-left: 20px;
    }

    .f-fl{
        float: left;
    }

    .cl-f{
        clear: both;
    }





    .addChapter{
        text-align: center;
        cursor: pointer;
    }
</style>

