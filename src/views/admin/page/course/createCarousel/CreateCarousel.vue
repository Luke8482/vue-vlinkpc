<template>
    <div>
        <div class="carousel">
            <CarouselCard
                    v-for="(carousel, index) in carousels"
                    :index = index
                    :carousel = carousel
            />

            <el-button type="primary" @click="showCreateTable=!showCreateTable">添加轮播图</el-button>

            <CarouselTable
                    v-if="showCreateTable"
                    v-on:cancelShowData = "cancelShowData"
            />
        </div>
    </div>

</template>

<script>
    import CarouselCard from './CarouselCard'
    import CarouselTable from './CarouselTable'

    import { getCarousels} from "../../../../../service/api";

    export default {
        name: "CreateCarousel",
        data(){
            return{
                showCreateTable: false,  //  控制新增表单显示
                carousels: [],
                course_id: '',
            }
        },
        components:{
            CarouselCard,
            CarouselTable
        },

        inject:['reload'],

        created(){
            this.course_id = parseInt(this.$route.params.course_id);

            getCarousels(this.course_id).then(res=>{
                console.log(res);
                this.carousels = res;
            }).catch(err=>{

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
    .carousel{
        background-color: #fff;
        width: 690px;
        margin: 0 auto;
    }
</style>