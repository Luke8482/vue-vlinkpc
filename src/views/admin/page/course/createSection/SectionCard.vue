<template>
    <div>
        <div   class="text_nodes"  >
            <div class="icon_wraps"  >
                <div  class="icon_avatars ban-selects">
                    <img  :src="teacher.avatar">
                </div>
                <div  class="nicknames">
                    {{teacher.nickname}}
                </div>
            </div>
            <div  class="vertical_lines"></div>
            <div
                    @mouseenter="showDealButton=!showDealButton"
                    @mouseleave="showDealButton=!showDealButton"
                    class="text_contents pre-break-lines markdown-body"
                    v-if="!showUpdateSection && !showInsertSection"
            >
                <div v-html="section.content" v-if="section.type ==='dialogue'"></div>
                <videoBox v-if="section.type ==='video'" :content="section.content"/>
                <audio  autoplay="" controls=""  v-if="section.type ==='audio'" style="width: 35vw;">
                    <source :src="section.content" />
                </audio>
                <pdfBox v-if="section.type ==='graphic'" :content="section.content"/>
                <div class="demo-image__preview" v-if="section.type ==='image'" >
                    <el-image
                            class="images"
                            :src="section.content"
                            :preview-src-list=[section.content]>
                    </el-image>
                </div>
                <div  v-if="section.type ==='downloadFile'">
                    <el-image
                            class="images-downloadFile"
                            :src="section.content"
                    >
                    </el-image>
                </div>
                <exerciseBox
                        v-if="section.type ==='exercise'"
                        :exerciseId = section.content
                />


                <div class="text_contents"  v-if="showDealButton" style="width: 500px">
                    <el-button icon="el-icon-arrow-up" @click="delUpdateSort('上移')"></el-button>
                    <el-button icon="el-icon-arrow-down" @click="delUpdateSort('下移')"></el-button>
                    <el-button @click="shiftShowTable">插入</el-button>
                    <el-button @click="shiftShowTable('update')">修改</el-button>
                    <el-button @click="handleDelSection">删除</el-button>
                </div>
            </div>

            <!--插入section 的表单-->
            <SectionTable
                    v-if="showInsertSection"
                    :sectionSort = section.sort
                    v-on:shiftShowTable = shiftShowTable
            />

            <!--修改表单-->
            <SectionTable
                    v-if="showUpdateSection"
                    :section="section"
                    v-on:shiftShowTable = shiftShowTable
            />


        </div>
    </div>
</template>

<script>
    import videoBox from '@/views/admin/common/VideoBox'
    import pdfBox from '@/views/admin/common/PdfBox'
    import exerciseBox from '@/views/admin/common/ExerciseBox'
    import SectionTable from './SectionTable'
    import {delSection, updateSort} from "../../../../../service/api";

    export default {
        name: "SectionCard",
        data(){
            return {
                showDealButton: false,
                showUpdateSection: false,
                showInsertSection: false,

                // 调整排序的API 的参数
                updateSort: {
                    type: '',
                    section_id: '',
                },
            }
        },
        components:{
            videoBox,
            pdfBox,
            SectionTable,
            exerciseBox
        },
        props:{
            section: Object,
            teacher: Object,
        },
        inject:['reload'],
        created(){
            this.updateSort.section_id = this.section.id;
        },
        methods: {
            handleDelSection() {
                delSection(this.section.id).then(res => {
                    console.log(res);
                    this.reload();
                }).catch(err => {
                    console.log(err);
                })
            },


            delUpdateSort(type){
                this.updateSort.type = type;
                updateSort(this.updateSort).then(res=>{
                    this.reload();
                }).catch(err=>{
                    console.log(err);
                })
            },

            //  切换显示表格
            shiftShowTable(type){
                if (type === 'update') {
                    this.showUpdateSection = !this.showUpdateSection;
                }else{
                    this.showInsertSection = !this.showInsertSection;
                }
            },

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

    /*自行设计*/
    .images{
        border-radius: 10px;
        max-width: 60vw;
    }
    .images-downloadFile{
        border-radius: 10px;
        max-width: 60vw;
        cursor: pointer;
    }


</style>