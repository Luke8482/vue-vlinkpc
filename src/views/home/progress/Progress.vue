<template>
    <div>
        <div class="lesson-detail ban-select">
            <has_catalog_header/>
            <detail_wrap/>

        </div>
        <footerContainer :isShow="isShow"/>
    </div>

</template>

<script>
    import has_catalog_header  from './components/has_catalog_header'
    import detail_wrap  from './components/detail_wrap'
    import footerContainer from './../components/footerContainer'


    export default {
        name: "Progress",
        data(){
            return{
                isShow: false,  //  控制页面底部，是否显示公司联系地址

            }
        },
        components:{
            has_catalog_header,
            detail_wrap,
            footerContainer,
        },
        // mounted () {
        //     // window.addEventListener('scroll', this.handleScroll)
        // },

    }
</script>

<style scoped>
    .ban-select {
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .lesson-detail {
        background-color: #f7f7fb;
        padding-bottom: 10vh;
    }
</style>