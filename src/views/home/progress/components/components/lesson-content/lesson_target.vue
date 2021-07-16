<template>

    <div>
        <div class="item-container"
             @click="goToLearning"
             @mouseenter="dealShowItem(true)"
             @mouseleave="dealShowItem(false)"
        >
            <div class="box-card" :style="{backgroundColor:bgColor}">
                <img :src="lesson.cover">
                <div  class="item-right">
                    <div  class="item-right-title">
                        第{{lesson.sort_int}}关 {{lesson.title}}
                    </div>
                    <!---->
                    <div  class="item-right-time"></div>
                    <div  class="item-right-comment">
                        {{lesson.sub_title}}
                    </div>
                    <div  style="flex: 1 1 0%;"></div>
                    <div  class="is_practice_in_time" :class="isUnlockClass">
                        {{progressData}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "lesson_target",
        data(){
          return{
              progressData: '',  //  学习进度说明文字
              isUnlockClass: 'grey',  //  控制学习精度说明文字的样式
              bgColor: '',  // 鼠标移入移除，lesson卡片的背景色
          }
        },
        props:{
            lesson: Object,
        },
        created(){
            if (this.lesson.isUnlock !== true) {
                this.progressData = '未解锁';
                this.isUnlockClass = 'grey';
            } else {
                if (this.lesson.progress === '100%'){
                    this.progressData = '已完成';
                    this.isUnlockClass = 'blue';
                }else{
                    this.progressData = '学习中 '+this.lesson.progress;
                    this.isUnlockClass = 'yellow';
                }
            }
        },
        methods:{
            goToLearning(){
                if (this.lesson.isUnlock) {
                    this.$router.replace('/dashboard/learn/'+this.lesson.id)
                }
            },

            //  鼠标滑过控制，背景颜色
            dealShowItem(showItem){
                this.bgColor=showItem?'#e4e7ed':''
            },

        }
    }
</script>

<style scoped>
    .ban-select {
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .item-container {
        padding: 1.0417vw;
        padding-bottom: 0;
    }

    .box-card {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        background-color: #f5f5f5;
        padding: 1.0417vw;
        border-radius: 1.0417vw;
        cursor: pointer;
        position: relative;
    }

    .box-card>img {
        width: 6.25vw;
        height: 7.2917vw;
        border-radius: 1.0417vw;
    }



    .item-right {
        padding-left: 1.0417vw;
        max-width: 15.625vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
    }

    .item-right-title {
        color: #385061;
        font-size: .9375vw;
        line-height: 1.4583vw;
        font-family: SourceHanSansCN;
    }

    .item-right-time {
        position: absolute;
        right: 1.0417vw;
        font-size: .8333vw;
        color: #6c747a;
        line-height: 1.1458vw;
        font-family: SourceHanSansCN;
    }

    .item-right-comment {
        font-size: .8333vw;
        color: #6c747a;
        line-height: 1.1458vw;
        font-family: SourceHanSansCN;
    }

    .blue, .blue:hover {
        background: #24c7b5;
    }

    .yellow, .yellow:hover {
        background: #faac1c;
    }

    .grey, .grey:hover {
        background: #9aa5ad;
    }

    .is_practice_in_time {
        width: 5.2083vw;
        line-height: 1.4583vw;
        border-radius: 2vw;
        color: #fff;
        height: 1.4583vw;
        text-align: center;
        font-weight: bolder;
        font-size: .625vw;
        cursor: pointer;
    }
</style>