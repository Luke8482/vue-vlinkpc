<template>
    <div>
        <div class="carousel" style="text-align: center; padding: 20px;">
            <div style="margin: 20px">
                <el-radio v-model="type" label="main">常规课</el-radio>
                <el-radio v-model="type" label="pre">预览课</el-radio>
            </div>


            <DetailCard
                    v-for="(courseDetail, index) in computedDetails"
                    :index = index
                    :courseDetail = courseDetail
            />
            <div style="margin: 20px">
                <el-button type="primary" @click="showCreateTable=!showCreateTable">添加详情图</el-button>
            </div>


            <DetailTable
                    v-if="showCreateTable"
                    v-on:cancelShowData = "cancelShowData"
            />
        </div>
    </div>
</template>

<script>
    import DetailCard from './DetailCard'
    import DetailTable from './DetailTable'

    import { getDetails} from "../../../../../service/api";


    export default {
        name: "CreateDetail",
        data(){
            return{
                showCreateTable: false,  //  控制新增表单显示
                details: [],
                course_id: '',
                type: 'main',  //  课程类型，，控制显示不同的详情图
            }
        },
        components:{
            DetailCard,
            DetailTable,
        },
        inject:['reload'],
        computed:{
            computedDetails: function () {
                let computedDetails = [];
                if (this.type === 'main') {
                    computedDetails = this.details.filter(item=>item.type ==='main')

                }else {
                    computedDetails = this.details.filter(item=>item.type ==='pre')
                }

                return computedDetails;
            }
        },

        created(){
            this.course_id = parseInt(this.$route.params.course_id);

            getDetails(this.course_id).then(res=>{
                this.details = res;
            }).catch(err=>{

            })
        },

        methods:{
            cancelShowData(){
                this.showCreateTable = !this.showCreateTable;
            }

        },
    }
</script>

<style scoped>
    .carousel{
        background-color: #fff;
        width: 690px;
        margin: 0 auto;
    }
</style>