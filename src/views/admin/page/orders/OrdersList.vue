<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 订单列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.no" placeholder="订单号" class="handle-input mr10"></el-input>
                <el-select v-model="query.closed" placeholder="订单状态">
                    <el-option label="未关闭" value="false"></el-option>
                    <el-option label="已关闭" value="true"></el-option>
                </el-select>
                <el-select v-model="query.refund_status" placeholder="退款状态">
                    <el-option label="未申请" value="pending"></el-option>
                    <el-option label="已申请" value="applied"></el-option>
                    <el-option label="退款中" value="processing"></el-option>
                    <el-option label="退款成功" value="success"></el-option>
                    <el-option label="退款失败" value="failed"></el-option>
                </el-select>

                <el-date-picker
                        v-model="query.createAfter"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="最早创建时间（包含当天）">
                </el-date-picker><el-date-picker
                        v-model="query.createBefore"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="最晚创建时间（不含当天）">
                </el-date-picker>
                <el-date-picker
                        v-model="query.paidAfter"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="最早支付时间（包含当天）">
                </el-date-picker><el-date-picker
                    v-model="query.paidBefore"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="最晚支付时间（不含当天）">
                </el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button   @click="delReset">重置</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="no" width="180" label="订单号"></el-table-column>
                <el-table-column label="用户名" width="150" align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.user.name}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="总价" width="80" align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.total_amount}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="支付" width="80" align="center">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.paid_at?'success':'danger'"
                        >{{scope.row.paid_at?'是':'否'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="支付方式" width="80" align="center">
                    <template slot-scope="scope">
                        <el-tag
                                type="'success'"
                        >{{scope.row.payment_method}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="退款状态" width="250" align="center">
                    <template slot-scope="scope">
                        <el-tag style="margin-right: 5px;"
                                :type="scope.row.refund_status === 'pending'?'success':'danger'"
                        >{{chineseRefundStatus(scope.row.refund_status)}}</el-tag>
                        <el-button
                                v-if="scope.row.refund_status === 'applied'"
                                type="primary"
                        >同意</el-button>
                        <el-button
                                v-if="scope.row.refund_status === 'applied'"
                                type="warning"
                        >不同意</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="订单内容"  align="center">
                    <template slot-scope="scope" >
                        <el-tag v-for="item in scope.row.items ">
                            《{{item.course.title }}》
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="订单状态" width="80" align="center">
                    <template slot-scope="scope">
                        <el-tag
                                :type="!scope.row.closed?'success':'danger'"
                        >{{scope.row.closed? '已关闭':'正常'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" width="180" >
                    <template slot-scope="scope">
                        <div>{{scope.row.created_at.slice(0,10)}}   {{scope.row.created_at.slice(11,19)}}</div>
                    </template>
                </el-table-column>

            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import {getOrders} from "../../../../service/api";

    export default {
        name: "OrdersList",
        data() {
            return {
                query: {
                    no: '',
                    closed: '',
                    refund_status: '',
                    createBefore: '',
                    createAfter: '',
                    paidBefore: '',
                    paidAfter: '',
                    pageIndex: 1,
                    pageSize: 15
                },
                tableData: [],
                multipleSelection: [],
                pageTotal: 0,

            };
        },
        created() {
            this.getData();
        },
        inject:['reload'],
        methods: {
            // 获取数据
            getData() {
                getOrders(this.query).then(res => {
                    this.tableData = res.data;
                    this.pageTotal = res.total || 50;
                });
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'pageIndex', 1);
                this.getData();

            },

            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },


            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            },

            //  清空搜索条件
            delReset(){
                this.query.no = '';
                this.query.closed = '';
                this.query.refund_status = '';
                this.query.createAfter = '';
                this.query.createBefore = '';
                this.query.paidAfter = '';
                this.query.paidBefore = '';
            },

            //  转换为中文退款状态
            chineseRefundStatus(val){
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
            }
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }


    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 200px;
        display: inline-block;
    }
    .pagination{
        text-align: center;
    }
</style>