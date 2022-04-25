<template>
    <div>
        <div v-if="selection !== null&&isChooseFile" style="text-align:center;">
            <el-image
                    style="height: 100px; width: 200px;"
                    fit="contain"
                    :src="selection.path"
                    :preview-src-list="[selection.path]">
            </el-image>
            <div style="display:inline-block;margin-left: 20px;">
                <div style="margin: 2vh 0;">文件名：{{selection.name}}</div>
                <el-button type="primary" @click="choosedFile">确认选择</el-button>
            </div>

        </div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 文件列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.id" placeholder="ID" class="handle-input mr10"></el-input>
                <el-input v-model="query.name" placeholder="文件名" class="handle-input mr10"></el-input>
                <el-select v-model="query.file_type" placeholder="文件类型">
                    <el-option label="图片" value="image"></el-option>
                    <el-option label="视频" value="video"></el-option>
                    <el-option label="音频" value="audio"></el-option>
                    <el-option label="图文" value="graphic"></el-option>
                    <el-option label="练习文件" value="downloadFile"></el-option>
                </el-select>
                <el-input v-model="query.lesson_id" placeholder="所属lesson（节）" class="handle-input mr10"></el-input>
                <el-select v-model="query.course_id" placeholder="所属课程">
                    <el-option :label="course.title" :value="course.id" v-for="course in courses"></el-option>
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

                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button   @click="delReset">重置</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="singleTable"
                    highlight-current-row
                    header-cell-class-name="table-header"
                    @current-change="handleCurrentChange"
            >
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="文件名"></el-table-column>
                <el-table-column label="预览图" align="center">
                    <template slot-scope="scope">
                        <el-image
                                style="height: 50px; width: 100px;"
                                fit="contain"
                                :src="scope.row.path"
                                :preview-src-list="[scope.row.path]">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="file_type" label="文件类型"></el-table-column>
                <el-table-column label="课程名称" align="center">
                    <template slot-scope="scope" v-if="scope.row.course">
                        <div>《 {{scope.row.course.title}} 》</div>
                    </template>
                </el-table-column>
                <el-table-column label="节名称" align="center">
                    <template slot-scope="scope" v-if="scope.row.lesson">
                        <div>{{scope.row.lesson.title}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" >
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
    import {getFiles, getCourses} from "../../../../service/api";

    export default {
        name: "FilesList",
        data() {
            return {
                query: {
                    id: '',
                    name: '',
                    file_type: '',
                    lesson_id: '',
                    course_id: '',
                    createBefore: '',
                    createAfter: '',
                    pageIndex: 1,
                    pageSize: 15
                },
                courses:{},  //  课程下拉选项参数
                tableData: [],
                selection: null,
                pageTotal: 0,

            };
        },
        props:{
            isChooseFile:Boolean,
        },
        created() {
            this.getData();
            getCourses().then(res=>{
                this.courses = res.data;
            }).catch(err=>{
                console.log(err);
            })
        },
        inject:['reload'],
        methods: {
            // 获取数据
            getData() {
                getFiles(this.query).then(res => {
                    this.tableData = res.data;
                    this.pageTotal = res.total || 50;
                });
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'pageIndex', 1);
                this.getData();

            },

            // 选择操作
            handleCurrentChange(val) {
                this.selection = val;
            },

            //  选择文件
            choosedFile(){
                this.$emit('choosedFile',this.selection)
            },


            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            },

            //  清空搜索条件
            delReset(){
                this.query.id = '';
                this.query.name = '';
                this.query.file_type = '';
                this.query.lesson_id = '';
                this.query.course_id = '';
                this.query.createAfter = '';
                this.query.createBefore = '';
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