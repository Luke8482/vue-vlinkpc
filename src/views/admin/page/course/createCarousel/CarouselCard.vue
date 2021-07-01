<template>
    <div
         @mouseenter="showDealButton=!showDealButton"
         @mouseleave="showDealButton=!showDealButton"
    >
        <div class="carousel_index">{{index+1}}</div>
        <img :src="carousel.image" style="width: 300px; height: 200px;">

        <div class="text_contents"  v-show="showDealButton" style="width: 500px">
            <el-button icon="el-icon-arrow-up" @click="delUpdateSort('上移')"></el-button>
            <el-button icon="el-icon-arrow-down" @click="delUpdateSort('下移')"></el-button>
            <el-button @click="showTable=!showTable">修改</el-button>
            <el-button @click="handleDelSection">删除</el-button>
        </div>

        <CarouselTable
                v-if="showTable"
                :carousel = carousel
                v-on:cancelShowData = "cancelShowData"
        />
    </div>
</template>

<script>
    import CarouselTable from './CarouselTable'

    import {delCarousel, updateCarouselSort} from "../../../../../service/api";



    export default {
        name: "CarouselCard",
        data(){
            return{
                showDealButton: false,  //  控制处理按钮的显示
                showTable: false,  // 控制是否现在修改轮播图表单
                // 调整排序的API 的参数
                updateSort: {
                    type: '',
                    carousel_id: '',
                },
            }
        },
        components:{
            CarouselTable,
        },
        props:{
            carousel: Object,
            index: Number,
        },

        created(){
            this.updateSort.carousel_id = this.carousel.id;
        },

        methods:{
            handleDelSection() {
                delCarousel(this.carousel.id).then(res => {
                    console.log(res);
                    this.reload();
                }).catch(err => {
                    console.log(err);
                })
            },

            //  不显示表单
            cancelShowData(){
                this.showTable = !this.showTable;
            },
            delUpdateSort(type){
                this.updateSort.type = type;
                updateCarouselSort(this.updateSort).then(res=>{
                    this.reload();
                }).catch(err=>{
                    console.log(err);
                })
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
    .carousel_index{
        display:inline;
        margin: auto 30px;
        position: relative;
        top: 50%; /*偏移*/
        margin-top: -20px;
    }
</style>