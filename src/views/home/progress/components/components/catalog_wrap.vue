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


                <!--<div  v-for="(chapter, index) in chapters">-->
                    <!--<div  class="target_title" @click="showlessons=!showlessons">-->
                        <!--<span>-->
                            <!--阶段{{index+1}}： {{chapter.title}}-->
                        <!--</span>-->
                        <!--<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" :class="showlessons?isrotate:rotate_circle">-->
                            <!--<g fill="none" fill-rule="evenodd">-->
                                <!--<path fill="none" d="M0 0h22v22H0z"/>-->
                                <!--<path stroke="#FFF" stroke-linecap="round" stroke-width="2.1" d="M6.187 13.597l4.853-4.852a.7.7 0 0 1 .99 0l4.852 4.852"/>-->
                            <!--</g>-->
                        <!--</svg>-->
                    <!--</div>-->
                    <!--<div  class="level_list" v-show="showlessons">-->
                        <!--<div  data-index="0" class="level_detail" @click="scrollToTarget" @mouseenter="dealShowItem(true)" @mouseleave="dealShowItem(false)" :style="{backgroundColor:bgColor}">-->
                            <!--<img  :src="finished">-->
                            <!--<a  class="go_to" ></a>-->
                            <!--<span  class="level_name" >动态看板：让表格动起来</span>-->
                        <!--</div>-->
                        <!--<div  data-index="1" class="level_detail">-->
                            <!--<img  :src="finished">-->

                            <!--<a  class="go_to"></a>-->
                            <!--<span  class="level_name">IF函数：效率之王</span>-->
                        <!--</div>-->
                        <!--<div  data-index="2" class="level_detail">-->
                            <!--<img  :src="finished">-->
                            <!--<a  class="go_to"></a>-->
                            <!--<span  class="level_name">查询函数：让数据自己说话</span>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->

                <chapterCard
                    v-for="(chapter, index) in chapters"
                    :chapter = chapter
                    :index = index
                />

                <!--<el-menu-->
                        <!--class="el-menu-vertical-demo"-->
                        <!--@select="handleSelect"-->
                        <!--background-color="#385061"-->
                        <!--active-text-color="#ffd04b"-->
                <!--&gt;-->
                    <!--<el-submenu-->
                            <!--v-for="(chapter, index) in chapters"-->
                            <!--:index= "String(index+1)"-->
                    <!--&gt;-->
                        <!--<template slot="title"-->
                        <!--&gt;-->
                            <!--<i class="el-icon-document"></i>-->
                            <!--<span >{{chapter.title}}</span>-->
                        <!--</template>-->
                        <!--<el-menu-item-->
                                <!--v-for="(lesson, subIndex) in chapter.lessons"-->
                                <!--:index="String(index+1)+'-'+String(subIndex+1)"-->
                                <!--:disabled= true-->
                        <!--&gt;-->
                            <!--<i class="el-icon-circle-check"></i>-->
                            <!--<span slot="title">{{lesson.title}}</span>-->
                        <!--</el-menu-item>-->
                    <!--</el-submenu>-->
                <!--</el-menu>-->

            </div>
        </div>
        </transition>
    </div>
</template>

<script>
    import chapterCard from './catolog_wrap/chapterCard'

    export default {
        name: "catalog_wrap",
        data(){
            return{
                show:true,
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