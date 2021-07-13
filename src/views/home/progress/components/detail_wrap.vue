<template>
    <div class="detail_wrap">
        <lesson_content
                :lastLearnedLesson = lastLearnedLesson
        />
        <catalog_wrap
                :chapters = chapters
        />
    </div>
</template>

<script>
    import lesson_content from './components/lesson_content'
    import catalog_wrap from './components/catalog_wrap'

    import {getchapters} from "../../../../service/api";


    export default {
        name: "detail_wrap",
        data(){
            return{
                chapters: [],
                lastLearnedLesson: {},
            }
        },
        components:{
            lesson_content,
            catalog_wrap
        },

        created(){
            getchapters(this.$route.query.course_id).then(res=>{
                this.chapters = res.chapters;
                this.lastLearnedLesson = res.lastLearnedLesson;

            }).catch(err=>{
                console.log(err);
            })
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