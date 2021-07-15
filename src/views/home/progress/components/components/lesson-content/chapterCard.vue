<template>
    <div>
        <!--章节段落-->
        <div >
            <div  class="lesson_target">
                <div  class="target_title" @click="showLessons = !showLessons" :class="showLessons?'':'all_angle'">
                    <span >
                        阶段{{index+1}}：{{chapter.title}}
                    </span>
                    <img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABlUlEQVRYR+3WTUrDQBQH8PfG1E0X4hG8gguhIK5E3BbMxoX4LW69gDfQvZgWdFlsRBQ33QkNeAZ3egFB/JxmJJWEmiZxZt40FJnsSubN+/U/E2YQxvzBMfeBBVJXyCZoE6QmQK23e9Bogovu7tQL58cIeBv4Xos6uUr9/Or+NH/9OEIGV0G74ce1yRK77uHkE3+8E0LMAWKIABuB3zhTaaI7NsL13t47QsAsIvSAsZXgwruM5kuAC+72zCcPH0AI1m9UEnIQF/9BhnDa9Zs7v4DRj1p9c00ANMtCZuEQ8b7qOEud1snzELBMpAwuE1gGUhaXCxwlUgVXCBwFUhX3J9AkUgcnBTSB1MVJAylICk4JqIOk4pSBKkgTOC1gHpIhrnfb3nn03hROG5iHBMS9CkzccPF1HR38yY0kdXypXCpIF9ahs/unsxi8hKTPVhUcKcG4UQ6y/5qKMwLMXG5DOGPANNJEcsn+Vd0TReNr9S0XIFyuOpWD+D5HnZ/0kVCby9RboExKRWNsgjZBagLUersH/32C38LgVDjPYNzhAAAAAElFTkSuQmCC" class="spread_icon">
                </div>
                <div  class="divider" :class="showLessons?'': 'hidden' "></div>
                <div  class="target_detail" v-show="showLessons">

                    <lesson_target
                            v-for="lesson in chapter.lessons"
                            :lesson = lesson
                            :id="'vlinkpc'+lesson.sort_int"
                    />

                </div>
            </div>
        </div>

        <advertising v-if="index === 0" />
    </div>
</template>

<script>
    import lesson_target from './lesson_target'
    import advertising from './advertising'


    export default {
        name: "chapterCard",
        data(){
            return{
                showLessons: true,
            }
        },
        components:{
            lesson_target,
            advertising
        },
        props:{
            chapter: Object,
            index: Number
        },

    }
</script>

<style scoped>

    /*章节段落*/
    .lesson_target {
        width: 54.54vw;
        background-color: #fff;
        border-radius: 1.58vw;
        margin: 0 auto;
        margin-top: 1.92vw;
    }

    .target_title {
        border-radius: 1.58vw 1.58vw 0 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 3.93vw;
        background-color: #fff;
        font-size: 1.0417vw;
        font-weight: 600;
        font-stretch: normal;
        letter-spacing: .11vw;
        color: #385061;
        padding-left: 2.0833vw;
        padding-right: 2.0833vw;
        cursor: pointer;
    }

     .all_angle {
         border-radius: 1.58vw;
     }

    .rotate_icon, .spread_icon {
        -webkit-transition: -webkit-transform .4s linear;
        transition: -webkit-transform .4s linear;
        transition: transform .4s linear;
        transition: transform .4s linear,-webkit-transform .4s linear;
    }

    .spread_icon {
        width: .85vw;
        cursor: pointer;
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }

    .rotate_icon {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }



    .ban-select {
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .target_detail {
        background-color: #fff;
        border-radius: 0 0 1.58vw 1.58vw;
        -webkit-box-shadow: 0 0.29vw 1.17vw 0 rgba(34,62,143,.06);
        box-shadow: 0 0.29vw 1.17vw 0 rgba(34,62,143,.06);
        padding-bottom: 1.0417vw;
    }

    .divider {
        background: #eee;
        height: 1px;
        margin-left: 2.0833vw;
        margin-right: 2.0833vw;
    }

    .hidden {
        display: none;
    }


</style>