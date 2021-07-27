<template>
    <div >
        <el-table
                :data="teachers"
                border
                style="width: 100%; margin-bottom: 50px">
            <el-table-column
                    type="index"
                    label="序号"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="nickname"
                    label="教师昵称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="introduction"
                    label="教师简介"
                    width="1000">
            </el-table-column>
            <el-table-column
                    prop="avatar"
                    label="头像"
                    width="300">
                <template slot-scope="scope" >
                    <img :src="scope.row.avatar" style="height:150px">
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="300">
                <template slot-scope="scope" >
                    <el-button @click="handleUpdate(scope.row)" type="text" size="small">编辑&预览</el-button>
                    <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <CreateTeacher
                v-if="showUpdateTable"
                :teacher = teacher
                v-on:unShowUpdateTable="showUpdateTable = false"
        />
    </div>
</template>

<script>
    import CreateTeacher from './CreateTeacher'
    import {getTeachers, delTeacher} from "../../../../service/api";

    export default {
        name: "TeacherList",
        data(){
            return{
                showUpdateTable: false,  // 控制显示修改表单
                teacher: {},   //  修改表单内的原始数据
                teachers:[],
            }
        },
        components:{
            CreateTeacher,
        },
        inject:['reload'],
        created(){
            getTeachers().then(res=>{
                this.teachers = res;
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        },
        methods:{
            handleUpdate(row){
                if (!this.showUpdateTable) {
                    this.showUpdateTable = true;
                    this.teacher = row;
                }

            },
            handleDel(row){
                delTeacher(row.id).then(res=>{
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