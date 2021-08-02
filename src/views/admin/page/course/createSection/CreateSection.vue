<template>
    <div class="body">
        <div class="main_wrap">
            <practiceProgress/>
            <div  id="mainBox" class="content">
                <!--<div class="header"></div>-->
                <div >
                        <!--引用组件-->
                        <sectionCard
                                v-for="section in sections"
                                :section="section"
                                :teacher = teacher
                        />

                        <div   class="text_node" v-if="showCreateSection">
                            <div class="icon_wrap">
                                <div  class="icon_avatar ban-select">
                                    <img  :src="teacher.avatar">
                                </div>
                                <div  class="nickname">
                                    {{teacher.nickname}}
                                </div>
                            </div>
                            <div  class="vertical_line"></div>

                            <!--新增section的表单-->
                            <SectionTable
                                    v-if="showCreateSection"
                                    v-on:shiftShowTable = shiftShowTable
                            />

                        </div>





                </div> <!---->
                <div  id="SectionBottom" class="section_bottom" style="height: 252.661px;"></div>
            </div>



            <div  class="bottom_btn ban-select"
                  @click="showCreateSection=!showCreateSection"
                  v-if="!showCreateSection"
            >
                <h1 style="color: #666;">新增内容</h1>
            </div>

            <div   class="catalog_main ban-select">
                <div  class="main_box">
                    <div  class="catalog_wrap">
                        <div  class="catalog_body">
                            <div  class="footer"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div  class="utils-wrap">
                <div class="file_download" v-if="!showUploadForm" @click="shiftShowUploadForm">
                    <img  src="//cdn.pyhot.cn/app/program/resource/cdn/download_file.088e50d16968813db374999f3545c9a3.png">
                    <div  class="need_help">上传资料</div>
                </div>

                <el-form v-if="showUploadForm">
                    <elUploads
                            :lesson_id = uploadFileForm.lesson_id
                            :file_type = uploadFileForm.type
                            @uploadedFile = "shiftShowUploadForm"
                            style="height: 250px;"
                    />
                    <el-button @click="shiftShowUploadForm">取消</el-button>
                </el-form>


                <div class="switch-course">
                    <div  class="need_help">

                        <div style="display: inline; margin: 0 1vw 0 2vw;">版本</div>
                        <el-select v-model="version_id" :placeholder="version.name" style="width: 50%;">
                            <el-option
                                    v-for="item in versions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import elUploads from '@/views/admin/common/elUploads'
    import practiceProgress from '@/views/home/learn/components/practiceProgress'
    import sectionCard from '@/views/admin/page/course/createSection/SectionCard'
    import SectionTable from './SectionTable'

    import {createSection,getsections, getVersions, changeVersion} from "../../../../../service/api";


    export default {
        name: "CreateSection",
        components:{
            practiceProgress,
            sectionCard,
            elUploads,
            SectionTable
        },
        data() {
            return {
                showCreateSection:false,
                sections: [],
                teacher: {},

                version_id: '', // 获取版本id值，供切换版本使用
                version: {},  //  当前版本
                versions: [],  //  课程的版本列表

                showDealButton: false,

                uploadFileForm: {
                    type: 'downloadFile',
                    lesson_id: null,
                },
                showUploadForm: false,
            };
        },
        inject: ['reload'],

        created(){
            var $lesson_id = parseInt(this.$route.query.lesson_id);
            this.uploadFileForm.lesson_id = $lesson_id;
            getsections($lesson_id).then(res=>{
                this.sections = res.sections;
                this.teacher = res.teacher;
            }).catch(err=>{
                console.log(err);
            });

            getVersions(this.$route.query.course_id).then(res=>{
                this.versions = res;
                this.versions.forEach((version)=>{
                    if (version.choosed) {
                        this.version = version;
                    }
                });
            }).catch(err=>{
                console.log(err);
            });

        },
        watch:{
            version_id:function(val){
                changeVersion(val).then(res=>{
                    this.reload();   //  切换完成后，刷新界面；
                }).catch(err=>{
                    console.log(err);
                })
            }
        },

        methods: {
            //  切换显示表格
            shiftShowTable(type){
                if (type === 'update') {
                    this.showUpdateSection = !this.showUpdateSection;
                }else{
                    this.showInsertSection = !this.showInsertSection;
                }
            },

            shiftShowUploadForm(){
                this.showUploadForm = !this.showUploadForm;
            }


        }
    }
</script>

<style scoped>



    /*主体框架样式*/
    .body{
        background-image: url(//cdn.pyhot.cn/app/program/resource/cdn/main_background.afa2682d40947d9917170c133f69250e.png);
        width: 100%;
        height: 100vh;/*TODO*/
        position: relative;
        background-color: #0a080f;
        display: -webkit-box;
        display: -ms-flexbox;
        -webkit-box-pack: start;
        display: flex;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-box-align: start;
        -ms-flex-align: start;
        align-items: flex-start;
        background-size: 91.5% 95%;
        background-repeat: no-repeat;
        background-position-x: 100%;
        background-position-y: 130%;
        overflow: hidden;
        /*color: red; !*TODO*!*/




    }

    /*从新学习按钮样式*/
    .redo_btn_wrap {
        position: fixed;
        top: 1vh;
        right: 1.47vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        height: 2vw;
        z-index: 1000;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
    }

    .redo_btn {
        line-height: 1.5;
        font-size: .88vw;
        text-align: center;
        letter-spacing: 0;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        color: #fff;
        cursor: pointer;
        border-bottom: 1px solid #fff;
        opacity: .6;
    }

    .redo_modal {
        position: absolute;
        top: 3.5vw;
        right: 9.6vw;
    }

    /*内容区样式*/
    .main_wrap {
        color: #c2c1c6;
        position: relative;
        top: 3vh;
        background-image: url(//cdn.pyhot.cn/app/program/resource/cdn/course_wrap.8372cbaf1559006ab0d15a5d8ac328fc.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        z-index: 5;
        width: 92%;
        height: 100%;
    }

    /*显示区样式*/
    .content {
        overflow-y: scroll;
        overflow-x: hidden;
        height: 98%;
        padding-top: 1.24vw;
        margin: 0 auto;
        position: relative;
        top: .3vw;
        margin-right: 6vw;
        padding-left: 8vw;
    }

    .content::-webkit-scrollbar {
        width: 15px;
    }

    ::-webkit-scrollbar {
        background-color: transparent;
        width: 10px;
    }

    .content::-webkit-scrollbar-thumb {
        height: 2vw;
        background-color: rgba(47,46,54,.8);
    }

    ::-webkit-scrollbar-thumb {
        background-color: #9aa5ad;
        border-radius: .15vw;
        width: 10px;
    }

    .header {
        height: 3vw;
        width: 100%;
    }

    .text_node {
        left: 3vw;
    }

    .text_node {
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

    .icon_avatar,.icon_wrap {
        align-self: flex-start;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
    }

    .icon_avatar {
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

    .icon_avatar>img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }

    .christmashat {
        position: absolute;
        top: -1vw;
        left: .5vw;
        -webkit-transform: rotate(10deg);
        transform: rotate(10deg);
    }

    img {
        pointer-events: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .nickname {
        position: absolute;
        top: 1.65vw;
        font-size: 12px;
        width: 3vw;
        text-align: center;
        color: hsla(0,0%,100%,.4);
    }

    .vertical_line {
        width: 2px;
        height: 100%;
        border-radius: .1vw;
        position: absolute;
        background-color: #fcd17b;
        left: 2.4vw;
    }

    .text_content {
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

    .pre-break-line {
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
    }

    pre {
        display: block;
        font-family: monospace;
        white-space: pre;
        margin: 1em 0px;
    }


    /*title node*/
    .title_node {
        left: 3vw;
    }

    .title_node {
        margin-bottom: 2vw;
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

    .icon_avatar {
        width: 1.55vw;
        margin-right: .52vw;
    }


    .ban-select {
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .title_content {
        margin-left: .8vw;
        line-height: 2;
        max-width: 55vw;
        color: #ffcb7c;
        font-weight: 550;
    }

    .ban-select {
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .section_bottom {
        width: 100%;
    }

    /*按钮*/
    .bottom_btn>div, .bottom_btn {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .bottom_btn {
        position: fixed;
        bottom: 0;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        cursor: pointer;
        z-index: 799;
        background-image: url(//cdn.pyhot.cn/app/program/resource/cdn/enter_bg.d6e8e26e2acba92f5a0a59972851a27c.png);
        background-repeat: no-repeat;
        background-size: cover;
        width: 24.58vw;
        height: 3.27vw;
    }

    .ban-select {
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .bottom_btn>img {
        width: 2vw;
    }

    img {
        pointer-events: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .bottom_btn_hover>div, .bottom_btn_hover {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .bottom_btn_hover {
        position: fixed;
        bottom: 0;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        cursor: pointer;
        background-image: url(//cdn.pyhot.cn/app/program/resource/cdn/enter_bg_hover.159a925ef6addf968301411d6779dccc.png);
        background-repeat: no-repeat;
        background-size: cover;
        width: 24.58vw;
        height: 3.27vw;
        z-index: 999;
    }

    .bottom_btn_hover>img {
        width: 2vw;
    }

    /*分类目录样式*/
    .catalog_main {
        position: absolute;
        max-height: 82%;
        right: -8vw;
        z-index: 10;
        top: 21%;
        overflow-y: scroll;
        z-index: 1;
        overflow-x: hidden;
    }

    .ban-select {
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .main_box {
        height: 100%;
        position: relative;
        overflow-x: hidden;
    }

    .catalog_wrap {
        width: 13.35vw;
    }

    .catalog_body {
        position: relative;
        color: #c2c1c6;
        letter-spacing: 0;
    }

    .footer {
        height: 3vw;
    }

    .utils-wrap {
        position: absolute;
        z-index: 10;
        bottom: 8vh;
        right: -3vw;
    }

    .utils-wrap>div:not(:last-child) {
        margin-bottom: 1em;
    }

    .file_download, .switch-course {
        cursor: pointer;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        text-decoration: underline;
    }

    .file_download>img, .switch-course>img {
        width: 2vw;
        height: 2vw;
    }

    .need_help {
        font-size: .76vw;
        letter-spacing: 0;
        color: #fff;
        opacity: .7;
        margin-top: .43vw;
        line-height: 1;
    }

</style>

