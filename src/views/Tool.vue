<template>
    <div class="tools">
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div class="block">
                            <el-carousel :interval="3000" type="card" height="30vh">
                                <el-carousel-item v-for="(row, index) in rows" :key="index">
                                    <img :src="row" alt="">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                        <div class="tips">
                            <p class="names">新法师英雄·Seraphine</p>
                            <p class="lover">
                                <span><a href="http://lol.qq.com/nexus/pc/detail.html?tagtype=128&docid=1734503245344037970" target="_blank" rel="noopener noreferrer">永远滴神！只爱此一人！(还有阿狸)</a></span>
                                <img src="https://cdn.jsdelivr.net/gh/FioraLove/Images/tUvJ4K.jpg" alt="AhriLove">
                            </p>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4" v-for="(row,index) in results" :key="index">
                        <el-card class="box-card" shadow="hover">
                            <div class="category">
                                <img :src="row.cover">&nbsp;&nbsp;
                                <span class="title"> {{row.title}}</span>
                                <hr>
                            </div>
                            <p class="desc">{{row.description}}</p>
                            
                            <p class="check"><el-link  :href="row.url" type="success">进入<i class="el-icon-link"></i></el-link></p>
                        </el-card>
                    </el-col>
                </el-row>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name:"Tools",
    data() {
        return {
            rows: [require("../assets/images/seraphine1.jpg"),require("../assets/images/seraphine2.jpg"),require("../assets/images/seraphine3.jpg")
                ,require("../assets/images/seraphine4.jpg"),require("../assets/images/seraphine5.jpg")],
            results:[{
                    cover: "https://bkimg.cdn.bcebos.com/pic/63d9f2d3572c11df6ba8d108682762d0f703c2a4?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg",
                    title: "json数组生成器",
                    description: "将多组字符串生成标准的json数组",
                    url: "/tools/json"
                },{
                    cover: "https://file.ipadown.com/tophub/assets/images/media/bilibili.com.png_50x50.png",
                    title: "哔哩哔哩 AV/BV 转换",
                    description: "在线哔哩哔哩 AV/BV号 互相转换",
                    url: "/tools/av2bv"
                },{
                    cover: "https://cdn.jsdelivr.net/gh/FioraLove/Images/mobile.jpg",
                    title: "手机号码归属地查询",
                    description: "查询归属地/号码段/卡类型/运营商...",
                    url: "/tools/tel"
                },{
                    cover: "https://cdn.jsdelivr.net/gh/FioraLove/Images/trash.jpg",
                    title: "AI垃圾分类查询",
                    description: "干垃圾？湿垃圾？垃圾分类查询",
                    url: "/tools/trash"
                },{
                    cover: "https://cdn.jsdelivr.net/gh/FioraLove/Images/yulu.jpg",
                    title: "精神语录",
                    description: "🔥My name is 精神小伙🔥",
                    url: "/tools/yulu"
                },{
                    cover: "https://cdn.jsdelivr.net/gh/FioraLove/Images/express.jpg",
                    title: "快递单号查询",
                    description: "中通/圆通/申通",
                    url: "/tools/express"
                },{
                    cover: "https://cdn.jsdelivr.net/gh/FioraLove/Images/sang.jpg",
                    title: "每日得物鸡汤",
                    description: "网抑云阴乐·生不出人，我很抱歉",
                    url: "/tools/dewu"
                },{
                    cover: "https://cdn.jsdelivr.net/gh/FioraLove/Images/fuliji.jpg",
                    title: "福利大放送",
                    description: "随机输出cosplay或福利姬等美图",
                    url: "/tools/girl"
                }]
        }
    },

}
</script>

<style scoped>
    .tips p{
        text-align: center;
        font-family: "PingFang SC";
        font-size: 1.2em;
    }
    .names{
        font-weight: 700;
        margin: 0px;
    }
    .lover{
        color: #F56C6C;
        margin-top: 0px;
    }
    .lover img{
        height: 2em;
        border-radius: 8px;
        position: relative;
        top:12px;
    }
    .lover a{
        color: #F56C6C;
        text-decoration: none;
    }
    .box-card {
        width: 100%;
        margin-bottom: 10px;
        border-radius: 6px;
    }
    .block img{
        object-fit: contain;
        width: 100%;
        /* height: 100%; */
    }
    .category img{
        width: 40px;
        height: 40px;
        border-radius: 12.5px;
    }
    .category .title{
        width:36px;
        height: 20px;
        font-weight: 700;
        color: #000;
        position: relative;
        top: -6px;
        font-family: "Helvetica Neue";
    }
    .desc,p{
        width:100%;
        font-size: 14px;
        padding-left: 10px;
    }
    .check{
        text-align: right;
        margin-bottom: 0px;
    }
</style>