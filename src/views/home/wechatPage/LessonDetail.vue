<template>
    <div class="app">
        <div id="main">
            <div class="introduce ban-select">
                <img src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/015d3df6c1c8676fd300ee2840a86c8d/1.png" class="head-photo not-allow-save">
                <img  src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/bad81b2a144a129300c9f93eacff9961/2.png" class="head-photo not-allow-save">
                <img data-v-c70c0296="" src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/6b2e489710bc990a1ef65e1ca6dea4e7/3.png" class="head-photo not-allow-save">
                <img data-v-c70c0296="" src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/e271288500ef94f7c3b8a54065a4236d/4.png" class="head-photo not-allow-save">
                <img data-v-c70c0296="" src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/d3c458c3fee7a7c8ab9750fd6ef67c48/5.png" class="head-photo not-allow-save">
                <img data-v-c70c0296="" src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/5d013456df8d943a5c31c5714bdb1946/6.png" class="head-photo not-allow-save">
                <img data-v-c70c0296="" src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/8b8db4a5f360e6707a9ad9d670186961/7.png" class="head-photo not-allow-save">
                <img data-v-c70c0296="" src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/47e3740d1660608347bda107efd6a79c/8.gif" class="head-photo not-allow-save">
                <img data-v-c70c0296="" src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/d24595f74dda5fd3c1e2425c212eff70/9.png" class="head-photo not-allow-save">
                <img data-v-c70c0296="" src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/ca807c79127ba1827995030dc3242d7b/10.gif" class="head-photo not-allow-save">
                <img data-v-c70c0296="" src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/de477e4f2d36e12f10280f64bedd703b/11.png" class="head-photo not-allow-save">
                <img data-v-c70c0296="" src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/090bd411afe326d7e82b1a4273c75141/12.gif" class="head-photo not-allow-save">
                <img data-v-c70c0296="" src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/8329f67def7f57ddf63c640d6194ec98/13.png" class="head-photo not-allow-save">
                <img data-v-c70c0296="" src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/1dca670e37ff254da33ed8b2c1b913cf/14.png" class="head-photo not-allow-save">
                <img data-v-c70c0296="" src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/f759afc31063a7079c58b57a5a21e5b5/15.png" class="head-photo not-allow-save">
                <img data-v-c70c0296="" src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/11dfef08d026e4f1e8339358bf39dd51/16.gif" class="head-photo not-allow-save">
                <img data-v-c70c0296="" src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/bc9db91ab19691414953cb5c6f4c77e6/17.png" class="head-photo not-allow-save">
                <img data-v-c70c0296="" src="https://cdn-oss-public.pyhot.cn/program_public/user_upload/42809dc8b525858ff4490c07c5ecf0fa/18.png" class="head-photo not-allow-save last-img"> <div data-v-c70c0296="" style="height: 15vh;">

            </div>
                <div data-v-c70c0296="" class="footer">
                    <div data-v-c70c0296="" class="footer-text">
                        <div data-v-c70c0296="" class="footer-text-img">
                            <!---->
                            <img data-v-c70c0296="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEDklEQVRYhc3ZS2xUVRzH8U+H0nb6BCrhIQWMgCRSQKGzRPCJAtJOeUQXhrhW1z6IC+NrYVwQNy6Mrlz4oKVTjfgIykZDWyBgVCBuXADF1HaABlto6+J2hul0pp3pY/C3u/d//vd8c+65/3PO7xat/P5DU1AYD2ErNmAValEzGo+jBxdwGj/hOG7k21FRnoAP4CVEUZ1nX3G04BBO5ZoUyrHdfWhHFw5MAY5gdA+MPiOGNbkkTQYYwms4gx0omgJYuoqwE2fx6mQMEwXn4yjeRMkMgKWrBG/ha8zL1igb4FLBpH505rnG6QnBR7QkUzATYA2+wbpZhErXesHbqkkPpAPOweeoLwBUuurxmTSmdMBX8FihiDLocbyceiMVcC0OFhQns17H6sRFKuB7KC04zniV4v3ERQJwk6DO/V+0Q7BqJQFfLDTBotJyH2980qF1j2QKF+EFAsCwYG0tmBaXVmiPNNtaW2fXonuzNduDcLFgR1JVWLio2pIwOBnvzta0GluKsa1AbJaUVWpviFpQUgZOX71iX1dsopRtxQpUlJeWVYqlwUU7Wo1MnFZfLNhKzTpceyRq/ty84GB1CAtmE25ZWdUYuK54d65wsDAkwwKdUF24ynPL7lc+p3hKcHXhKm2RpjFwezqP5AoHVRP2HItE1RSXen55vd0nWsRvDeT85MWlFcn8VLh8FRKcFTKq+99+sCJcrS3SZN7c3FbCunCV1oamJFxn3+UpweFaCP9kizZ3tfmzvw8sD1drjzSrKp54c313WaVYJGpRaTmCOre3q20qcPB3COeyRa/fGtTcecT5/t5k54c3NybnVLpWhKu1NDQmR+5kvHuyOjeZLoQEh5esit8a8PSJw85dDwZ6VcU8bZGmZD1LaGV5jVgkamFJMHKn4lc0dx4xNDI8HcCzIRybrNXA8JDdHS1+v96D0dLRcHu5uqe8RqyhKfn6T/Rdms5rTdWxEH7EtXwhl5RV+vTBnR6+a7nDmxtVpsDt74pNd+TgKo6HBHbEl7lk3Bwe1tjRmoRcUzHfRxu2J7/uX3ov2j+9OZeqL3AjsR/8INesweEhjR2tfrvWM+b+z70XPXOyfabgRhJMCcAufJUP5O6OFp19l/UP3XSs5y/PzhycUZZTjDWP1gqcqDt9LhkQ7LAuMPbQ9IfA5rjTesMoHOPPxe/gu4LijNW3eDf1RjrgEPaapHjPks5iH8bUp0zeTBzb8WsBoBI6IzCRxm1csrlbF7EFP8wiVEJHBXbypUzBifzBXoFXchCDM89lUGCOPoW+bI0mc1iHBSbjekFtymMznFUjAju5Hm9Lm3P5AiZ0TmDbbsIngnUyX8VHczdhF87nkpSvy59Q4jfEFmwUuFG1bpvrV83Qb4j/ANjmJE/DT5NvAAAAAElFTkSuQmCC"></div>
                        <span data-v-c70c0296="" class="is-read">已阅读并同意</span>
                        <span data-v-c70c0296="" class="need-konw">《秒可职场报名须知》</span>
                        <span data-v-c70c0296="" class="private">《隐私政策》</span>
                    </div>
                </div>
            </div>
            <!---->
            <div data-v-613029c0="" data-v-c70c0296="" id="pay" class="ban-select">
                <!---->
                <div data-v-613029c0="" class="tab">
                    <div data-v-613029c0="" class="price">
                        <div data-v-613029c0="" class="current">￥<span data-v-613029c0="">8.9</span></div>
                        <!---->
                    </div>
                    <img data-v-613029c0="" src="//cdn.pyhot.cn/wx/program/resource/cdn/today.0a9fa1a2d208cf8d7cb731f3b32decad.png" class="tab-intro not-allow-save">
                    <div data-v-613029c0="" class="wait-for-pay">
                        马上报名
                    </div>
                </div>
            </div>
        </div>
        <div class="latestNews"></div>
    </div>


</template>

<script>
    export default {
        name: "LessonDetail",
        created(){
            // 1、控制界面在非微信终端不显示内容
            // var userAgent = navigator.userAgent;
            // if (userAgent.match(/MicroMessenger/i) !== 'MicroMessenger') {
            //     window.location.href = "/wxError.html";
            // }
        }
    }
</script>

<style scoped>
    #main {
        width: 100%;
        height: 100%;
        position: relative;
    }

    #main .introduce {
        width: 100%;
        height: 100%;
        -webkit-overflow-scrolling: touch;
        background: #fff;
    }

    .ban-select {
        moz-user-select: -moz-none;
        -o-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    #main .introduce .head-photo {
        width: 100%;
        height: auto;
        position: relative;
        display: block;
    }

    #main .introduce .not-allow-save {
        pointer-events: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    #main .footer {
        width: 100%;
        position: relative;
        bottom: 6vh;
        font-family: SourceHanSansCN;
        font-size: 2.5vw;
        font-weight: 400;
        font-stretch: normal;
        letter-spacing: .36vw;
        color: #fff;
    }

    #main .footer .footer-text {
        position: absolute;
        top: -12.15vh;
        width: 100%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: center;
        justify-content: center;
        -ms-flex-align: center;
        align-items: center;
    }

    #main .footer .footer-text .footer-text-img {
        width: 2.52vw;
        height: 2.52vw;
        line-height: 0;
        margin-right: 1.44vw;
        cursor: pointer;
    }

    #main .footer .footer-text .is-read {
        color: #b6f6ff;
        cursor: pointer;
    }

    #main .footer .footer-text .need-konw {
        margin-left: 1vw;
        color: hsla(0,0%,100%,.85);
    }

    #main .footer .footer-text .private {
        color: hsla(0,0%,100%,.85);
    }

    #main #pay .tip, #main #pay {
        width: 100%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    #main #pay {
        position: fixed;
        bottom: 0;
        height: 15vh;
        background: #fff;
        z-index: 100;
    }

    #pay .tip, #pay {
        width: 100%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    #pay {
        position: fixed;
        bottom: 0;
        height: 15vh;
        background: #fff;
        z-index: 250;
    }

    .ban-select {
        moz-user-select: -moz-none;
        -o-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    #pay .tab .price, #pay .tab {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    #pay .tab {
        width: 100vw;
    }

    #pay .tab .price {
        margin-right: 3vw;
        width: 15vw;
        -ms-flex-direction: column;
        flex-direction: column;
    }

    #pay .tab .price, #pay .tab {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    #pay .tab .price .current {
        font-size: 5vw;
        font-weight: 700;
    }

    #pay .tab .tab-intro {
        width: 25vw;
        margin-left: 3vw;
        margin-right: 3vw;
    }

    #pay .tab .wait-for-pay {
        width: 40vw;
        border-radius: 2vw;
        height: 10vh;
        background: linear-gradient(to bottom right,#ff8183,#ff52ba);
        color: #fff;
        line-height: 10vh;
        text-align: center;
        font-size: 5vw;
        -ms-touch-action: none;
        touch-action: none;
    }
</style>