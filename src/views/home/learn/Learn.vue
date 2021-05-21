<template>

    <div class="body" @keyup.13="sectionLearn" >
        <!--头部内容-->
        <learnHeader/>

        <div v-html="alipayHtml"></div>




        <!--<div>重新学习按钮</div>-->
        <!--<div class="redo_btn_wrap">-->
            <!--<div class="redo_btn">再学一遍</div>-->
            <!--<div class="redo_modal">-->
                <!--&lt;!&ndash;&ndash;&gt;-->
            <!--</div>-->
        <!--</div>-->


        <!--<div>内容学习区-->
            <!--<div>进度组件</div>-->
            <!--<div>-->
                <!--<div>内容框架</div>-->
                <!--<div>内容组件</div>-->
            <!--</div>-->
            <!--<div>底部按钮</div>-->
            <!--<div>目录组件</div>-->
            <!--<div>下载按钮</div>-->
        <!--</div>-->


        <div class="main_wrap">
            <practiceProgress/>
            <div  id="mainBox" class="content">
                <!--<div class="header"></div>-->
                <div >
                    <div >
                    <div   class="text_node" v-for="section in sectionData">
                        <div class="icon_wrap">
                            <div  class="icon_avatar ban-select">
                                <img  src="https://public-milk.oss-cn-hangzhou.aliyuncs.com/program_public/user_upload/a281c1795df306619a8c740317b7298e/形象照1.png">
                            </div>
                            <div  class="nickname">

                                表姐

                            </div>
                        </div>
                        <div  class="vertical_line"></div>
                        <div class="text_content pre-break-line markdown-body">
                            <div v-html="section.content" ></div>
                        </div>

                    </div>
                    <!--<div  class="title_node">-->
                        <!--<div  class="icon_avatar ban-select">&lt;!&ndash;&ndash;&gt;</div>-->
                        <!--<div  class="title_content ban-select">-->
                            <!--&lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt;-->
                        <!--</div>-->
                    <!--</div>-->
                </div>
                    <!----> <!----> <!----> <!---->

                </div> <!---->
                <div  id="SectionBottom" class="section_bottom" style="height: 252.661px;"></div>
            </div>
            <div  class="bottom_btn ban-select" style="" @click="sectionLearn">
                <img  src="//cdn.pyhot.cn/app/program/resource/cdn/enter_icon.2fe6f72fc3a01bc287e36adcd43f9757.png" class="">
            </div>
            <!--<div  class="bottom_btn_hover ban-select" style="">-->
                <!--<img  src="//cdn.pyhot.cn/app/program/resource/cdn/enter_icon.2fe6f72fc3a01bc287e36adcd43f9757.png" class="">-->
            <!--</div>-->
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
                <div class="file_download" @click="downloadFile">
                    <img  src="//cdn.pyhot.cn/app/program/resource/cdn/download_file.088e50d16968813db374999f3545c9a3.png">
                    <div  class="need_help">课程资料</div>
                </div>
                <div class="switch-course" @click="testAlipay">
                    <img  src="data:image/png;base64,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">
                    <div  class="need_help">
                        切换版本
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import learnHeader from './components/learnHeader'
    import practiceProgress from './components/practiceProgress'
    import {sectionLearn,downloadFile, testAlipay} from "../../../service/api";

    export default {
        name: "Learn",
        components:{
            learnHeader,
            practiceProgress,
        },
        data(){
            return{
                lesson_id: '',
                resData: [],
                middleResData: [],
                sectionData: [],
                sectionIndex: 0,
                sort: {},
                alipayHtml: '',

            }
        },
        created(){
            this.lesson_id = this.$route.params.lesson_id;
            sectionLearn(this.lesson_id).then(res=>{
                this.resData = res;
                this.middleResData = res;

            }).catch(err=>{
                console.log(err);
            });

            // 键盘事件监听
            var _self = this;
            document.onkeyup = function (e) {
                var key = window.event.keyCode;
                if (key === 13 || key === 32) {
                    _self.sectionLearn();
                }
            }
        },
        methods: {
            sectionLearn() {
                var showSection = this.resData[this.sectionIndex];

                if (!showSection) {
                    //  TODO/....完成学习的逻辑
                } else {
                    // 判断当前section和 Data里 section 是否相同。如果一样则停止。否则可以插入
                    var lastShowSection = this.sectionData[this.sectionData.length - 1];
                    if (showSection !== lastShowSection) {
                        this.sectionData.push(this.resData[this.sectionIndex]);

                        if (this.sectionIndex === 0) {
                            this.sort.sort = this.resData[this.resData.length - 1].sort;
                            sectionLearn(this.lesson_id, this.sort).then(res => {
                                this.middleResData = res;
                            }).catch();
                        }

                        if (this.sectionIndex === 5) {
                            if (this.resData !== this.middleResData) {
                                if (this.middleResData === null) {
                                    //  TODO/....完成学习的逻辑

                                } else {
                                    this.resData = this.middleResData;
                                    this.sectionIndex = 0;
                                }
                            }

                        } else {
                            this.sectionIndex++;
                        }
                    } else {
                        if (this.resData !== this.middleResData) {
                            this.resData = this.middleResData;
                            this.sectionIndex = 0;
                        }

                    }

                }
            },

            downloadFile(fileName) {

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


            dataURLtoFile(blobUrl, filename)
                {//将base64转换为文件
                    var eleLink = document.createElement('a')
                    eleLink.download = filename
                    eleLink.style.display = 'none'
                    eleLink.href = blobUrl
                    // 触发点击
                    document.body.appendChild(eleLink)
                    eleLink.click()
                    // 然后移除
                    document.body.removeChild(eleLink);
                },


            b64toBlob(b64Data, contentType, sliceSize) {
                contentType = contentType || '';
                sliceSize = sliceSize || 512;

                var byteCharacters = window.atob(b64Data);
                console.log("byteCharacters:", byteCharacters)
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
                console.log("blob", blob);
                return blob;
            },

            testAlipay(){
                testAlipay(33).then(res=>{
                    this.alipayHtml = res;

                    this.$nextTick(() => {
                        document.forms[0].submit()
                    });

                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                })

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


<!--<template>-->
    <!--<div>-->
        <!--<markdownEditor :content="content" @change="autoSave" type="editor"></markdownEditor>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--import markdownEditor from './../../admin/page/course/createSection/MarkdownEditor';-->

    <!--export default {-->
        <!--components: { markdownEditor},-->
        <!--data() {-->
           <!--return{-->
               <!--content:''//这里是初始化是编辑器回显内容-->
           <!--}-->
        <!--},-->
        <!--methods: {-->
            <!--//当编辑器内容改变时候，会触发该事件，并返回一个html和markdown文本-->
            <!--autoSave(html, text) {-->

            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->