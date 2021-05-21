<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>

    <!--統一引入editor.md 樣式-->
    <link rel="stylesheet" href="/editor.md/css/editormd.min.css">
    <link rel="stylesheet" href="/editor.md/css/google_code_prettify_themes/vibrant-ink.min.css">
  </div>
</template>

<script>

  export default {
      provide(){
          return {
              reload: this.reload,
          }
      },

      data() {
          return {
              isRouterAlive: true
          }
      },

      methods: {
          reload() {
              this.isRouterAlive =  false;
              this.$nextTick(function (){
               this.isRouterAlive = true;
              })
          }
      }
  }


</script>

<style lang="less">
  /*::-webkit-scrollbar{background-color:transparent;width:10px}*/
  /*::-webkit-scrollbar-thumb{background-color:#9aa5ad;border-radius:.15vw;width:10px}*/


</style>

