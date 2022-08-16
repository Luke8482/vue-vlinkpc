<template>
    <div id="after-sales">
        <div id="after-sales-home">
            <div class="head">
                <img :src="avatar" class="ah-ava">
                <p class="ah-desc">{{username}}同学，您好！</p>
            </div>

            <!--订单列表-->
            <div class="ac-wrap">
                <!--订单列表框，循环显示-->
                <div class="af-cont" v-for="userOrderList in userOrderLists">
                    <div style="margin-top: 10px;">订单编号：{{userOrderList.no}}</div>
                    <div>支付时间：{{userOrderList.created_at.slice(0,10)}}   {{userOrderList.created_at.slice(11,19)}}</div>
                    <div>
                        <div>订单包含的课程：</div>
                        <!--courseCard循环显示-->
                        <CourseCard
                        v-for="item in userOrderList.items"
                        :course = item.course
                        :hasPained = 'true'
                        />
                    </div>
                    <div style="font-weight:bold;margin: 20px 0 0;">
                        <div>商品原价： ￥{{originalPrice(userOrderList)}}</div>
                        <div>实付金额： ￥{{userOrderList.total_amount}}</div>
                        <div style="color: red;">退款金额： ￥{{userOrderList.total_amount}}</div>
                        <el-button type="warning"
                                   style="position: relative;left: 66vw; top: -40px;"
                                   @click="open(userOrderList.id)"
                                   v-if="userOrderList.refund_status === 'pending'"
                        >退款</el-button>
                        <el-tag v-if="userOrderList.refund_status !== 'pending'"
                                style="position: relative;left: 66vw; top: -40px;"
                        >
                            {{dealWithStatus(userOrderList.refund_status)}}
                        </el-tag>

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import CourseCard from './../wechatPage/components/CourseCard'
    import ls from '@/utils/localStorage'
    import {getUserOderList, applyRefund} from "../../../service/api";

    export default {
        name: "UserOrderList",
        data(){
            return{
                userOrderLists:[]
            }
        },
        components:{
            CourseCard
        },
        inject:['reload'],
        computed: {
            username() {
                let user = ls.getItem('user');
                return user.name;
            },
            avatar() {
                let user = ls.getItem('user');
                return user.avatar;
            },
        },
        created(){
            getUserOderList().then(res=>{
                this.userOrderLists = res;
            }).catch(err=>{
                console.log(err);
            })
        },
        methods:{
            originalPrice(val){
                let $originalPrice = 0;
                let $i = 0;
                for ($i; $i < val.items.length; $i++) {
                    $originalPrice = $originalPrice + parseInt(val.items[$i].course.price);
                }

                return  Number($originalPrice).toFixed(2);
            },

            //  转换英文的退款状态码为中文
            dealWithStatus(val){
                let $status = '';
                switch (val) {
                    case 'applied':
                        $status = '已申请退款';
                        break;
                    case 'processing':
                        $status = '退款中';
                        break;
                    case 'success':
                        $status = '退款成功';
                        break;
                    case 'failed':
                        $status = '退款失败';
                        break;
                    default :
                        $status = '未申请';
                        break;
                }
                return $status;
            },

            open(orderId) {
                this.$confirm('确定要放弃学习吗？退款后将失去课程的学习机会，建议继续坚持学习哟！', '温馨提示', {
                    confirmButtonText: '坚持学习',
                    cancelButtonText: '暂时放弃',
                }).then(()=>{

                }).catch(()=>{
                    this.$prompt('请输入退款理由', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        //  调用退款申请API
                        let FormData = {};
                        FormData.reason = value;
                        applyRefund(orderId,FormData).then(res=>{
                            // this.reload();
                            window.location.href = window.location.href;
                            // this.$router.push('/program/user-order-list');
                        }).catch(err=>{
                            console.log(err);
                        })

                    }).catch(() => {

                    });
                });
            }

        }


    }
</script>


<style>
    body {
        line-height: 1.6;
        font-size: .28rem;
        font-family: sans-serif,PingFang SC,PingFangSC-Medium,-apple-system-font,BlinkMacSystemFont,Helvetica Neue,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial;
        background: #f5f8fa;
        color: #243030;
        overscroll-behavior-y: none;
        -webkit-user-select: none;
        user-select: none;
    }
    html{
        font-size: 50px;
    }
    .el-message-box {
        max-width: 80vw;
    }
</style>
<style scoped>
    * {
        box-sizing: border-box;
        word-wrap: break-word;
        word-break: normal;
    }
    #after-sales-home {
        position: relative;
        min-height: 100vh;
        background-color: #f5f8fa;
    }
    #after-sales-home .head {
        display: -webkit-box;
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2.4rem;
        padding: .3rem;
        background: url(/aftersale-bg.jpg) no-repeat;
        background-size: 100% 100%;
        z-index: 1;
    }
    #after-sales-home .head .ah-ava {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }
    img {
        border-style: none;
    }
    img {
        -webkit-touch-callout: none;
    }
    #after-sales-home .head .ah-desc {
        height: 1rem;
        margin-left: .2rem;
        color: #fff;
        font-size: .36rem;
        line-height: 1rem;
    }
    #after-sales-home .ac-wrap {
        position: absolute;
        width: 100%;
        top: 1.6rem;
        z-index: 2;

    }
    #after-sales-home .ac-wrap .af-cont {
        box-shadow: 0 0.8vw 1.6vw rgba(0,0,0,.16);
        width: 6.9rem;
        margin: 10px auto;
        padding: .2rem .3rem .3rem;
        border-radius: .3rem;
        background-color: #fff;
    }
    #after-sales-home .ac-wrap .af-cont .svg-icon-quotes {
        width: .5rem;
        height: .5rem;
    }

</style>