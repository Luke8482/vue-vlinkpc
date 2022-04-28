<template>
    <div>
        <!--支付方式切换按钮-->
        <div class="payment_container" @click="switchPayType">
            <div class="payment_type" v-if="payType==='wechat'">
                <span class="payment_icon weixin_payment"></span>
                <div class="payment_text">
                    微信支付
                </div>
            </div>

            <div class="payment_type" v-if="payType ==='alipay'">
            <span class="payment_icon zhifubao_payment"></span>
            <div class="payment_text zhifubao_active">
            支付宝
            </div>
            </div>

            <div class="switch">
                <span class="switch_icon"></span>
            </div>
        </div>

        <!--组合课程推荐按钮-->
        <div class="course-cart" v-if="type === 'main'">
            <div class="cart-price">
                组合套餐立省4880
            </div>
            <div class="cart-corner">限时优惠</div>
        </div>

        <div id="pay" class="ban-select">
            <!---->
            <div class="tab">
                <div class="price">
                    <div class="current">￥<span>{{towNumber(totalPrice)}}</span></div>
                    <!---->
                </div>
                <img src="//cdn.pyhot.cn/wx/program/resource/cdn/today.0a9fa1a2d208cf8d7cb731f3b32decad.png"
                     class="tab-intro not-allow-save"
                     v-if="type==='pre'"
                >

                <!--优惠明细表-->
                <div class="origin-price" v-if="type==='main' || type==='sale'">
                    <div class="price-before">
                        <div>
                            原价：{{towNumber(originPrice)}}
                            <div class="price-line"></div>
                        </div>
                    </div>

                    <div class="show-price">组合优惠：{{towNumber(totalPrice)-towNumber(originPrice)}}</div>
                </div>
                <div class="wait-for-pay" @click="createOrder">
                    马上报名
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {createOrder, testAlipay, testWechat, alipayReturn} from "../../../service/api";

    export default {
        name: "Footer",
        data(){
            return{
                payType: 'wechat',    // 支付方式
                msg:'',   //支付成功回调信息
            }
        },
        props:{
            form: Object,
            totalPrice: Number,
            type: String,
            originPrice: Number,
        },
        inject:['reload'],
        created(){
            let $query = this.$route.query;
            if ($query.method === "alipay.trade.wap.pay.return") {
                // 支付宝支付完成后的前端回调逻辑
                alipayReturn($query).then(res=>{
                    this.msg = res.msg;
                    this.$alert(this.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$emit('finishedPain');
                            }
                        });
                }).catch(err=>{
                    console.log(err);
                })
            } else {
                //  微信支付完成的前端回调逻辑

            }

        },
        methods:{
            createOrder(){
                createOrder(this.form).then(res=>{
                    if (this.payType === 'wechat'){
                        //  调用微信支付接口
                        testWechat(res.id).then(res=>{
                            if(res.data.code === 0) {
                                const pay_params = res.data.data;
                                if (typeof WeixinJSBridge === "undefined"){
                                    if(document.addEventListener){
                                        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
                                    }else if (document.attachEvent){
                                        document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                                        document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
                                    }
                                }else{
                                    this.onBridgeReady(pay_params);
                                }
                            }else{
                                alert('微信支付调起失败！');
                            }
                        }).catch(err=>{
                            console.log(err);
                        })
                    }else {
                        //  调用支付宝支付接口
                        testAlipay(res.id).then(res=>{
                            document.querySelector("body").innerHTML = res;
                            document.forms[0].submit();

                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                })
            },
            towNumber(val) {
                return Number(val).toFixed(0)

            },
            switchPayType(){
              if (this.payType === 'wechat'){
                  this.payType = 'alipay';
              }else{
                  this.payType = 'wechat';
              }
            },


            //  微信支付参考代码
            // payOrder() {
            //     this.postRequestWWW(this.baseUrl + '/pay/generalQRCode',{
            //         sessionId: this.sessionId,
            //         userId: localStorage.getItem('userId')
            //     }).then((res) => {
            //         if(res.data.code === 0) {
            //         const pay_params = res.data.data;
            //         if (typeof WeixinJSBridge === "undefined"){
            //             if(document.addEventListener){
            //                 document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
            //             }else if (document.attachEvent){
            //                 document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
            //                 document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
            //             }
            //         }else{
            //             this.onBridgeReady(pay_params);
            //         }
            //     }else{
            //         alert('微信支付调起失败！');
            //     }
            // }).catch((err) => {
            //         console.log(err);
            // })
            // },
            onBridgeReady(params) {
                var that = this;
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId": params.appId,  //公众号名称，由商户传入
                        "timeStamp": params.timeStamp, //支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        "nonceStr": params.nonceStr,  //支付签名随机串，不长于 32 位
                        "package": params.package,//统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        "signType": 'MD5',  //签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        "paySign": params.sign, //支付签名
                    },
                    function (res) {
                        if (res.err_msg === "get_brand_wcpay_request:ok") {
                            alert('支付成功！');
                            that.$router.push({path: '/program/course-cart'}); // TODO... 修改为本项目的回调地址
                            this.$emit('finishedPain');
                        } else if (res.err_msg === "get_brand_wcpay_request:fail") {
                            alert('支付失败！');
                        }
                    });
            },


        }
    }
</script>

<style scoped>
     #pay {
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
        z-index: 100;
    }

     #pay {
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
    /*支付方式切换样式*/
    .payment_container, .payment_type {
        display: -webkit-box;
        display: flex;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: -moz-box;
    }
    .payment_container {
        position: fixed;
        bottom: 15vh;
        height: 8vw;
        background: #fff;
    }
    .payment_type {
        width: 28.8vw;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .zhifubao_payment {
        background: url(https://office.toofun.top/ttposter_zhifubao.png);
        background-size: 100% 100%;
    }
    .weixin_payment {
        background: url(https://office.toofun.top/ttposter_weixing.png);
        background-size: 100% 100%;
    }
    .payment_icon {
        display: inline-block;
        width: 5.8667vw;
        height: 5.8667vw;
    }

    .payment_text {
        font-size: 3.7333vw;
        color: #09bb07;
        margin-left: 2.6667vw;
    }
    .zhifubao_active {
        color: #05b4fd;
    }
    .switch {
        width: 10.6667vw;
        background: #d9d9d9;
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
    .switch_icon {
        display: inline-block;
        width: 5.8667vw;
        height: 4.5333vw;
        background: url(https://office.toofun.top/ttposter_switch.png);
        background-size: 100% 100%;
    }

    /*组合课程按钮样式*/
    .course-cart{
        display: -webkit-box;
        display: flex;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: -moz-box;
        position: fixed;
        bottom: 15vh;
        right:5vw;
        height: 20vw;
    }
    .cart-corner{
        background-color: red;
        text-align: center;
        position: absolute;
        font-size: 2vw;
        height: 4vw;
        line-height: 4vw;
        padding: 0 2vw;
        top: -3vw;
        right: 0;
        border-radius: 1vw;

    }
    .cart-price{
        background-color: #e6a23c;
        height: 12vw;
        width: 100%;
        border-radius: 6vw;
        font-size: 4vw;
        font-weight: 700;
        color:#fff;
        text-align: center;
        line-height: 12vw;
        padding: 0 5vw;
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


    /*原价展示样式*/
    .origin-price{
        text-align: center;
        margin: 0 3vw;
    }
    .price-before{
        margin-bottom:2vw;
        color: gray;
        font-size:4vw;
    }
    .price-line{
        border-top-style:solid;
        border-color:gray;
        position: relative;
        top:-2.5vw;
        left: 3vw;
        width: 80%;
    }
    .show-price{
        background: linear-gradient(to  right,#ff52ba,#1b6fc5);
        color: #fff;
        font-size:4vw;
        font-weight:400;
        padding: 2vw;
        border-radius: 2vw;
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

<style>
    .el-message-box {
        max-width: 80vw;
    }
</style>