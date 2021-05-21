<template>
    <div class="has_catalog_header">
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
    </div>
</template>

<script>
    export default {
        name: "has_catalog_header"
    }
</script>

<style scoped>
    .has_catalog_header {
        background: #fff;
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
    .goback_icon>img {
        width: 100%;
    }
    img {
        pointer-events: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
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
</style>