<template>
    <div  class="footerContainer">
        <div v-if="isShow" style="display: flex;">
            <div>联系地址：广州天河区黄村晨晖商务大厦D栋207</div>
            <div style="margin-left: 2.6vw;">电子邮箱：2817688632@qq.com</div>
            <!--<div>电话：</div>-->
        </div>

        <div  style="margin-left: 2.6vw;">Copyright©2020. 广州威领科技有限公司</div>
        <a href="http://www.n.miit.gov.cn/" style="margin-left: 2.6vw;">粤ICP备xxxx号-2</a>
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
        /*width: 100vw;*/
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