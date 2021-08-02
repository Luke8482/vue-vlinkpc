<template>
    <div>
        <!--新增teacher的表单-->
        <el-form :model="versionForm" :rules="rules"
                 ref="versionForm" label-width="100px"
                 class="demo-ruleForm text_content pre-break-line" style="width: 90%;">
            <el-form-item label="版本名称" prop="name" >
                <el-input v-model="versionForm.name" :placeholder = "versionUtil.name"></el-input>
            </el-form-item>
            <el-form-item label="版本类型" prop="type" >
                <el-input v-model="versionForm.type" :placeholder = "versionUtil.type"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('versionForm')">提交</el-button>
                <el-button @click="resetForm('versionForm')">重置</el-button>
                <el-button @click="cancelShowInput()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {createVersion, updateVersion} from "../../../../../service/api";

    export default {
        name: "VersionTable",
        data(){
            return{
                versionForm:{
                    name: '',
                    type: '',
                    course_id: '',
                },
                versionUtil:{
                    name: '',
                    type: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请填写版本名称', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请填写版本类型', trigger: 'blur' }
                    ],
                },
            }
        },
        inject:['reload'],
        props:{
            version: Object,
        },
        created(){
            if (!this.version){
                this.versionForm.course_id = this.$route.params.course_id;
            }else{
                this.versionUtil = this.version;
                this.rules = {};
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!this.version){
                            alert('此操作将会创建新的课程版本!');
                            createVersion(this.versionForm).then(res=>{
                                this.cancelShowInput();
                                this.reload();
                                console.log(res);
                            }).catch(err=>{
                                console.log(err);
                            })
                        } else {
                            alert('此操作将会更新版本!');
                            updateVersion(this.version.id, this.versionForm).then(res=>{
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
                this.resetForm('versionForm');
                // if (this.version){
                //     this.$emit('unShowUpdateTable');
                // }
                this.$emit('unShowUpdateTable');
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
    }
</script>

<style scoped>

</style>