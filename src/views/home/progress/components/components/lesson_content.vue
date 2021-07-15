<template>
    <div class="lesson_content">
        <lesson_title
                v-if="JSON.stringify(lastLearnedLesson) !=='{}'"
                :lastLearnedLesson = lastLearnedLesson
        />

        <chapterCard
                v-for="(chapter, index) in chapters"
                :chapter = chapter
                :index = index
        />


    </div>
</template>

<script>
    import lesson_title from './lesson-content/lesson-title'
    import chapterCard from './lesson-content/chapterCard'


    import Pubsub from 'pubsub-js'


    export default {
        name: "lesson_content",
        components:{
            lesson_title,
            chapterCard
        },
        props:{
            lastLearnedLesson: Object,
            chapters: Array,
        },
        created(){
        },
        mounted(){
            Pubsub.subscribe('scrollto',(msg,token)=>{
                this.scrollToTarget(token)
            });
        },
        methods:{
            scrollToTarget(token){
                document.querySelector(token).scrollIntoView(true)
            }
        }

    }
</script>

<style scoped>
    .lesson_content {
        width: 75.49vw;
    }




</style>