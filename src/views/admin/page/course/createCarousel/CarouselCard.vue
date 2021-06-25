<template>
    <div
         @mouseenter="showDealButton=!showDealButton"
         @mouseleave="showDealButton=!showDealButton"
    >
        <img :src="carousel.image" style="width: 300px; height: 200px;">

        <div class="text_contents"  v-show="showDealButton" style="width: 500px">
            <el-button icon="el-icon-arrow-up" @click="delUpdateSort('上移')"></el-button>
            <el-button icon="el-icon-arrow-down" @click="delUpdateSort('下移')"></el-button>
            <el-button @click="showUpdateCarousel=!showUpdateCarousel">修改</el-button>
            <el-button @click="handleDelSection">删除</el-button>
        </div>

        <el-form
                v-if="showUpdateCarousel"
                :model="updateCarouselForm"
                ref="carouselForm"
        >
            <el-uploads
                    :course_id = carousel.course_id
                    :file_type = file_type
                    @uploadedFile = "getUploadedFileUrl"

            />

            <el-form-item>
                <el-button type="primary" @click="onSubmit">添加轮播图</el-button>
                <el-button @click="showUpdateCarousel=!showUpdateCarousel"> 取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import elUploads from '@/views/admin/common/elUploads'

    import {updateCarousel, delCarousel, updateCarouselSort} from "../../../../../service/api";



    export default {
        name: "CarouselCard",
        data(){
            return{
                showDealButton: false,  //  控制处理按钮的显示
                showUpdateCarousel: false,  // 控制是否现在修改轮播图表单
                // 调整排序的API 的参数
                updateSort: {
                    type: '',
                    carousel_id: '',
                },

                updateCarouselForm: {
                    image: '',
                    course_id: null,
                },
                file_type: 'image',
            }
        },
        components:{
            elUploads,
        },
        props:{
            carousel: Object,
        },

        inject:['reload'],

        created(){
            this.updateCarouselForm.course_id = this.carousel.course_id;
            this.updateSort.carousel_id = this.carousel.id;
        },

        methods:{
            onSubmit(){
                alert('是否更新轮播图!');
                //  调用修改轮播图api
                updateCarousel(this.carousel.id,this.updateCarouselForm).then(res=>{
                    this.cancelShowInput();
                    console.log(res);
                    this.reload();
                }).catch(err=>{
                    console.log(err);
                })
            },

            handleDelSection() {
                delCarousel(this.carousel.id).then(res => {
                    console.log(res);
                    this.reload();
                }).catch(err => {
                    console.log(err);
                })
            },
            cancelShowInput(){
                this.showUpdateCarousel = false;
                this.resetForm('carouselForm');
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            delUpdateSort(type){
                this.updateSort.type = type;
                updateCarouselSort(this.updateSort).then(res=>{
                    this.reload();
                }).catch(err=>{
                    console.log(err);
                })
            },
            getUploadedFileUrl(data){
                this.updateCarouselForm.image = data;
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
</style>