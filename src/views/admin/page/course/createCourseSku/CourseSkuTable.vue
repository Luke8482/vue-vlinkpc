<template>
    <div class="container" >
        <div class="form-box">
            <el-form ref="courseSkuForm">
                <el-form-item label="SKU描述">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>

                <el-form-item label="SKU价格">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>

                <el-form-item label="库存量">
                    <el-input v-model="form.stock"></el-input>
                </el-form-item>
                <el-form-item label="是否上架">
                    <el-switch v-model="form.on_sale"></el-switch>
                </el-form-item>
                <el-form-item label="类型">
                    <el-radio-group v-model="form.type">
                        <el-radio label="main">常规课</el-radio>
                        <el-radio label="pre">预览课</el-radio>
                        <el-radio label="sail">特价课</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="cancelShowData"> 取消</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    import {createCourseSku, updateCourseSku} from "../../../../../service/api";

    export default {
        name: "CourseSkuTable",
        data(){
            return{
                form:{
                    description:'',
                    price: '',
                    stock: '',
                    on_sale: true,
                    type: '',
                    course_id: '',
                }
            }
        },
        props:{
            courseSku: Object,
        },
        inject:['reload'],
        created(){
            //  判断是否存在传递的 courseSku，存在则是修改界面调用表单， 否则为新建界面调用表单
            if (this.courseSku){
                //  更新修改courseSku 的逻辑  把传递的参数复制给表单对应的数据
                this.form = this.courseSku;
            }else{
                //   创建courseSku 的逻辑
                this.form.course_id = parseInt(this.$route.params.course_id);
            }
        },
        methods:{
            cancelShowData(){
                this.$emit("cancelShowData");
                this.resetForm('courseSkuForm');
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            onSubmit(){
                //  判断是修改还是新建
                if (this.courseSku){
                    alert('是否更新课程SKU!');
                    updateCourseSku(this.courseSku.id, this.form).then(res=>{
                        this.cancelShowData();
                        console.log(res);
                        this.reload();
                    }).catch(err=>{
                        console.log(err);
                    })
                }else{
                    alert('是否新建课程SKU!');
                    //  调用创建课程SKU 的 api
                    createCourseSku(this.form).then(res=>{
                        this.cancelShowData();
                        console.log(res);
                        this.reload();
                    }).catch(err=>{
                        console.log(err);
                    })
                }

            },
        }
    }
</script>

<style scoped>
    .container{
        background-color: #fff;
        margin: 0 auto;
        padding: 20px;
    }
</style>