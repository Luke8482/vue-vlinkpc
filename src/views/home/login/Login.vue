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
    import footerContainer from './../components/footerContainer'
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
        background: url(../../../assets/img/login.png) no-repeat 0 0;
        background-size: 100vw 95vh;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }


</style>