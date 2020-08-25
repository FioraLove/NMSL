<template>
    <div id="detail">
        <el-container>
            <el-main>
                <!-- 视频解析模块 -->
                <el-row :gutter="30">

                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div style="margin-top: 15px;margin:0 auto;width:60%;">
                           <el-input placeholder="请输入测试播放的视频地址" v-model="input_url" class="input-with-select">
                                <el-select v-model="select" slot="prepend" placeholder="请选择">
                                <el-option label="抖音" value="1"></el-option>
                                <el-option label="YouTube" value="2"></el-option>
                                <el-option label="其它" value="3"></el-option>
                                </el-select>
                            </el-input>
                            <br><br>
                            <el-input placeholder="非必填项： e.g.,https://s-sh-17-dplayercdn.oss.dogecdn.com/hikarunara.vtt" v-model="input_subtitle">
                                <template slot="prepend">字幕:</template><el-button slot="append" icon="el-icon-search" @click="parse()"></el-button>
                            </el-input>

                        </div>
                    </el-col>
                </el-row>
                <br>
                <br>    
                <!-- url视频播放测试页面 -->
                <el-row :gutter="30">
                    <!-- 视频播放 -->
                    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
                        <div id="dplayer" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"  element-loading-background="rgba(0, 0, 0, 0.8)"></div>
                    </el-col>
                    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                        <!-- 右侧滚动的集数 -->
                        <div class="follow">
                            <div><p class="star"><a href="javascript:;"><span><i class="el-icon-video-camera-solid"></i> 短视频解析</span></a></p></div>
                        </div>
                            <div class="outer-bar" >
                                <div class="tabBar">
                                    <div class="box">
                                        <el-row :gutter="10">
                                            <el-col>   <!-- Episode-data用来存每集的播放链接  -->
                                                <el-button plain  @click="open_douyin">抖音</el-button>
                                                <!-- <el-button v-for="(row,index) in 100" :key="index" style="margin:2px;width:5em;" episode-data="blob:https://www.bilibili.com/58baed53-247f-415d-9119-554d7a08a39f"  :ref="index">{{row}}</el-button> -->
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
            height:62vh;

        }  
        .tabBar{   /* 限制滚动条的高度 */
            /* background-color: #eee; */
            width:109.9%;
            height:65vh;
            overflow-y: scroll;
        }
        #dplayer{
            width: 100%;
            height: 73vh;
            margin: 0 auto;
        }
        .box{
            width: 103%;
            height: 65vh;
        }
    }
/**/
    .follow{
        width: 100%;
        height:5em;
        padding:0 0 0 6px
    }
    .follow div{
        width: 90%;
        border-radius: 6px;
        padding: 12px;
        background-color:rgba(177, 172, 172, 0.2);
        text-align: center;
        overflow: hidden;
    }
    .star{
        float:left;
        width:100%;
        height:1.86em;
        font-size: 1.5em;
        border-radius: 6px;
        cursor: pointer;
        background-color:#14abef;
        font-family: 'Courier New', Courier, monospace;
        margin: 0px;
    }
    .star:hover{
        float:left;
        width:100%;
        height:1.86em;
        font-size: 1.5em;
        border-radius: 6px;
        background-color:rgba(177, 172, 172, 0.3);
        font-family: 'Courier New', Courier, monospace;
        margin: 0px;
    }
    .follow div p a{
        text-align: center;
        text-decoration: none;
        font-size: 20px;
        position: relative;
        top:10px;
        color: whitesmoke;
        font-family: 'Courier New', Courier, monospace;
    }
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
                api:"https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
                input_url: '',                      // 输入的视频播放地址
                input_subtitle: '',                 // 输入的字幕加载地址
                select: '',
                url:"https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
                thum_pic: require("../assets/images/tifa.jpg"),                   // 视频封面
                subtitle:"https://s-sh-17-dplayercdn.oss.dogecdn.com/hikarunara.vtt",           // 字幕url
                
            }
        }, 
        mounted() {
            this.initDPlayer;                       // 初始化计算属性
        },
        computed: {
            // 视频播放器初始化函数
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
                // 获取当前点击元素的自定义的属性内容
                let data = el.target.getAttribute("episode-data");
                this.api = data;
                console.log(data);
            },
            parse:function () {
                if (this.input_url.length <= 20) {
                    // 使用默认的视频地址
                    this.url = "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4";
                } else {
                    this.url = this.input_url;
                }
                console.log(this.url);
                this.subtitle = this.input_subtitle;
            },
            open_douyin:function(){
                const h = this.$createElement;
                this.$notify({
                    title: '源代码',
                    message: h('b', { style: 'color: teal'}, 'https://github.com/FioraLove/Net-Spider/tree/develop/抖音/抖音最新版')
                })
            },

        },

        // 事件监听 
        watch: {
            url:{
                handler(newVal,oldVal){
                    this.initDPlayer;
                },
                deep:true
            }
        }
    }
</script>

