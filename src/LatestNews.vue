<template>
    <div class="latest-news" v-if="show">
        <div class="mask"></div>
        <div class="red-box">
            <div style="position: absolute; top: 11.5%; left: 50%; transform: translate(-50%, -11.5%); font-size: 2.2vw; letter-spacing: 2px; text-shadow: rgb(231, 110, 23) 2px 2px 2px; font-weight: bold;">
        新课上线了！
    </div>
            <div class="close-btn">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABACAMAAAByderSAAAAk1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ROyVeAAAAMHRSTlMA+1UL6lskEAXEkmZYLu63jIJzaGMys15KOePd0si/rqqad3DfQRoYB/LTpp6bfCCwxYiMAAACfUlEQVRYw6SS6XaCQAxGMyI7hYpiQbtYl2rr9r3/03VGpAMyQTy9fzhk4CaThHicfBUcFtPFIVjlDj3KdrwYos5wMd5Sbzw7EWgjEtujPlirGS7E/nEZRnkULo9+XIZmK+u+wC6r99OsEc5Sv7yNTd0475fPRo7pbHSRvzudBXyr/1OLu2CqHN8238FP1a/AJR43UD3+9JgMiTycF9RNMQeQWEb9mzz6cOke7geAN8N3O9XDZ+rDs+rnrhVW5iX1Y6mqvQ2eZHBEfRkBODVDGyE7TP2RUxObxhhmsjke9ceTbZ9Zzd7EZ3qEc9zo+5MAJrUE/CR12gkgnqhiCvh6/dfxgBGMRax/8oHpXwkAsnqfxcAsaMwrk2+Vb69tkg0YRagOCqpXvr9eTgBFPZVZEYqbcCHf3cr9enNdg2LSDr4CYdWSlE/HCyi9DsCSZ1/3Er6YyvqSMTXeHPgh4hS8QPID5OU+Bjpo/Mc2Cygo9zIBIuIUnQKKgEQ+5noxzIqoLdCrOCfaCdWOFjr1gBWoIQiPtsCQDFTJA1YgGQJbcoA1dSjQIaA14FCmNpJjIBiB3srs/wZ9C04gFb+lmM0KgCAQhKMoAs2LQXQv3/8Ro4O28LVeplOFjai781PsraK3k2PbydjbydU9zdGc5tw5TVtRBIj15vAqyq3qNjUgUNXoLABYCHYWuhvffI+7092GYQgACDKMYTmM56tAlrNMSwC+zGRay/acjgWayfZUnPMdGbwav6k4VD0zFSGoelTeLdXlEiJdC5WX6j/5fm4doP6qA9FdkO7EdDeoO1LdFevOXE8HekLRU5Ke1PS0qCdWPTX7V/lJ7sUZK/89eADuoX1FprBoOAAAAABJRU5ErkJggg==">
            </div>
            <div class="news-content" style="">
                <div class="content-left" style="">
                    <div class="qr-bg-wrap">
                        <div class="qr-code">
                            <img src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/ad07d17b1dbd1738f82325e53bbeb5e5/WechatIMG32.png">
                        </div>
                        <p class="qr-text">扫码查看详情</p>
                    </div>
                </div>
                <div class="content-right">
                    <div class="swiper-content">
                        <div class="mint-swipe">
                            <el-carousel indicator-position="outside" height="500px">
                                <el-carousel-item v-for="item in img" :key="item">
                                    <img :src="item"
                                         style="width: 80%; height: 80%;"
                                    >
                                </el-carousel-item>
                            </el-carousel>

                        </div>
                    </div>
                    <div class="title-container">
                        <h2 class="first-level-title">《PPT视觉高阶营》</h2>
                        <h3 class="secondary-title">模仿优质作品，从细节中培养设计思维和审美</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LatestNews",
        data(){
            return{
                show: false,
                img:[
                    "https://cdn-oss-public.pyhot.cn/program_public/user_upload/f6120be6754d72d4c1ab0e39851cc04b/7-1.gif",
                    "https://cdn-oss-public.pyhot.cn/program_public/user_upload/fb9652e03c1c336c4e38923fecdfe539/7-3.gif",
                    "https://cdn-oss-public.pyhot.cn/program_public/user_upload/c222866531feaa421f5cfd4fc7b9eb94/7-2.gif"
                ]
            }
        },
        watch:{
            "$route":function (val, oldVal) {
                if (
                    val.path === '/login'
                    || val.path === '/dashboard/home'
                    || val.path === '/dashboard/progress'
                ){
                    this.show = true;
                }else{
                    this.show = false;
                }

            }

        },

    }
</script>

<style scoped>
    .latest-news {
        position: fixed;
        margin: 0 auto;
        left: 0;
        top: 5vh;
        z-index: 4;
        width: 100vw;
        color: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    .latest-news .red-box {
        width: 80vw;
        max-width: 95%;
        height: 40vw;
        z-index: 100;
        padding: 0 15vw;
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background: url(//cdn.pyhot.cn/app/program/resource/cdn/pure_background.25ae52c2129ddb3aedc47ba492c6aed3.png) no-repeat 0 0;
        background-size: 100% 100%;
        border-radius: .85vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-transition: .5s;
        transition: .5s;
    }

    .latest-news .mask {
        position: fixed;
        background: rgba(0,0,0,.3);
        height: 100vh;
        width: 100vw;
        z-index: 99;
        left: 0;
        top: 0;
    }

    .latest-news .close-btn {
        position: absolute;
        top: 50%;
        right: -1px;
        height: 3vw;
        width: 3vw;
        font-size: 0;
    }

    .latest-news .close-btn img {
        height: 100%;
        width: 100%;
        cursor: pointer;
    }

    .latest-news .news-content {
        padding: 140px 0 40px;
        width: 100%;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .latest-news .content-left, .latest-news .news-content {
        height: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }

    .latest-news .content-left {
        text-align: center;
        width: 50%;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    .latest-news .content-left .qr-bg-wrap .qr-code, .latest-news .content-left .qr-bg-wrap {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-flow: column nowrap;
        flex-flow: column nowrap;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    .latest-news .content-left .qr-bg-wrap .qr-code {
        width: 12vw;
        height: 12vw;
        background: url(data:image/png;base64,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) no-repeat 50% 50%;
        background-size: 100% 100%;
    }

    .latest-news .content-left .qr-bg-wrap .qr-code, .latest-news .content-left .qr-bg-wrap {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-flow: column nowrap;
        flex-flow: column nowrap;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    .latest-news .content-left .qr-bg-wrap .qr-code img {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid #fac;
        -webkit-box-shadow: 0 0 0 1px #fff;
        box-shadow: 0 0 0 1px #fff;
        width: 80%;
        height: 80%;
    }

    .latest-news .content-left .qr-bg-wrap .qr-text {
        margin: 0;
        margin-top: 18px;
        font-size: 14px;
        width: 164px;
        height: 24px;
        line-height: 24px;
        border-radius: 18px;
        background: rgba(196,57,61,.32);
    }

    p {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }

    .latest-news .content-right {
        width: 50%;
        height: 100%;
        text-align: center;
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
    }

    .latest-news .swiper-content {
        width: 100%;
        height: 50%;
        overflow: hidden;
    }

    .mint-swipe, .mint-swipe-items-wrap {
        overflow: hidden;
        position: relative;
        height: 100%;
    }


    .latest-news .swiper-item {
        font-size: 0;
        text-align: center;
    }


     .latest-news .content-right .first-level-title {
         margin-top: 15px;
     }

     .latest-news .first-level-title {
         font-weight: 500;
         font-size: 2.5vw;
     }

     .latest-news .first-level-title, .latest-news .secondary-title {
         margin: 0;
         border: 0;
         font-family: PingFangSC-Medium,PingFang SC;
         line-height: 1;
         font-weight: 400;
     }

    h2 {
        display: block;
        font-size: 1.5em;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }

    h3 {
        display: block;
        font-size: 1.17em;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }

    .latest-news .secondary-title {
        font-size: 1.2vw;
        font-weight: 400;
        margin-top: 1vw;
    }



</style>