<template>
    <div>
        <h3>这里是List页面组件,msg传参 : {{msg}}</h3>
        <h3>这里是List页面组件，query方法查询id : {{this.$route.query.id}}</h3>
        <h3>这里是List页面组件，query方法查询name : {{this.$route.query.name}}</h3>
        <h3>这里是List页面组件2 ，params方法查询id: {{this.$route.params.id}}</h3>
    </div>
</template>

<script>
    export default {
        name: "List",
        data() {
            return {
                msg:"hello world"
            }
        },
        // props : {
        //     data : {
        //         type : String,
        //         default : 'no data'
        //     }
        
    }
</script>

<style scoped>

</style>