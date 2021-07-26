<template>
    <div class="protocol_body ban-select">
        <div v-html="agreement.content"></div>
    </div>
</template>

<script>
    import {getAgreement} from "../../../service/api";

    export default {
        name: "Agreement",
        data(){
            return{
                agreement: {},
            }
        },
        created(){
            getAgreement(this.$route.query.agreement_id).then(res=>{
                console.log(res);
                this.agreement = res;
            }).catch(err=>{
                console.log(err);
            })
        }
    }
</script>

<style scoped>
    .protocol_body {
        margin: 2vw 21vw;
    }

    .ban-select {
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>