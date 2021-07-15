<template>
    <div  data-index="0" class="level_detail" @click="scrollToTarget" @mouseenter="dealShowItem(true)" @mouseleave="dealShowItem(false)" :style="{backgroundColor:bgColor}" :class="lesson.isUnlock?'':'unfinished'">
        <img  :src="finished" v-if="lesson.progress === '100%'">
        <a  class="go_to" ></a>
        <span  class="level_name" >{{lesson.title}}</span>
    </div>
</template>

<script>
    import Pubsub from 'pubsub-js'

    export default {
        name: "lessonCard",
        data(){
            return{
                bgColor:'',
                finished: require('@/images/content/finished.png'),
            }
        },
        props:{
            lesson: Object,
        },
        methods:{
            dealShowItem(showItem){
                this.bgColor=showItem?'rgb(96,115,129)':''
            },

            scrollToTarget(){
                Pubsub.publish('scrollto', '#vlinkpc'+this.lesson.sort_int)
            },
        }
    }
</script>

<style scoped>
    .level_detail {
        position: relative;
        padding-left: 3.99vw;
        cursor: pointer;
        font-size: .73vw;
        font-weight: 400;
        font-stretch: normal;
        letter-spacing: .07vw;
        color: #fff;
        height: 1.59vw;
        line-height: 1.59vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .unfinished {
        opacity: .5!important;
    }

    .level_detail>img {
        position: absolute;
        top: 50%;
        left: 2.88vw;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        width: .68vw;
    }

    .hover_style {
        color: #faac1c!important;
        z-index: 0;
    }

    .go_to {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .unfinished {
        opacity: .5!important;
    }
</style>