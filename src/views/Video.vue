<template>
    <div id="detail">
        <el-container>
            <el-main>
                <el-row :gutter="30">
                    <!-- 头像模块 -->
                    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
                        <div id="dplayer" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"  element-loading-background="rgba(0, 0, 0, 0.8)"></div>
                    </el-col>
                    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                        <!-- 右侧滚动的集数 -->
                            <div class="outer-bar" >
                                <div class="tabBar">
                                    <div class="box">
                                        <el-row :gutter="10">
                                            <el-col>   <!-- Episode-data用来存每集的播放链接  -->
                                                <el-button v-for="(row,index) in rows" :key="index" style="margin:2px;width:5em;" @click="jumpEpisode($event)" episode-data="blob:https://www.bilibili.com/58baed53-247f-415d-9119-554d7a08a39f"  :ref="index">{{row}}</el-button>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>


        
        <div class="footer">
            <div class="bk"><hr>
                <p>本站不提供任何视听上传服务，所有内容均来自各分享站点所提供的公开引用资源。</p>
                <p>若收录节目无意侵犯了贵司版权，请联系并告知删除，谢谢</p>
                <p>Copyright © 2020. All Rights Reserved</p>
                <div>
                    <a href="https://AhriLove.top" target="_self" rel="noopener noreferrer"><img src="https://cdn.jsdelivr.net/gh/FioraLove/Images/D:/data/imagesaaa.png" alt="AhriLove"></a>
                </div>
            </div>
        </div>
    </div>
</template>



<!--- vuecli3组件内部引入第三方的css文件只在当前组件生效的办法 --->
<style scoped>
    @import "../assets/css/DPlayer.min.css";


    /* mobile端：max-width:480 即表示当宽度小于480时，才会使用多媒体查询*/
    @media screen and (max-width:480px){
        .outer-bar{
            overflow: hidden;
            width: 103%;
            height: 45vh;
        }        
        .tabBar{   /* 限制滚动条的高度 */
            margin-top: 2em;
            background-color: #eee;
            width:109%;
            height:40vh;
            overflow-y: scroll;
        }
        #dplayer{
            width: 100%;
            height: 50vh;
            margin: 0 auto;
        }
    }


    /* PC端： 宽度大于481时*/
    @media screen and (min-width:481px){   
        .outer-bar{
            overflow: hidden;
            width: 103%;
            height:73vh;

        }  
        .tabBar{   /* 限制滚动条的高度 */
            background-color: #eee;
            width:109.9%;
            height:75vh;
            overflow-y: scroll;
        }
        #dplayer{
            width: 100%;
            height: 73vh;
            margin: 0 auto;
        }
        .box{
            width: 103%;
            height: 73vh;
        }
    }
/**/

    .footer{
        margin-top: 3em;
    }
    .footer p{
        font-size: 14px;
        color: black;
        font-family: "Microsoft YaHei", "微软雅黑", "STHeiti", "WenQuanYi Micro Hei", SimSun, sans-serif;
        text-align: center;
    }
    .footer div{
        text-align: center;
        margin-top: -10px;
    }
    .footer div img{
        height: 3em;
    }
    .bk{
        padding-left: 2em;
        padding-right: 2em;
        color: bisque;
    }
</style>



<script scoped>
    import DPlayer from "../assets/js/DPlayer.min.js";
    export default {
        name: "User",
        data() {
            return {
                loading:true,                       // 加载动画
                api:"",
                jishu:"blob:https://www.bilibili.com/58baed53-247f-415d-9119-554d7a08a39f",
                url:"https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
                thum_pic: require("../assets/images/tifa.jpg"),                   // 视频封面
                subtitle:"https://s-sh-17-dplayercdn.oss.dogecdn.com/hikarunara.vtt",           // 字幕url
                rows:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,101,102,103,104,105,106],
            }
        },
        mounted() {
            this.initDPlayer;
        },
        computed: {
            initDPlayer:function(){
                const dp = new DPlayer({
                    container: document.getElementById('dplayer'),
                    autoplay: false,
                    theme: '#FADFA3',
                    loop: true,
                    lang: 'zh-cn',
                    screenshot: true,
                    hotkey: true,
                    preload: 'metadata',
                    // 左上角展示的logo
                    logo:  require("../assets/images/video_logo.png"),
                    volume: 0.5,
                    mutex: true,
                    video: {
                            url:this.url,
                        defaultQuality: 0,

                        pic: this.thum_pic,
                        thumbnails: "",
                        type: 'auto',
                    },
                    // 字幕
                    subtitle: {
                        url: this.subtitle,
                        type: 'webvtt',
                        fontSize: '20px',
                        bottom: '8%',
                        color: '#b7daff',
                    },
                    contextmenu: [
                        {
                            text: '二次作者',
                            link: 'AhriLove·牛蛙点点'
                        }
                    ],
                    highlight: [{
                            time: 20,
                            text: '这是第 20 秒',
                        },{
                            time: 120,
                            text: '这是 2 分钟',
                        }
                    ]
                });
                this.loading=false;
            }
        },
        methods: {
            jumpEpisode:function (el) {
                
                // 获取当前点击元素的文本内容
                // let data = el.target.innerText;

                // 获取当前点击元素的自定义的属性内容
                let data = el.target.getAttribute("episode-data");
                this.api = data;
                console.log(data);
            }
        }
    }
</script>

