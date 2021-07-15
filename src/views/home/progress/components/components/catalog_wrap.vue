<template>
    <div>

        <!--隐藏目录部分-->
        <transition name="spread_button">
            <div  id="spreadButton" class="spread_button"  v-show="!show" @click="show=!show">
            <span >目录</span>
            <img  :src="rightArr" class="spread_icon">
        </div>
        </transition>

        <!--显示目录部分-->
        <transition name="catalog_wrap">
            <div id="catalogWrap" class="catalog_wrap" :style="showMiniHeader?isNotMini:isMini" v-show="show">
            <div class="catalog_content">


                <div  class="catalog_icon" @click="show=!show">
                    <img  :src="leftArr">
                </div>

                <chapterCard
                    v-for="(chapter, index) in chapters"
                    :chapter = chapter
                    :index = index
                />


            </div>
        </div>
        </transition>
    </div>
</template>

<script>
    import chapterCard from './catolog_wrap/chapterCard'
    import bus from '@/views/admin/common/bus';

    export default {
        name: "catalog_wrap",
        data(){
            return{
                show:true,
                showMiniHeader: false, // 显示头部不缩略头部的时候，控制目录的样式
                isMini:' top: 3.333vw;',
                isNotMini: ' top: 8.09vw;',
                rightArr: require('@/images/content/rightArr.png'),
                leftArr: require('@/images/content/leftArr.png'),
            }
        },
        components:{
          chapterCard,
        },
        props:{
          chapters: Array,
        },
        mounted(){
            bus.$on('showMiniHeader', msg=>{
                this.showMiniHeader = !this.showMiniHeader;
            })
        }


    }
</script>

<style scoped>
    .spread_button {
        background: #385061;
        opacity: .96;
        position: fixed;
        top: 3.333vw;
        left: 0;
        width: 6.25vw;
        height: 3.125vw;
        padding-left: .2vw;
        border-radius: 0 2.4vw 2.4vw 0;
        color: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
    }

    /*出入css动画*/
    .spread_button-enter-active {
        transition: all .3s ease;
    }
    .spread_button-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .spread_button-enter, .spread_button-leave-to {
        transform: translateX(-200px);
        opacity: 0;
    }


    .spread_button>span {
        margin-left: .2vw;
        margin-right: .5208vw;
        font-size: 1.0417vw;
        color: #fff;
    }

    .spread_button>img {
        width: 2.0833vw;
        height: 2.0833vw;
    }

    img {
        pointer-events: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .catalog_wrap {
        position: fixed;
        top: 3.333vw;
        width: 17.0833vw;
        left: 0;
        -webkit-box-shadow: 0 5px 5px 2px rgba(99,99,99,.5);
        box-shadow: 0 5px 5px 2px rgba(99,99,99,.5);
        z-index: 20;
        height: 100%;
        background-color: #385061;
    }

    /*出入css动画*/
    .catalog_wrap-enter-active {
        transition: all .3s ease;
    }
    .catalog_wrap-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .catalog_wrap-enter, .catalog_wrap-leave-to {
        transform: translateX(-200px);
        opacity: 0;
    }

    .catalog_content {
        margin-top: 1.0417vw;
        padding-bottom: 2.5vw;
        overflow: auto;
        height: 80%;
    }

    /*滚动条样式*/
    .catalog_content::-webkit-scrollbar {/*滚动条整体样式*/
        width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
    }
    .catalog_content::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        width: 10px;
        border-radius: 1.5vw;
        background: #9aa5ad;
    }
    .catalog_content::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }

    .catalog_icon {
        top: 1.24vw;
        left: 1.72vw;
        width: 100%;
        border-radius: 50%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        cursor: pointer;
        padding-right: 2.0833vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 1.0417vw;
    }

    .catalog_icon>img {
        width: 2.0833vw;
        height: 2.0833vw;
    }

    img {
        pointer-events: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }


</style>