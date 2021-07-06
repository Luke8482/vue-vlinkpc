<template>
    <div class="more_combinat">
        <div class="main">
            <div class="van-tabs van-tabs--line">
                <div class="van-tabs__wrap">
                    <div role="tablist" class="van-tabs__nav van-tabs__nav--line" style="border-color: rgb(253, 88, 31);">
                        <div role="tab" aria-selected="true" class="van-tab van-tab--active" style="color: rgb(253, 88, 31);">
                            <span class="van-tab__text van-tab__text--ellipsis">推荐课程</span>
                        </div>
                        <div role="tab" class="van-tab">
                            <span class="van-tab__text van-tab__text--ellipsis">已购课程</span>
                        </div>
                        <div class="van-tabs__line" style="background-color: rgb(253, 88, 31); transform: translateX(38px) translateX(-50%);"></div>
                    </div>
                </div>
                <div class="van-tabs__content">
                    <div role="tabpanel" class="van-tab__pane" style="">
                        <div>
                            <section class="course_message">
                                <div class="course_center_container">
                                    <div class="recomend_series">
                                        <div class="series_content open_series">
                                            <div data-v-b6f450b4="">
                                                <button class="item_course">
                                                    <div class="isCheck active_course" style="display: block;"></div>
                                                    <div class="course_mess active_course_bg">
                                                        <div class="course_left_cont">
                                                            <div class="course_img">
                                                                <img src="https://excel.toofun.top/image/8c67585422b11a38074aa3c0b7fd88c0" alt="">
                                                            </div>
                                                            <a href="http://xwzc.onejob.cn/callback/excel1" class="view_details">
                                                                查看详情
                                                            </a>
                                                        </div>
                                                        <div class="course_cont">
                                                            <p class="item_course_name">Excel职场特训营</p>
                                                            <p class="course_describe">职场必备Excel使用技巧</p>
                                        <div class="course_bottom_cont">
                                            <span class="permanent">永久有效</span>
                                            <span class="course_price" style="color: rgb(253, 88, 31);">¥799</span>
                                        </div>
                                    </div>
                                        <div class="purchased_content" style="display: none;">
                                            已购
                                        </div>
                                    </div>
                                    </button>
                                    </div>
                                    </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div role="tabpanel" class="van-tab__pane" style="display: none;"><!---->
                </div>
                </div>
            </div>
        </div>
        <Footer
                :form = form
                :totalPrice = totalPrice
                :type = type
                :originPrice = originPrice
        />
        </div>
</template>

<script>
    import Footer from './Footer'

    export default {
        name: "CourseCart",
        data(){
            return{
                form:{            // 创建表单的表头
                    sku_ids:[],
                },
                type: 'main',   // 让footer根据不同的type展示不同的内容
                totalPrice: 99,  //  需要支付的总价
                originPrice: 199,  //  原价（原总价）
            }
        },
        components:{
            Footer,
        },
    }
</script>

<style scoped>
    .more_combinat {
        width: 100%;
        height: 100vh;
        background: #f3f3f3;
    }
    .main {
        margin-bottom: 0;
        background: #f3f3f3;
    }
    .main, .main>img {
        width: 100%;
    }
    .main {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        position: relative;
    }
    .van-tabs {
        padding-bottom: 50px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
     .van-tabs {
        position: relative;
    }
    .van-tabs--line .van-tabs__wrap {
        height: 44px;
    }
    .van-tabs__wrap {
        width: 100%;
        position: fixed;
        z-index: 1;
        background: #fff;
        border: 1px solid #e8e8e8;
    }
    .van-tabs__wrap {
        overflow: hidden;
    }
     .van-tabs__nav {
        margin: 0 20px;
    }
    .van-tabs__nav--line {
        box-sizing: content-box;
        height: 100%;
        padding-bottom: 15px;
    }
    .van-tabs__nav {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        background-color: #fff;
        -webkit-user-select: none;
        user-select: none;
    }
     .van-tab:first-child {
        margin-left: 0;
    }
     .van-tab {
        font-size: 15px;
    }
     .van-tab--active {
        font-size: 17px!important;
        font-weight: 700;
    }
     .van-tab {
        -webkit-box-flex: 0;
        -ms-flex: none;
        flex: none;
        margin-left: 25px;
    }
    .van-tab--active {
        color: #323233;
        font-weight: 500;
    }
    .van-tab {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 0 4px;
        color: #646566;
        font-size: 14px;
        line-height: 20px;
        cursor: pointer;
    }
    .van-tab__text--ellipsis {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
     .van-tabs__line {
        width: 20px;
    }
    .van-tabs__line {
        position: absolute;
        bottom: 15px;
        left: 0;
        z-index: 1;
        width: 50vw;
        height: 3px;
        background-color: #ee0a24;
        border-radius: 3px;
    }
     .van-tab__pane {
        padding-top: 44px;
    }
    .van-tab__pane {
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        box-sizing: border-box;
        width: 100%;
    }


     /*分类表头的样式*/
     .van-tab__pane {
        padding-top: 44px;
    }
    .van-tab__pane, {
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        box-sizing: border-box;
        width: 100%;
    }
    .course_message, .item_course {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
    .course_message {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }
    .course_center_container {
        width: 100%;
    }
    .series_content:first-child {
        margin-top: 0;
    }
     .open_series {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .open_series {
        padding: 1.3333vw 4.2667vw 4vw;
    }
     .series_content {
        background: #fff;
        margin-bottom: 4vw;
        padding: 4vw 4.2667vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
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
    .item_course:first-child {
        margin-top: 0;
    }
    .item_course {
        width: 100%;
        text-align: left;
        margin-top: 4vw;
    }
    .course_message, .item_course {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
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
    .active_course_bg {
        background: #fff3ef;
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
        margin-top: 1.3333vw;
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
        margin-top: 3.2vw;
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