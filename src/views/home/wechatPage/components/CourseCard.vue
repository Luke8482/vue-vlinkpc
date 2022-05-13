<template>
    <div>
        <button class="item_course" @click="dealCheckStatus">
            <div class="isCheck" :class="{active_course: isChecked}"
                 style="display: block;"
                 v-if="!hasPained"
            ></div>
            <div class="course_mess" :class="{active_course_bg: isChecked}">
                <div class="course_left_cont">
                    <div class="course_img">
                        <img :src="course.cover" alt="">
                    </div>
                    <a :href="courseHref" class="view_details">
                        查看详情
                    </a>
                </div>
                <div class="course_cont">
                    <p class="item_course_name">{{course.title}}</p>
                    <p class="course_describe">{{course.subtitle}}</p>
                    <div class="course_bottom_cont">
                        <span class="permanent">永久有效</span>
                        <span class="course_price" style="color: rgb(253, 88, 31);">
                            ¥{{course.price}}
                        </span>
                    </div>
                </div>
                <div class="purchased_content" v-if="hasPained">
                    已购
                </div>
            </div>
        </button>
    </div>
</template>

<script>
    export default {
        name: "CourseCard",
        data(){
            return{
                courseHref: '',
                isChecked: false,  //  控制课程卡 是否显示选中
            }
        },
        props: {
            course: Object,
            hasPained: Boolean,
        },
        created(){
            this.isChecked = false;  // 条件渲染，初始数据
            //  创建课程详情链接数据
            if (this.course.mainSku) {   // 用户订单页容错判断
                if (this.course.mainSku[0]) {
                    // 课程链接需要维护到环境配置里
                    this.courseHref = process.env.VUE_APP_URL+'/program/lesson-detail?sku_id='
                        +this.course.mainSku[0].id;
                }
            }

        },
        methods:{
            dealCheckStatus(){
                //  判断是否买过课程，没买过才执行以下操作
                if (!this.hasPained) {
                    //  1、 切换显示选中状态
                    this.isChecked = !this.isChecked;
                    //  2、 触发cart 页面的事件，使skuId 对应数组更新；价格更新
                    this.$emit('dealCheckStatus' )
                }

            }
        }
    }
</script>

<style scoped>




    .isCheck {
        width: 4.8vw;
        height: 4.8vw;
        border: 1px solid #ccc;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: .5333vw;
        margin-right: 4vw;
    }
    button {
        background: none;
    }
    button, input, textarea {
        color: inherit;
        font: inherit;
    }
    button {
        border: none;
        background: #fff;
    }


    /*课程卡片的样式*/
    .course_message, .item_course {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
    /*.item_course:first-child {*/
        /*margin-top: 0;*/
    /*}*/
    .item_course {
        width: 100%;
        text-align: left;
        margin-top: 4vw;
    }

    .active_course, .check_all {
        width: 4.8vw;
        height: 4.8vw;
        background: url(https://office.toofun.top/ttposter_check_icon.png) no-repeat;
        background-size: 100% 100%;
        border: none;
    }
    .isCheck {
        width: 4.8vw;
        height: 4.8vw;
        border: 1px solid #ccc;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: .5333vw;
        margin-right: 4vw;
    }

    .course_mess {
        width: 100%;
        height: 26.1333vw;
        -webkit-box-shadow: 0 0.8vw 1.6vw rgba(0,0,0,.16);
        box-shadow: 0 0.8vw 1.6vw rgba(0,0,0,.16);
        border-radius: 2.1333vw;
        background: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        position: relative;
        overflow: hidden;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .active_course_bg {
        background: #fff3ef;
    }

    .course_left_cont {
        position: relative;
    }

    .course_img {
        width: 29.8667vw;
        height: 21.8667vw;
    }
    .course_img img {
        width: 100%;
        height: 100%;
    }
    .view_details {
        width: 100%;
        height: 6.4vw;
        background: #fc8c2a;
        font-size: 3.4667vw;
        color: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: absolute;
        bottom: 0;
    }
    .course_cont {
        width: 100%;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        padding: 2.6667vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .item_course_name {
        font-size: 4vw;
        font-weight: 700;
        color: #242424;
    }

    * {
        padding: 0;
        margin: 0;
    }
    .course_describe {
        font-size: 3.2vw;
        color: #999;
        margin-top: 0;
    }
    .course_bottom_cont {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-top: 0;
    }
    .permanent {
        font-size: 2.6667vw;
        color: #fc8c2a;
    }
    .course_price {
        font-size: 5.3333vw;
        font-weight: 700;
        color: #fd581f;
    }
    .purchased_content {
        width: 10vw;
        height: 10vw;
        font-size: 3.2vw;
        color: #fc8c2a;
        font-family: Normal;
        background: url(https://office.toofun.top/ttposter_buy.png) no-repeat;
        background-size: 100% 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
    }
</style>