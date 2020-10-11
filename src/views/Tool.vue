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
                            
                            <p class="check"><el-link  :href="row.url" target="_blank" type="success">进入<i class="el-icon-link"></i></el-link></p>
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
            rows: [require("../assets/images/tifa.jpg"),require("../assets/images/nmsl.jpeg"),require("../assets/images/comic.jpg")],
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
    .box-card {
        width: 100%;
        margin-bottom: 10px;
        border-radius: 6px;
    }
    .block img{
        object-fit: cover;
        width: 100%;
        height: 100%;
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