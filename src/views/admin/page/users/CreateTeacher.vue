<template>
    <div>
        <!--新增teacher的表单-->
        <el-form :model="teacherForm" :rules="rules"
                 ref="teacherForm" label-width="100px"
                 class="demo-ruleForm text_content pre-break-line" style="width: 90%;">
            <el-form-item label="教师昵称" prop="nickname" >
                <el-input v-model="teacherForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="教师简介" prop="introduction" >
                <el-input v-model="teacherForm.introduction"></el-input>
            </el-form-item>
            <el-form-item label="教师头像" prop="avatar">
                <elUploads
                        :file_type = "'image'"
                        @uploadedFile = "getUploadedFileUrl"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('teacherForm')">提交</el-button>
                <el-button @click="resetForm('teacherForm')">重置</el-button>
                <el-button @click="cancelShowInput()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import elUploads from '@/views/admin/common/elUploads'
    import bus from '@/views/admin/common/bus'
    import {createTeacher, updateTeacher} from "../../../../service/api";

    export default {
        name: "CreateTeacher",
        data(){
            return{
                teacherForm:{
                    nickname: '',
                    introduction: '',
                    avatar: '',
                },
                rules: {
                    nickname: [
                        { required: true, message: '请填写教师昵称', trigger: 'blur' }
                    ],
                    introduction: [
                        { required: true, message: '请填写教师简介', trigger: 'blur' }
                    ],
                    avatar: [
                        { required: true, message: '请填上传头像', trigger: 'blur' }
                    ]
                },
            }
        },
        components:{
            elUploads
        },
        inject:['reload'],
        props:{
           teacher: Object,
        },
        created(){
            if (this.teacher){
                this.teacherForm = this.teacher;
            }
        },
        methods:{
            getUploadedFileUrl(data){
                this.teacherForm.avatar = data;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!this.teacher){
                            alert('此操作将会创建新的教师信息!');
                            createTeacher(this.teacherForm).then(res=>{
                                this.cancelShowInput();
                                //调用bus的关闭当前标签功能
                                bus.$emit('close_current_tags');
                                this.$router.push('/admin/teachers');
                                console.log(res);
                            }).catch(err=>{
                                console.log(err);
                            })
                        } else {
                            alert('此操作将会更新教师信息!');
                            updateTeacher(this.teacher.id, this.teacherForm).then(res=>{
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
                this.resetForm('teacherForm');
                if (this.teacher){
                    this.$emit('unShowUpdateTable');
                }
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }


    }
</script>

<style scoped>

</style>