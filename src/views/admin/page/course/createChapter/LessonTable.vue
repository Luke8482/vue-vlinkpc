<template>
    <div >
        <el-form :inline="true" :model="lessonForm" :rules="rules" ref="lessonForm"  class="demo-ruleForm "
                 label-width="80px" style="width: 100%;">

            <el-form-item label="课时名称"  prop="title">
                <el-input v-model="lessonForm.title" style="width: 300px"
                          :placeholder=lessonForm.title
                ></el-input>
            </el-form-item>

            <el-form-item label="副标题： "  prop="subtitile">
                <el-input v-model="lessonForm.subtitle" style="width: 300px"
                          :placeholder=lessonForm.subtitle
                ></el-input>
            </el-form-item>

            <el-form-item label="课时封面" prop="cover" style="width: 100%">
                <elUploads
                        :url_list = url_list
                        :course_id = course_id
                        :file_type = "'image'"
                        @uploadedFile = "getUploadedFileUrl"
                        style="height: 250px;"
                />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('lessonForm')">提交</el-button>
                <el-button @click="resetForm('lessonForm')">重置</el-button>
                <el-button @click="cancelShowInput()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {updateLesson, createLesson} from "../../../../../service/api";
    import elUploads from '@/views/admin/common/elUploads'


    export default {
        name: "LessonTable",
        data(){
            return {
                lessonForm: {
                    title: '',
                    subtitle: '',
                    cover: '',
                    chapter_id: '',
                },
                course_id: '',  //  course_id 传个上传组件
                url_list: [],   //  传递图片预览地址
                rules: {
                    title: [
                        { required: true, message: '请填写节的名称', trigger: 'blur' }
                    ],
                    subtitle: [
                        { required: true, message: '请填写节的副标题', trigger: 'blur' }
                    ],
                },

            }
        },
        props:{
            lesson: Object,
            chapter: Object,
        },
        components:{
            elUploads,
        },
        inject: ['reload'],
        created(){
            this.course_id = parseInt(this.$route.params.course_id);
            if (this.chapter){
                this.lessonForm.chapter_id = this.chapter.id;
            }
            if(this.lesson){
                this.lessonForm = this.lesson;
                this.url_list = [{url:this.lesson.cover}];
                this.rules = {};
            }
        },
        methods:{
            getUploadedFileUrl(data){
                this.lessonForm.cover = data;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!this.lesson){
                            alert('此操作将会创建新的节!');
                            createLesson(this.lessonForm).then(res=>{
                                this.cancelShowInput();
                                this.reload();
                                console.log(res);
                            }).catch(err=>{
                                console.log(err);
                            })
                        } else {
                            alert('此操作将会更新节!');
                            updateLesson(this.lesson.id, this.lessonForm).then(res=>{
                                this.cancelShowInput();
                                this.reload();
                                console.log(res);
                            }).catch(err=>{
                                console.log(err);
                            })
                        }


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            cancelShowInput(){
                this.resetForm('lessonForm');
                // if (this.version){
                //     this.$emit('unShowUpdateTable');
                // }
                this.$emit('shiftShowTable');
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
    }
</script>

<style scoped>

</style>