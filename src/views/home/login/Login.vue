<template>
    <div class="pageContainer">
        <headerContainer/>
        <contentContainer/>
        <footerContainer/>
    </div>

</template>

<script>
    import headerContainer from './headerContainer'
    import contentContainer from './contentContainer'
    import footerContainer from './footerContainer'
    export default {
        name: "Login",
        components:{
            headerContainer,
            contentContainer,
            footerContainer,
        }
    }
</script>

<style scoped>
    .pageContainer {
        font-family: SourceHanSansCN;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        background: url(//cdn.pyhot.cn/app/program/resource/cdn/bg.0321d1585ea5e1f43b47c6c7bc72c7cb.png) no-repeat 0 0;
        background-size: 88.8vw 90vh;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }


</style>