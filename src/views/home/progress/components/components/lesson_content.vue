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
                let height = document.getElementById(token).offsetTop-document.getElementById("anchor_base").offsetTop;
                window.scroll({
                    top: height, //向上移动的距离，如果有fixede布局， 直接减去对应距离即可
                    behavior: 'smooth', // 平滑移动
                });
            }
        }

    }
</script>

<style scoped>
    .lesson_content {
        width: 75.49vw;
    }




</style>