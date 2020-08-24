<template>
    <div class="category">
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <!-- 空白模块 -->
                    <template v-if="flag">
                        <el-col :xs="24" :sm="6" :md="6" :lg="5" :xl="4">
                            <div class="ad"></div>
                        </el-col>
                    </template>


                    <!-- 中间的图片展示模块 -->
                    <el-col :xs="24" :sm="12" :md="12" :lg="14" :xl="16">
                        <div class="outer">
                            <div class="inner">
                                <div class="pic-box" v-for="(row,index) in rows" :key="index"><img v-lazy="row"></div>

                            </div>
                        </div>
                    </el-col>

                    <!-- 空白模块 -->
                    <template v-if="flag">
                        <el-col :xs="24" :sm="6" :md="6" :lg="5" :xl="4">
                            <div class="ad"></div>
                        </el-col>
                    </template>
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
            cover:"https://cdn.jsdelivr.net/gh/FioraLove/CDN@1.0/Avatar.png",
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
            console.log(arr);
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
    .outer{
        width:100%;
        background-color: rgb(15, 248, 170);
        overflow: hidden;
        height: 95vh;
    }
    .outer .inner{
        width:105%;
        overflow-y:scroll;
        height: 98vh;
    }
    .pic-box img{
        width: 100%;
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
    .ad{
        width:100%;
        height: 95vh;
    }
</style>