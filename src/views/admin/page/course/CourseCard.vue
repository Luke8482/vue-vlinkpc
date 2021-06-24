<template>
    <div  class="course_card">
        <img
             :src="course.cover"
             alt="PPT实战训练营"
             class="course_card_bg"
        >

        <div class="top">
            <div class="summary_btn">
                {{course.label}}
            </div>
            <div class="title">
                {{course.title}}
            </div>
        </div>

        <div class="CourseContent" style=";">
            <div class="content_text">
                {{course.subtitle}}
            </div>
        </div>

        <div class="CourseContent">
            <div class="summary_btn" style="background-color: #b0b0b0;">
                {{course.price }}
            </div>
        </div>

        <div class="courses_button">
            <el-button type="primary" icon="el-icon-search" @click="pushToCreateChapterPage">预览章节</el-button>
            <el-button type="warning" icon="el-icon-edit" @click="updateCourse">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="open">删除</el-button>
        </div>

        <div class="progress-bar-info" style="display: none;">
            <div class="progress-bar-info-word">
                学习进度
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar-rate-text">
                    0%
                </div>

                <div class="new-progress-bar">
                    <div class="new_move_progress"></div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import {delCourses} from "@/service/api";

    export default {
        name: "CourseCard",
        props: {
            course: Object
        },

        inject: ['reload'],

        methods: {
            async handleDelCourse() {
                let res = await delCourses(this.course.id);
                return res;
            },

             open() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';

                            let res = this.handleDelCourse();
                            res.then((res)=>{

                                if (res.status===204){
                                    done();
                                    instance.confirmButtonLoading = false;
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                }
                                this.reload();
                            });

                        } else {
                            done();
                        }
                    },

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })

            },

            pushToCreateChapterPage(){
              this.$router.push('/admin/createChapter/'+this.course.id);
            },

            updateCourse(){
                this.$router.replace('/admin/'+this.course.id);
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

    .course_card .course_card_bg {
        width: 100%;
        position: absolute;
        height: 10.5vw;
        border-radius: .95vw .95vw 0 0;
        top: 0;
        left: 0;
    }

    .course_card .course_card_bg {
        width: 100%;
        position: absolute;
        height: 10.5vw;
        border-radius: .95vw .95vw 0 0;
        top: 0;
        left: 0;
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
        background-color: #159afa;
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
        color: #385061;
        font-weight: 600;
        width: 12.5vw;
        word-break: break-all;
        word-wrap: break-word;
    }

    .CourseContent {
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
        color: #24c7b5;
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
        background-color: #24c7b5;
        border-radius: .2083vw;
    }
    
    .courses_button {
        text-align: center;
        margin: 15px 0;
    }
</style>