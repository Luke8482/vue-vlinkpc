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
            });
            bus.$on('downloadFile', msg=>{
                this.downloadFile();
            });
        },
        methods:{
            downloadFile() {
                downloadFile({'lesson_id': this.lesson.id}).then(res => {
                    if (res.content) {
                        var blob = this.b64toBlob(res.content, "application/zip");
                        var url = window.URL.createObjectURL(blob);
                        this.dataURLtoFile(url, res.file_name);

                    } else {
                        alert("获取文件失败：", data.msg);
                    }

                }).catch(err => {
                    console.log(err);
                })
            },

            dataURLtoFile(blobUrl, filename)
            {//将base64转换为文件
                var eleLink = document.createElement('a');
                eleLink.download = filename;
                eleLink.style.display = 'none';
                eleLink.href = blobUrl;
                // 触发点击
                document.body.appendChild(eleLink);
                eleLink.click();
                // 然后移除
                document.body.removeChild(eleLink);
            },


            b64toBlob(b64Data, contentType, sliceSize) {
                contentType = contentType || '';
                sliceSize = sliceSize || 512;

                var byteCharacters = window.atob(b64Data);
                // console.log("byteCharacters:", byteCharacters)
                var byteArrays = [];

                for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    var slice = byteCharacters.slice(offset, offset + sliceSize);

                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    var byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

                var blob = new Blob(byteArrays, {type: contentType});
                // console.log("blob", blob);
                return blob;
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
        right: -7vw;
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