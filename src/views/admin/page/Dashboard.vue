<template>
    <div>

        <!--检索条件-->
        <div class="handle-box">
            <el-radio-group v-model="timeType">
                <el-radio-button label="Day" >自然天</el-radio-button>
                <el-radio-button label="Week" >自然周</el-radio-button>
                <el-radio-button label="Month">自然月</el-radio-button>
                <el-radio-button label="Year" >自然年</el-radio-button>
            </el-radio-group>
            <el-date-picker
                    v-if="query.timeType === 'Day'"
                    v-model="dateValue"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
            </el-date-picker>

            <el-date-picker
                    v-if="query.timeType === 'Week'"
                    v-model="dateValue"
                    type="week"
                    format="yyyy 第 WW 周"
                    value-format="yyyy-MM-dd"
                    placeholder="选择周">
            </el-date-picker>

            <el-date-picker
                    v-if="query.timeType === 'Month'"
                    v-model="dateValue"
                    type="month"
                    value-format="yyyy-MM-dd"
                    placeholder="选择月">
            </el-date-picker>

            <el-date-picker
                    v-if="query.timeType === 'Year'"
                    v-model="dateValue"
                    type="year"
                    value-format="yyyy-MM-dd"
                    placeholder="选择年">
            </el-date-picker>



            <el-date-picker
                    style="margin-left: 300px"
                    v-model="query.dateAfter"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="最早创建时间（包含当天）">
            </el-date-picker><el-date-picker
                v-model="query.dateBefore"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="最晚创建时间（不含当天）">
            </el-date-picker>

            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            <el-button   @click="delReset">重置</el-button>
        </div>

        <!--内容展示区-->
        <el-row :gutter="32" class="mgb20">
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-1">
                        <i class="el-icon-lx-people grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div class="grid-num">{{baseData.totalAmount}}</div>
                            <div>销售额</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-2">
                        <i class="el-icon-lx-notice grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div class="grid-num">{{baseData.newUsersCount}}</div>
                            <div>新增用户数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-3">
                        <i class="el-icon-lx-goods grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div class="grid-num">{{baseData.orderCount}}</div>
                            <div>订单总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-4">
                        <i class="el-icon-lx-goods grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div class="grid-num">{{baseData.orderPaidCount}}</div>
                            <div>支付订单数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>

        </el-row>

        <div id="myChart" :style="{width: '87%', height: '700px', backgroundColor: '#fff', padding: '25px 50px'}"></div>
    </div>
</template>

<script>
import {getAdminDashData} from "../../../service/api";
import bus from '../common/bus';
//
const echarts = require('echarts/lib/echarts');
require('echarts/lib/component/title');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/grid');
require('echarts/lib/component/visualMap');
require('echarts/lib/component/dataZoom');
require('echarts/lib/chart/line');
require('echarts/lib/component/markLine');
require('echarts/lib/component/legend');



export default {
    name: 'dashboard',
    data() {
        return {
            dateValue: '',
            timeType: 'Day',   //  辅助监听变化
            query:{
                dateAfter: '',
                dateBefore: '',
                timeType: 'Day',
            },
            baseData: {
                orderCount: '',
                orderPaidCount: '',
                totalAmount: '',
                newUserCount: '',
            },

            option: {
                darkMode: true,
                title: {
                    text: '营销趋势',
                    left: '1%'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['营业额', '订单数', '新增用户数']
                },
                grid: {
                    left: '5%',
                    right: '15%',
                    bottom: '10%'
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                toolbox: {
                    right: 10,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataZoom: [{
                    startValue: '2021-07-01'
                }, {
                    type: 'inside'
                }],
                series: [
                    {
                        name: '营业额',
                        type: 'line',
                        data: [],

                    },{
                        name: '订单数',
                        type: 'line',
                        data: [],

                    },{
                        name: '新增用户数',
                        type: 'line',
                        data: [],

                    },


                ]
            }
        };
    },

    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },

    mounted(){
        //  把当前日期复制给 dateValue  ，触发监听事件，获取数据，
        this.dateValue = new Date();
        // this.drawLine();
    },
    watch:{
        timeType: function(val){
            this.query.timeType = val;

            //  切换模式后给dateValue 设置初始值， 初始值为当天、 当月、 当年
            let $Today = new Date();
            switch (val) {
                case 'Day':{
                    this.dateValue = $Today;
                    break;
                }
                case 'Week':{
                    let $day = new Date($Today).getDay();
                    let $month = new Date($Today).getMonth();
                    let $year = new Date($Today).getFullYear();
                    let $date = new Date($Today).getDate();
                    $date = $date-$day+1;
                    this.dateValue = new Date(
                        $year, $month, $date
                    );
                    break;
                }
                case 'Month':{
                    let $month = new Date($Today).getMonth();
                    let $year = new Date($Today).getFullYear();
                    let $date = 1;

                    this.dateValue = new Date(
                        $year, $month, $date
                    );
                    break;
                }
                case 'Year':{
                    let $month = 0;
                    let $year = new Date($Today).getFullYear();
                    let $date = 1;
                    this.dateValue = new Date(
                        $year, $month, $date
                    );
                    break;
                }
            }
        },
        dateValue: function (val) {
            this.query.dateAfter = val;
            switch (this.query.timeType) {
                case 'Day':{
                    this.query.dateBefore = new Date(
                        new Date(val).getTime() + 24 * 60 * 60 * 1000
                    ).toLocaleDateString();
                    break;
                }
                case 'Week':{
                    this.query.dateAfter = new Date(
                        new Date(val).getTime() - 24 * 60 * 60 * 1000
                    ).toLocaleDateString();

                    this.query.dateBefore = new Date(
                        new Date(val).getTime() + 24 * 60 * 60 * 1000*6
                    ).toLocaleDateString();
                    break;
                }
                case 'Month':{
                    let $month = new Date(val).getMonth();
                    let $year = new Date(val).getFullYear();
                    let $date = 1;
                    if($month === 12){
                        $month = 1;
                        $year += 1;
                    }else{
                        $month += 1;
                    }
                    this.query.dateBefore = new Date(
                        $year, $month, $date
                    ).toLocaleDateString();
                    break;
                }
                case 'Year':{
                    let $month = new Date(val).getMonth();
                    let $year = new Date(val).getFullYear()+1;
                    let $date = new Date(val).getDate();
                    this.query.dateBefore = new Date(
                        $year, $month, $date
                    ).toLocaleDateString();
                    break;
                }
            }

            this.getData();

        },
    },
    methods: {

        // 获取数据
        getData() {
            var chartDom = document.getElementById('myChart');
            var myChart = echarts.init(chartDom);

            getAdminDashData(this.query).then(res=>{
                console.log(res);
                this.baseData = res.baseData;
                var data = res.eCharts;
                this.option.xAxis.data = data.map(function (item) {
                    return item[0];
                });

                this.option.series[0].data = data.map(function (item) {
                    return item[1];
                });

                this.option.series[1].data = data.map(function (item) {
                    return item[2];
                });

                this.option.series[2].data = data.map(function (item) {
                    return item[3];
                });

                myChart.setOption(this.option);

            }).catch(err=>{
                console.log(err);
            })
        },

        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        },
        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }

        // 触发搜索按钮
        handleSearch() {
            this.getData();
        },

        //  清空搜索条件
        delReset(){
            this.query.dateAfter = '';
            this.query.dateBefore = '';

        }
    }
};
</script>


<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.grid-con-4 .grid-con-icon {
    background: rgb(242, 200, 67);
}

.grid-con-4 .grid-num {
    color: rgb(242, 200, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
