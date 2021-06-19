<template>
    <div>
        <div class="btn">意见反馈</div>
        <div class="btn" style="margin-left: 1.0417vw;" @click="logout">安全退出</div>
    </div>
</template>

<script>
    export default {
        name: "logoutButton",
        methods: {
            async logout () {
                try {
                    await this.$store.dispatch('logout')
                } catch (err) {

                }
            }
        },
    }
</script>

<style scoped>
    .btn {
        color: #1fae9d;
        padding: .3125vw 1.3542vw;
        font-size: .625vw;
        border-radius: .8333vw;
        border: 1px solid #1fae9d;
        display: inline-block;
        cursor: pointer;
        font-weight: 700;
    }
</style>