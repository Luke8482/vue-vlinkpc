<template>
    <div>
        <div class="tools">
            <el-button :theme="'default'" type="submit" :title="'基础按钮'" @click.stop="prePage" class="mr10"> 上一页</el-button>
            <el-button :theme="'default'" type="submit" :title="'基础按钮'" @click.stop="nextPage" class="mr10"> 下一页</el-button>
            <div class="page">{{pageNum}}/{{pageTotalNum}} </div>
            <el-button :theme="'default'" type="submit" :title="'基础按钮'" @click.stop="clock" class="mr10"> 顺时针</el-button>
            <el-button :theme="'default'" type="submit" :title="'基础按钮'" @click.stop="counterClock" class="mr10"> 逆时针</el-button>
        </div>
        <pdf ref="pdf"
             :src="url"
             :page="pageNum"
             :rotate="pageRotate"
             @progress="loadedRatio = $event"
             @page-loaded="pageLoaded($event)"
             @num-pages="pageTotalNum=$event"
             @error="pdfError($event)"
             @link-clicked="page = $event">
        </pdf>
    </div>
</template>
<script>
    import pdf from 'vue-pdf'
    export default {
        name: 'PdfBox',
        components: {
            pdf
        },
        props:{
          content: String,
        },
        data() {
            return {
                url: "",
                pageNum: 1,
                pageTotalNum: 1,
                pageRotate: 0,
                // 加载进度
                loadedRatio: 0,
                curPageNum: 0,
            }
        },
        mounted: function() {},
        created(){
            // this.url = 'test/uploads/2/graphics/2_1620987279_fj33fUrfVc.pdf';
            this.url = this.content.replace('http://larabbs.test', 'test');
        },
        methods: {
            // 上一页函数，
            prePage() {
                var page = this.pageNum
                page = page > 1 ? page - 1 : this.pageTotalNum
                this.pageNum = page
            },
            // 下一页函数
            nextPage() {
                var page = this.pageNum
                page = page < this.pageTotalNum ? page + 1 : 1
                this.pageNum = page
            },
            // 页面顺时针翻转90度。
            clock() {
                this.pageRotate += 90
            },
            // 页面逆时针翻转90度。
            counterClock() {
                this.pageRotate -= 90
            },
            // 页面加载回调函数，其中e为当前页数
            pageLoaded(e) {
                this.curPageNum = e
            },
            // 其他的一些回调函数。
            pdfError(error) {
                console.error(error)
            },
        }
    }
</script>

<!--<template>-->
    <!--&lt;!&ndash;<pdf src="./../../../../public/2_1621054510_84GFpZeZwa.pdf"></pdf>&ndash;&gt;-->
    <!--<pdf src="@/assets/2_1621054510_84GFpZeZwa.pdf"></pdf>-->
<!--</template>-->

<!--<script>-->
    <!--import pdf from 'vue-pdf'-->

    <!--export default {-->
        <!--components: {-->
            <!--pdf-->
        <!--}-->
    <!--}-->

<!--</script>-->

<!--<template>-->
    <!--<div>-->
        <!--<pdf-->
                <!--ref="pdf"-->
                <!--:src="url">-->
        <!--</pdf>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--import pdf from 'vue-pdf'-->
    <!--export default {-->
        <!--components: {-->
            <!--pdf-->
        <!--},-->
        <!--data() {-->
            <!--return {-->
                <!--// url: "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",-->
                <!--// url: "./../../../../2_1621054510_84GFpZeZwa.pdf",-->
                <!--url: "http://larabbs.test/uploads/2/graphics/2_1621054510_84GFpZeZwa.pdf",-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->

<!--<template>-->
    <!--<div>-->
        <!--{{currentPage}} / {{pageCount}}-->
        <!--<pdf-->
                <!--src="test/uploads/2/graphics/2_1620987279_fj33fUrfVc.pdf"-->
                <!--@num-pages="pageCount = $event"-->
                <!--@page-loaded="currentPage = $event"-->
        <!--&gt;</pdf>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->

    <!--import pdf from 'vue-pdf'-->

    <!--export default {-->
        <!--components: {-->
            <!--pdf-->
        <!--},-->
        <!--data() {-->
            <!--return {-->
                <!--currentPage: 0,-->
                <!--pageCount: 0,-->
            <!--}-->
        <!--}-->
    <!--}-->

<!--</script>-->