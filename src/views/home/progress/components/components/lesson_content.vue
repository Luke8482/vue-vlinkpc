<template>
    <div class="lesson_content">
        <lesson_title
                :lastLearnedLesson = lastLearnedLesson
        />
        <lesson_target/>
        <advertising/>
        <button @click="scrollToTarget">调转</button>


    </div>
</template>

<script>
    import lesson_title from './lesson-content/lesson-title'
    import lesson_target from './lesson-content/lesson_target'
    import advertising from './lesson-content/advertising'

    import Pubsub from 'pubsub-js'


    export default {
        name: "lesson_content",
        components:{
            lesson_title,
            lesson_target,
            advertising
        },
        props:{
            lastLearnedLesson: Object,
        },
        created(){
            console.log(this.lastLearnedLesson);
        },
        mounted(){
            Pubsub.subscribe('scrollto',(msg,token)=>{
                console.log(msg, token);
                this.scrollToTarget()
            });
        },
        methods:{
            scrollToTarget(){
                document.querySelector("#testid").scrollIntoView(true)
            }
        }

    }
</script>

<style scoped>
    .lesson_content {
        width: 75.49vw;
    }


</style>