<template>
    <!--组件有且只有一个根标签-->
    <div class="home">
        <div class="bg">
            <p>家人们~~~🤕🤕🤕，抽象圣经，最简单的嘴臭，最极致的享受</p>
        </div>
        <el-container style="padding: 1em;">
            <el-header style="height:20px;width:100%;">
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div class="top-box"></div>
                    </el-col>
                </el-row>
            </el-header>
            <el-container>
                <!-- <el-aside width="200px" id="nav">
                    <router-link to="/">Home</router-link><br>
                    <router-link to="/about">About</router-link><br>
                    <router-link :to="{name : 'User', params : {id : 5}}">user/5</router-link> <br>
                    <router-link to="/page">Page</router-link> <br>
                    <router-link :to="{path : '/list', query : {id : 8, name:'chd'}}">query</router-link><br>
                    <router-link :to="{name : 'List', params : {id : 10,name:'lmm'}}">params</router-link> <br>
                    <router-link :to="{name : 'User', params : {id : 5}}">params的子路由</router-link> <br>
                    <router-link to="/loveword">嘴臭生成器</router-link> <br>
                </el-aside> -->
                <el-main>
                    <!---gutter表示栅栏间隔-->
                    <el-row :gutter="30">
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for='(row,index) in rows' :key="index" style="margin-top:20px;">
                            <el-card :body-style="{ padding: '0px' }" shadow="hover">
                                <img :src="row.pic" class="image" data-action="zoom">
                                <div style="padding: 14px;">
                                    <span><b>{{row.title}}</b></span>
                                    <div class="bottom clearfix">
                                        <span class="subtitle">{{row.contents}}</span>
                                        <!-- <router-link to="/loveword"><el-button type="success" round>查看<i class="el-icon-view el-icon--right"></i></el-button></router-link> -->
                                        <el-button type="text" class="button" ><router-link :to="row.url">查看<i class="el-icon-view el-icon--right"></i></router-link></el-button>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-main>
            </el-container>
        </el-container>    
    </div>
</template>

<script>
// 组件 .vue 文件：模板(template) + 脚本(scpirt) + 样式(style)
// 导入自定义的组件
import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'Home',
    components: {
    HelloWorld
    },
    data(){
        return {
            rows:[{
                title:"嘴臭生成器",
                pic:"https://cdn.jsdelivr.net/gh/FioraLove/Images/1a97ae8b1294b307dced650f396fc22e.jpg",
                contents:"#最简单的嘴臭，最极致的享受#",
                url:"/loveword"
            },{
                title:"浮生日记",
                pic: require("../assets/images/nmsl.jpeg"),
                contents:"谎言不会伤人，真相才是快刀🔪",
                url:"/about"
            },{
                title:"雪之下雪乃",
                pic: require("../assets/images/nmsl.jpeg"),
                contents:"西蒂蒙，冲🚴🚴",
                url:"/user"
            },{
                title:"NMSL",
                pic: require("../assets/images/nmsl.jpeg"),
                contents:"命数如织，当为磐石",
                url:"/ndsl"
            }]
        }
    },
    methods: {
        goUser:function(id){
            this.$router.push({
                name : 'User',
                params : {
                    id
                }
            })
        },
        goUser2:function(id,name){
            this.$router.push({
                path:"/list",
                query:{
                    id,
                    name
                }
            })
         },
    }
}
</script>

<style lang="less" scoped>

    body{
        margin: 0;
        padding: 0;
    }
    .subtitle{
        font-size: 15px;
    }
    .bg{
        width: 100%;
        height: 4em;
        background-color: black;
        overflow: hidden;   /*父元素添加overflow*/
    }
    .bg p{
        text-align: center;
        color: white;
        font-size: 0.85em;
        margin-top: 1.85em;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        
    }
    .top-box{
        width:100%;
        height :5vh;
        background-image: linear-gradient(to top, #0ba360 0%, #3cba92 80%);
    }
    .time {
        font-size: 13px;
        color: #999;
    }
    
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    // .clearfix:before, .clearfix:after {
    //     display: table;
    //     content: "";
    // }
    
    // .clearfix:after {
    //     clear: both
    // }
    // #nav {
    //     font-size: 1em;
    //     text-align: left;
    //     padding: 30px 0px 0px 30px;
    //     color: aquamarine;
    //     width: 2em;

    // a {
    //     font-weight: bold;
    //     color: #2c3e50;

    // &.router-link-exact-active {
    //     color: #42b983;
    //     }
    // };
    // .clearfix {
    //     text-decoration: none;
    //     cursor: pointer;
    // }
    button{
        cursor: pointer;
        text-decoration: none;
    }


</style>
