<template>
  <div class="comic">
    <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="main">
                <template v-if="flag">
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                            <el-menu-item index="1">冒险热血</el-menu-item>
                            <el-menu-item index="2">武侠格斗</el-menu-item>
                            <el-menu-item index="3">科幻魔幻</el-menu-item>
                            <el-menu-item index="4">侦探推理</el-menu-item>
                            <el-menu-item index="5">耽美爱情</el-menu-item>
                            <el-menu-item index="6">生活漫画</el-menu-item>
                    </el-menu>  
                </template>
                <template v-else>
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                            <el-menu-item index="1">冒险热血</el-menu-item>
                            <el-menu-item index="2">武侠格斗</el-menu-item>
                            <el-menu-item index="3">科幻魔幻</el-menu-item>
                            <el-menu-item index="4">侦探推理</el-menu-item>
                            <el-menu-item index="5">耽美爱情</el-menu-item>
                            <el-menu-item index="6">生活漫画</el-menu-item>
                    </el-menu>  
                </template>
            </div>
        </el-col>
    </el-row>
    <!-- 告示窗口 -->
    <div>
        <el-alert
            title="关于漫画资源的说明"
            type="warning"
            center
            description="由于目前的漫画数据数据是存储在sqlite3，考虑到其性能问题，只存储了【冒险热血】类的数据,所以很多漫画出现无版权，无法显示的结果。后续有了远程数据库后，将存储所有的题材的漫画，十分抱歉😭😭😭"
            show-icon>
        </el-alert>
    </div>

    <div class="line"></div>
    <el-container>
        <template v-if="flag">
            <el-aside width="180px;" ref="side">advertisement</el-aside>
        </template>
        <el-container>
            <el-main>
                <el-row :gutter="15">
                    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" v-for='(row,index) in rows' :key="index" style="margin-top:10px;">
                        <div class="card">
                            <div class="header">
                                <router-link :to="{path : '/comic/category', query : {sid : row.sid, cover: row.cover, update:row.update_content,time:row.update}}" :title="row.title"><img v-lazy="row.cover"></router-link>
                            </div>
                            <template v-if ="flag ==false">                            
                                <div class="card_date">
                                    <span>{{ parseFloat(row.judge)}}</span>
                                </div>
                            </template>
                            <div class="card_update">
                                <span>{{row.update}}</span>
                            </div>
                            <div class="card_footer">
                                <div class="title">
                                    <span><router-link :to="{path : '/comic/category', query : {sid : row.sid,cover: row.cover, update:row.update_content,time:row.update}}" :title="row.title">{{row.title}}</router-link></span>
                                </div>
                                <template v-if="flag">
                                    <div class="author">
                                        <!-- <span><el-rate :value="parseFloat(row.judge)" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate></span> -->
                                        <span>更新至：{{row.update_content}}</span>
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
        <template v-if="flag">
            <el-aside width="180px;" ref="side">advertisement</el-aside>
        </template>
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
    data() {
        return {
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
        // this.deal_aside;
        this.getContent();
        this.isPC();
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
                    this.category = "1";
                    console.log(typeof(key));
                    console.log(keyPath);
                    break;
                case "2":
                    this.category = "2";
                    break;
                case "3":
                    this.category = "3";
                    break;
                case "4":
                    this.category = "4";
                    break;
                case "5":
                    this.category = "5";
                    break;
                case "6":
                    this.category = "6";
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
            axios({
                // api1:自定义的api接口
                url:"http://127.0.0.1:8001/nmsl/api/comic/",
                method:"get",
                // headers:{
                //     "Host":"m.music.migu.cn",
                //     "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
                // },
                params:{
                    offset:this.page_size*(this.currentPage-1),
                    limit: this.page_size,
                    category: this.category
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
    }
    .block{
        text-align: center;
        margin-top: 10px;
    }
    a{
        text-decoration: none;
        color: black;
    }
    @media screen and (max-width:480px){
        .card{
            max-width: 11.8em;
            height: 13em;
            position: relative;
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
    }
    @media screen and (min-width:481px){
        .card{
            max-width: 11.8em;
            height: 18.7em;
            position: relative;
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
    }

    .card .card_date{
        position:absolute;
        right: 3px;
        top: 3px;

        background-color: coral;
        border-radius: 20%;
    }
    .card .card_update{
        position:absolute;
        left: 3px;
        bottom: 5.2em;
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
        margin-top: 1em;
        width:100%;
        height:1.5em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: black;
        font-size: 1em;
    }
    .author{
        margin-top: 1em;
        font-size: 11px;

    }
    .author el-rate{
        font-size: 8px;
    }
    span{
         font-family: "Microsoft YaHei", "微软雅黑", "STHeiti", "WenQuanYi Micro Hei", SimSun, sans-serif;
    }

</style>





