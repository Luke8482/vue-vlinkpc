<template>
    <div >
        <el-table
                :data="versions"
                border
                style="width: 100%; margin-bottom: 50px">
            <el-table-column
                    type="index"
                    label="序号"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="版本名称"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="版本类型"
                    width="200">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="300">
                <template slot-scope="scope" >
                    <el-button @click="handleUpdate(scope.row)" type="text" size="small">编辑&预览</el-button>
                    <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <VersionTable
                v-if="showUpdateTable"
                :version = version
                v-on:unShowUpdateTable="showUpdateTable = false"
        />

        <el-button @click="handleCreate" type="primary" size="large" v-if="!showUpdateTable">新增版本</el-button>
    </div>
</template>

<script>
    import VersionTable from './VersionTable'
    import {getVersions, delVersion} from "../../../../../service/api";


    export default {
        name: "CreateVersion",
        data(){
            return{
                showUpdateTable: false,  // 控制显示修改表单
                version: {},   //  修改表单内的原始数据
                versions:[],
            }
        },
        components:{
            VersionTable,
        },
        inject:['reload'],
        created(){
            getVersions(this.$route.params.course_id).then(res=>{
                this.versions = res;
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        },
        methods:{
            handleCreate(){
                if (!this.showUpdateTable) {
                    this.showUpdateTable = true;
                    this.version = null;
                }
            },
            handleUpdate(row){
                if (!this.showUpdateTable) {
                    this.showUpdateTable = true;
                    this.version = row;
                }

            },
            handleDel(row){
                delVersion(row.id).then(res=>{
                    this.reload();
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                })
            },

        }
    }
</script>

<style scoped>

</style>