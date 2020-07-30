<template>
    <div>
        <h1>hello world</h1>
        <h3>User Id : {{$route.query.id}}</h3>
        <h3>User Id : {{$route.params.id}}</h3>

        <router-view/>
    </div>
</template>

<style scoped>
    h3{
        text-align: center;
    }    
</style>

<script>
    export default {
        name: "User",
    }
</script>
