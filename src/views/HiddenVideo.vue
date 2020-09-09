<template>
  <div class="comic">
    <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="main">
                <template v-if="flag">
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                            <el-menu-item index="1">激情图片</el-menu-item>
                            <el-menu-item index="2">精品资源</el-menu-item>
                    </el-menu>
                </template>
                <template v-else>
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                            <el-menu-item index="1">激情图片</el-menu-item>
                            <el-menu-item index="2">精品资源</el-menu-item>
                    </el-menu>  
                </template>
            </div>
        </el-col>
    </el-row>
    <!-- 告示窗口 -->
    <div>
        <el-alert
            title="关于视频资源的说明"
            type="warning"
            center
            description="资源由网络第三方视频类网站收集，不提供任何视听上传服务，内容均来自各分享站点所提供的公开引用资源"
            show-icon>
        </el-alert>
    </div>

    <div class="line"></div>
    <el-container>

        <el-container>
            <el-main>
                <el-row :gutter="15">
                    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" v-for='(row,index) in rows' :key="index" style="margin-top:10px;">
                        <div class="card">
                            <div class="header">
                                <router-link :to="{path : '/nmsl/hidden/video/play', query : {vid : row.vid, token: bs_token}}" :title="row.title">
                                    <img v-lazy="row.pic">
                                </router-link>
                            </div>
                            <template>                            
                                <div class="card_date">
                                    <span>{{ parseFloat(row.judge)}}</span>
                                </div>
                            </template>
                            <template v-if="flag">                            
                                <div class="card_update">
                                    <span>{{row.update}}</span>
                                </div>
                            </template>

                            <div class="card_footer">
                                <div class="title">
                                    <span><router-link :to="{path : '/nmsl/hidden/video/play', query : {vid : row.vid, token: bs_token}}" :title="row.title">{{(row.title).substr(4,)}}</router-link></span>
                                </div>
                                <template>
                                    <div class="author">
                                        <!-- <span><el-rate :value="parseFloat(row.judge)" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate></span> -->
                                        <span>清晰度：{{row.quality == ''?'暂无':row.quality}}</span>
                                    </div>
                                </template>

                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
            <el-footer>
                <div class="block">
                    <template v-if="flag">
                        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="page_size" layout="prev, pager, next, jumper" :total="count" :pager-count="pager_count">
                        </el-pagination>
                    </template>
                    <template v-else>
                        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="page_size" layout="prev, pager, next" :total="count" :pager-count="pager_count">
                        </el-pagination>       
                    </template>

                </div>
            </el-footer>
        </el-container>

    </el-container>
    <div class="footer">
        <div class="bk"><hr></div>
        <p>本站的资源由网络第三方视频类网站收集，不提供任何视听上传服务，内容均来自各分享站点所提供的公开引用资源。</p>
        <p>若本站收录的节目无意侵犯了贵司版权，请给网页底部邮箱地址来信，我们会及时处理和回复，谢谢</p>
        <p>Copyright © 2019-{{nowYear}}. All Rights Reserved. 站长统计</p>
        <div>
            <a href="https://AhriLove.top" target="_self"><img src="https://cdn.jsdelivr.net/gh/FioraLove/Images/D:/data/imagesaaa.png" alt="AhriLove"></a>
        </div>
    </div>

  </div>
  
</template>

<script>
export default {
    name:"HiddenVideo",
    data() {
        return {
            token: window.btoa(decodeURIComponent(window.location.search.split("=")[1])),
            bs_token:"",
            nowYear:new Date().getFullYear(),
            activeIndex: "1",           // 分类标签    
            bodyWidth:722,                 // 可视化浏览器窗口
            loading:true,                   // 初始化默认加载
            category:"1",
            pager_count:5,                  // 页码按钮的数量，当总页数超过该值时会折叠
            flag:true,                      // 是否是PC端
            count:0,                    // 查询返回的数据总数
            currentPage:1,             // 当前页数
            loading:true,               // 页面加载中特效
            page_size:36,               // 每页展示卡片数
            rows:[],
            lists:[]
        };
    },
    mounted:function(){
        this.resizeChart();         //添加窗口变化监听事件   
        this.getContent();
        this.isPC();
        // 解密token
        // 原生bs64加密的token
        this.bs_token = decodeURIComponent(window.location.search.split("=")[1]);
        // this.token = window.btoa(decodeURIComponent(window.location.search.split("=")[1])); 
    },
    destoryed: function(){
        // 解除监听事件
        window.onresize = null;
    },

    computed:{
        // 窗口变化监听事件
        deal_aside:function() {
            window.onresize = () => {
                return (() => {
                if(document.documentElement.clientWidth <= 992){
                    this.$refs.side.$el.style.display="none";
                    this.$refs.side1.$el.style.display="none";
                }else{
                    this.$refs.side.$el.style.display="block";
                    this.$refs.side1.$el.style.display="block";
                }
                })();
            }
        }

    },
    methods: {
        // 页码改变触发事件
        handleCurrentChange:function(val){
            // 点击页码跳转时，执行改计算属性
            this.getContent();
        },        
        handleSelect(key, keyPath) {
            switch (key) {
                case "1":
                    window.location.href="/nmsl/hidden/picture?token="+this.bs_token
                    break;
                case "2":
                    window.location.href="/nmsl/hidden/source?token="+this.bs_token
                    break;
                default:
                    this.category = "1";
                    break;
            }
        },
        //重设图表高宽
        resizeChart(){
            //监听窗口高宽变化，注意要使用箭头函数
            window.onresize = () =>{
            };
        },

        deal_array:function() {
            // 定义一个空数组
            let a = this.rows;
            let b = [];
            for (let index = 0; index < a.length; index+=4) {
                b.push(a.slice(index,index+4));
            }
            // 绑定数组
            this.lists = b;
        },
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
        getContent:function () {
            let app = this;
            let session_token = sessionStorage.getItem("token");
            if(session_token == null || session_token == undefined || session_token==""){
                alert("登录失效，请重新登录");
                window.location.href = "/nmsl/admin/secret";
            }
            axios({
                // api1:自定义的api接口
                url:"http://127.0.0.1:8001/nmsl/api/secret/video/",
                method:"get",
                headers:{
                    Authorization: "Token "+window.btoa(sessionStorage.getItem("token")),
                },
                params:{
                    offset:this.page_size*(this.currentPage-1),
                    limit: this.page_size
                }
            })
            .then(function(response){
                if(response.status == 200){
                    app.rows = response.data.results;
                    app.count = response.data.count;
                }else{
                    app.rows = {"content":"暂无数据。。。"};
                }
                // 关闭加载动画
                app.loading=false;
            })
            .catch(function (error) {
                console.log(error);
            });
        }

    },
    watch: {
        category:{
            handler(newVal,oldVal){
                this.getContent();
            }
        }
    },
};
</script>

<style scope lang="less">
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
    .comic{
        max-width: 100%;
        background-image: url("../assets/images/bk.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
    }
    .block{
        text-align: center;
        margin-top: 10px;
    }
    a{
        text-decoration: none;
        color: black;
    }
    // moblie端
    @media screen and (max-width:480px){
        .card{
            width: 100%;
            height: 13em;
            position: relative;
            background-color: transparent;
        }
        .card .header img{
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: 6px;
            box-shadow: 4px 4px 5px rgba(177, 172, 172, 0.6);
        }
        .card .header{
            width: 100%;
            height: 9.8em;
        }
        .card .card_update{
            position:absolute;
            left: 3px;
            bottom: 3.2em;
            background-color: #feeeed;
        }        
    }
    @media screen and (min-width:481px){
        .card{
            max-width: 100%;
            height: 18.7em;
            position: relative;
            background-color: transparent;
        }
        .card .header img{
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: 6px;
            box-shadow: 4px 4px 5px rgba(177, 172, 172, 0.6);
        }
        .card .header{
            width: 100%;
            height: 13.7em;
        }
        .card .card_update{
            position:absolute;
            left: 3px;
            bottom: 5.2em;
            background-color: #feeeed;
        }        
    }


    .card .card_date{
        position:absolute;
        right: 3px;
        top: 3px;

        background-color: coral;
        border-radius: 20%;
    }

    .card_date span{
        text-transform: uppercase;
        font-size: 18px;

    }
    .card_update span{
        text-transform: uppercase;
        font-size: 13px;
        color: #ed1941;
    }
    .title{
        margin-top: 12px;
        width:100%;
        height:1.5em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: black;
        font-size: 1em;
    }
    .author{
        margin-top: 3px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        color:black;
    }
    .author el-rate{
        font-size: 8px;
    }
    span{
         font-family: "Microsoft YaHei", "微软雅黑", "STHeiti", "WenQuanYi Micro Hei", SimSun, sans-serif;
    }

</style>





