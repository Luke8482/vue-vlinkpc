<template>
    <div>

        <!--隐藏目录部分-->
        <transition name="spread_button">
            <div  id="spreadButton" class="spread_button" style=" top: 3.333vw;" v-show="!show" @click="show=!show">
            <span >目录</span>
            <img  :src="rightArr" class="spread_icon">
        </div>
        </transition>

        <!--显示目录部分-->
        <transition name="catalog_wrap">
            <div id="catalogWrap" class="catalog_wrap" style="top: 3.33vm;" v-show="show">
            <div class="catalog_content">


                <div  class="catalog_icon" @click="show=!show">
                    <img  :src="leftArr">
                </div>


                <div >
                    <div  class="target_title" @click="showlessons=!showlessons">
                        <span>
                            阶段1： 认识3大技能，比普通人办公速度快10倍！
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" :class="showlessons?isrotate:rotate_circle">
                            <g fill="none" fill-rule="evenodd">
                                <path fill="none" d="M0 0h22v22H0z"/>
                                <path stroke="#FFF" stroke-linecap="round" stroke-width="2.1" d="M6.187 13.597l4.853-4.852a.7.7 0 0 1 .99 0l4.852 4.852"/>
                            </g>
                        </svg>
                    </div>
                    <div  class="level_list" v-show="showlessons">
                        <div  data-index="0" class="level_detail" @click="scrollToTarget" @mouseenter="dealShowItem(true)" @mouseleave="dealShowItem(false)" :style="{backgroundColor:bgColor}">
                            <img  :src="finished">
                            <a  class="go_to" ></a>
                            <span  class="level_name" >动态看板：让表格动起来</span>
                        </div>
                        <div  data-index="1" class="level_detail">
                            <img  :src="finished">

                            <a  class="go_to"></a>
                            <span  class="level_name">IF函数：效率之王</span>
                        </div>
                        <div  data-index="2" class="level_detail">
                            <img  :src="finished">
                            <a  class="go_to"></a>
                            <span  class="level_name">查询函数：让数据自己说话</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </transition>
    </div>
</template>

<script>
    import Pubsub from 'pubsub-js'

    export default {
        name: "catalog_wrap",
        data(){
            return{
                show:true,
                showlessons:true,
                bgColor:'',
                isrotate:"rotate",
                rotate_circle:"rotate_circle",

                rightArr: require('@/images/content/rightArr.png'),
                leftArr: require('@/images/content/leftArr.png'),
                finished: require('@/images/content/finished.png'),
                arrow: require('@/images/content/arrow.png'),

            }
        },
        methods:{
            dealShowItem(showItem){
                this.bgColor=showItem?'rgb(96,115,129)':''
            },

            scrollToTarget(){
                Pubsub.publish('scrollto','')
            }

        }

    }
</script>

<style lang="less" scoped>
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

    .level_detail {
        position: relative;
        padding-left: 2.99vw;
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

    .level_detail>img {
        position: absolute;
        top: 50%;
        left: 1.88vw;
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