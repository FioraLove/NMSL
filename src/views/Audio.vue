<template>
  <div class="video" style="background-image: linear-gradient(to top, #5ee7df 0%, #b490ca 100%);">
        <el-row :gutter="10" style="padding:1em 1em 0px 1em;">
            <el-col :xs="3" :sm="4" :md="4" :lg="8" :xl="8"><div style="height:40px;"></div></el-col>
            <el-col :xs="18" :sm="16" :md="16" :lg="8" :xl="8">
                <div class="search-box">
                    <el-autocomplete popper-class="my-autocomplete" v-model="content" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect" clearable>
                        <i
                            class="el-icon-search el-input__icon"
                            slot="suffix"
                            @click="handleIconClick">
                        </i>
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.value }}</div>

                        </template>
                    </el-autocomplete>
                </div>
            </el-col>
            <el-col :xs="3" :sm="4" :md="4" :lg="8" :xl="8"><div style="height:40px;"></div></el-col>

        </el-row>


        <div class="ox-music" style="margin-bottom:5em;">
            <el-container>
                <el-main>
                    <el-row :gutter="15">
                        <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" v-for='(row,index) in rows' :key="index" style="margin-top:1em;">
                            <div class="card">
                                <div class="header">
                                    <a :href="row.mp3" :title="row.title" target="_blank"><img  v-lazy="row.cover" ></a>
                                </div>
                                <div class="card_footer">
                                    <div class="title">
                                        <span><a :href="row.mp3" target="_blank" :title="row.title">{{row.title}}</a></span>
                                    </div>
                                    <div class="author">
                                        <span>{{row.singerName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br><b><span style="font-size:15px;" class="album" :title="row.albumName">#{{row.albumName}}#</span></b>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-main>
                <el-footer>
                    <div class="block">
                        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="page_size" layout="prev, pager, next, jumper" :total="count">
                        </el-pagination>
                    </div>
                </el-footer>
            </el-container>

        </div>
    <div class="footer">
            <div class="bk"><hr></div>
            <p>本站的资源由网络第三方视频类网站收集，本站不提供任何视听上传服务，所有内容均来自各分享站点所提供的公开引用资源。</p>
            <p>若本站收录的节目无意侵犯了贵司版权，请给网页底部邮箱地址来信，我们会及时处理和回复，谢谢</p>
            <p>Copyright © 2019-2020. All Rights Reserved. 站长统计</p>
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
            bodyWidth:1920,
            keyword:"抖音",                 // 搜索关键词
            rows:[],                    // 查询返回数据集
            count:0,                    // 查询返回的数据总数
            currentPage:1,             // 当前页数
            loading:true,               // 页面加载中特效
            page_size:36,               // 每页展示卡片数
            restaurants: [],
            content:"",
            defaultImg: 'this.src="'+require("../assets/images/loading.gif")+'"'
            
        };
    },

    //mounted页面DOM加载完毕，可用于初始化页面，执行一些初始化函数 
    mounted:function(){
        this.getContent;
        this.restaurants = this.loadAll();
    },
    destoryed: function(){
        // 解除监听事件
        window.onresize = null;
    },

    computed:{
        // 发送Ajax请求
        getContent:function () {
            let app = this;
            axios({
                url:"migus/migu/remoting/scr_search_tag",
                method:"get",
                params:{
                    rows:this.page_size,
                    type:2,
                    keyword: this.keyword,
                    pgc: this.currentPage
                }
            })
            .then(function(response){
                if(response.status == 200){
                    app.rows = response.data.musics;
                    app.count = response.data.pgt;
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
    methods: {
        // 页面改变触发事件
        handleCurrentChange:function(val){
            // 点击页面跳转时，执行改计算属性
            this.getContent;
        },
        querySearch:function(queryString, cb){
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter:function(queryString) {
            return (restaurant) => {
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll:function(){
            return [
                { "value": "周杰伦"},
                { "value": "我们的歌"},
                { "value": "冰雪奇缘2"},
                { "value": "时代少年团"},
                { "value": "病变"},
                { "value": "邓紫棋"},
                { "value": "少年 梦然"},
                { "value": "欧若拉"},
                { "value": "桥边姑娘"},
                { "value": "张杰"}
            ];
        },
        handleSelect:function(item) {
            console.log(item);
            this.keyword = item.value;
        },
        // 搜索触发事件
        handleIconClick:function(){
            this.keyword = this.content;
        }


    },
    watch: {
        keyword:{
            handler(newVal,oldVal){
                this.getContent;
            }
        }
    },
};
</script>

<style scoped lang="less">
    .video{
        max-width: 100vw;
        min-height: 100vh;
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
    i{
        color: rgb(9, 135, 173);
        cursor: pointer;

    }
    .search-box{
        text-align: center;
    }
    .ox-music{
        min-height: 10em;
    }
    .el-input__inner{
        border-radius: 20px;
        outline: none;
    }
    .my-autocomplete {
        li {
            line-height: normal;
            padding: 7px;
            .name {
            text-overflow: ellipsis;
            overflow: hidden;
            }
            .addr {
            font-size: 12px;
            color: #b4b4b4;
            }

            .highlighted .addr {
            color: #ddd;
            }
        }
    }
    .block{
        text-align: center;
        margin-top: 10px;
    }
    a{
        text-decoration: none;
        color: black;
    }
    .card{
        max-width: 10.8em;
        height: 18.7em;
        position: relative;
    }

    .card .header{
        width: 100%;
        height: 13.7em;


    }
    .card .header img{
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 6px;
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
        color: #fff;
    }
    .title{
        margin-top: 4px;
        width:100%;
        height:1.5em;
        overflow-y: hidden;
        overflow-x: hidden;
        color: black;
        font-size: 1em;
    }
    .author{
        margin-top: 4px;
        font-size: 12px;

    }
    .alunm{
        margin-top: 4px;
        overflow-y: hidden;
        overflow-x: hidden;
    }
    span{
         font-family: "Microsoft YaHei", "微软雅黑", "STHeiti", "WenQuanYi Micro Hei", SimSun, sans-serif;
    }

</style>