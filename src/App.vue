<template>
    <div id="app">
        <el-container style="height:100%">
            <!-- web端 -->
            <template v-if="deviceType == 'Desktop' ">
                <el-aside width="120px" style="background-color: rgb(238, 241, 246)">
                    <el-menu class="el-menu-vertical-demo" default-active="1">
                        <el-menu-item index="1">
                            <i class="el-icon-s-home"></i>
                            <span slot="title">
                                <el-tooltip class="item" effect="dark" content="个人主页" placement="right">
                                    <router-link to="/home">Home</router-link>
                                </el-tooltip>
                            </span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-s-marketing"></i>
                            <span slot="title">
                                <el-tooltip class="item" effect="dark" content="资讯热榜" placement="right">
                                    <router-link to="/news">News</router-link>
                                </el-tooltip>
                            </span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-reading"></i>
                            <span slot="title">
                                <el-tooltip class="item" effect="dark" content="热门漫画" placement="right">
                                    <router-link to="/comic">Comic</router-link>
                                </el-tooltip>
                            </span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-service"></i>
                            <span slot="title">
                                <el-tooltip class="item" effect="dark" content="天天动听" placement="right">
                                    <router-link to="/audio">Music</router-link>
                                </el-tooltip>
                            </span>
                        </el-menu-item>
                        <el-menu-item index="5">
                            <i class="el-icon-picture"></i>
                            <span slot="title">
                                <el-tooltip class="item" effect="dark" content="严选插画" placement="right">
                                    <router-link to="/pixiv">Pixiv</router-link>
                                </el-tooltip>
                            </span>
                        </el-menu-item>
                        <el-menu-item index="6">
                            <i class="el-icon-video-camera-solid"></i>
                            <span slot="title">
                                <el-tooltip class="item" effect="dark" content="短视频无水印解析" placement="right">
                                    <router-link to="/parse">Parse</router-link>
                                </el-tooltip>
                            </span>
                        </el-menu-item>
                        <el-menu-item index="7">
                            <i class="el-icon-warning"></i>
                            <span slot="title">
                                <el-tooltip class="item" effect="dark" content="抽象圣经" placement="right">
                                    <router-link to="/ndsl">NMSL</router-link>
                                </el-tooltip>
                            </span>
                        </el-menu-item>
                        <el-menu-item index="8">
                            <i class="el-icon-s-tools"></i>
                            <span slot="title">
                                <el-tooltip class="item" effect="dark" content="在线工具" placement="right">
                                    <router-link to="/tools">Tools</router-link>
                                </el-tooltip>
                            </span>
                        </el-menu-item>
                        <el-menu-item index="9">
                            <i class="el-icon-s-comment"></i>
                            <span slot="title">
                                <el-tooltip class="item" effect="dark" content="留言建议/问题咨询" placement="right">
                                    <router-link to="/comments">Tips</router-link>
                                </el-tooltip>
                            </span>
                        </el-menu-item>
                        <el-menu-item index="10">
                            <i class="el-icon-user-solid"></i>
                            <span slot="title">
                                <el-tooltip class="item" effect="dark" content="Hi~ o(*￣▽￣*)ブ guys~" placement="right">
                                    <router-link to="/admin">Pornhub</router-link>
                                </el-tooltip>
                            </span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>

                <el-main style="padding:0px;">
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive">
                            <router-link to="/home">Home</router-link>|
                            <router-link to="/comic">comic</router-link>|
                            <router-link to="/comic/category">comicCatalog</router-link>|
                            <router-link to="/comic/chapter">comicChapter</router-link>|
                            <router-link to="/hidden/play">play</router-link>|
                            <router-link to="/hidden/picture">picture</router-link>|
                            <router-link to="/comments">comments</router-link>|
                            <router-link to="/tools">tools</router-link>
                        </router-view>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive">
                    </router-view>
                </el-main>
            </template>

            <!-- mobile移动端 -->
            <template v-else>
                <el-header>
                    <div class="bg"></div>
                </el-header>
                <el-main style="padding:0px;">
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive">
                            <router-link to="/home">Home</router-link>|
                            <router-link to="/comic">comic</router-link>|
                            <router-link to="/comic/category">comicCatalog</router-link>|
                            <router-link to="/comic/chapter">comicChapter</router-link>|
                            <router-link to="/hidden/play">play</router-link>|
                            <router-link to="/hidden/picture">picture</router-link>|
                            <router-link to="/comments">comments</router-link>|
                            <router-link to="/tools">tools</router-link>
                        </router-view>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive">
                    </router-view>
                </el-main>

                <div class="main">
                    <div class="tabBar">
                        <template v-for='(row,index) in rows'>
                            <div class="box" :key="index">
                                <router-link :to="row.url"><p>{{row.content}}</p></router-link>
                            </div>
                        </template>
                        <div class="box">
                            <a href="/admin" @click="skip"><p style="color:#F90;font-weight:700;">Pornbar</p></a>
                        </div>
                    </div>
                </div>
            </template>
        </el-container>
    </div>
</template>

<script>
import {toast} from "./assets/js/toast.js";
export default {
    name: "APP",
    data() {
        return {
            deviceType: "",
            rows:[{
                    content:"主页",
                    url:"/home"
                },{
                    content:"热榜",
                    url:"/news"
                },{
                    content:"漫画",
                    url:"/comic"
                },{
                    content:"音乐",
                    url:"/audio"
                },{
                    content:"Pixiv",
                    url:"/pixiv"
                },{
                    content:"短视频解析",
                    url:"/parse"
                },{
                    content:"抽象圣经",
                    url:"/ndsl"
                },{
                    content:"在线工具",
                    url:"/tools"
                },{
                    url:"https://github.com/FioraLove",
                    content:"Github"
                },{
                    url: "/comments",
                    content:"留言板"
                },{
                    url:"http://wpa.qq.com/msgrd?v=3&uin=3434279505&site=qq&menu=yes",
                    content:"联系我"
                }
            ],
        };
    },
    created() {
        let deviceType = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|SymbianOS/i.test(navigator.userAgent) ? "Mobile" : "Desktop"; 
        // 绑定设备型号
        this.deviceType = deviceType;
    },
    methods: {
        // 阻止a标签跳转
        skip:function(e) {
            e = e || window.event;
            window.event ? window.event.returnValue = false : e.preventDefault();
            toast("因其特殊性，暂不对外开放，404哟！(ง •_•)ง \n  推荐: https://pixiviz.pwp.app/ \n https://www.acg-gov.com/");
        },
        send:function() {
            toast("因其特殊性，暂不对外开放，404哟！(ง •_•)ง \n  推荐: https://pixiviz.pwp.app/ \n https://www.acg-gov.com/");
        },
        
    },
    watch: {

    }
}
</script>

<style lang="less" scoped>
    @import "./assets/css/toast.css";
    [v-cloak]{
        display: none;
    }
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    @media screen and (max-width:600px){
        a{
            text-decoration: none;
            color: aliceblue;
        }
    }
    @media screen and (min-width:601px){
        a{
            text-decoration: none;
        }
    }

    #nav {
        padding: 30px;
        text-align: center;
        color: aquamarine;
        a {
            font-weight: bold;
            text-decoration: none;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
    .main{
        overflow: hidden;
        height: 5em;
        position: fixed;
        width: 100%;
        top: 0em;
        left: 0em;
    }
    .tabBar{
        background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
        padding: 10px 0;
        white-space: nowrap;/*文本不会换行，文本会在在同一行上继续*/
        overflow-y: auto;/*可滑动*/
    }
    .box{
        margin-left: 1em;
        margin-right: 6px;
        height: 2.5em;
        display: inline-block; /*行内块级元素*/
    }
    .box p{
        text-align: center;
        font-size: 18px;
        margin-top: 18px;
        font-family: 'Courier New', Courier, monospace;
    }
    .bg{
        width: 100%;
        height: 3.0em;
        overflow: hidden;   /*父元素添加overflow*/
    }
</style>
