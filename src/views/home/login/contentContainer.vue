<template>
    <div class="contentContainer">
        <div class="leftSide">
            <div class="title">最简单高效的职场课</div>
            <div class="subtitle">人工智能陪伴式学习，零基础小白也能轻松入门</div>
            <div class="special">—课程特色—</div>
            <div class="descWrapper">
                <div style="margin-right: 1.04vw; margin-top: 0px;">
                    <div >
                        <img  src="//cdn.pyhot.cn/app/program/resource/cdn/ico1.f5d5f9d7bef00e25bbf04726b958a7c4.png">
                        <div >
                            <div  class="title">智能化课程安排</div>
                            <div  class="subtitle">
                                根据用户使用习惯，智能安排课程，人性化提醒，助您掌握上课节奏。
                            </div>
                        </div>
                    </div>
                </div>
                <div style="margin-right: 0px; margin-top: 0px;">
                    <div>
                        <img  src="//cdn.pyhot.cn/app/program/resource/cdn/ico2.5130fc88a148ec4c7ff6010b3ec0924f.png">
                        <div >
                            <div  class="title">交互式课堂</div>
                            <div  class="subtitle">
                                互动教学，不再被动学习，提高学习主观能动性。
                            </div>
                        </div>
                    </div>
                </div>
                <div style="margin-right: 1.04vw; margin-top: 2vh;">
                    <div>
                        <img  src="//cdn.pyhot.cn/app/program/resource/cdn/ico3.491c3303bc54b6140a2da02cfddc9119.png">
                        <div >
                            <div  class="title">渐进式练习</div>
                            <div  class="subtitle">
                                在学习的过程中，会由浅及深的抛出练习进行训练，提高学习效果。
                            </div>
                        </div>
                    </div>
                </div>
                <div style="margin-right: 0px; margin-top: 2vh;">
                    <div>
                        <img  src="//cdn.pyhot.cn/app/program/resource/cdn/ico4.f5c85407783cba98e7a8a44a18baf4b2.png">
                        <div >
                            <div  class="title">全天候专属助教</div>
                            <div  class="subtitle">
                                专属助教协助学习，全天候提供辅导和解答。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="rightSide">
            <div class="codeContainer">
                <div class="otherQrcode" style="display:none;">
                    <div>
                        <img src="//cdn.pyhot.cn/app/program/resource/cdn/excel_wp_qrcode.c02767e630477e7adcc46cac8916150f.png" alt="">
                        <div>Excel职场</div>
                    </div>
                    <div>
                        <img src="//cdn.pyhot.cn/app/program/resource/cdn/mk_wp_qrcode.43320d5fa3119312e2086eea0000cb0c.png" alt="">
                        <div>秒可职场</div>
                    </div>
                    <div >
                        <img  src="//cdn.pyhot.cn/app/program/resource/cdn/storm_excel_qrcode.ce00263be6f7db7c0ce912ccafdc2dce.png">
                        <div >闯关学Excel</div>
                    </div>
                </div>
                <div class="title">微信扫码，开始学习</div>
                <div class="qrcodeContainer">
                    <div  class="qrcode">
                        <!--原来代码-->
                        <!--<img  src="https://public-milk.oss-cn-hangzhou.aliyuncs.com/program_public/qrcode/d7f16a3e548cbeb3b9f91cc5af7ea86f.png" style="opacity: 1;">-->
                        <!--<div class="qrcodeMask" style="display: none;">-->
                            <!--同意协议后才可登录-->
                        <!--</div>-->

                        <!--调试代码-->
                        <!--<div id="login" class="login">-->
                            <!--<iframe class="iframe"></iframe>-->
                        <!--</div>-->
                        <!--<div class="promptBox">-->

                        <!--</div>-->


                        <wxlogin :appid="appid" :scope="scope" :redirect_uri="redirect_uri"></wxlogin>


                    </div>
                </div>
                <div class="agreeContainer">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACrElEQVRYR8WXS2gTURSG/3OnD0WL4k6xTdpIXbhTUZeCiChoMy6sCEKb7BQf0OomCoJ14WOjortMlCJCF01SFEQXiisV3XRnoDaxqBsXSpsibeYeuZNOnCaTd3CyCpnc83/33P+cOZfg8Yfq1Q/EH+3KEe8F82YCtqj1DHwH0Y82pvcz+tCnemLWBBBIGN2mxCgIOjN3VxIgojkw4prAnZlgaK4aTEWAvlcTG8zsfIQknWPwmmrBnM8J9IcF39fWdd34cvDE73JrywL0Jse3s1yaYkZ/PcLF/yVCikTHsdmB05/d4rgC+OOx/QDHmXljM+L2WiL6BZCe1offlAAW/5Df+fK7Vok7IUi07yvOxKoMqDOXC/Mfmk172fMmpMT6rj1OT6wC8CWityBxqRVpLxtD4HYmGL5cyIz9ZaXUUvW6vV5YVR2aQL9dooUM+CeNuww+X29AF1NNC0EjpsRNgHe6O5/upY+HLqhnBQDfZFQ1ja3NABAw3dG+9kDq6KmfO15MbMouLnxzy6hqVmk91FMAsNormx9bJa7i+JOxk2zKp+VitpG2W7VtKwO+ROwMpHzQKIBz55Z4whhkiScAa+XNKM5mgsMP8wBx4zqYrzQC0JC4lXsay+ihqxaAP25EmTlUgTYiNPlcLuOZ0ycNi1v6ZKT1ULgqABFepvXwIQUXSI5vy5lLrxVEM+L5BDgAehPGmJQccc0AYVEI7fDswNDbfxC5i53tndeU22s+85J6dRxBVRMSZYUQR2wIZ6yaDOe2M+EwYU1l6ALRsDiAVWW4YsSv1aYdOCCaES9pRBZAra2YKEtAkhmDFeu8Qk0TXFqx5y+jfEf08HWsADwfSBSEpyOZ7RtPh1IbwtOx3Ibw9GLiLOO+qcc9MmeO/PermVsv8eRy2sigUuuav7x+njCb9i4YAAAAAElFTkSuQmCC" class="agreeImg">
                    <div class="agreeText" style="margin-left: 4px;">
                        已阅读并同意
                        <a  href="/app/program/protocol" class="protocolFile" target="_blank">
                            《用户协议》
                        </a>
                        <a href="/app/program/privacy" class="protocolFile" target="_blank">
                            《隐私政策》
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import wxlogin from 'vue-wxlogin';

    export default {

        name: "contentContainer",
        components:{
            wxlogin,
        },
        data(){
            return{
                appid : 'wxeca5e52e80598a8c',
                scope : 'snsapi_login',
                redirect_uri : 'https://abstest.tenpay.com/abs/auo',
            }
        },

        created(){
            // this.getWxScanJs();
            // this.wechatHandleClick()
        },

        methods:{
            getWxScanJs(){
                Api.getWxScanJs(param)
                    .then(res=>{
                        this.appid=res.data.appid
                        this.redirectUri = res.data.redirectUri
                        this.scope = res.data.scope
                        this.state = res.data.state
                        this.wechatHandleClick();
                    })
                    .catch(err => {
                        console.log('err=',err)
                    })
            },
            wechatHandleClick(){
                const appid = this.appid;

                var obj = new WxLogin({
                    id: "login",
                    appid: "wxeca5e52e80598a8c",
                    scope: "snsapi_login",
                    redirect_uri: "/",
                    href: ""
                })
            }
        },
    }
</script>

<style scoped>
    /*内容样式*/
    .contentContainer {
        -webkit-box-flex: 1;
        -ms-flex: auto;
        flex: auto;
        padding-left: 19.27vw;
        padding-right: 19.27vw;
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
    }

    .contentContainer>.leftSide>.title {
        color: #fff;
        font-size: 2.647vw;
        font-weight: 700;
        letter-spacing: .529vw;
        text-align: center;
    }

    .contentContainer>.leftSide>.subtitle {
        color: #ffd7a6;
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
        height: 3.4375vw;
        margin-right: 10px;
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
        width: 19.79vw;
        margin-left: 6.25vw;
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
        top: -4.6875vw;
        right: 0;
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
        width: 4.166vw;
        height: 4.166vw;
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
        color: #24c7b5;
        cursor: pointer;
        text-decoration: none;
    }

</style>