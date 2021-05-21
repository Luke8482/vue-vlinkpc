<template>
    <div>
        <div class="purchase_cards">
            <CourseCard
                    v-for="(course, index) in courses_list"
                    :course="course"
            />


        </div>
        <el-pagination
                layout="prev, pager, next"
                :page-size="5"
                @current-change="current_change"
                :current-page.sync="currentPage"
                :pager-count="5"
                :total="courses_list.length"

        >
        </el-pagination>
    </div>

</template>

<script>
    // 引入组件
    import CourseCard  from './CourseCard.vue';
    // 引入API接口
    import {getCourses} from '@/service/api/index'

export default {
    name: 'courselist',
    data() {
        return {
            courses_list: [],
            currentPage:1,
        };
    },

    components: {
      CourseCard,
    },

    created () {
        this.reqData();
    },

    methods:{
        async reqData() {
            let res = await getCourses();
            console.log(res);
            this.courses_list = res.data;
            if(res.success){  //需优化上面代码，为请求成功后再赋值
                this.courses_list = res.data;
            }
        },

        current_change(){  //改变当前页
            this.currentPage = currentPage
        }

    }

};
</script>

<style scoped>
    .purchase_cards {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        text-align: left;
    }

    .el-pagination {
        text-align: center;
    }
</style>
