<template>

    <div class="mask">

        <!-- 提示在浏览器打开弹框 -->

        <div class="pay-mask" v-show="isWeiXi">

        </div>

        <div class="payform"></div>

    </div>

</template>



<script type="text/ecmascript-6">
    import { testAlipay} from "../../../service/api";
    import ls from '@/utils/localStorage'   //已修改修改为localStorage

    /*
    解决在微信浏览器中无法调用支付宝支付：
    1.拿到从支付页传递过来的参数重组成自己需要的数据
    2.清除旧的缓存数据（防止出现意外bug）
    3.验证是否是微信浏览器（不是就把拿到的key和token存进本地缓存中，用于其他接口调用）
    4.请求数据接口拿到支付宝的支付表单装进页面中完成支付
    */

    export default {

        name: 'PayMask',

        data() {

            return {

                isWeiXi: true,

                theRequest: {}

            }

        },

        methods: {

// 获取当前微信浏览器url地址参数

            getUrlParams() {

// 清除旧的缓存数据

                // window.localStorage.clear();
                ls.logout();

                let theRequest = new Object();

                let url = location.href; //获取url中"?"符后的字串

                let strs = [];

                if (url.indexOf("?") != -1) {

                    var str = url.substr(parseInt(url.indexOf("?") + 1));

                    strs = str.split("&");

                    for (var i = 0; i < strs.length; i++) {

                        theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);

                    }

                }

                this.theRequest = theRequest;

            },

// 监控微信浏览器

            isWeiXin() {

                // let ua = window.navigator.userAgent.toLowerCase();

                // if (ua.match(/MicroMessenger/i) != "micromessenger") {

                var useragent = navigator.userAgent;
                if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {

                    this.isWeiXi = false;

// 重新存储新的token（在外部浏览器打开支付完成后是没有token这些数据的所以需要在浏览器一打开的时候就去存一次数据）

                    ls.setItem("access_token", this.theRequest.access_token);

                    ls.setItem("user", this.theRequest.user);

                    ls.setItem("access_token_expired_at", parseInt(this.theRequest.access_token_expired_at));

                    testAlipay(this.theRequest.orderId).then(res => {
                        document.querySelector(".payform").innerHTML = res;
                        document.forms[0].submit();
                        // // if (res.status == 0) {
                        //
                        //     let payHtml = document.querySelector(".payform");
                        //
                        //     // payHtml.innerHTML = res.result;
                        //     payHtml.innerHTML = res;
                        //
                        //     let paySub = payHtml.getElementsByTagName("input")[1];
                        //
                        //     paySub.click()

                        // }

                    }).catch(err => {
                        console.log(err);
                    })

                } else {

                    this.isWeiXi = true

                }

            },
        },


        created() {

// 拿去当前地址参数

            this.getUrlParams();

            if (JSON.stringify(this.theRequest) != '{}') {

                this.isWeiXin()

            }

        },

        mounted() {

// 更新一下当前浏览器地址（防止在微信里调用外部浏览器的时候出现意外bug）

            // window.location.href = window.location.href

        },
    }

</script>



<style scoped lang="less">

    .pay-mask {

        width: 100%;

        min-height: 100%;

        position:fixed;

        z-index: 99;

        background-color: rgba(241, 246, 252);

        background-image: url('../../../images/icon/confirm.jpg');

        background-repeat: no-repeat;
        background-size: 100%;

    }

</style>