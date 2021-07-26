<template>
    <div >
        <el-table
                :data="agreements"
                border
                style="width: 100%; margin-bottom: 50px">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="协议名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="协议内容"
                    width="1400">
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
        <CreateAgreement
                v-if="showUpdateTable"
                :agreement = agreement
                v-on:unShowUpdateTable="showUpdateTable = false"
        />
    </div>

</template>

<script>
    import CreateAgreement from './CreateAgreement'
    import {getAgreements, delAgreement} from "../../../../service/api";
    export default {
        name: "AgreementList",
        data(){
            return{
                showUpdateTable: false,  // 控制显示修改表单
                agreement: {},   //  修改表单内的原始数据
                agreements:[],
            }
        },
        inject:['reload'],
        components:{
            CreateAgreement,
        },
        created(){
            getAgreements().then(res=>{
                this.agreements = res;
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        },
        methods:{
            handleUpdate(row){
                if (!this.showUpdateTable) {
                    this.showUpdateTable = true;
                    this.agreement = row;
                }

            },
            handleDel(row){
                delAgreement(row.id).then(res=>{
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