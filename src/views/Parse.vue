<template>
    <div id="detail">
        <el-container>
            <el-main>
                <!-- url视频播放测试页面 -->
                <el-row :gutter="30">
                    <!-- 视频播放 -->
                    <el-col :xs="24" :sm="17" :md="17" :lg="17" :xl="17">
                        <div id="dplayer" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"  element-loading-background="rgba(0, 0, 0, 0.8)"></div>
                    </el-col>
                    <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                        <!-- 右侧滚动的集数 -->
                        <div class="follow">
                            <div><p class="star"><a href="javascript:;"><span><i class="el-icon-video-camera-solid"></i>短视频源码</span></a></p></div>
                        </div>
                            <div class="outer-bar" >
                                <div class="tabBar">
                                    <div class="box">
                                        <el-row :gutter="5">
                                            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                                                <el-button plain type="success" @click="open_douyin">抖音</el-button>
                                            </el-col>   
                                            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                                                <el-button plain type="success" @click="open_douyin" disabled>YouTube</el-button>
                                            </el-col>   
                                            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                                                <el-button plain type="success" @click="open_bili">哔哩哔哩</el-button>
                                            </el-col>   
                                            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" v-for="(row,index) in datas" :key="index">
                                                <el-button plain type="success" @click="open_parse" :key="index">{{ row }}</el-button>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </div>
                    </el-col>
                </el-row>
                <br><br>
                <!-- 视频解析模块 -->
                <el-row :gutter="30">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div style="margin:0 auto;width:100%;">
                            <el-alert title="视频测试播放" type="success" center show-icon
                                description="将视频地址添加到输入框中，某些视频地址若存在跨域问题，则无法播放">
                            </el-alert>                            
                            <el-input placeholder="请输入测试播放的视频地址" v-model="input_url" class="input-with-select" clearable>
                                <template slot="prepend">视频:</template><el-button slot="append" type="success" icon="el-icon-video-play" @click="play()"></el-button>
                            </el-input>
                        </div>
                        <br><br>
                        <div style="margin-top: 15px;margin:0 auto;width:100%;">
                            <el-alert
                                title="视频解析接口"
                                type="warning"
                                center
                                show-icon
                                description="打开短视频APP，点开某个视频，点击右下角分享按钮，在分享弹框中点击复制链接或通过分享到微信QQ等获取分享链接">
                            </el-alert>

                           <el-input placeholder="请输入分享链接的视频地址(bilibili直接输入视频bv号)" v-model="input_api" class="input-with-select" clearable>
                                <el-select v-model="select" slot="prepend" placeholder="请选择">
                                    <template v-for="(name, index) in rows">
                                        <el-option v-if="name == 'YouTube' ||  name == '抖音' " :label="name" :value="index+1" :key="index" disabled></el-option>
                                        <el-option v-else :label="name" :value="index+1" :key="index"></el-option>
                                    </template>
                                    <el-option label="其它" value="99"></el-option>
                                </el-select>
                                <el-button slot="append" icon="el-icon-search" @click="parse()"></el-button>
                            </el-input>
                            
                            <br><br>
                            <el-input type="textarea" :rows="2"  placeholder="解析结果"  v-model="textarea"> 
                            </el-input>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
        
        <div class="footer">
            <div class="bk"><hr>
                <p>本站不提供任何视听上传服务，所有内容均来自各分享站点所提供的公开引用资源。</p>
                <p>若收录节目无意侵犯了贵司版权，请联系并告知删除，谢谢</p>
                <p>Copyright © 2019-{{nowYear}}. All Rights Reserved</p>
                <div>
                    <a href="https://AhriLove.top" target="_self" rel="noopener noreferrer"><img src="https://cdn.jsdelivr.net/gh/FioraLove/Images/D:/data/imagesaaa.png" alt="AhriLove"></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script scoped>
    import DPlayer from "../assets/js/DPlayer.min.js";
    import {toast} from "../assets/js/toast.js";
    import { Base64 } from 'js-base64';
    export default {
        name: "Parse",
        data() {
            return {
                nowYear:new Date().getFullYear(),
                loading: false,                       // 加载动画
                input_url: '',                      // 输入的视频播放地址
                url: "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
                thum_pic: require("../assets/images/beautiful.jpg"),                   // 视频封面
                textarea:"",
                input_api:"",
                api:"",
                select:"",
                rows: [ "抖音", "YouTube", "哔哩哔哩", "好看视频","六间房","全民小视频","陌陌视频","梨视频","美拍","场库短视频",
                    "微博视频","最右","皮皮虾","AcFun","快手","全民K歌","西瓜视频","秒拍","小红书","小咖秀","轻视频","开眼视频","腾讯微视","火山短视频","虎牙视频",
                    "抖音Ⅱ","绿洲视频","皮皮搞笑","Vue Vlog","Instagram","比心陪练","逗拍","Before避风","酷秀短视频"],
                datas: ["好看视频","六间房","全民小视频","陌陌视频","梨视频","美拍","场库短视频","微博视频","最右","皮皮虾","AcFun",
                    "快手","全民K歌","西瓜视频","秒拍","小红书","小咖秀","轻视频","开眼视频","腾讯微视","火山短视频","虎牙视频","抖音Ⅱ","绿洲视频","皮皮搞笑","Vue Vlog",
                    "Instagram","比心陪练","逗拍","Before避风","酷秀短视频"],
            }
        }, 
        mounted() {
            // 动态创建script标签，引入外部文件
            // 引入hls.min.js文件
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://cdn.jsdelivr.net/npm/hls.js@0.14.12/dist/hls.min.js';
            document.getElementsByTagName('head')[0].appendChild(script);
            // 引入flv.min.js文件
            let flv_script = document.createElement('script');
            flv_script.type = 'text/javascript';
            flv_script.src = 'https://cdn.jsdelivr.net/npm/flv.js@1.5.0/dist/flv.min.js';
            document.getElementsByTagName('head')[0].appendChild(flv_script);

            // 初始化计算属性
            this.initDPlayer;
        },

        computed: { 
            // 视频播放器初始化函数
            initDPlayer:function(){
                // 判斷url的格式
                let video = {};
                if((this.url).toLowerCase().indexOf("m3u8") > -1){
                    video = {
                        url: this.url,
                        type: 'hls',
                        defaultQuality: 0,
                        pic: require("../assets/images/seraphine3.jpg"),
                        thumbnails: "",
                    };
                }else if(/flv/.test((this.url).toLowerCase())){
                    video = {
                        url: this.url,
                        type: 'flv',
                        defaultQuality: 0,
                        pic: require("../assets/images/master.jpg"),
                        thumbnails: "",
                    };
                }else{
                    video = {
                        url:this.url,
                        defaultQuality: 0,
                        pic: this.thum_pic,
                        thumbnails: "",
                        type: 'auto',
                    };
                }

                const dp = new DPlayer({
                    container: document.getElementById('dplayer'),
                    autoplay: false,
                    theme: '#FADFA3',
                    loop: false,
                    lang: 'zh-cn',
                    screenshot: true,
                    hotkey: true,
                    preload: 'metadata',
                    // 左上角展示的logo
                    logo:  require("../assets/images/video_logo.png"),
                    volume: 0.5,
                    mutex: true,
                    video: video
                });
                this.loading=false;
            } 
        },
        methods: {
            parse:function(){
                // 构建headers签名算法
                let d = new Date();
                let timer = ((d.getTime())/1000).toFixed();
                // 先清空文本域
                this.textarea = "";
                let vm = this;
                if(this.select == "" || this.input_api == ""){
                    toast("请选择解析的视频类型和地址");
                }else{
                    // 开启加载提示
                    this.$notify({
                        title: 'Loading',
                        message: '短视频解析中，请耐心等待',
                        position: 'bottom-right',
                        type: 'success'
                    });
                    // 定义axios的config参数配置
                    let config = {};

                    if (this.select == 30) {
                        // 30 代表Instagram
                        config = {
                            url: "https://tenapi.cn/ins/",
                            method:"get",
                            params:{
                                url: String(this.input_api).trim(),
                            }
                        }
                    } else {
                        // 使用自定义的api
                        config = {
                            url: this.FACTURL.baseUrl+"/nmsl/api/video/parse/",
                            method:"post",
                            data:{
                                category: Base64.encode(this.select),
                                url:this.input_api,
                                time: timer,
                                signature: Base64.encode(this.FACTURL.signature+"&"+timer)
                            },
                            headers: {
                                "content-type": "multipart/form-data"
                            }
                        }
                    }
                    axios(config)
                    .then(function(response){
                        if(response.status == 200){
                            if (vm.select == 30) {
                                vm.textarea = JSON.stringify(response.data);
                            } else {
                                vm.textarea = response.data;
                            }
                        }else{
                            vm.textarea = "";
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                }
            },
            play:function () {
                if (this.input_url == "" || this.input_url == null) {
                    toast("视频地址不可为空");
                } else if(/^(https?:\/\/)/.test(this.input_url) == false){
                    toast("请检查视频地址正确性");
                }else {
                    this.url = this.input_url;
                }
            },
            open_douyin:function(){
                const h = this.$createElement;
                this.$notify({
                    title: '抖音源代码',
                    message: h('b', { style: 'color: teal'}, 'https://github.com/FioraLove/Net-Spider/tree/develop/抖音/抖音最新版')
                })
            },
            open_bili:function(){
                const h = this.$createElement;
                this.$notify({
                    title: '哔哩哔哩源代码',
                    message: h('b', { style: 'color: teal'}, 'https://github.com/FioraLove/Net-Spider/blob/develop/selenium登录哔哩哔哩/哔哩哔哩视频下载/download_method_3.py')
                })
            },
            open_parse:function(){
                const h = this.$createElement;
                this.$notify({
                    title: '视频解析源代码',
                    message: h('b', { style: 'color: teal'}, 'https://github.com/FioraLove/Net-Spider/tree/develop/video-parse')
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



<!--- vuecli3组件内部引入第三方的css文件只在当前组件生效的办法 --->
<style scoped>
    @import "../assets/css/DPlayer.min.css";
    @import "../assets/css/toast.css";
    .box button{
        width:90%;
        text-align: center;
        margin-top: 3px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    
    /* mobile端：max-width:480 即表示当宽度小于480时，才会使用多媒体查询*/
    @media screen and (max-width:480px){
        .outer-bar{
            overflow: hidden;
            width: 100%;
            height: 45vh;
        }        
        .tabBar{   /* 限制滚动条的高度 */
            margin-top: 2em;
            background-color: #eee;
            width:100%;
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
            width: 96%;
            height:62vh;

        }  
        .tabBar{   /* 限制滚动条的高度 */
            /* background-color: #eee; */
            width:103%;
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
    .el-select .el-input {
        width: 130px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>


