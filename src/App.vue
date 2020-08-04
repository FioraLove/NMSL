<template>
    <div id="app" v-cloak>
            <div>
                <router-view>
                <div id="nav">
                    <router-link to="/">Home</router-link>|
                    <router-link to="/about">About</router-link>|
                    <router-link :to="{name : 'User', params : {id : 5}}">user/5</router-link> |
                    <router-link to="/page">Page</router-link> |
                    <router-link :to="{path : '/list', query : {id : 8, name:'chd'}}">user/List/query</router-link>|
                    <router-link :to="{name : 'List', params : {id : 10,name:'lmm'}}">user/List/params</router-link> |
                    <router-link :to="{name : 'User', params : {id : 5}}">params的子路由</router-link> |
                    <router-link to="/axiosdemo">axios测试</router-link> |


                </div>
                <!-- <router-view/>，用于渲染views目录下的页面 -->
                </router-view>
            </div>

    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="less">
[v-cloak]{
    display: none;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    // background-image: url("./assets/images/404.jpg");
    // background-repeat: repeat;
    // background-size:100%;
    // background-attachment: fixed;
    // background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
}

#nav {
  padding: 30px;
  text-align: center;
  color: aquamarine;


a {
    font-weight: bold;
    color: #2c3e50;

&.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
