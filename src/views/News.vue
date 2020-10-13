<template> 
    <div class="news">
        <!-- <audio autoplay loop>
            <source src="https://cdn.jsdelivr.net/gh/FioraLove/CDN@v1.2.9/M8000012D8zM22KhPg.mp3" type="audio/mpeg">
                您的浏览器不支持audio标签，无法播放音乐！
		</audio> -->
        <el-container>
            <el-main>
                <!-- 告示窗口 -->
                <!-- <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div>
                            <el-alert
                                title="关于本页空白的说明"
                                type="warning"
                                center
                                description="灵感匮乏ing，正在思考该做什么功能😭😭😭/🤓🤓🤓（若有建议，请联系我，不吝珠玉）"
                                show-icon>
                            </el-alert>
                        </div>
                    </el-col>
                </el-row> -->

                <!-- 轮播图片 -->
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

                <!-- 新闻资讯 -->
                <el-row :gutter="10">
                    <div class="modual" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="6" v-for="(row,num) in results" :key="num">
                            <div class="category">
                                <img :src="row.cover">&nbsp;&nbsp;
                                <span class="company" >{{row.description}}</span>
                                <hr>
                            </div>
                            <div class="outer">
                                <div class="card">
                                    <div class="box" v-for="(cols,index) in row.info" :key="index">
                                        <div class="new">
                                            <p>
                                                <span v-if="index <=2" class="order" style="color:red;">{{index+1}}.</span>
                                                <span v-else class="order" style="color:#FFF;">{{index+1}}.</span>
                                                <span class="title"><a :href="cols.Url" target="_blank">{{cols.Title}}</a></span>
                                                <template v-if="cols.hotDesc != null && cols.hotDesc != '' && cols.hotDesc != undefined ">
                                                    <span class="hot">{{cols.hotDesc}}</span>
                                                </template>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </div>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="6" v-for="(row,num) in response" :key="num">
                        <div class="category">
                            <img :src="row.cover">&nbsp;&nbsp;
                            <span class="company" >{{row.description}}</span>
                            <hr>
                        </div>
                        <div class="outer">
                            <div class="card">
                                <div class="box" v-for="(cols,index) in row.info" :key="index">
                                    <div class="new">
                                        <p>
                                            <span v-if="index <=2" class="order" style="color:red;">{{index+1}}.</span>
                                            <span v-else class="order" style="color:#FFF;">{{index+1}}.</span>
                                            <span class="title"><a :href="cols.Url" target="_blank">{{cols.Title}}</a></span>
                                            <template v-if="cols.hotDesc != null && cols.hotDesc != '' && cols.hotDesc != undefined ">
                                                <span class="hot">{{cols.hotDesc}}</span>
                                            </template>
                                            <template v-if="cols.type != null && cols.type != '' && cols.type != undefined ">
                                                <span class="hot">{{cols.type}}</span>
                                            </template>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-main>

        </el-container>
        <el-backtop target=".news" :bottom="100">
            <div class="backtops">UP</div>
        </el-backtop>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'news',
        data() {
            return {
                loading: true,
                rows: [require("../assets/images/tifa.jpg"),require("../assets/images/nmsl.jpeg"),require("../assets/images/comic.jpg")],
                results: [],
                response: []
            }
        },
        mounted() {
            this.query();
            this.query2();
        },
        computed: {

        },
        methods: {
            // 定义知乎热搜api
            getZhiHuData:function(){
                return axios({
                    url: "https://www.tophub.fun:8888/v2/GetAllInfoGzip",
                    method:"get",
                    params:{
                        id: 1,
                        page: 0
                    }
                })
            },

            // 定义知乎热搜访问api
            getWeiBoData:function(){
                return axios({
                    url: "https://www.tophub.fun:8888/v2/GetAllInfoGzip",
                    method:"get",
                    params:{
                        id: 58,
                        page: 0
                    }
                })
            },

            // 定义虎扑热搜api
            getHuPuData:function(){
                return axios({
                    url: "https://www.tophub.fun:8888/v2/GetAllInfoGzip",
                    method:"get",
                    params:{
                        id: 2,
                        page: 0
                    }
                })
            },

            // 定义观察者网热搜api
            getViewerData:function(){
                return axios({
                    url: "https://www.tophub.fun:8888/v2/GetAllInfoGzip",
                    method:"get",
                    params:{
                        id: 123,
                        page: 0
                    }
                })
            },

            // 定义bilibili热搜api
            getBiLiBiLiData:function(){
                return axios({
                    url: "https://www.tophub.fun:8888/v2/GetAllInfoGzip",
                    method:"get",
                    params:{
                        id: 115,
                        page: 0
                    }
                })
            },

            // 定义腾讯体育热搜api
            getTencentSportData:function(){
                return axios({
                    url: "https://www.tophub.fun:8888/v2/GetAllInfoGzip",
                    method:"get",
                    params:{
                        id: 1061,
                        page: 0
                    }
                })
            },

            // 定义微信24h热文帮热搜api
            getWeChatData:function(){
                return axios({
                    url: "https://www.tophub.fun:8888/v2/GetAllInfoGzip",
                    method:"get",
                    params:{
                        id: 11,
                        page: 0
                    }
                })
            },

            // 定义鱼塘热点api
            getMoFishData:function(){
                return axios({
                    url: "https://www.tophub.fun:8888/v2/GetAllInfoGzip",
                    method:"get",
                    params:{
                        id: 1065,
                        page: 0
                    }
                })
            },

            // 定义凤凰网热点api
            getPhoenixData:function(){
                return axios({
                    url: "https://www.tophub.fun:8888/v2/GetAllInfoGzip",
                    method:"get",
                    params:{
                        id: 126,
                        page: 0
                    }
                })
            },

            // 获取热点数据
            query:function(){
                let vm = this;
                this.loading=true;
                axios.all([this.getZhiHuData(),this.getWeiBoData(),this.getHuPuData(),this.getViewerData(),this.getBiLiBiLiData(),this.getTencentSportData()])
                .then(axios.spread(function (rsp1,rsp2,rsp3,rsp4,rsp5,rsp6) {
                    let rows = [];
                    if(rsp1.status == 200 && rsp1.data.Code == 0){
                        let res = rsp1.data.Data;
                        let data = res["data"];
                        let results = {};
                        let info = [];
                        // 截取前二十个热点
                        if(data.length>=20){
                            info= data.slice(1,21);
                        }else{
                            info = data.slice(1);
                        }
                        results = {
                            info: info,
                            cover: "https://file.ipadown.com/tophub/assets/images/media/zhihu.com.png_50x50.png",
                            description: "知乎 | 热榜"
                        }
                        rows.push(results);
                    }
                    if(rsp2.status == 200 && rsp2.data.Code == 0){
                        let res = rsp2.data.Data;
                        let data = res["data"];
                        let results = {};
                        let info = [];
                        if(data.length>=20){
                            info= data.slice(1,21);
                        }else{
                            info = data.slice(1);
                        }
                        results = {
                            info: info,
                            cover: "https://file.ipadown.com/tophub/assets/images/media/s.weibo.com.png_50x50.png",
                            description: "微博 | 热搜榜"
                        }
                        rows.push(results);
                    }
                    if(rsp3.status == 200 && rsp3.data.Code == 0){
                        let res = rsp3.data.Data;
                        let data = res["data"];
                        let results = {};
                        let info = [];
                        if(data.length>=20){
                            info= data.slice(1,21);
                        }else{
                            info = data.slice(1);
                        }
                        results = {
                            info: info,
                            cover: "https://file.ipadown.com/tophub/assets/images/media/bbs.hupu.com.png_50x50.png",
                            description: "虎扑 | 步行街热帖"
                        }
                        rows.push(results);
                    }
                    if(rsp4.status == 200 && rsp4.data.Code == 0){
                        let res = rsp4.data.Data;
                        let data = res["data"];
                        let results = {};
                        let info = [];
                        if(data.length>=20){
                            info= data.slice(1,21);
                        }else{
                            info = data.slice(1);
                        }
                        results = {
                            info: info,
                            cover: "https://img.printf520.com/img/guanchaz.png",
                            description: "观察者网 | 评论员"
                        }
                        rows.push(results);
                    }
                    if(rsp5.status == 200 && rsp5.data.Code == 0){
                        let res = rsp5.data.Data;
                        let data = res["data"];
                        let results = {};
                        let info = [];
                        if(data.length>=20){
                            info= data.slice(1,21);
                        }else{
                            info = data.slice(1);
                        }
                        results = {
                            info: info,
                            cover: "https://file.ipadown.com/tophub/assets/images/media/bilibili.com.png_50x50.png",
                            description: "哔哩哔哩 | 全站热榜"
                        }
                        rows.push(results);
                    }
                    if(rsp6.status == 200 && rsp6.data.Code == 0){
                        let res = rsp6.data.Data;
                        let data = res["data"];
                        let results = {}, info = [];
                        if(data.length>=20){
                            info= data.slice(1,21);
                        }else{
                            info = data.slice(1);
                        }
                        results = {
                            info: info,
                            cover: "https://img.printf520.com/img/qq.png",
                            description: "腾讯体育 | 今日热点"
                        }
                        rows.push(results);
                        vm.loading=false;
                    }

                    // 绑定数据
                    vm.results = rows;
                    


                }))
                .catch(function (error) {
                    console.log(error);
                });
    
            },

            // 获取热点数据
            query2:function(){
                let vm = this;
                axios.all([this.getWeChatData(),this.getMoFishData(),this.getPhoenixData()])
                .then(axios.spread(function (rsp1,rsp2,rsp3) {
                    let rows = [];
                    if(rsp1.status == 200 && rsp1.data.Code == 0){
                        let res = rsp1.data.Data;
                        let data = res["data"];
                        let results = {};
                        let info = [];
                        // 截取前二十个热点
                        if(data.length>=20){
                            info= data.slice(1,21);
                        }else{
                            info = data.slice(1);
                        }
                        results = {
                            info: info,
                            cover: "https://file.ipadown.com/tophub/assets/images/media/mp.weixin.qq.com.png_50x50.png",
                            description: "微信 | 24h热文榜"
                        }
                        rows.push(results);
                    }
                    if(rsp2.status == 200 && rsp2.data.Code == 0){
                        let res = rsp2.data.Data;
                        let data = res["data"];
                        let results = {};
                        let info = [];
                        // 截取前二十个热点
                        if(data.length>=20){
                            info= data.slice(1,21);
                        }else{
                            info = data.slice(1);
                        }
                        results = {
                            info: info,
                            cover: "https://img.printf520.com/DeepinScrot-4643.png",
                            description: "鱼塘 | TOP榜"
                        }
                        rows.push(results);
                    }
                    if(rsp3.status == 200 && rsp3.data.Code == 0){
                        let res = rsp3.data.Data;
                        let data = res["data"];
                        let results = {};
                        let info = [];
                        // 截取前二十个热点
                        if(data.length>=20){
                            info= data.slice(1,21);
                        }else{
                            info = data.slice(1);
                        }
                        results = {
                            info: info,
                            cover: "https://img.printf520.com/img/fenghuang.png",
                            description: "凤凰网 | 实时热点"
                        }
                        rows.push(results);
                    }
                    // 绑定数据
                    vm.response = rows;
                }))
                .catch(function (error) {
                    console.log(error);
                });
    
            }
    }

}
</script>

<style scoped>
    .box p{
        word-wrap: break-word;
	    word-break: break-all;
        margin-bottom: 6px;
        margin-top: 10px;
        text-indent: -1em;
        margin-left: 1em;
        font-size: 16px;
        line-height: 20px;
        width: 94%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .hot{
        background: #F90;
        color: #000;
        padding: 1px 4px;
        border-radius: 2px;
        font-size: 14px;
        margin-left: 1em;
    }
    .title{
        margin: 6px;
        width: inherit;
        color: hsla(0,0%,100%,.85);
    }
    .title a{
        text-decoration: none;
        color: hsla(0,0%,100%,.85);
    }
    .outer{
        width:100%;
        height:26em;
        overflow: hidden;
        
    }
    .outer .card{
        width:104%;
        height: 24em;
        overflow-x: auto;/*可滑动*/
    }

    .box{
        margin-bottom: 10px;
        width: 100%;
    }
    .news{
        background-color: #2c343c;
        max-width: 100%;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .bg{
        width:100%;
        height:1em;
        
    }
    .category img{
        width: 25px;
        height: 25px;
        border-radius: 12.5px;
    }
    .category .company{
        width:36px;
        height: 20px;
        font-weight: 700;
        color: hsla(0,0%,100%,.85);
        position: relative;
        top: -5px;
    }

    .block img{
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    hr{
        margin-bottom: 0px;
    }
    .backtops{
        height: 100%;
        width: 100%;
        background-color: #F90;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #000;
        border-radius: 5px;
    }
    .modual{
        margin: 0px;
    }
</style>