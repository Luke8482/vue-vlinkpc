<template>
    <div>
        <div class="practice_progress">
            <div  class="progress_bar">
                <div  class="move_progress" v-bind:style="{height: progressData}"></div>
            </div>
            <div >
                <div class="middle" style="top: 99%;">{{progressData}}</div>
            </div>
        </div>
        <div  class="side-background"></div>
    </div>

</template>

<script>
    export default {
        name: "practiceProgress",
        props:{
            progressData: String,
        }
    }
</script>

<style scoped>
    /*进度条相关样式*/
    .practice_progress {
        position: absolute;
        top: 15vh;
        left: 2vw;
        bottom: 0;
        width: 1vw;
        height: 70vh;
        z-index: 1000;
    }

    .progress_bar {
        border-radius: 1vw;
        overflow: hidden;
        width: 1vw;
        height: 100%;
        background-color: #262530;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
    }

    .move_progress {
        width: 1vw;
        background-image: -webkit-gradient(linear,left bottom,left top,from(#ffd23b),to(#f26622));
        background-image: linear-gradient(0deg,#ffd23b,#f26622);
        opacity: .8;
        z-index: 10;
    }

    .middle {
        left: 1.5vw;
        font-size: 1.3vw;
    }

    .middle, .start {
        position: absolute;
        z-index: 1001;
        width: 5vw;
        color: #ccc;
    }

    .main_wrap .side-background {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 1.87vw;
        height: 100%;
        background: rgba(10,8,15,0);
    }
</style>