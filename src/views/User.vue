<template>
    <div>
        <h1>hello world</h1>
        <h3>User Id : {{$route.query.id}}</h3>
        <h3>User Id : {{$route.params.id}}</h3>
        <!-- 在 User.vue 这个父路由，需要使用视图渲染加载子路由 -->
        <router-view></router-view>
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
