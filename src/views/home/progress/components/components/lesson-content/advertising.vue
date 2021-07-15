<template>
    <!--广告图片-->
    <div  class="bg_img" @click="showRcmCourse">
        <img  src="//cdn.pyhot.cn/app/program/resource/cdn/buy_group_bg.8b9b034b0ec6daa8451ffef8a8927b56.png">
        <div  class="content">
            <div >
                实战训练营+数据分析精进
            </div>
            <div class="button">
                组合购买减300
            </div>
        </div>
    </div>
</template>

<script>
    import bus from '@/views/admin/common/bus';

    export default {
        name: "advertising",
        methods:{
            showRcmCourse(){
                bus.$emit('dealAdvertise');
            }
        }
    }
</script>

<style scoped>




    /*广告部分*/
    .bg_img {
        margin: 0 auto;
        position: relative;
        cursor: pointer;
        width: 54.45vw;
        height: 10.63vw;
        border-radius: 1.58vw;
        margin-top: 2vw;
    }

    .bg_img>img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }



    .content {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        text-align: center;
        font-family: SourceHanSansCN;
        font-size: 1.54vw;
        font-weight: 600;
        font-stretch: normal;
        letter-spacing: .15vw;
        color: #fff;
    }

    .button {
        position: relative;
        margin: 0 auto;
        margin-top: 1.22vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        cursor: pointer;
        width: 18.59vw;
        height: 2.66vw;
        background-image: -webkit-gradient(linear,right top,left top,from(#ff43ad),color-stop(98%,#ffbb45));
        background-image: linear-gradient(-90deg,#ff43ad,#ffbb45 98%);
        border-radius: 1.26vw;
        font-family: SourceHanSansCN;
        font-size: 1.17vw;
        font-weight: 400;
        font-stretch: normal;
        letter-spacing: .23vw;
        color: #fefefe;
        line-height: 2.66vw;
    }
</style>