<template>
    <div>
        <CarouselCard
                v-for="carousel in carousels"
                :carousel = carousel
        />

        <el-button type="primary" @click="showCreateTable=!showCreateTable">添加轮播图</el-button>

        <div class="container" v-if="showCreateTable">
            <div class="form-box">
                <el-form>
                    <el-uploads
                            :course_id = form.course_id
                            :file_type = file_type
                            @uploadedFile = "getUploadedFileUrl"
                    />

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">添加轮播图</el-button>
                        <el-button @click="showCreateTable=!showCreateTable"> 取消</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>
    </div>
</template>

<script>
    import elUploads from '@/views/admin/common/elUploads'
    import CarouselCard from './CarouselCard'

    import {createCarousel, getCarousels} from "../../../../../service/api";

    export default {
        name: "CreateCarousel",
        data(){
            return{
                showCreateTable: false,  //  控制新增表单显示
                form:{           // 创建轮播图相关数据
                    image: '',
                    course_id: null,
                },

                file_type: 'image',   //  上传组件传参，以便创建对应文件夹

                carousels: [],
            }
        },
        components:{
            elUploads,
            CarouselCard
        },

        inject:['reload'],

        created(){
            this.form.course_id = parseInt(this.$route.params.course_id);

            getCarousels(this.form.course_id).then(res=>{
                console.log(res);
                this.carousels = res;
            }).catch(err=>{

            })
        },

        methods:{
            onSubmit(){
                //  调用创建轮播图api
                console.log(this.form);
                createCarousel(this.form).then(res=>{
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                })
            },
            getUploadedFileUrl(data){
                this.form.image = data;
            },

        }
    }
</script>

<style scoped>

</style>