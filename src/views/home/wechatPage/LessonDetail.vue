<template>
    <div class="app">
        <div id="main">
            <div class="introduce ban-select">
                <img :src="detail.image" class="head-photo not-allow-save" v-for="detail in details">
                 <div data-v-c70c0296="" style="height: 15vh;">

            </div>
                <div  class="footer">
                    <div class="footer-text">
                        <div class="footer-text-img">
                            <!---->
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEDklEQVRYhc3ZS2xUVRzH8U+H0nb6BCrhIQWMgCRSQKGzRPCJAtJOeUQXhrhW1z6IC+NrYVwQNy6Mrlz4oKVTjfgIykZDWyBgVCBuXADF1HaABlto6+J2hul0pp3pY/C3u/d//vd8c+65/3PO7xat/P5DU1AYD2ErNmAValEzGo+jBxdwGj/hOG7k21FRnoAP4CVEUZ1nX3G04BBO5ZoUyrHdfWhHFw5MAY5gdA+MPiOGNbkkTQYYwms4gx0omgJYuoqwE2fx6mQMEwXn4yjeRMkMgKWrBG/ha8zL1igb4FLBpH505rnG6QnBR7QkUzATYA2+wbpZhErXesHbqkkPpAPOweeoLwBUuurxmTSmdMBX8FihiDLocbyceiMVcC0OFhQns17H6sRFKuB7KC04zniV4v3ERQJwk6DO/V+0Q7BqJQFfLDTBotJyH2980qF1j2QKF+EFAsCwYG0tmBaXVmiPNNtaW2fXonuzNduDcLFgR1JVWLio2pIwOBnvzta0GluKsa1AbJaUVWpviFpQUgZOX71iX1dsopRtxQpUlJeWVYqlwUU7Wo1MnFZfLNhKzTpceyRq/ty84GB1CAtmE25ZWdUYuK54d65wsDAkwwKdUF24ynPL7lc+p3hKcHXhKm2RpjFwezqP5AoHVRP2HItE1RSXen55vd0nWsRvDeT85MWlFcn8VLh8FRKcFTKq+99+sCJcrS3SZN7c3FbCunCV1oamJFxn3+UpweFaCP9kizZ3tfmzvw8sD1drjzSrKp54c313WaVYJGpRaTmCOre3q20qcPB3COeyRa/fGtTcecT5/t5k54c3NybnVLpWhKu1NDQmR+5kvHuyOjeZLoQEh5esit8a8PSJw85dDwZ6VcU8bZGmZD1LaGV5jVgkamFJMHKn4lc0dx4xNDI8HcCzIRybrNXA8JDdHS1+v96D0dLRcHu5uqe8RqyhKfn6T/Rdms5rTdWxEH7EtXwhl5RV+vTBnR6+a7nDmxtVpsDt74pNd+TgKo6HBHbEl7lk3Bwe1tjRmoRcUzHfRxu2J7/uX3ov2j+9OZeqL3AjsR/8INesweEhjR2tfrvWM+b+z70XPXOyfabgRhJMCcAufJUP5O6OFp19l/UP3XSs5y/PzhycUZZTjDWP1gqcqDt9LhkQ7LAuMPbQ9IfA5rjTesMoHOPPxe/gu4LijNW3eDf1RjrgEPaapHjPks5iH8bUp0zeTBzb8WsBoBI6IzCRxm1csrlbF7EFP8wiVEJHBXbypUzBifzBXoFXchCDM89lUGCOPoW+bI0mc1iHBSbjekFtymMznFUjAju5Hm9Lm3P5AiZ0TmDbbsIngnUyX8VHczdhF87nkpSvy59Q4jfEFmwUuFG1bpvrV83Qb4j/ANjmJE/DT5NvAAAAAElFTkSuQmCC"></div>
                        <span class="is-read">已阅读并同意</span>
                        <span class="need-konw">《秒可职场报名须知》</span>
                        <span class="private">《隐私政策》</span>
                    </div>
                </div>
            </div>
            <!---->

            <Footer
                    :form = form
                    :totalPrice = parseInt(sku.price)
                    :type = sku.type
                    :originPrice = originPrice
            />
        </div>
        <div class="latestNews"></div>
    </div>


</template>

<script>
    import Footer from './Footer'
    import {getDetailsAndSku} from "../../../service/api";

    export default {
        name: "LessonDetail",
        components:{
          Footer,
        },
        data(){
            return{
                details: [],
                sku:{},
                form:{            // 创建表单的表头
                    sku_ids:[],
                },

                originPrice: 299,  //  需要获取的课程原价  todo.....修改后端API

            }
        },
        created(){
            // 1、控制界面在非微信终端不显示内容  todo.... 上线开启
            // var userAgent = navigator.userAgent;
            // if (userAgent.match(/MicroMessenger/i) !== 'MicroMessenger') {
            //     window.location.href = "/wxError.html";
            // }

            getDetailsAndSku(this.$route.query.sku_id).then(res=>{
                console.log(res);
                this.details = res.details;
                this.sku = res.sku;
                this.form.sku_ids.push(res.sku.id);
            }).catch(err=>{
                console.log(err);
            });
        },


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

    #main .footer .footer-text .footer-text-img>img {
        width: 100%;
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


    .ban-select {
        moz-user-select: -moz-none;
        -o-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

</style>