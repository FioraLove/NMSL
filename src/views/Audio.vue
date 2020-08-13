<template>
  <div class="video">
        <div class="ox-music" style="margin-bottom:5em;">
            <el-container>
                <el-main v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                    <el-row :gutter="15">
                        <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" v-for='(row,index) in rows' :key="index" style="margin-top:10px;">
                            <div class="card">
                                <div class="header">
                                    <a :href="row.videos" :title="row.audioName" target="_blank"><img :src="row.coverS" alt="Loading"></a>
                                </div>
                                <div class="card_footer">
                                    <div class="title">
                                        <span><a :href="row.videos" target="_blank" :title="row.audioName">{{row.audioName}}</a></span>
                                    </div>
                                    <div class="author">
                                        <span>{{row.author}}</span>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-main>
            </el-container>
            <div class="block">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="20" layout="prev, pager, next, jumper" :total="count">
                </el-pagination>
            </div>
        </div>

  </div>
</template>

<script>
export default {
    data() {
        return {
            bodyWidth:1920,
            keyword:"周杰伦",                 // 搜索关键词
            rows:[],                    // 查询返回数据集
            count:100,                    // 查询返回的数据总数
            currentPage:1,             // 当前页数
            loading:true,               // 页面加载中特效
        };
    },

    //mounted页面DOM加载完毕，可用于初始化页面，执行一些初始化函数 
    mounted:function(){
        this.getContent;
    },
    destoryed: function(){
        // 解除监听事件
        window.onresize = null;
    },

    computed:{
        // 发送Ajax请求
        getContent:function () {
            // 加载初始时，开启加载动画
            this.loading = true;
            let app = this;
            axios({
                url:"http://127.0.0.1:8001/nmsl/music",
                method:"post",
                headers:{
                    "Content-Type": "application/json"
                },
                data:{
                    keyword: this.keyword,
                    page: this.currentPage
                }
            })
            .then(function(response){
                if(response.status == 200){
                    app.rows = response.data.rows;
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
    methods: {
        // 页面改变触发事件
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            console.log(this.currentPage);
            // 点击页面跳转时，执行改计算属性
            this.getContent;

        }

    },
    watch: {
        
    },
};
</script>

<style scope>
    .block{
        text-align: center;
        margin-top: 10px;
    }
    a{
        text-decoration: none;
        color: black;
    }
    .card{
        max-width: 11.8em;
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
        margin-top: 1em;
        width:100%;
        height:1.5em;
        overflow-y: hidden;
        overflow-x: hidden;
        color: black;
        font-size: 1em;
    }
    .author{
        margin-top: 1em;
        font-size: 12px;

    }
    span{
         font-family: "Microsoft YaHei", "微软雅黑", "STHeiti", "WenQuanYi Micro Hei", SimSun, sans-serif;
    }

</style>





