<template>
    <div class="comic-category">
        <el-container>
            <el-main>
                <!-- 漫画详细页 -->
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div class="outBox">
                            
                                <div class="comic-head-pc">
                                    <div class="cover"><img v-lazy="cover"></div>
                                    <div class="bar-right">
                                        <template>
                                        <div class="title"><b>{{author_info.title}}</b></div>
                                         </template>
                                        <div class="introduction">
                                            <p class="author"> 作者：{{author_info.author}}</p><br>
                                            <span class="state" v-if="author_info.state == '1'">状态：连载中</span>
                                            <span class="state" v-if="author_info.state == '0'">状态：已完结</span>
                                            <span class="category">题材：{{author_info.location}}</span>
                                            <span class="update_time">更新时间：{{update_time}}</span><br>
                                            <span class="update">最新：  <b>{{update}}</b></span><br>
                                        </div>
                                        <div class="info">
                                            <span>{{author_info.content}}</span>
                                        </div>
                                    </div>
                                </div>
                           
                        </div>
                    </el-col>
                </el-row>

                <br><hr><br>

                <el-row :gutter="10">
                    <!-- 空白模块 -->
                    <template v-if="flag">
                        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                            <div class="ad">ad广告区</div>
                        </el-col>
                    </template>


                    <!-- 中间的图片展示模块 -->
                    <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
                        
                        <div class="outer" v-loading="loading">
                            <div class="inner">
                                <div class="pic-box" v-for="(row,index) in rows" :key="index"><img v-lazy="row"></div>
                            </div>
                        </div>
                    </el-col>

                    <!-- 章节模块 -->
                    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                        <div class="follow">
                            <div><p class="star"><a href="javascript:;"><span><i class="el-icon-reading"></i>开始阅读</span></a></p></div>
                        </div>
                        <div class="chapter-lists">
                            <div class="inBox">
                                <ul>
                                    <li v-for="(lis,index) in chapter_arr" :key="index">
                                        <p @click="get_image($event)" :data-item="index">{{lis.chapter_title}}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>

        <!-- 页脚标签 -->
        <div class="footer">
            <div class="bk"><hr></div>
            <p>本站的资源由网络第三方视频类网站收集，不提供任何视听上传服务，内容均来自各分享站点所提供的公开引用资源。</p>
            <p>若本站收录的节目无意侵犯了贵司版权，请给网页底部邮箱地址来信，我们会及时处理和回复，谢谢</p>
            <p>Copyright © 2019-2020. All Rights Reserved. 站长统计</p>
            <div>
                <a href="https://AhriLove.top" target="_self"><img src="https://cdn.jsdelivr.net/gh/FioraLove/Images/D:/data/imagesaaa.png" alt="AhriLove"></a>
            </div>
        </div>
    </div>
</template>


<script>
import { Base64 } from 'js-base64';
export default {
    data() {
        return {
            sid:this.$route.query.sid,
            cover:this.$route.query.cover,
            update:this.$route.query.update,
            update_time:this.$route.query.time,
            author_info:{},                         // 作者简介信息组
            lists:[],
            rows:[],
            flag:true,
            loading:true,
            chapter_arr:[],                 // 章节id
        }
    },
    
    mounted() {
        this.isPC();
        this.getContent();
        this.getInfo;
    },

    computed: {
        // 发送简介Ajax请求
        getInfo:function(){
            let app = this;
            axios({
                url: this.FACTURL.baseUrl+"/nmsl/api/comic/author",
                method:"get",
                params:{
                    uid: Base64.encode(this.sid)
                }
            })
            .then(function(response){
                if(response.status == 200){
                    app.author_info = response.data.results;
                }else{
                    app.author_info = {};
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },

    methods: {
        isPC:function(){  
            let userAgentInfo = navigator.userAgent;
            let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];  
            let flag = true;  
            for (let v = 0; v < Agents.length; v++) {  
                if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
            }  
            this.flag = flag;
        },
        // 发送Ajax请求
        getContent:function(){
            let app = this;
            axios({
                url: this.FACTURL.baseUrl+"/nmsl/api/comic/chapter",
                method:"get",
                params:{
                    uid: Base64.encode(this.sid),
                    offset:'0',
                    limit:'800'
                }
            })
            .then(function(response){
                app.loading = true;
                if(response.status == 200 && response.data.count != 0){
                    
                    let xe9527 = (response.data.results[0]["images_url"]).split("'");
                    let arr = [];
                    for (let index = 1; index < xe9527.length; index+=2) {
                        // 由于数据库数据结构设置错误，导致无法使用json
                        arr.push(xe9527[index]);
                    }
                    if (arr.length<1) arr = JSON.parse(response.data.results[0]["images_url"]);
                    app.rows = arr;
                    app.chapter_arr = response.data.results;
                }else{
                    app.chapter_arr = [];
                    app.rows = ["https://p.pstatp.com/origin/ffbf0000e0493d37284c"];
                }
                app.loading = false;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        get_image:function(el){
            this.loading = true;
            // 获取当前点击元素的属性值
            let a = parseInt(el.target.dataset.item);
            // let a = parseInt(el.target.getAttribute("data-item"));

            let b = (this.chapter_arr[a]["images_url"]).split("'");
            if(b.length<=1){
                this.rows = JSON.parse(this.chapter_arr[a]["images_url"]);
            }else{
                let arr = [];
                for (let index = 1; index < b.length; index+=2){
                    // 由于数据库数据结构设置错误，导致无法使用json
                    arr.push(b[index]);
                }
                this.rows = arr;
            }
            this.loading = false;
            
        }
    },
    watch: {
        sid: {
            deep: true,
            handler: function (newVal, oldVal) {
                this.getInfo;
            }
        },
    },
    
}
</script>

<style scoped>
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


    .introduction .state{
        font-size: 13px;
        color: #999;
        display: inline-block;
        margin-right:2em;
    }
    .introduction .update{
        font-size: 13px;
        color: #252525;
        display: inline-block;
        margin-right:1em;
        margin-top:12px;
    }
    .introduction .update_time{
        font-size: 13px;
        color: #999;
        display: inline-block;
    }
    .introduction .category{
        font-size: 13px;
        color: #999;
        display: inline-block;
        margin-right:2em;
    }
    .info{
        margin:8px 0px;
        font-size: 13px;
        color: #666;
        font-family: "PingFang SC",'Microsoft YaHei';
        line-height:20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .comic-head-pc{
        margin: 0 auto;
        width:100%;
    }

    /* moblie */
    @media screen and (max-width:506px){
        .comic-head-pc .cover{
            float: left;
            height: 100%;
            
        }
        .comic-head-pc .bar-right{
            float: left;
            width: 40vw;
            height: 100%;
            margin-left: 1em;
        }
        .comic-head-pc .cover img{
            width: 160px;
            height:213px;
            border-radius: 6px;
            box-shadow: 10px 8px 5px rgba(177, 172, 172, 0.6)
        } 
        .introduction .author{
            font-size: 12px;
            margin:0px;
        }
        .bar-right .title{
            font-size:1em;
            margin-top:8px;
            margin-bottom: 6px;
            font-family: 'Courier New', Courier, monospace;
        }              
    }
    /* PC */
    @media screen and (min-width:809px){
        .comic-head-pc .cover{
            float: left;
            height: 100%;
            margin-left:16vw;
        }
        .comic-head-pc .bar-right{
            float: left;
            width: 52vw;
            height: 100%;
            margin-left: 2em;
        }
        .comic-head-pc .cover img{
            width: 160px;
            border-radius: 6px;
            box-shadow: 10px 8px 5px rgba(177, 172, 172, 0.6)
        }
        .introduction .author{
            font-size: 1em;
            margin:0px;
        }      .bar-right .title{
        font-size:1.5em;
        margin-top:8px;
        margin-bottom: 6px;
        font-family: 'Courier New', Courier, monospace;
    }       
    }

    @media screen and (min-width:507px) and (max-width: 808px) {
        .comic-head-pc .cover{
            float: left;
            height: 100%;
            margin-left:3vw;
        }
        .comic-head-pc .bar-right{
            float: left;
            width: 48vw;
            height: 100%;
            margin-left: 2em;
        }
        .comic-head-pc .cover img{
            width: 160px;
            border-radius: 6px;
            box-shadow: 10px 8px 5px rgba(177, 172, 172, 0.6)
        }  
        .introduction .author{
            font-size: 1em;
            margin:0px;
        }
            .bar-right .title{
        font-size:1.5em;
        margin-top:8px;
        margin-bottom: 6px;
        font-family: 'Courier New', Courier, monospace;
    }           
    }



    .outer{
        width:100%;
        background-color: transparent;
        overflow: hidden;
        height: 95vh;
        cursor: pointer;
        box-shadow: 10px 10px 5px rgba(177, 172, 172, 0.6);
        border-radius: 8px;
    }
    .outer .inner{
        width:105%;
        overflow-y:scroll;
        height: 98vh;
    }

    .chapter-lists{
        width:100%;
        overflow: hidden;
        height: 85vh;
    }
    .chapter-lists .inBox{
        width:106.6%;
        overflow-y:scroll;
        height: 88vh;
    }

    .pic-box img{
        width: 100%;
    }
    .footer p{
        font-size: 14px;
        color: black;
        font-family: 'Courier New', Courier, monospace;
        text-align: center;
    }
    .footer div{
        text-align: center;
        margin-top: -10px;
    }
    .footer div img{
        height: 3em;
    }
    .ad{
        width:100%;
        height: 95vh;
    }
    .comic-category{

        background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
    }
    ul{
        padding: 5px;
        cursor: pointer;
    }
    li{
        list-style: none;
        width:100%;
        height:5.8vh;
        border-radius: 8px;
        background-color:#EBEEF5;
    }
    li:hover{
        list-style: none;
        width:100%;
        height:5.8vh;
        border-radius: 5px;
        background-color: rgba(255, 99, 71, 0.5);

    }
    li p{
        margin:6px 6px 6px 12px;
        font-size: 13px;
        position: relative;
        color: #252525;
        top:13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    li p:hover{
        margin:6px 6px 6px 12px;
        font-size: 14px;
        position: relative;
        color: #252525;
        top:13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

</style>