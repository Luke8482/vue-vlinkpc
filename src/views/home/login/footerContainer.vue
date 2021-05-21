<template>
    <div  class="footerContainer">
        <div v-if="isShow">
            <div>联系地址：广州大学城青蓝街28号创智大厦1栋206</div>
            <div>电子邮箱：719496375@qq.com</div>
            <div>电话：400-990-9669</div>
        </div>

        <div  style="margin-left: 2.6vw;">Copyright©2020. 广州秒可科技有限公司</div>
        <a href="http://www.beian.miit.gov.cn/" style="margin-left: 2.6vw;">粤ICP备18112191号-2</a>
    </div>

</template>

<script>
    export default {
        name: "footerContainer",
        data(){
            return{
                // isShow: true,
            }
        },
        props:{
            isShow:{
                type:Boolean,
                default:true,
            },
        }
    }
</script>

<style scoped>
    /*底部样式*/
    .footerContainer {
        width: 100vw;
        height: 5vh;
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

    .footerContainer>a {
        text-decoration: none;
    }

    .footerContainer>a, .footerContainer>div {
        font-size: 12px;
        color: #6c747a;
    }
</style>