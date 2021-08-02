<template>
    <el-form :model="sectionForm"
             ref="sectionForm" label-width="100px"
             class="demo-ruleForm text_content pre-break-line"
             style="width: 90%;"
    >
        <el-form-item label="内容形式" prop="type" >
            <el-radio-group
                    v-model="sectionForm.type"
            >
                <el-radio label="dialogue">对话</el-radio>
                <el-radio label="video">视频</el-radio>
                <el-radio label="audio">音频</el-radio>
                <el-radio label="graphic">图文</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="section内容" prop="markdown">
            <markdownEditor
                    :onchange="contentOnChange"
                    :init-data = "sectionForm.markdown"
                    v-if="sectionForm.type==='dialogue'"
            />
            <elUploads
                    v-if="sectionForm.type!=='dialogue'"
                    :lesson_id = sectionForm.lesson_id
                    :file_type = sectionForm.type
                    @uploadedFile = "getUploadedFileUrl"
                    style="height: 250px;"
            />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('sectionForm')">提交</el-button>
            <el-button @click="resetForm('sectionForm')">重置</el-button>
            <el-button @click="cancelShowInput()">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import markdownEditor from '@/views/admin/page/course/createSection/MarkdownEditor'
    import elUploads from '@/views/admin/common/elUploads'
    import {updateSection, createSection} from "../../../../../service/api";


    export default {
        name: "SectionTable",
        data(){
            return{
                sectionForm:{
                    type: '',
                    content: '',
                    markdown: '',
                    lesson_id: '',
                },
                contentInitData: '', //  markdown 初始值，修改时引入
                url_list: [],   //  传递图片预览地址
                rules: {
                    type: [
                        { required: true, message: '请选择section 类型', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请填写节的内容', trigger: 'blur' }
                    ],
                },

            }
        },
        components:{
            markdownEditor,
            elUploads,
        },
        props:{
            section: Object,
        },
        inject:['reload'],
        created(){
            if (this.section){
                this.sectionForm = this.section;
                this.rules = {};
            }else{
                this.sectionForm.lesson_id = parseInt(this.$route.query.lesson_id);
            }
        },
        methods:{
            contentOnChange: function({ markdown, html }) {
                this.sectionForm.markdown = markdown;
                this.sectionForm.content = html;
            },
            getUploadedFileUrl(data){
                this.sectionForm.content = data;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!this.section){
                            alert('此操作将会创建新的section!');
                            createSection(this.sectionForm).then(res=>{
                                this.cancelShowInput();
                                this.reload();
                                console.log(res);
                            }).catch(err=>{
                                console.log(err);
                            })
                        } else {
                            alert('此操作将会更新section!');
                            updateSection(this.section.id, this.sectionForm).then(res=>{
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
                this.resetForm('sectionForm');
                if (this.section){
                    this.$emit('shiftShowTable','update');
                }else{
                    this.$emit('shiftShowTable');
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