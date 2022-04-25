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
                <el-radio label="image">图片</el-radio>
                <el-radio label="downloadFile">下载</el-radio>
                <el-radio label="content1">1级目录</el-radio>
                <el-radio label="content2">2级目录</el-radio>
                <el-radio label="exercise">试题</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="section内容" prop="markdown">
            <markdownEditor
                    :onchange="contentOnChange"
                    :init-data = "markdownInitData"
                    v-if="sectionForm.type==='dialogue'
                    ||sectionForm.type==='content1'
                    ||sectionForm.type==='content2'"
            />
            <elUploads
                    v-if="sectionForm.type==='video'
                    ||sectionForm.type==='audio'
                    ||sectionForm.type==='graphic'
                    ||sectionForm.type==='image'
                    ||sectionForm.type==='downloadFile'"
                    :lesson_id = sectionForm.lesson_id
                    :file_type = type
                    @uploadedFile = "getUploadedFileUrl"
                    style="height: 250px;"
            />

            <!--试题添加表单-->
            <exerciseTable
                    v-if="sectionForm.type==='exercise'"
                    :exerciseId = exerciseId
                    @commitSectionTable = "commitSectionTable"
                    @cancelShowInput = cancelShowInput
            />


        </el-form-item>
        <el-form-item v-if="sectionForm.type!=='exercise'">
            <el-button type="primary" @click="submitForm('sectionForm')">提交</el-button>
            <el-button @click="resetForm('sectionForm')">重置</el-button>
            <el-button @click="cancelShowInput()">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import markdownEditor from '@/views/admin/page/course/createSection/MarkdownEditor'
    import exerciseTable from '@/views/admin/page/course/createSection/ExerciseTable'
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
                markdownInitData: '', //  markdown 初始值，修改时引入
                url_list: [],   //  传递图片预览地址
                exerciseId:'',
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
            exerciseTable,
        },
        props:{
            section: Object,
            sectionSort: Number,  //传递排序信息，如果存在则为插入section
        },
        computed:{
            type:function () {
                if (this.sectionForm.type === 'downloadFile') {
                    return 'image';
                }else{
                    return this.sectionForm.type;
                }

            }
        },
        inject:['reload'],
        created(){
            if (this.section){
                this.sectionForm = this.section;
                this.rules = {};
                this.markdownInitData = this.section.markdown;

                // 判断section类型是否为习题，如果是则传递习题的ID给习题表单，以便更新。否则习题均视为新建
                if (this.section.type === "exercise") {
                    this.exerciseId = this.sectionForm.content;
                }
            }else{
                this.sectionForm.lesson_id = parseInt(this.$route.query.lesson_id);
                if (this.sectionSort){
                    this.sectionForm.sort =this.sectionSort;
                }
            }
        },
        methods:{
            contentOnChange: function({ markdown, html }) {
                this.sectionForm.markdown = markdown;
                this.sectionForm.content = html;
            },
            getUploadedFileUrl(data){
                this.sectionForm.content = data;
                this.sectionForm.markdown = data;
            },

            //触发提交section的表单
            commitSectionTable(data){
                this.sectionForm.content = data.id;
                this.sectionForm.markdown = 'exercise '+data.id;
                this.submitForm('sectionForm');
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