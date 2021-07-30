<template>
    <div  class="utils-wrap" v-if="showBtn">
        <div class="file_download" @click="downloadFile">
            <img  src="//cdn.pyhot.cn/app/program/resource/cdn/download_file.088e50d16968813db374999f3545c9a3.png">
            <div  class="need_help">课程资料</div>
        </div>
        <div class="switch-course" @click="changeVersion">
            <img  src="data:image/png;base64,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">
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