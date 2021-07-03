<template>
    <div class="container" >
        <div class="form-box">
            <el-form ref="detailForm">
                <el-form-item label="类型">
                    <el-radio-group v-model="form.type">
                        <el-radio label="main">常规课</el-radio>
                        <el-radio label="pre">预览课</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-uploads
                        :course_id = form.course_id
                        :file_type = file_type
                        @uploadedFile = "getUploadedFileUrl"
                        style="height: 300px"
                />

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="cancelShowData"> 取消</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    import elUploads from '@/views/admin/common/elUploads'
    import {createDetail, updateDetail} from "../../../../../service/api";


    export default {
        name: "CarouselTable",
        data(){
            return{
                form:{           // 创建 or 修改轮播图相关数据
                    image: '',
                    course_id: null,
                    type: '',
                },
                file_type: 'image',   //  上传组件传参，以便创建对应文件夹

            }
        },
        props:{
            courseDetail: Object,
        },
        inject:['reload'],
        components:{
            elUploads,
        },
        created(){
            //  判断是否存在传递的 Detail，存在则是修改界面调用表单， 否则为新建界面调用表单
            if (this.courseDetail){
                //  更新修改 Detail 的逻辑  把传递的参数复制给表单对应的数据
                this.form.course_id = this.courseDetail.course_id;
                this.form.type = this.courseDetail.type;
            }else{
                //   创建 Detail 的逻辑
                this.form.course_id = parseInt(this.$route.params.course_id);
            }
        },

        methods:{
            cancelShowData(){
                this.$emit("cancelShowData");
                this.resetForm('detailForm');
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            onSubmit(){
                //  判断是修改还是新建
                if (this.courseDetail){
                    alert('是否更新详情图!');
                    updateDetail(this.courseDetail.id, this.form).then(res=>{
                        this.cancelShowData();
                        console.log(res);
                        this.reload();
                    }).catch(err=>{
                        console.log(err);
                    })
                }else{
                    alert('是否新建详情图!');
                    //  调用创建轮播图api
                    createDetail(this.form).then(res=>{
                        this.cancelShowData();
                        console.log(res);
                        this.reload();
                    }).catch(err=>{
                        console.log(err);
                    })
                }

            },
            getUploadedFileUrl(data){
                this.form.image = data;
            },
        }
    }
</script>

<style scoped>
    .container{
        background-color: #fff;
        width: 690px;
        margin: 0 auto;
        padding: 0;
    }
</style>