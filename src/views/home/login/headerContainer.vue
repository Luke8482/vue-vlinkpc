<template>
    <div class="headerContainer">
        <div>
            <img src="//cdn.pyhot.cn/app/program/resource/cdn/logo.088bf7642ddb5e447060d2129b4a5b25.png" alt="">
        </div>
        <div class="headerRightSide">
            <div>服务热线：400-990-9669</div>
            <div class="concern">关注公众号</div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "headerContainer"
    }
</script>

<style scoped>
    /*头部样式*/
    .headerContainer {
        width: 100vw;
        height: 10vh;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding-left: 19.27vw;
        padding-right: 19.27vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    .headerContainer>div{
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        height: 50%;
    }

    .headerContainer>div>img {
        height: 100%;
        display: block;
    }

    .headerRightSide {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        font-size: 12px;
    }

    .headerRightSide>.concern {
        color: #fff;
        background-color: #24c7b5;
        padding: .6vh 1.04vw;
        border-radius: 16px;
        margin-left: 1.05vw;
    }

    .headerRightSide>div {
        color: #385061;
    }
</style>