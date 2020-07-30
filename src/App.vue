<template>
    <div id="app">
            <div>
                <div id="nav">
                    <router-link to="/">Home</router-link>|
                    <router-link to="/about">About</router-link>|
                    <router-link :to="{name : 'User', params : {id : 5}}">user/5</router-link> |
                    <router-link to="/page">Page</router-link> |
                    <router-link :to="{path : '/list', query : {id : 8, name:'chd'}}">user/List/8</router-link>|
                    <router-link :to="{name : 'List', params : {id : 10, name:'chd'}}">user/List/10</router-link> |
                </div>
                <!-- <router-view/>，用于渲染views目录下的页面 -->
                <router-view/>
            </div>

    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
