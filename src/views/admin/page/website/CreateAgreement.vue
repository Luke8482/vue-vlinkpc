<template>
    <div>
        <!--新增agreement的表单-->
        <el-form :model="agreementForm" :rules="rules"
                 ref="agreementForm" label-width="100px"
                 class="demo-ruleForm text_content pre-break-line" style="width: 90%;">
            <el-form-item label="协议名称" prop="title" >
                    <el-input v-model="agreementForm.title"></el-input>
            </el-form-item>
            <el-form-item label="协议内容" prop="markdown">
                <markdownEditor
                        :onchange="contentOnChange"
                        :init-data = "initContent"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('agreementForm')">提交</el-button>
                <el-button @click="resetForm('agreementForm')">重置</el-button>
                <el-button @click="cancelShowInput()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    import markdownEditor from '@/views/admin/page/course/createSection/MarkdownEditor'
    import bus from '@/views/admin/common/bus'
    import {createAgreement, updateAgreement} from "../../../../service/api";

    export default {
        name: "CreateAgreement",
        data(){
            return{
                initContent: '',
                agreementForm:{
                    title: '',
                    content: '',
                    markdown: '',
                },
                rules: {
                    title: [
                        { required: true, message: '请填写协议名称', trigger: 'blur' }
                    ],
                    markdown: [
                        { required: true, message: '请填agreement内容', trigger: 'blur' }
                    ]
                },
            }
        },
        components:{
            markdownEditor,
        },
        inject:['reload'],
        props:{
          agreement: Object,
        },
        created(){
          if (this.agreement){
              this.agreementForm = this.agreement;
              this.initContent = this.agreement.markdown;
          }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!this.agreement){
                            alert('此操作将会创建新的协议!');
                            createAgreement(this.agreementForm).then(res=>{
                                this.cancelShowInput();
                                //调用bus的关闭当前标签功能
                                bus.$emit('close_current_tags');
                                this.$router.push('/admin/agreements');
                                console.log(res);
                            }).catch(err=>{
                                console.log(err);
                            })
                        } else {
                            alert('此操作将会更新协议!');
                            updateAgreement(this.agreement.id, this.agreementForm).then(res=>{
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
                this.resetForm('agreementForm');
                if (this.agreement){
                    this.$emit('unShowUpdateTable');
                }
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            contentOnChange: function({ markdown, html }) {
                this.agreementForm.markdown = markdown;
                this.agreementForm.content = html;
            },
        }
    }
</script>

<style scoped>

</style>