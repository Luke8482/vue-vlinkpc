<template>
    <div class="headerContainer">
        <div>
            <div class="header_left">
                <img  src="/avatarLogo.png" class="triangle-icon">
                <img  src="/vlink-logo.png" class="triangle-icon2">
            </div>
        </div>
        <div class="headerRightSide" @mouseenter="showQrcode" @mouseleave="showQrcode">
            <!--<div>服务热线：400-990-9669</div>-->
            <div class="concern">关注公众号</div>
        </div>
    </div>

</template>

<script>
    import bus from '@/views/admin/common/bus'
    export default {
        name: "headerContainer",
        methods:{
            showQrcode(){
                bus.$emit('shiftShowQrcode');
            }
        }


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
        background-color: #ffd23b;
        padding: .6vh 1.04vw;
        border-radius: 16px;
        margin-left: 1.05vw;
    }

    .headerRightSide>div {
        color: #385061;
    }

    .header-content .header_left, .header-content .header_vip, .header-content {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }



    .triangle-icon {
        width: 2.6042vw;
        height: 2.6042vw;
    }

    .triangle-icon2 {
        height: 1.0vw;
        position: relative;
        bottom: 50%;
        margin-bottom: 0.5vw;
    }

    img {
        pointer-events: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>