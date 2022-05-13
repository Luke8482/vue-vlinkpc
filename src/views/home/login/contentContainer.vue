<template>
    <div class="contentContainer">
        <div class="rightSide">
            <div class="codeContainer">
                <div class="otherQrcode" v-show="showPbQrcode">

                    <div>
                        <img src="/公众号二维码.jpg" alt="">
                        <div>VlinkPC.com</div>
                    </div>

                </div>
                <div class="title" style="z-index:1000">微信扫码，开始学习</div>
                <div class="qrcodeContainer">
                    <div  class="qrcode">

                        <wxlogin :appid="appid" :scope="scope" :href="href" :redirect_uri="redirect_uri" :style="agreeAll?'filter: none':'filter: blur(3px);'"></wxlogin>
                        <div class="qrcodeMask" v-show="!agreeAll">同意协议后才可登录</div>

                    </div>
                </div>
                <div class="agreeContainer">
                    <img :src="agreeAll?'/choose.png':'/notChoose.png'" class="agreeImg"  @click="agreeAll = !agreeAll">
                    <div class="agreeText" >
                        已阅读并同意
                        <div class="protocolFile" @click="goToAgreement('用户协议')">《用户协议》</div>
                        <div class="protocolFile" @click="goToAgreement('隐私政策')">《隐私政策》</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="leftSide">
            <div class="title">简单易学、生动高效</div>
            <div class="subtitle">人工+智能陪伴式学习，快速get职场技能</div>
            <div class="special">—课程特色—</div>
            <div class="descWrapper">
                <div style="margin-right: 1.04vw; margin-top: 0px;">
                    <div >
                        <img  src="/loginIcon1.png">
                        <div >
                            <div  class="title">交互学习</div>
                            <div  class="subtitle">
                                互动教学，模拟对话场景；不再被动学习，提高学习主观能动性。
                            </div>
                        </div>
                    </div>
                </div>
                <div style="margin-right: 0px; margin-top: 0px;">
                    <div>
                        <img  src="/loginIcon2.png">
                        <div >
                            <div  class="title">智能教学</div>
                            <div  class="subtitle">
                                根据不同用户，智能安排课程内容，人性化学习，助您掌握上课节奏。
                            </div>
                        </div>
                    </div>
                </div>
                <div style="margin-right: 1.04vw; margin-top: 2vh;">
                    <div>
                        <img  src="/loginIcon3.png">
                        <div >
                            <div  class="title">专属助教</div>
                            <div  class="subtitle">
                                专属助教——协助学习，提供辅导、解答，监督学习完成情况。
                            </div>
                        </div>
                    </div>
                </div>
                <div style="margin-right: 0px; margin-top: 2vh;">
                    <div>
                        <img  src="/loginIcon4.png">
                        <div >
                            <div  class="title">渐进练习</div>
                            <div  class="subtitle">
                                针对已学内容，由浅及深的抛出练习进行训练，巩固学习成果。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import wxlogin from 'vue-wxlogin';
    import bus from '@/views/admin/common/bus'
    import {getAgreementId} from "../../../service/api";

    export default {

        name: "contentContainer",
        components:{
            wxlogin,
        },
        data(){
            return{
                //  TODO...配置公众号基础信息
                appid : process.env.VUE_APP_WX_APPID,
                scope : 'snsapi_login',
                redirect_uri : '',
                href:process.env.VUE_APP_URL+'/wxLogin.css',  //  地址要维护到环境变量内
                showPbQrcode: false,
                agreeAll: true,  // 同意网站协议

            }
        },

        created(){
            // this.getWxScanJs();
            // this.wechatHandleClick();

            //  判断路由是否有重定向参数，如果有赋值给微信扫码登录的重定向uri
            var redirect = this.$route.query.redirect;
            if (redirect) {
                this.redirect_uri = process.env.VUE_APP_REDIRECT_URL+redirect;
            } else {
                this.redirect_uri = process.env.VUE_APP_REDIRECT_URL;
            }


            bus.$on('shiftShowQrcode',()=>{
                this.showPbQrcode = !this.showPbQrcode;
            })
        },

        methods:{
            // getWxScanJs(){
            //     Api.getWxScanJs(param)
            //         .then(res=>{
            //             this.appid=res.data.appid
            //             this.redirectUri = res.data.redirectUri
            //             this.scope = res.data.scope
            //             this.state = res.data.state
            //             this.wechatHandleClick();
            //         })
            //         .catch(err => {
            //             console.log('err=',err)
            //         })
            // },
            // wechatHandleClick(){
            //     const appid = this.appid;
            //
            //     var obj = new WxLogin({
            //         id: "login",
            //         appid: "wxeca5e52e80598a8c",
            //         scope: "snsapi_login",
            //         redirect_uri: "/",
            //         href: ""
            //     })
            // },
            goToAgreement(title){
                getAgreementId({'title':title}).then(res=>{
                    this.$router.push('/program/agreements?agreement_id='+res)
                }).catch(err=>{
                    console.log(err);
                })
            }
        },
    }
</script>

<style>
    iframe{
        width:12vw;
        height: 12vw;
    }
</style>

<style scoped>
    /*内容样式*/
    .contentContainer {
        -webkit-box-flex: 1;
        -ms-flex: auto;
        flex: auto;
        padding-left: 14.27vw;
        padding-right: 14.27vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .contentContainer>.leftSide {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        margin-left: 6.25vw;

    }

    .contentContainer>.leftSide>.title {
        color: #fff;
        font-size: 2.647vw;
        font-weight: 700;
        letter-spacing: .529vw;
        text-align: center;
    }

    .contentContainer>.leftSide>.subtitle {
        color: #ffd23b;
        font-size: 1.08vw;
        font-weight: 700;
        line-height: 2.08vw;
        margin-top: 3vh;
        text-align: center;
    }

    .contentContainer>.leftSide>.special {
        color: #181052;
        font-size: 1.323vw;
        font-weight: 700;
        letter-spacing: .266vw;
        margin-top: 6vh;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    .contentContainer>.leftSide>.descWrapper {
        margin-top: 4vh;
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-flow: wrap;
        flex-flow: wrap;
    }

    .descWrapper>div {
        display: inline-block;
        width: calc(((100% - 1.04vw) / 2));
        padding: 1.6vh 1.04vw;
        background-color: #fff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 20px;
    }

    .descWrapper>div>div {
        width: 100%;
        height: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }

    .descWrapper>div>div>img{
        width: 3.4375vw;
        height: 2.4375vw;
        padding: 0.5vw;
        margin: auto;
    }

    .descWrapper>div>div>div {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .descWrapper>div>div>div>.title{
        color: #385061;
        font-size: 1.04vw;
        font-weight: 700;
        margin-bottom: 4px;
    }

    .descWrapper>div>div>div>.subtitle{
        color: #6c747a;
        font-size: 12px;
    }

    .contentContainer>.rightSide {
        width: 20.79vw;
    }

    .codeContainer{
        width: 100%;
        height: 50vh;
        background-color: #fff;
        border-radius: 30px;
        -webkit-box-shadow: 0 20px 40px 0 rgba(13,71,65,.2);
        box-shadow: 0 20px 40px 0 rgba(13,71,65,.2);
        padding: 5.4vh 16px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        position: relative;
    }

    .codeContainer>.otherQrcode{
        background-color: #fff;
        z-index: 10;
        position: absolute;
        top: -19.4vh;
        right: -44vw;
        height: 9.375vw;
        border-radius: 1.04vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-shadow: 0 -20px 40px 0 rgba(13,71,65,.2);
        box-shadow: 0 -20px 40px 0 rgba(13,71,65,.2);
    }

    .codeContainer>.otherQrcode>div {
        width: 9.375vw;
        height: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .codeContainer>.qrcodeContainer>.qrcode>img{
        width: 11.2vw;
        height: 11.2vw;
        border-radius: .4vw;
    }

    .codeContainer>.otherQrcode>div>img {
        width: 6.166vw;
        height: 6.166vw;
        display: block;
    }

    .codeContainer>.otherQrcode>div>div {
        text-align: center;
        color: #385061;
        font-size: 12px;
        font-weight: 700;
        margin-top: .833vw;
    }

    .codeContainer>.title {
        font-size: .833vw;
        color: #385061;
        font-weight: 700;
    }

    .codeContainer>.qrcodeContainer{
        width: 12vw;
        height: 12vw;
        margin-top: 4vh;
        position: relative;
    }


    .codeContainer>.qrcodeContainer>.qrcode{
        width: 12vw;
        height: 12vw;
        z-index: 1;
        border-radius: .4vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: rgba(99,99,99,.2);
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
    }

    .codeContainer>.qrcodeContainer .qrcodeMask {
        background-color: hsla(0,0%,39%,.6);
        color: #fff;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        z-index: 10;
        width: 11.2vw;
        height: 11.2vw;
        font-size: .833vw;
        font-weight: 700;
    }


    .codeContainer>.agreeContainer {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin-top: 4vh;
        z-index: 1000;
    }

    .agreeContainer>.agreeImg {
        width: 16px;
        height: 16px;
    }

    .agreeContainer>.agreeText {
        font-size: 12px;
        color: #385061;
    }

    .protocolFile {
        color: #ffd23b;
        cursor: pointer;
        text-decoration: none;
        display: inline;
        cursor: pointer;
    }

</style>