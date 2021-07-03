<template>
    <div>
        <el-table
                :data="courseSku"
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    type="index"
                    label="序号"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="sku描述"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="stock"
                    label="库存"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="on_sale"
                    label="上架"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="类型"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="created_at"
                    label="创建时间"
                    width="160">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="handUpdateSku(scope.row)"  type="text" size="small">修改</el-button>
                    <el-button @click="handleDelSku( scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <CourseSkuTable
                v-if="showTable"
                :courseSku = updateCourseSku
                v-on:cancelShowData = "cancelShowData"
        />
    </div>

</template>

<script>
    import {delCourseSku} from "../../../../../service/api";

    import CourseSkuTable from './CourseSkuTable'

    export default {
        name: "CourseSkuCard",
        data(){
            return{
                showTable: false,  // 控制是否现在修改轮播图表单
                updateCourseSku: {},
            }
        },
        components:{
            CourseSkuTable,
        },
        props:{
            courseSku: Array,
            index: Number,
        },
        inject:['reload'],

        methods:{
            handUpdateSku(row){
                this.showTable = !this.showTable;
                this.updateCourseSku = row;
            },
            handleDelSku(row) {
                delCourseSku(row.id).then(res => {
                    console.log(res);
                    this.reload();
                }).catch(err => {
                    console.log(err);
                })
            },

            //  不显示表单
            cancelShowData(){
                this.showTable = !this.showTable;
            },
        }
    }
</script>

<style scoped>
    .text_contents {
        max-width: 90%;
        margin-left: .8vw;
        line-height: 2;
        margin-top: .2vw;
        margin-bottom: .2vw;
        font-family: inherit;
        font-size: 20px;
        letter-spacing: 0;
        color: silver;
        font-weight: lighter;
    }
    .carousel_index{
        display:inline;
        margin: auto 30px;
        position: relative;
        top: 50%; /*偏移*/
        margin-top: -20px;
    }
</style>