<template>
    <div id="after-sales">
        <div id="after-sales-home">
            <div >
                <div class="jz-spin fix" style="display: none;">
                    <div class="spin-main">
                        <div class="load-cont">
                            <!---->
                            <div class="spin-bd">
                                <div class="dot2">

                                </div>
                                <div class="txt" style="display: none;">...加载中</div>
                            </div>
                            <!---->
                        </div>
                    </div>
                </div>
                <div class="head">
                    <img src="" class="ah-ava">
                    <p class="ah-desc">同学，您好！</p>
                </div>
                <div class="ac-wrap">
                    <div class="af-cont">
                        <svg  aria-hidden="true" class="svg-icon svg-icon-quotes" >
                            <use  xlink:href="#icon-quotes">

                            </use>
                        </svg>
                        <p class="ac-p1 f-bold">虚拟学习产品一经购买，不提供退款服务，提交售后申请前，须与相关老师确认，方可填写。</p>
                        <div class="ac-line">

                        </div>
                        <p class="ac-p1 mb30">
        VlinkPC的陪伴能让您体会阅读和学习之美。
        <br >但此刻，很遗憾，我们在此相见。
    </p>
                        <p class="ac-p1 mb30">如若您确定不需要的VlinkPC学习陪伴，请在申请前仔细阅读售后申请须知：</p>
                        <p class="ac-p1">
        1、学习过程中如遇任何问题，我们强烈建议您先与老师联系并反馈问题，我们将以百分之百的热忱帮您解决问题。
        <br>2、VlinkPC平台内的书籍和课程为虚拟商品，系统暂不支持自购买日起7天后的订单售后申请，请您谅解。
        <br>3、售后申请提交后，我们将在7个工作日内完成处理，处理结果将发送至公众号内，请勿取消公众号，以免错失消息，如未关注公众号的，请前往关注。
    </p>
                    </div>
                    <div class="af-btns">
                        <div class="af-btn af-btn-lt" >我心已决</div>
                        <div class="af-btn af-btn-rt" >继续学习</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RefundPage",

    }
</script>

<style>
    body {
        line-height: 1.6;
        font-size: .28rem;
        font-family: sans-serif,PingFang SC,PingFangSC-Medium,-apple-system-font,BlinkMacSystemFont,Helvetica Neue,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial;
        background: #f5f8fa;
        color: #243030;
        overscroll-behavior-y: none;
        -webkit-user-select: none;
        user-select: none;
    }
    html{
        font-size: 50px;
    }
</style>
<style scoped>

    * {
        box-sizing: border-box;
        word-wrap: break-word;
        word-break: normal;
    }
    #after-sales-home {
        position: relative;
        min-height: 100vh;
        background-color: #f5f8fa;
    }
    .jz-spin.fix {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 8;
        width: 100%;
        height: 100%;
        background-color: hsla(0,0%,100%,.9);
    }
    .jz-spin.fix .spin-main {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }
    .jz-spin .spin-main {
        display: -webkit-box;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
    }
    .jz-spin.fix .spin-main .load-cont {
        text-align: center;
    }
    .jz-spin .spin-main .dot2 {
        position: relative;
        width: .5rem;
        height: .5rem;
        margin: 0 auto;
        border: .05rem solid #d98a2b;
        border-top-color: rgba(0,0,0,0);
        border-radius: 100%;
        -webkit-animation: ani-spin-rote .75s linear infinite;
        animation: ani-spin-rote .75s linear infinite;
    }
    .jz-spin .spin-main .txt {
        color: #ccc;
        font-size: .3rem;
        margin-top: .2rem;
    }
    #after-sales-home .head {
        display: -webkit-box;
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2.4rem;
        padding: .3rem;
        background: url(/aftersale-bg.jpg) no-repeat;
        background-size: 100% 100%;
        z-index: 1;
    }
    #after-sales-home .head .ah-ava {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }
    img {
        border-style: none;
    }
    img {
        -webkit-touch-callout: none;
    }
    #after-sales-home .head .ah-desc {
        height: 1rem;
        margin-left: .2rem;
        color: #fff;
        font-size: .36rem;
        line-height: 1rem;
    }

    #after-sales-home .ac-wrap {
        position: absolute;
        width: 100%;
        top: 1.6rem;
        z-index: 2;
    }
    #after-sales-home .ac-wrap .af-cont {
        width: 6.9rem;
        margin: 0 auto;
        padding: .2rem .3rem .3rem;
        border-radius: .3rem;
        background-color: #fff;
    }
    #after-sales-home .ac-wrap .af-cont .svg-icon-quotes {
        width: .5rem;
        height: .5rem;
    }
    .svg-icon-quotes {
        color: #d7dce1;
    }
    .svg-icon {
        width: 1em;
        height: 1em;
        position: relative;
        vertical-align: middle;
        fill: currentColor;
        overflow: hidden;
    }

    .f-bold {
        font-weight: 700;
    }
    #after-sales-home .ac-wrap .af-cont .ac-line {
        width: 100%;
        height: 1px;
        margin: .3rem 0;
        border-bottom: 1px dotted #d98a2b;
    }

    #after-sales-home .mb30 {
        margin-bottom: .3rem;
    }

    #after-sales-home .ac-wrap .af-cont .ac-p1 {
        font-family: PingFangSC-Regular,PingFang SC;
        font-size: .3rem;
        line-height: .48rem;
        color: #404856;
    }
    #after-sales-home p {
        margin: 0;
    }
    p {
        margin: 0;
    }

    #after-sales-home .ac-wrap .af-btns {
        display: -webkit-box;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        margin: .3rem 0;
    }
    #after-sales-home .ac-wrap .af-btns .af-btn-lt {
        margin-right: .3rem;
        background-color: #fff;
        color: #d98a2b;
    }

    #after-sales-home .ac-wrap .af-btns .af-btn-rt {
        background: -webkit-linear-gradient(left,#d98a2b,#f4ba2b);
        background: linear-gradient(90deg,#d98a2b,#f4ba2b);
        color: #fff;
    }
    #after-sales-home .ac-wrap .af-btns .af-btn {
        width: 3.3rem;
        height: .8rem;
        line-height: .8rem;
        border-radius: .2rem;
        text-align: center;
        font-weight: 700;
    }

</style>