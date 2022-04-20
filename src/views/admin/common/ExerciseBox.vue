<template>
    <div style="width: 50vw;">
        <p class="ZfB58dkxKSUUG-h_rapfd _3zYf4vfAJtURZCpiZtJ0VO _3BDH96ZgxuXEDlzaSqBSsH _1rmCHgpSrCvM3PXVrO0H9M">
            {{exercise.content}}
        </p>
        <ol class="_3IT3fcaDbPGL-VL45rdJfb">
            <el-row class="ant-row" style="margin-left: -8px; margin-right: -8px; row-gap: 16px;">
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="padding-left: 8px; padding-right: 8px;"
                        v-if="exercise.a"
                >
                    <li
                            :class="choiceAClass"
                            @click="dealWithAnswer('A')"
                    >
                        <button :disabled="disabled" class="button-choice">A、 {{exercise.a}}</button>
                    </li>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="padding-left: 8px; padding-right: 8px;"
                        v-if="exercise.b"
                >
                    <li
                            :class="choiceBClass"
                            @click="dealWithAnswer('B')"
                    >
                        <button :disabled="disabled"  class="button-choice">B、 {{exercise.b}}</button>
                    </li>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="padding-left: 8px; padding-right: 8px;"
                        v-if="exercise.c"
                >
                    <li
                            :class="choiceCClass"
                            @click="dealWithAnswer('C')"
                    >
                        <button :disabled="disabled" class="button-choice">C、 {{exercise.c}}</button>
                    </li>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="padding-left: 8px; padding-right: 8px;"
                        v-if="exercise.d"
                >
                    <li
                            :class="choiceDClass"
                            @click="dealWithAnswer('D')"
                    >
                        <button :disabled="disabled" class="button-choice">D、 {{exercise.d}}</button>
                    </li>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="padding-left: 8px; padding-right: 8px;"
                        v-if="exercise.e"
                >
                    <li
                            :class="choiceEClass"
                            @click="dealWithAnswer('E')"
                    >
                        <button :disabled="disabled" class="button-choice">E、 {{exercise.e}}</button>
                    </li>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="padding-left: 8px; padding-right: 8px;"
                        v-if="exercise.f"
                >
                    <li
                            :class="choiceFClass"
                            @click="dealWithAnswer('F')"
                    >
                        <button :disabled="disabled" class="button-choice">F、 {{exercise.f}}</button>
                    </li>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="padding-left: 8px; padding-right: 8px;"
                        v-if="exercise.g"
                >
                    <li
                            :class="choiceGClass"
                            @click="dealWithAnswer('G')"
                    >
                        <button :disabled="disabled" class="button-choice">G、 {{exercise.g}}</button>
                    </li>
                </el-col>
            </el-row>
        </ol>

        <!--多选和填空题对应提交按钮-->
        <el-form :inline="true"  class="demo-form-inline" v-if="showAnswerInput&&!learned">
            <el-form-item style="left: 60px;">
                <el-input v-model="studentAnswer"
                          placeholder="请填写答案"
                          style="margin: 25px"
                          :disabled="disabled"
                          v-if="exercise.exercise_style === '填空题'"
                ></el-input>
            </el-form-item >
            <el-form-item style="left: 80px;">
                <el-button type="primary"
                           @click="dealWithInput"
                           style="margin: 20px;padding: 10px;"
                           :disabled="disabled"
                >
                    提交
                </el-button>
            </el-form-item>
        </el-form>

        <!--前台解释显示区-->
        <ol class="analysis" v-if="showFrontDesk">
            <el-row :gutter="20">
                <el-col :span="16">
                    <p style="font-size: 20px;">{{analysis}}</p>
                </el-col>
                <!--重新作答&跳过此题按钮-->
                <el-col :span="8" v-if="showReDoBut">
                    <el-button type="primary"
                               style="margin: 20px;padding: 10px;"
                               @click="reAnswer"
                    >重新作答</el-button>
                    <el-button style="margin: 20px;padding: 10px;"
                               type="text"
                               @click="continueLearning"
                    >跳过此题</el-button>
                </el-col>
            </el-row>
        </ol>

        <!--已学过显示区-->
        <ol class="analysis" v-if="learned">
            <li>
                <p style="font-size: 20px;">正确答案：{{exercise.true_answer}}</p>
            </li>
        </ol>

        <!--后台解释显示区-->
        <ol class="analysis" v-if="!showFrontDesk">
            <li>
                <p style="font-size: 20px;">正确答案：{{exercise.true_answer}}</p>
                <p style="font-size: 20px;">正确解析：{{exercise.true_analysis}}</p>
                <p style="font-size: 20px;">错误解析：{{exercise.error_analysis}}</p>
            </li>
        </ol>
    </div>


</template>

<script>
    import {getExercise} from "../../../service/api";

    export default {
        name: "ExerciseBox",
        data(){
            return{
                exercise:{},
                choiceAClass:['normal-choice','choice-normal-bgc'],
                choiceBClass:['normal-choice','choice-normal-bgc'],
                choiceCClass:['normal-choice','choice-normal-bgc'],
                choiceDClass:['normal-choice','choice-normal-bgc'],
                choiceEClass:['normal-choice','choice-normal-bgc'],
                choiceFClass:['normal-choice','choice-normal-bgc'],
                choiceGClass:['normal-choice','choice-normal-bgc'],
                disabled:false,
                analysis:'',
                showReDoBut:false,
                showFrontDesk:false,
                showAnswerInput:false,
                studentAnswer:'',
                multipleChoice:{
                    A:'',
                    B:'',
                    C:'',
                    D:'',
                    E:'',
                    F:'',
                    G:'',
                },

            }
        },
        props:{
            exerciseId: String,
            isLearningPage:Boolean,
            learned:Boolean,
        },
        created(){
            if (this.exerciseId){
                getExercise(this.exerciseId).then(res=>{
                    this.exercise = res;
                    if (this.exercise.exercise_style !== "单选题") {
                        this.showAnswerInput = true;
                    }

                }).catch(err=>{
                    console.log(err);
                })
            }
            if (this.isLearningPage) {
                this.showFrontDesk = true;
                // 如果是学习过的习题，那么选项禁用并显示正确答案
                if (this.learned) {
                    this.disabled = true;
                }

            }


        },
        methods:{
            dealWithAnswer(value) {
                if (this.exercise.exercise_style === "单选题") {
                    // 单选题处理机制
                    if (this.exercise.true_answer === value) { // 判断是否回答正确
                        switch (value) {
                            case 'A':
                                this.choiceAClass.push('choice-right');
                                break;
                            case 'B':
                                this.choiceBClass.push('choice-right');
                                break;
                            case 'C':
                                this.choiceCClass.push('choice-right');
                                break;
                            case 'D':
                                this.choiceDClass.push('choice-right');
                                break;
                            case 'E':
                                this.choiceEClass.push('choice-right');
                                break;
                            case 'F':
                                this.choiceFClass.push('choice-right');
                                break;
                            default :
                                this.choiceGClass.push('choice-right');
                        }

                        this.analysis = this.exercise.true_analysis;
                        this.$emit('continueLearning');
                    } else {
                        switch (value) {
                            case 'A':
                                this.choiceAClass.push('choice-wrong');
                                break;
                            case 'B':
                                this.choiceBClass.push('choice-wrong');
                                break;
                            case 'C':
                                this.choiceCClass.push('choice-wrong');
                                break;
                            case 'D':
                                this.choiceDClass.push('choice-wrong');
                                break;
                            case 'E':
                                this.choiceEClass.push('choice-wrong');
                                break;
                            case 'F':
                                this.choiceFClass.push('choice-wrong');
                                break;
                            default :
                                this.choiceGClass.push('choice-wrong');
                        }

                        this.analysis = this.exercise.error_analysis;
                        this.showReDoBut = true;
                    }
                    this.disabled = true;
                } else {
                    // 多选题处理机制
                    switch (value) {
                        case 'A':
                            if (this.multipleChoice.A === '') {
                                this.multipleChoice.A = value;
                                this.choiceAClass.push('choice-right');

                            } else {
                                this.multipleChoice.A = '';
                                this.choiceAClass.splice(this.choiceAClass.indexOf('choice-right'),1)
                            }
                        break;
                        case 'B':
                            if (this.multipleChoice.B === '') {
                                this.multipleChoice.B = value;
                                this.choiceBClass.push('choice-right');
                            } else {
                                this.multipleChoice.B = '';
                                this.choiceBClass.splice(this.choiceBClass.indexOf('choice-right'),1)
                            }
                            break;
                        case 'C':
                            if (this.multipleChoice.C === '') {
                                this.multipleChoice.C = value;
                                this.choiceCClass.push('choice-right');
                            } else {
                                this.multipleChoice.C = '';
                                this.choiceCClass.splice(this.choiceCClass.indexOf('choice-right'),1)
                            }
                            break;
                        case 'D':
                            if (this.multipleChoice.D === '') {
                                this.multipleChoice.D = value;
                                this.choiceDClass.push('choice-right');
                            } else {
                                this.multipleChoice.D = '';
                                this.choiceDClass.splice(this.choiceDClass.indexOf('choice-right'),1)
                            }
                            break;
                        case 'E':
                            if (this.multipleChoice.E === '') {
                                this.multipleChoice.E = value;
                                this.choiceEClass.push('choice-right');
                            } else {
                                this.multipleChoice.E = '';
                                this.choiceEClass.splice(this.choiceEClass.indexOf('choice-right'),1)
                            }
                            break;
                        case 'F':
                            if (this.multipleChoice.F === '') {
                                this.multipleChoice.F = value;
                                this.choiceFClass.push('choice-right');
                            } else {
                                this.multipleChoice.F = '';
                                this.choiceFClass.splice(this.choiceFClass.indexOf('choice-right'),1)
                            }
                            break;
                        case 'G':
                            if (this.multipleChoice.G === '') {
                                this.multipleChoice.G = value;
                                this.choiceGClass.push('choice-right');
                            } else {
                                this.multipleChoice.G = '';
                                this.choiceGClass.splice(this.choiceGClass.indexOf('choice-right'),1)
                            }
                            break;

                    }

                }

            },

            // 填空&多选题处理机制
            dealWithInput(){
                if (this.exercise.exercise_style === "填空题"){
                    if (this.studentAnswer === this.exercise.true_answer){ // 判断是否回答正确
                        this.analysis = this.exercise.true_analysis;
                        this.$emit('continueLearning');
                    } else {
                        this.analysis = this.exercise.error_analysis;
                        this.showReDoBut = true;
                    }
                } else {
                    // 多选题点击提交后处理机制
                    this.studentAnswer = this.multipleChoice.A
                        +this.multipleChoice.B
                        +this.multipleChoice.C
                        +this.multipleChoice.D
                        +this.multipleChoice.E
                        +this.multipleChoice.F
                        +this.multipleChoice.G;
                    this.studentAnswer = this.multipleChoice.A+this.multipleChoice.B;
                    if (this.studentAnswer === this.exercise.true_answer){ // 判断是否回答正确
                        this.analysis = this.exercise.true_analysis;
                        this.$emit('continueLearning');
                    } else {
                        this.analysis = this.exercise.error_analysis;
                        this.showReDoBut = true;
                    }
                }
                this.disabled = true;
            },


            // 重新作答
            reAnswer(){
                if(this.exercise.exercise_style !== '填空题'){
                    this.choiceAClass.splice(2,2);
                    this.choiceBClass.splice(2,2);
                    this.choiceCClass.splice(2,2);
                    this.choiceDClass.splice(2,2);
                    this.choiceEClass.splice(2,2);
                    this.choiceFClass.splice(2,2);
                    this.choiceGClass.splice(2,2);
                    this.multipleChoice = {
                        A:'',
                        B:'',
                        C:'',
                        D:'',
                        E:'',
                        F:'',
                        G:'',
                    };
                }
                this.disabled = false;
                this.analysis = '';
                this.showReDoBut = false;
                this.studentAnswer = '';

            },

            // 跳过此题，继续学习
            continueLearning(){
                this.$emit('continueLearning',true);
                this.showReDoBut = false;
            }

        }

    }
</script>

<style scoped>

    .ant-row-start {
        justify-content: flex-start;
    }

    .ant-row-no-wrap {
        flex-wrap: nowrap;
    }

    .ant-row, .ant-row:after, .ant-row:before {
        display: flex;
    }

    .ant-row {
        flex-flow: row wrap;
    }

    * {
        margin: 0;
        padding: 0;
    }

    *, :after, :before {
        box-sizing: border-box;
    }

    .ant-col-order-1 {
        order: 1;
    }

    .ant-col {
        position: relative;
        max-width: 100%;
        min-height: 1px;
    }

    .ant-col-order-4 {
        order: 4;
    }

    .ant-col {
        position: relative;
        max-width: 100%;
        min-height: 1px;
    }

    .lMZa9IiLe1jZ3inuGJQkS {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0 16px;
        border-left: 2px solid;
    }

    ._2HeLvd5OplrshUTW5QKh-2 {
        border-color: #fcd17b;
    }

    ._1rmCHgpSrCvM3PXVrO0H9M {
        color: #fff;
    }

    ._3BDH96ZgxuXEDlzaSqBSsH {
        margin: 1em 0;
        font-weight: 700;
        font-size: 26px;
    }

    .ZfB58dkxKSUUG-h_rapfd {
        margin-bottom: 0;
        font-weight: lighter;
        line-height: 2;
        white-space: pre-line;
        word-break: break-all;
    }

    p {
        margin-top: 0;
        margin-bottom: 1em;
    }

    p {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }

    ._3IT3fcaDbPGL-VL45rdJfb {
        width: 95%;
        margin-right: auto;
        margin-left: auto;
        list-style-type: none;
    }


    dl, ol, ul {
        margin-top: 0;
        margin-bottom: 1em;
    }

    ol {
        display: block;
        list-style-type: decimal;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 40px;
    }

    .ant-row, .ant-row:after, .ant-row:before {
        display: flex;
    }

    .ant-row {
        flex-flow: row wrap;
    }

    .ant-col {
        position: relative;
        max-width: 100%;
        min-height: 1px;
    }

    .choice-normal-bgc {
        background-image: url(/choice.png);
    }

    .choice-wrong {
        background-image: url(/choiceWrong.png);
    }

    .choice-right {
        background-image: url(/choiceRight.png);
    }

    .normal-choice {
        height: 100%;
        color: #000;
        background-repeat: no-repeat!important;
        background-size: 100% 100%;
    }

    .button-choice:disabled {
        cursor: not-allowed;
    }

    .button-choice {
        width: 100%;
        height: 100%;
        padding: 16px 36px;
        font-size: 24px;
        text-align: start;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    [type=reset], [type=submit], button, html [type=button] {
        -webkit-appearance: button;
    }

    button, select {
        text-transform: none;
    }

    button, input {
        overflow: visible;
    }

    button, input, optgroup, select, textarea {
        margin: 0;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
    }

    [role=button], a, area, button, input:not([type=range]), label, select, summary, textarea {
        touch-action: manipulation;
    }

    button, [type="button"], [type="reset"], [type="submit"] {
        -webkit-appearance: button;
    }

    button, select {
        text-transform: none;
    }

    button, input {
        overflow: visible;
    }

    button, input, optgroup, select, textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
    }

    .analysis {
        width: 95%;
        margin-right: auto;
        margin-left: 0;
        list-style-type: none;
    }

    .pre-break-lines {
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
    }

    .text_contents {
        width: 90%;
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