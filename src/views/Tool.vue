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
                                <img src="https://t1.picb.cc/uploads/2020/10/13/tUvJ4K.jpg" alt="AhriLove">
                            </p>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
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