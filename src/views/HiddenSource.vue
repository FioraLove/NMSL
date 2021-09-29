<template>
    <div class="source">
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-timeline class="timer" style="width:80%;margin:0 auto;">
                            <el-timeline-item class="bar"  v-for="(row,index) in rows" :timestamp="row.time" placement="top" :key="index" color="#0bbd87">
                                <el-card class="card" :style="{'backgroundImage': 'url(' + row.bk + ')'}">
                                    <h2><a :href="row.url" target="_blank"><b>{{row.title}}</b></a></h2>
                                    <p>{{row.desc}}</p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>

        <div class="footer">
            <div class="bk"><hr>
                <p>本站不提供任何视听上传服务，所有内容均来自各分享站点所提供的公开引用资源。</p>
                <p>若收录节目无意侵犯了贵司版权，请联系并告知删除，谢谢</p>
                <p>Copyright © 2019-{{nowYear}}. All Rights Reserved</p>
                <div>
                    <a href="https://AhriLove.top" target="_self" rel="noopener noreferrer"><img src="https://cdn.jsdelivr.net/gh/FioraLove/Images/D:/data/imagesaaa.png" alt="AhriLove"></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"HiddenSource",
    data() {
        return {
            nowYear:new Date().getFullYear(),
            rows:[{
                "time": "2020-03-24",
                "title": "kpd影视网 👍👍👍👍",
                "desc": "高清无码、欧美风情、口交肛交和国产精品等无需下载任何播放器，浏览器等，即可在线播放！",
                "bk": require("../assets/images/bg.jpg"),
                "url": "http://www.kpd163.me:1024/"
            },{
                "time": "2020-05-25",
                "title": "极影动漫吧 👍👍",
                "desc": "高清无码、肉番动漫肉番D动漫10801P无M，无需下载任何播放器，浏览器等，即可在线播放！（以移动端模式播放）",
                "bk": require("../assets/images/bg2.png"),
                "url": "https://www.jydm8.net/"
            },{
                "time": "2020-06-29",
                "title": "6080新视觉影院 👍👍👍",
                "desc": "新视觉影院,6080,yy6080,6080新视觉影院,6080手机在线观看,6080电影网手机在线（以移动端模式播放）",
                "bk": require("../assets/images/bg3.jpg"),
                "url": "https://6080a.net/"
            },{
                "time": "2020-07-12",
                "title": "樱花动漫 👍👍",
                "desc": "最新樱花动漫,热门樱花动漫,好看樱花动漫",
                "bk": require("../assets/images/bg4.jpg"),
                "url": "http://m.ccy9.com/list/index57.html"
            },{
                "time": "2020-07-20",
                "title": "BT天堂 👍👍",
                "desc": "熟女人妻 制服诱惑视频三区: 三级自慰 韩国三级 香港三级 HEY诱惑",
                "bk": require("../assets/images/bg5.png"),
                "url": "http://m.bttiantang8.com/list/4.html"
            },{
                "time": "2020-08-12",
                "title": "性爱天堂 👍👍👍",
                "desc": "国产自拍 日韩无码 欧美性爱 强奸乱伦 熟女人妻 制服诱惑 长腿丝袜 少女萝莉",
                "bk": require("../assets/images/bg6.jpg"),
                "url": "http://www.storendoor.com/"
            },{
                "time": "2020-08-20",
                "title": "伊人综合网站 👍👍👍👍",
                "desc": "国产自拍 日韩无码 欧美性爱 强奸乱伦 熟女人妻 制服诱惑 长腿丝袜 少女萝莉（备用url：http://yy0822.com/）",
                "bk": require("../assets/images/bg7.jpg"),
                "url": "http://www.n1shijue.com/index.php"
            },{
                "time": "2020-08-25",
                "title": "心动视频 👍",
                "desc": "黄色电影 情色小说 美图漫画",
                "bk": require("../assets/images/bg8.jpg"),
                "url": "https://xdtv1.site/?200n-4#/vod"
            },{
                "time": "2020-10-02",
                "title": "想要导航 👍👍👍👍👍",
                "desc": "色站黄页，缔造成人影视经典，收集各类资源，省去各位狼友找片的烦恼",
                "bk": require("../assets/images/bg9.jpg"),
                "url": "https://xydh137.com/"
            }]
        }
    },
}
</script>


<style scoped>
    .footer{
        margin-top: 3em;
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
    h2{
        margin-top: 0px;
        margin-bottom: 1em;
        cursor: pointer;
    }
    p{
        font-size: 1.2em;
        margin-bottom:0px;
        color:#6699CC;
    }
    a{
        text-decoration: none;
        cursor: pointer;
        color: #F90;
    }
    .card{
        background-size: cover;
        background-repeat: no-repeat;
        font-family: Roboto,sans-serif;
    }

    /* moblie端 */
    @media screen and (max-width:480px){
        .source{
            background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
            background-blend-mode: multiply,multiply;
            width: 100vw;
            height:100%;
        }
    }
    /* PC端 */
    @media screen and (min-width:481px){
        .source{
            background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
            background-blend-mode: multiply,multiply;
            width: 100%;
            height:100%;
        }
    }
</style>