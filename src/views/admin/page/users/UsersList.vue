<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.id" placeholder="用户id" class="handle-input mr10"></el-input>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-date-picker
                        v-model="query.createAfter"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="最早注册时间">
                </el-date-picker><el-date-picker
                        v-model="query.createBefore"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="最晚注册时间">
                </el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column label="绑定电话" align="center">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.bound_phone?'success':'danger'"
                        >{{scope.row.bound_phone?scope.row.phone:'否'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="绑定微信" align="center">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.bound_wechat?'success':'danger'"
                        >{{scope.row.bound_wechat?'是':'否'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="绑定email" align="center">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.bound_email?'success':'danger'"
                        >{{scope.row.bound_email?scope.row.email:'否'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="角色" align="center">
                    <template slot-scope="scope" >
                        <el-tag v-for="role in scope.row.roles ">
                            {{role.name === 'Founder'?'站长':(role.name === 'Maintainer'?'管理员':'')}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                                class="table-td-thumb"
                                :src="scope.row.avatar"
                                :preview-src-list="[scope.row.avatar]"
                        ></el-image>
                    </template>
                </el-table-column>

                <!--<el-table-column prop="created_at" label="注册时间" ></el-table-column>-->
                <el-table-column label="注册时间" >
                    <template slot-scope="scope">
                        <div>{{scope.row.created_at}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >切换管理员身份</el-button>
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

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getUsers, toBeMaintainer} from "../../../../service/api";

    export default {
        name: "UsersList",
        data() {
            return {
                query: {
                    id: '',
                    name: '',
                    createBefore: '',
                    createAfter: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1,

            };
        },
        created() {
            this.getData();
        },
        inject:['reload'],
        methods: {
            // 获取数据
            getData() {
                getUsers(this.query).then(res => {
                    console.log(res);
                    this.tableData = res.data;
                    this.query.pageSize = res.meta.per_page;
                    this.pageTotal = res.meta.total || 50;
                });
            },
            // 触发搜索按钮
            handleSearch() {
                console.log(this.query.createAfter);
                this.$set(this.query, 'pageIndex', 1);
                this.getData();

            },

            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            // 编辑操作
            handleEdit(index, row) {
                var $form = {'user_id':row.id};
                toBeMaintainer($form).then(res=>{
                    this.reload();
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                })

            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.form);
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
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