<template>
    <div   class="text_nodes"  >
        <div class="icon_wraps">
            <div  class="icon_avatars ban-selects">
                <img  src="https://public-milk.oss-cn-hangzhou.aliyuncs.com/program_public/user_upload/a281c1795df306619a8c740317b7298e/形象照1.png">
            </div>
            <div  class="nicknames">

                表姐

            </div>
        </div>
        <div  class="vertical_lines"></div>
        <div
                @mouseenter="showDealButton=!showDealButton"
                @mouseleave="showDealButton=!showDealButton"
                class="text_contents pre-break-lines markdown-body"
                v-if="!showUpdateSection && !showInsertSection"
        >
            <div v-html="section.content" v-if="section.type ==='对话'"></div>
            <videoBox v-if="section.type ==='video'" :content="section.content"/>
            <audio  autoplay="" controls=""  v-if="section.type ==='audio'" style="width: 35vw;">
                <source :src="section.content" />
            </audio>
            <pdfBox v-if="section.type ==='graphic'" :content="section.content"/>

            <div class="text_contents"  v-show="showDealButton" style="width: 500px">
                <el-button icon="el-icon-arrow-up" @click="delUpdateSort('上移')"></el-button>
                <el-button icon="el-icon-arrow-down" @click="delUpdateSort('下移')"></el-button>
                <el-button @click="showInsertSection=!showInsertSection">插入</el-button>
                <el-button @click="showUpdateSection=!showUpdateSection">修改</el-button>
                <el-button @click="handleDelSection">删除</el-button>
            </div>
        </div>

        <!--插入section 的表单-->
        <el-form :model="insertSectionForm"
                 ref="sectionForm" label-width="100px"
                 class="demo-ruleForm text_content pre-break-line"
                 style="width: 90%;"
                 v-if="showInsertSection"
        >
            <el-form-item label="内容形式" prop="type" >
                <el-radio-group
                        v-model="insertSectionForm.type"
                >
                    <el-radio label="dialogue">对话</el-radio>
                    <el-radio label="video">视频</el-radio>
                    <el-radio label="audio">音频</el-radio>
                    <el-radio label="graphic">图文</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="section内容" prop="markdown">
                <markdownEditor
                        :onchange="insertContentOnChange"
                        v-if="insertSectionForm.type==='dialogue'"
                />
                <elUploads
                        v-if="insertSectionForm.type!=='dialogue'"
                        :lesson_id = insertSectionForm.lesson_id
                        :file_type = insertSectionForm.type
                        @uploadedFile = "getUploadedFileUrl"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('插入')">立即插入</el-button>
                <el-button @click="resetForm('sectionForm')">重置</el-button>
                <el-button @click="cancelShowInput('插入')">取消</el-button>
            </el-form-item>
        </el-form>

        <!--修改表单-->
        <el-form :model="updateSectionForm"
                 ref="sectionForm" label-width="100px"
                 class="demo-ruleForm text_content pre-break-line"
                 style="width: 90%;"
                 v-if="showUpdateSection"
        >
            <el-form-item label="内容形式" prop="type" >
                <el-radio-group
                        v-model="updateSectionForm.type"
                >
                    <el-radio label="对话"></el-radio>
                    <el-radio label="视频"></el-radio>
                    <el-radio label="音频"></el-radio>
                    <el-radio label="图文"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="section内容" prop="markdown">
                <markdownEditor
                        :onchange="contentOnChange"
                        :init-data = "contentInitData"
                        v-if="updateSectionForm.type==='对话'"
                />
                <elUploads/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('修改')">立即修改</el-button>
                <el-button @click="resetForm('sectionForm')">重置</el-button>
                <el-button @click="cancelShowInput('更新')">取消</el-button>
            </el-form-item>
        </el-form>


    </div>
</template>

<script>
    import markdownEditor from '@/views/admin/page/course/createSection/MarkdownEditor'
    import elUploads from '@/views/admin/common/elUploads'
    import videoBox from '@/views/admin/common/VideoBox'
    import pdfBox from '@/views/admin/common/PdfBox'
    import {delSection, updateSection, updateSort, createSection} from "../../../../../service/api";

    export default {
        name: "SectionCard",
        data(){
            return {
                showDealButton: false,
                showUpdateSection: false,
                showInsertSection: false,
                updateSectionForm:{
                    type: '',
                    markdown: '',
                    content: '',
                },

                insertSectionForm:{
                    type: 'dialogue',
                    markdown: '',
                    content: '',
                    lesson_id: '',
                    sort: '',
                },
                // 调整排序的API 的参数
                updateSort: {
                    type: '',
                    section_id: '',
                },
                contentInitData: undefined,
            }
        },
        components:{
            markdownEditor,
            elUploads,
            videoBox,
            pdfBox,
        },
        props:{
            section: Object,
        },
        inject:['reload'],
        created(){
            if (this.section.type==='对话') {
                this.updateSectionForm.type = this.section.type;
                this.contentInitData = this.section.markdown;
            }

            this.updateSort.section_id = this.section.id;
            this.insertSectionForm.sort = this.section.sort;
            this.insertSectionForm.lesson_id = this.section.lesson_id;

        },
        methods: {
            submitForm(type) {
                if (type==='修改') {
                    alert('是否更新section!');
                    updateSection(this.section.id,this.updateSectionForm).then(res=>{
                        this.cancelShowInput();
                        console.log(res);
                        this.reload();
                    }).catch(err=>{
                        console.log(err);
                    })
                }else{
                    alert('是否插入新 section!');
                    createSection(this.insertSectionForm).then(res=>{
                        this.cancelShowInput();
                        console.log(res);
                        this.reload();
                    }).catch(err=>{
                        console.log(err);
                    })
                }

            },
            handleDelSection() {
                delSection(this.section.id).then(res => {
                    console.log(res);
                    this.reload();
                }).catch(err => {
                    console.log(err);
                })
            },
            cancelShowInput(type){
                if (type === '插入') {
                    this.showInsertSection = false;
                } else {
                    this.showUpdateSection = false;
                }

                this.resetForm('sectionForm');
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            contentOnChange: function({ markdown, html }) {
                    this.updateSectionForm.markdown = markdown;
                    this.updateSectionForm.content = html;
            },

            insertContentOnChange: function({ markdown, html }) {
                this.insertSectionForm.markdown = markdown;
                this.insertSectionForm.content = html;
            },

            delUpdateSort(type){
                this.updateSort.type = type;
                updateSort(this.updateSort).then(res=>{
                    this.reload();
                }).catch(err=>{
                    console.log(err);
                })
            },

            getUploadedFileUrl(data){
                this.insertSectionForm.content = data;
                this.insertSectionForm.markdown = data;
            }
        }
    }
</script>

<style scoped>
    .text_nodes {
        left: 3vw;
    }
    .text_nodes {
        margin-top: 6vh;
        margin-bottom: 1vh;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
    }
    .icon_avatars,.icon_wraps {
        align-self: flex-start;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
    }

    .icon_avatars {
        width: 1.55vw;
        margin-right: .52vw;
    }
    .icon_avatars {
        width: 1.55vw;
        height: 1.55vw;
        border-radius: 1.55vw;
        -ms-flex-item-align: start;
        position: relative;
        background: #fff;
        border: 1px solid #fcd17b;
        -ms-flex-align: center;
        -ms-flex-pack: center;
    }

    .icon_avatars>img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }
    .ban-selects {
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .nicknames {
        position: absolute;
        top: 1.65vw;
        font-size: 12px;
        width: 3vw;
        text-align: center;
        color: hsla(0,0%,100%,.4);
    }
    .vertical_lines {
        width: 2px;
        height: 100%;
        border-radius: .1vw;
        position: absolute;
        background-color: #fcd17b;
        left: 2.4vw;
    }
    .text_contents {
        max-width: 90%;
        margin-left: .8vw;
        line-height: 2;
        margin-top: .2vw;
        margin-bottom: .2vw;
        font-family: inherit;
        font-size: 20px;
        letter-spacing: 0;
        color: silver;
        font-weight: lighter;
    }

    .pre-break-lines {
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
    }

    img {
        pointer-events: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

</style>