<template>
    <div class="detail_wrap">
        <lesson_content/>
        <catalog_wrap/>
    </div>
</template>

<script>
    import lesson_content from './components/lesson_content'
    import catalog_wrap from './components/catalog_wrap'


    export default {
        name: "detail_wrap",

        components:{
            lesson_content,
            catalog_wrap
        }
    }
</script>

<style scoped>
    .detail_wrap {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: start;
        -ms-flex-align: start;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        position: relative;
    }

    img {
        pointer-events: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .test{
        margin-top: 2000px;
    }
</style>