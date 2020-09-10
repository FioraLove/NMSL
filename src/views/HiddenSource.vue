<template>
    <div class="source">
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-timeline class="timer">
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
    </div>
</template>

<script>
export default {
    name:"Source",
    data() {
        return {
            rows:[{
                "time": "2020-03-24",
                "title": "kpd影视网",
                "desc": "高清无码、欧美风情、口交肛交和国产精品等无需下载任何播放器，浏览器等，即可在线播放！",
                "bk": require("../assets/images/bg.jpg"),
                "url": "http://www.kpd163.me:1024/"
            },{
                "time": "2020-05-25",
                "title": "极影动漫吧",
                "desc": "高清无码、肉番动漫肉番D动漫10801P无M，无需下载任何播放器，浏览器等，即可在线播放！（以移动端模式播放）",
                "bk": require("../assets/images/bg2.png"),
                "url": "https://www.jydm8.net/"
            },{
                "time": "2020-06-29",
                "title": "6080新视觉影院",
                "desc": "新视觉影院,6080,yy6080,6080新视觉影院,6080手机在线观看,6080电影网手机在线（以移动端模式播放）",
                "bk": require("../assets/images/bg3.jpg"),
                "url": "https://6080a.net/"
            },{
                "time": "2020-07-12",
                "title": "樱花动漫",
                "desc": "最新樱花动漫,热门樱花动漫,好看樱花动漫",
                "bk": "https://mob.99xwm.com/MjEyMA09241/1378.gif",
                "url": "http://m.ccy9.com/list/index57.html"
            },{
                "time": "2020-07-20",
                "title": "BT天堂",
                "desc": "BT天堂为您提供最新动漫热播排行榜,手机高清极速在线观看,最新最好看的动漫排行榜",
                "bk": "https://mob.99xwm.com/MjEyMA09241/1390.gif",
                "url": "http://m.bttiantang8.com/list/4.html"
            }]
        }
    },
}
</script>


<style scoped>
    h2{
        margin-top: 0px;
        margin-bottom: 1em;
        cursor: pointer;
    }
    p{
        font-size: 1em;
        margin-bottom:0px;
        color:hsla(0,0%,100%,.85);
    }
    a{
        text-decoration: none;
        cursor: pointer;
        color:black;
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
            width: 100vw;
            height:100vh;
        }
    }
</style>