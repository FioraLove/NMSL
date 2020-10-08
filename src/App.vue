<template>
    <div id="app" v-cloak>
        <keep-alive>
            <router-view>
                <div id="nav">
                    <router-link to="/">Home</router-link>|
                    <router-link to="/comic">comic</router-link>|
                    <router-link to="/nmsl/hidden/video/play">play</router-link>|
                    <router-link to="/nmsl/hidden/picture">picture</router-link>|
                    <router-link to="/comments">comments</router-link>|
                    <router-link to="/tools">tools</router-link>|
                    <router-link to="/tools/json">json</router-link>|
                </div>
            <!-- <router-view/>，用于渲染views目录下的页面 -->
            </router-view>
        </keep-alive>
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
