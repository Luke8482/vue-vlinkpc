<template>
    <div style="height: 100%; width: 100%; position: relative; z-index: 2;">
        <router-view/>
        <changeVersion/>
    </div>


</template>

<script>
    import changeVersion from './../learn/components/changeVersion'
    export default {
        name: "DashBoard",
        components:{
            changeVersion
        },
    }
</script>

<style scoped>

</style>