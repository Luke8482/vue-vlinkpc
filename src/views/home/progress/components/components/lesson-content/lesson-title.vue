<template>
    <!--顶部订单栏-->
    <div  class="lesson-title">
        <div  class="title">
            <div class="title-content">
                <!---->
                <span >
                        Excel实战训练营
                    </span>
            </div>
        </div>
        <div id="progressRef">
            <div  class="progress-wrap">
                <div  class="progress-bar">
                    <div  class="move-progress" style="width: 13.3313%;"></div>
                    <div class="progress-num" style="left: calc(13.3313% - 2.6042vw);">
                        <span>13%</span>
                    </div>
                </div>
                <div class="divider"></div>
                <div  class="recent-level">
                    <div >
                        <div  class="button">继续闯关</div>
                    </div> <div  class="level-hint-container">
                    <div >最近解锁关卡:&nbsp;</div>
                    <div  title="第3关    最后的员工档案">
                        第3关    最后的员工档案
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div  class="fixed_progress" style="display: none;">
            <div  class="goback">
                <div  class="goback_content">
                    <div  class="icon">
                        <div  class="goback_icon">
                            <img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABK0lEQVRYR83Yuw3CMBAG4LuswSJACSyQiBIQrxlYghmSINFQEVpKmmQTpiA5BCgUEYUfd4fd2/78N/51CIEvDNwHqsBhvB0R1HVV5DfTYNSAw2Qzb4gOCEQI0aws0pMJUgXY4oAoeqEQ8F5dsl4QwC4OEJsIcVme0+Pfgb64T9pCiwMnBuTCiQA5cexAbhwrUALHBpTCsQAlcd5AaZwXUAPnDNTCOQE1cdZAbZwVsJ+sJkB4bSvTezPiriqyvdB3/j7WuCwED3y9ZhCvFwSQf1O07HYuSRsn2B6ujbQGaifpBNREOgO1kF5ADaQ3UBrJApREsgGlkKxACSQ7kBspAuREigG5kKJADqQ48BcyqPFbtwUFOcD8IqebMdTNI8gRsEtZtar8rhf47nsCXiVaOLZ9kOcAAAAASUVORK5CYII="></div>
                        <div  class="goback_text">
                            返回课程中心
                        </div>
                    </div>
                    <div >
                        <div >
                            <div  class="btn">
                                意见反馈
                            </div>
                            <div  class="btn" style="margin-left: 1.0417vw;">
                                安全退出
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div  class="fade-container">
                <div  class="fade-content">
                    <div  class="fade-recent-level">
                        <div >
                            <div  class="button">
                                继续闯关
                            </div>
                        </div>
                        <div  class="level-hint-container">
                            <div >
                                最近解锁关卡:&nbsp;
                            </div>
                            <div  title="第3关    最后的员工档案">
                                第3关    最后的员工档案
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "lesson-title"
    }
</script>

<style scoped>


    .lesson-title {
        position: relative;
        width: 54.45vw;
        padding-bottom: 1vw;
        margin: 1.15vw auto 0;
    }

    .title {
        position: relative;
        color: #fff;
        display: block;
        border-radius: 1.58vw 1.58vw 0 0;
        height: 6.54vw;
        background-color: #24c6b5;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        padding-left: 2.86vw;
    }

    .title-content {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .title div span {
        position: relative;
        font-size: 1.54vw;
        font-weight: 600;
        font-stretch: normal;
        line-height: 2.5vw;
        letter-spacing: .15vw;
        color: #fff;
    }

    .progress-wrap {
        position: relative;
        padding: 2.5vw 2.68vw 0;
        border-radius: 0 0 1.58vw 1.58vw;
        background-color: #fff;
    }

    .progress-bar {
        position: relative;
        width: 100%;
        height: .5208vw;
        background-color: #eee;
        border-radius: .32vw;
    }

    .move-progress {
        width: 0;
        height: .5208vw;
        background-image: -webkit-gradient(linear,right top,left top,from(#faac1c),to(#ffc937));
        background-image: linear-gradient(-90deg,#faac1c,#ffc937);
        border-radius: .32vw;
    }

    .progress-num {
        z-index: 2;
        font-weight: 600;
        width: 2.6042vw;
        position: absolute;
        height: 1.12vw;
        background: -webkit-gradient(linear,left top,left bottom,from(#faac1c),to(#ffc937));
        background: linear-gradient(#faac1c,#ffc937);
        border-radius: .2604vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        top: -.2208vw;
    }

    .progress-num>span {
        font-size: .57vw;
        font-weight: 700;
        font-stretch: normal;
        letter-spacing: 0;
        color: #fff;
    }

    .divider {
        background: #eee;
        height: 1px;
        width: 100%;
        margin-top: 2.4479vw;
        margin-bottom: 1.4063vw;
    }

    .recent-level {
        padding-bottom: 1.4583vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .button {
        border: 0;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        outline: none;
        padding: 0 1.8vw;
        background: -webkit-gradient(linear,left top,left bottom,from(#ffc937),to(#faac1c));
        background: linear-gradient(#ffc937,#faac1c);
        border-radius: 1.05vw;
        font-family: SourceHanSansCN;
        font-size: .9375vw;
        font-weight: 700;
        font-stretch: normal;
        letter-spacing: .19vw;
        color: #fefefe;
        line-height: 2.6042vw;
    }

    .level-hint-container {
        margin-left: 1.0417vw;
    }

    .level-hint-container>div:first-child {
        color: #6c747a;
        font-size: .625vw;
        font-family: SourceHanSansCN;
    }

    .level-hint-container>div:last-child {
        color: #385061;
        font-size: 1.0417vw;
        margin-top: .5208vw;
        font-family: SourceHanSansCN;
    }

    .fixed_progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        background-color: #fff;
        z-index: 20;
    }

    .goback {
        background-color: #fff;
        height: 3.3333vw;
    }

    .goback_content {
        width: 54.45vw;
        height: 100%;
        margin: 0 auto;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .icon {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        cursor: pointer;
    }

    .goback_icon {
        height: 20px;
        width: 20px;
    }

    img {
        pointer-events: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .goback_icon>img {
        width: 100%;
    }

    .goback_text {
        margin-left: .5vw;
        font-size: 1.0417vw;
        font-weight: 700;
        font-stretch: normal;
        color: #385061;
    }

    .btn {
        color: #1fae9d;
        padding: .3125vw 1.3542vw;
        font-size: .625vw;
        border-radius: .8333vw;
        border: 1px solid #1fae9d;
        display: inline-block;
        cursor: pointer;
        font-weight: 700;
    }



    .fade-container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-shadow: 0 1px 1px 1px #eee;
        box-shadow: 0 1px 1px 1px #eee;
    }

    .fade-content {
        width: 54.45vw;
    }

    .fade-recent-level {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: .9375vw 0;
        border-top: 1px solid #eee;
    }

    .button {
        border: 0;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        outline: none;
        padding: 0 1.8vw;
        background: -webkit-gradient(linear,left top,left bottom,from(#ffc937),to(#faac1c));
        background: linear-gradient(#ffc937,#faac1c);
        border-radius: 1.05vw;
        font-family: SourceHanSansCN;
        font-size: .9375vw;
        font-weight: 700;
        font-stretch: normal;
        letter-spacing: .19vw;
        color: #fefefe;
        line-height: 2.6042vw;
    }

    .level-hint-container {
        margin-left: 1.0417vw;
    }

    .level-hint-container>div:first-child {
        color: #6c747a;
        font-size: .625vw;
        font-family: SourceHanSansCN;
    }

    .level-hint-container>div:last-child {
        color: #385061;
        font-size: 1.0417vw;
        margin-top: .5208vw;
        font-family: SourceHanSansCN;
    }
</style>