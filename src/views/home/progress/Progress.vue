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
                isShow: false,
            }
        },
        components:{
            has_catalog_header,
            detail_wrap,
            footerContainer,
        }
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