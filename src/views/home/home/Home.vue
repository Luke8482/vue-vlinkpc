<template>
    <div>
        首页（课程中心页）
        <button v-on:click="logout">退出登录</button>
    </div>

</template>

<script>
    import {getCategories,getCurrentUser,logins} from './../../../service/api/index'


    export default {
        name: "Home",

        methods: {
          async logout () {
              try {
                  await this.$store.dispatch('logout')
              } catch (err) {

              }
          }  
        },
        

        created() {
            // 请求网络数据
            getCurrentUser().then((response) => {
                console.log(response);
            }).catch(error => {
                //todo...
                console.log(1);
            });

        }
    }
</script>

<style scoped>

</style>