<template>
    <div>
        <div  class="target_title" @click="showlessons=!showlessons">
                        <span>
                            阶段{{index+1}}：{{chapter.title}}
                        </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" :class="showlessons?isrotate:rotate_circle">
                <g fill="none" fill-rule="evenodd">
                    <path fill="none" d="M0 0h22v22H0z"/>
                    <path stroke="#FFF" stroke-linecap="round" stroke-width="2.1" d="M6.187 13.597l4.853-4.852a.7.7 0 0 1 .99 0l4.852 4.852"/>
                </g>
            </svg>
        </div>
        <div  class="level_list" v-show="showlessons">
            <lessonCard
                    v-for="(lesson, index) in chapter.lessons"
                    :lesson = lesson
            />
        </div>
    </div>
</template>

<script>
    import lessonCard from './lessonCard';

    export default {
        name: "chapterCard",
        components:{
          lessonCard,
        },
        props:{
            chapter: Object,
            index: Number,
        },
        data(){
            return{
                showlessons:true,
                isrotate:"rotate",
                rotate_circle:"rotate_circle",
                arrow: require('@/images/content/arrow.png'),

            }
        },

    }
</script>

<style scoped>
    .target_title {
        position: relative;
        overflow: hidden;
        -webkit-transition: all .1s;
        transition: all .1s;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        cursor: pointer;
        font-size: .87vw;
        font-weight: 400;
        font-stretch: normal;
        letter-spacing: .09vw;
        color: #fff;
        padding-left: 1.82vw;
        padding-bottom: 1.09vw;
    }


    .target_title>span {
        width: 78%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .target_title>img {
        position: absolute;
        right: 1.75vw;
        top: 0;
        width: 1.2vw;
        -webkit-transform: rotate(-180deg);
        transform: rotate(-180deg);
    }




    .rotate_circle {
        -webkit-transform: rotate(180deg)!important;
        transform: rotate(180deg)!important;
    }


    .rotate, .rotate_circle {
        -webkit-transition: -webkit-transform .4s linear;
        transition: -webkit-transform .4s linear;
        transition: transform .4s linear;
        transition: transform .4s linear,-webkit-transform .4s linear;
    }

    .rotate {
        -webkit-transform: rotate(1turn)!important;
        transform: rotate(1turn)!important;
    }

    img {
        pointer-events: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .level_list>div:first-child {
        margin-top: .2vw;
    }

    .level_list>div:last-child {
        margin-bottom: 1.4vw;
    }


</style>