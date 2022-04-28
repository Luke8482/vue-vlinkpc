<template>
    <div class="more_combinat">
        <div class="main">
            <div class="van-tabs van-tabs--line">
                <div class="van-tabs__wrap">
                    <div role="tablist" class="van-tabs__nav van-tabs__nav--line" style="border-color: rgb(253, 88, 31);">
                        <el-menu
                                :default-active= 'activeIndex'
                                class="el-menu-demo"
                                mode="horizontal"
                                @select="handleSelect"
                                active-text-color="#fc8c2a"
                        >
                            <el-menu-item index="1">推荐课程</el-menu-item>
                            <el-menu-item index="2">已购课程</el-menu-item>
                        </el-menu>

                    </div>
                </div>
                <div class="van-tabs__content">
                    <div role="tabpanel" class="van-tab__pane" style="">
                        <section class="course_message">
                            <div class="course_center_container">
                                <div class="recomend_series">
                                    <div class="series_content open_series" v-show="showHotCourses">
                                        <CourseCard
                                                v-for="hotCourse in hotCourses"
                                                :course = hotCourse
                                                v-on:dealCheckStatus = dealCheckStatus(hotCourse)
                                        />
                                    </div>
                                    <div class="series_content open_series" v-show="!showHotCourses">
                                        <CourseCard
                                                v-for="myCourse in myCourses"
                                                :course = myCourse
                                                :hasPained = true
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

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
                @finishedPain = finishedPain
        />
        </div>
</template>

<script>
    import CourseCard from './components/CourseCard'
    import Footer from './Footer'
    import {wxGetCourse} from "../../../service/api";

    export default {
        name: "CourseCart",
        data(){
            return{
                form:{            // 创建表单的表头
                    sku_ids:[],
                },
                type: 'main',   // 让footer根据不同的type展示不同的内容
                totalPrice: 0,  //  需要支付的总价
                originPrice: 0,  //  原价（原总价）
                myCourses:{},  //  显示已经购买的课程分组
                hotCourses: {},  //  显示可以购买的课程
                activeIndex: '1',   //  控制顶端菜单显示
                showHotCourses: true,   //  控制是否显示推荐课程
            }
        },
        components:{
            Footer,
            CourseCard
        },
        created(){
            wxGetCourse().then(res=>{
                this.myCourses = res.myCourses;
                this.hotCourses = res.hotCourses;
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        },
        methods:{
            dealCheckStatus(course){
                //  1.1、判断skuId 数组内是否存在该课程的skuId ， 如果存在则执行删除操作， 如果不存在则执行添加操作
                let sku_id = course.mainSku[0].id;
                let index = this.form.sku_ids.indexOf(sku_id);

                if (index>-1) {
                    this.form.sku_ids.splice(index,1);
                    // 2.1、计算原总价
                    this.originPrice -= parseInt(course.price);
                    // 3.1、计算折后总价
                    this.totalPrice -= parseInt(course.mainSku[0].price);
                }else {
                    this.form.sku_ids.push(sku_id);
                    this.originPrice += parseInt(course.price);
                    this.totalPrice += parseInt(course.mainSku[0].price);
                }
                console.log(this.originPrice);

            },
            //  菜单栏控制显示推荐课程，或者已购课程
            handleSelect(key, keyPath) {
                if(key === '2') {
                    this.showHotCourses = false;
                }else{
                    this.showHotCourses = true;
                }
            },

            //  支付完成后，显示已购课程
            finishedPain(){
                this.showHotCourses = false;
                this.activeIndex = '2';
            }

        }
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
        padding-bottom: 25vh;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
     .van-tabs {
        position: relative;
    }
    .van-tabs--line .van-tabs__wrap {
        height: 60px;
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
    .van-tab__pane {
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

</style>