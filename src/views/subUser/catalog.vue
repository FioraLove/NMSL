<template>
    <div class="comic-category">
        <el-container>
            <el-main>
                <!-- 漫画详细页 -->
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div class="outBox">
                            <template v-if="flag">
                                <div class="comic-head-pc">
                                    <div class="cover"><img v-lazy="cover"></div>
                                    <div class="bar-right">
                                        <div class="title"><b>{{title}}</b></div>
                                        <div class="introduction">
                                            <p class="author"> 作者：{{author}}</p><br>
                                            <span class="state" v-if="state == '1'">状态：连载中</span>
                                            <span class="state" v-if="state == '0'">状态：已完结</span>
                                            <span class="category">题材：{{category}}</span>
                                            <span class="update_time">更新时间：{{update_time}}</span><br>
                                            <span class="update">最新：  <b>{{update}}</b></span><br>
                                        </div>

                                        <div class="info">
                                            <span>{{content}}</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="comic-head-m">
                                    <div class="cover"><img v-lazy="cover"></div>
                                    <div class="bar-right"></div>
                                </div>
                            </template>
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
                        
                        <div class="outer">
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
                                    <li v-for="(lis,index) in 100" :key="index">
                                        <p>第10话 我可是一头有品位的浪狼（P）</p>
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
export default {
    data() {
        return {
            sid:this.$route.query.sid,
            cover:this.$route.query.cover,
            update:this.$route.query.update,
            update_time:this.$route.query.time,
            // cover:"https://cdn.jsdelivr.net/gh/FioraLove/CDN@1.0/Avatar.png",
            title:"重生之都市修仙",
            author:"大行道动漫",
            category:"冒险热血",
            copyright:"1",
            state:"1",
            content:"漫画简介：介绍:《重生之都市修仙》漫画版由天津大行道动漫漫画团队绘制，根据阅文集团旗下起点中文网的同名小说改编，作者是十里剑神。北玄仙尊陈凡因为修行太快渡劫失败，因缘际会下，发现自己重回地球的年少时代，法力、神通、元神、道心甚至法宝道器神兵全都消失。陈凡回忆自己上一世的种种恩怨情仇，决心要弥补遗憾，铸成无上道基……",
            lists:["1|http://dingyue.ws.126.net/2020/0331/03be492bj00q80rz70038c000m800vhm.jpg", "2|http://dingyue.ws.126.net/2020/0331/d379a0d6j00q80rz7003gc000m800vhm.jpg", "3|http://dingyue.ws.126.net/2020/0331/d4ba7b55j00q80rz6003nc000m800vhm.jpg", "4|http://dingyue.ws.126.net/2020/0331/5eef43aej00q80rz7003yc000m800vhm.jpg", "5|http://dingyue.ws.126.net/2020/0331/995bc52dj00q80rz7003rc000m800vhm.jpg", "6|http://dingyue.ws.126.net/2020/0331/e0c6bc4cj00q80rz6004cc000m800vhm.jpg", "7|http://dingyue.ws.126.net/2020/0331/bda664adj00q80rz7004ic000m800vhm.jpg", "8|http://dingyue.ws.126.net/2020/0331/6d9492bbj00q80rz6005mc000m800vhm.jpg", "9|http://dingyue.ws.126.net/2020/0331/940e0e97j00q80rz6004mc000m800vhm.jpg"],
            rows:[],
            flag:true,
        }
    },
    
    mounted() {
        this.deal_array;
        this.isPC();
    },

    computed: {
        deal_array:function () {
            let xe9527 = this.lists;
            let arr = [];
            for (let index = 0; index < xe9527.length; index++) {
                arr.push(xe9527[0].split("|")[1])
            }
            this.rows = arr;
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
        }
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
    .bar-right .title{
        font-size:1.5em;
        margin-top:8px;
        font-family: 'Courier New', Courier, monospace;

    }
    .introduction .author{
        font-size: 1em;
        margin:0px;
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
    }
    .comic-head-pc{
        margin: 0 auto;
        width:100%;
    }
    .comic-head-pc .cover{
        float: left;
        height: 100%;
        margin-left:16vw;
    }
    .comic-head-pc .cover img{
        width: 160px;
        
        border-radius: 6px;
        box-shadow: 10px 8px 5px rgba(177, 172, 172, 0.6)
    }
    .comic-head-pc .bar-right{
        float: left;
        width: 52vw;
        height: 100%;
        margin-left: 2em;
    }

    .outer{
        width:100%;
        background-color: rgb(15, 248, 170);
        overflow: hidden;
        height: 95vh;
        cursor: pointer;
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
        top:12px;
    }
    li p:hover{
        margin:6px 6px 6px 12px;
        font-size: 14px;
        position: relative;
        color: #252525;
        top:12px;
    }

</style>