<template>
    <div>
        <div class="courseSku" >
            <CourseSkuCard
                    :courseSku = skus
            />
            <div style="text-align: center;padding: 20px;">
                <el-button type="primary" @click="showCreateTable=!showCreateTable" >添加课程SKU</el-button>
            </div>

            <CourseSkuTable
                    v-if="showCreateTable"
                    v-on:cancelShowData = "cancelShowData"
            />

        </div>
    </div>
</template>

<script>
    import {getCourseSkus} from "../../../../../service/api";

    import CourseSkuTable from './CourseSkuTable'
    import CourseSkuCard from './CourseSkuCard'


    export default {
        name: "CreateCourseSku",
        data(){
            return{
                showCreateTable: false,  //  控制新增表单显示
                skus:[],
                course_id: '',
            }
        },
        components:{
            CourseSkuTable,
            CourseSkuCard,
        },
        created(){
            this.course_id = parseInt(this.$route.params.course_id);
            getCourseSkus(this.course_id).then(res=>{
                this.skus = res;
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        },
        methods:{
            cancelShowData(){
                this.showCreateTable = !this.showCreateTable;
            }

        }

    }
</script>

<style scoped>
    .courseSku{
        background-color: #fff;
        width: 1100px;
        margin: 0 auto;
    }
</style>