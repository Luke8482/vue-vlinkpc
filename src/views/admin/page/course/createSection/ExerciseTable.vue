<template>
    <el-form :model="exerciseForm" :rules="rules" ref="exerciseForm" label-width="100px" class="demo-exerciseForm">
        <el-form-item label="习题类型" prop="exercise_style">
            <el-radio-group v-model="exerciseForm.exercise_style">
                <el-radio label="单选题"></el-radio>
                <el-radio label="多选题"></el-radio>
                <el-radio label="填空题"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="题干" prop="content">
            <el-input type="textarea" v-model="exerciseForm.content"></el-input>
        </el-form-item>

        <el-form-item label="A" prop="a" style="margin-right: 10vw;">
            <el-input  v-model="exerciseForm.a"></el-input>
        </el-form-item>
        <el-form-item label="B" prop="b" style="margin-right: 10vw;">
            <el-input v-model="exerciseForm.b"></el-input>
        </el-form-item>
        <el-form-item label="C" prop="c" style="margin-right: 10vw;">
            <el-input v-model="exerciseForm.c"></el-input>
        </el-form-item>
        <el-form-item label="D" prop="d" style="margin-right: 10vw;">
            <el-input v-model="exerciseForm.d"></el-input>
        </el-form-item>
        <el-form-item label="E" prop="e" style="margin-right: 10vw;">
            <el-input v-model="exerciseForm.e"></el-input>
        </el-form-item>
        <el-form-item label="F" prop="f" style="margin-right: 10vw;">
            <el-input v-model="exerciseForm.f"></el-input>
        </el-form-item>
        <el-form-item label="G" prop="g" style="margin-right: 10vw;">
            <el-input v-model="exerciseForm.g"></el-input>
        </el-form-item>

        <el-form-item label="正确答案" prop="true_answer" style="margin-right: 20vw;">
            <el-input type="textarea" v-model="exerciseForm.true_answer"></el-input>
        </el-form-item>

        <el-form-item label="正确解析" prop="true_analysis">
            <el-input type="textarea" v-model="exerciseForm.true_analysis"></el-input>
        </el-form-item>
        <el-form-item label="错误解析" prop="error_analysis">
            <el-input type="textarea" v-model="exerciseForm.error_analysis"></el-input>
        </el-form-item>


        <el-form-item>
            <el-button type="primary" @click="submitForm('exerciseForm')">提交</el-button>
            <el-button @click="resetForm('exerciseForm')">重置</el-button>
            <el-button @click="cancelShowInput">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {createExercises, updateExercise, getExercise} from "../../../../../service/api";

    export default {
        name: "ExerciseTable",
        data() {
            return {
                exerciseForm: {
                    exercise_style: '',
                    content: '',
                    a: '',
                    b: '',
                    c: '',
                    d: '',
                    e: '',
                    f: '',
                    g: '',
                    true_answer: '',
                    true_analysis: '',
                    error_analysis: '',
                },
                rules: {
                    exercise_style: [
                        { required: true, message: '请选择习题类型', trigger: 'change' }
                    ],
                    content: [
                        { required: true, message: '请输入题干', trigger: 'blur' },
                    ],
                    true_answer: [
                        { required: true, message: '请填写正确答案', trigger: 'blur' }
                    ],
                    true_analysis: [
                        { required: true, message: '请填写正确解析', trigger: 'blur' }
                    ],
                    error_analysis: [
                        { required: true, message: '请填写正确解析', trigger: 'blur' }
                    ],

                }
            };
        },
        props:{
            exerciseId: String,
        },
        inject:['reload'],

        created(){
            if (this.exerciseId) {
                getExercise(this.exerciseId).then(res=>{
                    this.exerciseForm = res;
                    console.log(res);

                }).catch(err=>{
                    console.log(err);
                })
            }

        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!this.exerciseId){
                            alert('此操作将会创建新的习题!');
                            createExercises(this.exerciseForm).then(res=>{
                                this.$emit('commitSectionTable',res);
                                console.log(res);
                            }).catch(err=>{
                                console.log(err);
                            })
                        } else {
                            alert('此操作将会更新习题!');
                            updateExercise(this.exerciseId, this.exerciseForm).then(res=>{
                                this.$emit('commitSectionTable',res);
                                console.log(res);
                            }).catch(err=>{
                                console.log(err);
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            cancelShowInput(){
                this.resetForm('exerciseForm');
                // 触发上级表单取消显示
                this.$emit('cancelShowInput');

            },
        }
    }
</script>

<style scoped>



</style>