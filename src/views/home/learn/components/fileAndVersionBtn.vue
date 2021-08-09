<template>
    <div  class="utils-wrap" v-if="showBtn">
        <div class="file_download" @click="downloadFile">
            <img  src="/download.png">
            <div  class="need_help">课程资料</div>
        </div>
        <div class="switch-course" @click="changeVersion">
            <img  src="/shiftVersion.png">
            <div  class="need_help" >
                切换版本
            </div>
        </div>
    </div>
</template>

<script>
    import bus from '@/views/admin/common/bus';
    import {downloadFile} from "../../../../service/api";

    export default {
        name: "fileAndVersionBtn",
        data(){
            return{
                showBtn: true,  // 控制按钮的显示
            }
        },
        props:{
            lesson: Object,
        },
        mounted(){
            bus.$on('showBtn', msg=>{
                this.showBtn = !this.showBtn;
            })
        },
        methods:{
            downloadFile() {
                downloadFile({'lesson_id': this.lesson_id}).then(res => {
                    if (res.content) {
                        var blob = this.b64toBlob(res.content, "application/zip");
                        var url = window.URL.createObjectURL(blob);
                        this.dataURLtoFile(url, '测试');
                        //todo“”“后端传递文件名称

                    } else {
                        alert("获取文件失败：", data.msg);
                    }

                }).catch(err => {
                    console.log(err);
                })
            },
            changeVersion(){
                this.showBtn = false;
                var res = [this.lesson, this.$route.query.course_id];
                bus.$emit('showChangeVersion', res);

            }
        }
    }
</script>

<style scoped>
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