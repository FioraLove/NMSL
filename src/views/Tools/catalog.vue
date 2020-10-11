<template>
    <div class="comic-category" :key="sid">
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
                    <!-- <template v-if="flag">
                        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                            <div class="ad">ad广告区</div>
                        </el-col>
                    </template> -->


                    <!-- 中间的图片展示模块 -->
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div class="card">
                            <div class="outer" v-loading="loading">
                                <div class="inner">
                                    <div class="follow">
                                        <div><p class="star"><a href="javascript:;"><span><i class="el-icon-reading"></i>开始阅读</span></a></p></div>
                                    </div>
                                    <el-row :gutter="10">
                                        <el-col :xs="8" :sm="8" :md="6" :lg="4" :xl="4" v-for="(lis,index) in chapter_arr" :key="index">
                                            <router-link :to="{path : '/comic/chapter', query : {sid : lis.uid, cid: lis.cid}}">
                                                <el-button type="danger" plain :title="lis.chapter_title">{{lis.chapter_title}}</el-button>
                                            </router-link>
                                        </el-col>
                                    </el-row>
                                        <div class="block">
                                            <el-pagination
                                            @current-change="handleCurrentChange"
                                            :current-page.sync="currentPage"
                                            :page-size="page_size"
                                            layout="prev, pager, next"
                                            :pager-count="pager_count"
                                            :total="count">
                                            </el-pagination>
                                        </div>
                                </div>
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
    name:"Category",
    data() {
        return {
            sid:"",
            cover:"",
            update:"",
            update_time:"",
            author_info:{},                         // 作者简介信息组
            lists:[],
            rows:[],
            flag:true,
            loading:true,
            chapter_arr:[],                 // 章节id
            page_size: 36,
            pager_count:5,                  // 页码按钮的数量，当总页数超过该值时会折叠
            count:0,                    // 查询返回的数据总数
            currentPage:1,             // 当前页数
        }
    },
    created() {
        this.sid=this.$route.query.sid;
        this.cover=this.$route.query.cover;
        this.update=this.$route.query.update;
        this.update_time=this.$route.query.time;
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
                url: this.FACTURL.baseUrl+"/nmsl/api/comic/author/",
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
        // 页码改变触发事件
        handleCurrentChange:function(val){
            // 点击页码跳转时，执行改计算属性
            this.getContent();
        },
        // 发送Ajax请求
        getContent:function(){
            let vm = this;
            axios({
                url: this.FACTURL.baseUrl+"/nmsl/api/comic/chapter/",
                method:"get",
                params:{
                    uid: Base64.encode(this.sid),
                    offset:this.page_size*(this.currentPage-1),
                    limit: this.page_size,
                }
            })
            .then(function(response){
                vm.loading = true;
                if(response.status == 200 && response.data.count != 0){
                    
                    vm.chapter_arr = response.data.results;
                    vm.count = response.data.count;
                }else{
                    vm.chapter_arr = [];
                    vm.count = 0;
                }
                vm.loading = false;
            })
            .catch(function (error) {
                console.log(error);
            });
        },

    },
    watch: {
        sid: {
            deep: true,
            handler: function (newVal, oldVal) {
                this.getInfo;
                this.getContent();
            }
        },
        '$route'(to, from) {
            if (from.path == "/comic") {  /// 判断条件2  监听路由名 监听你从什么路由跳转过来的
                this.sid=this.$route.query.sid;
                this.cover=this.$route.query.cover;
                this.update=this.$route.query.update;
                this.update_time=this.$route.query.time;
            }
        }
    },
    
}
</script>

<style scoped>
    .block .el-pagination{
        background-color: transparent !important;
        text-align: center;
    }
    button{
        width:100%;
        text-overflow: ellipsis;
        text-emphasis: none;
        white-space: nowrap;
        overflow: hidden;
        text-align: left;
        margin-bottom: 8px;
    }
    .follow{
        width: 100%;
        height:5em;

    }
    .follow div{
        width: 98%;
        border-radius: 6px;
        padding: 12px;
        background-color:rgba(177, 172, 172, 0.2);
        overflow: hidden;
    }
    .star{
        float:left;
        width:100%;
        height:1.86em;
        font-size: 1.5em;
        border-radius: 6px;
        cursor: pointer;
        text-align: center;
        background-color:#14abef;
        font-family: 'Courier New', Courier, monospace;
        margin: 0px;
    }
    .star:hover{
        float:left;
        width:100%;
        height:1.86em;
        text-align: center;
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
        }      
        .bar-right .title{
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
        cursor: pointer;

    }
    .outer .inner{
        width:100%;
        /* padding: 1em; */
    }

    /* .chapter-lists{
        width:100%;
        overflow: hidden;
        height: 85vh;
    }
    .chapter-lists .inBox{
        width:106.6%;
        overflow-y:scroll;
        height: 88vh;
    } */

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
        min-height: 100vh;
        background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
    }

</style>