<template>
    <!--组件有且只有一个根标签-->
    <div class="home" style="background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
 background-blend-mode: multiply,multiply;">
        <div class="bg"></div>
        <el-container style="padding: 1em;">
            <!-- <el-header style="height:20px;width:100%;">
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div class="top-box"></div>
                    </el-col>
                </el-row>
            </el-header> -->

            <el-main>
                <el-row :gutter="10">
                    <!-- 头像模块 -->
                    <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
                        <div class="card">
                            <div class="header">
                                <a href="row.url" title="row.title"><img src="https://cdn.jsdelivr.net/gh/FioraLove/CDN@1.0/Avatar.png" alt=""></a>
                            </div>

                            <div class="card_footer">
                                <div class="title">
                                    <span>AhriLove</span>
                                </div>
                            </div>
                        </div>
                        <div class="author">
                            <span><b>我一路向北，离开有你的季节</b></span><br><br>
                            <span>一个野生自学者 有时间就上传一些学习分享</span>
                        </div>
                        <hr>
                        <div class="skill">
                            <div class="process">
                                <div style="float:left;width:20%;margin-top:12px;"><img src="../assets/images/html.png"></div>
                                <div style="float:left;width:70%;margin-left:1em;">
                                    <p style="width:12em;">HTML5</p> 
                                    <div style="width:60%;background-color:yellow;height:6px;"></div>
                                </div>
                            </div>
                            
                            <div class="process">
                                <div style="float:left;width:20%;margin-top:12px;"><img src="../assets/images/python.png"></div>
                                <div style="float:left;width:70%;margin-left:1em;">
                                    <p style="width:12em;">python</p> 
                                    <div style="width:90%;background-color:yellow;height:6px;"></div>
                                </div>
                            </div>
                            
                            <div class="process">
                                <div style="float:left;width:20%;margin-top:12px;"><img src="../assets/images/spider.png"></div>
                                <div style="float:left;width:70%;margin-left:1em;">
                                    <p style="width:12em;">Python爬虫</p> 
                                    <div style="width:75%;background-color:yellow;height:6px;"></div>
                                </div>
                            </div>
                            <div class="process">
                                <div style="float:left;width:20%;margin-top:12px;"><img src="../assets/images/vuejs.png"></div>
                                <div style="float:left;width:70%;margin-left:1em;">
                                    <p style="width:12em;">Vue.js</p> 
                                    <!-- 下面的width的属性决定进度条多宽 -->
                                    <div style="width:40%;background-color:yellow;height:6px;"></div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
                            <p><b>动态更新</b></p>
                            <el-divider></el-divider>
                            <div class="per-video" :style="{ height:bodyHeight + 'px'}">
                                <template v-for="(row,index) in results">
                                    <div class="bilibili" :key="index">
                                        <div style="float:left;width:5em;height:1em;"><img img  v-lazy="row.pic" ></div>
                                        <div style="float:left;width:70%;margin-left:16px;">
                                            <p style="width:100%;margin-top:0px;overflow:hidden;">{{row.title}}</p> 
                                            <div><a :href="'https://www.bilibili.com/video/'+row.bvid" target="_blank"><el-button type="primary" size="mini">BILIBILI观看</el-button></a></div>
                                        </div>
                                    </div>
                                        
                                    
                                </template>
                            </div>
                    </el-col>
                </el-row>
                
            </el-main>

        </el-container>
        
        <!-- 导航栏模块 -->
        <div class="main">
            <div class="tabBar">
                <div class="box" v-for='(row,index) in rows' :key="index"><a :href="row.url" target="_self"><p>{{row.content}}</p></a></div>
            </div>
        </div>
    </div>
</template>

<script>
// 组件 .vue 文件：模板(template) + 脚本(scpirt) + 样式(style)
// 导入自定义的组件
import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'Home',
    components: {
        HelloWorld
    },
    mounted() {
        this.bodyHeight = document.documentElement.clientHeight-190;
        //this.getContent();
    },
    data(){
        return {
            bodyHeight:100,
            rows:[{
                content:"主页",
                url:"/"
            },{
                content:"动漫",
                url:"/media"
            },{
                content:"音乐",
                url:"/audio"
            },{
                content:"视频",
                url:"/video"
            },{
                content:"抽象圣经",
                url:"/ndsl"
            }],
            results:[{"comment":7,"typeid":27,"play":17,"pic":"//i0.hdslb.com/bfs/archive/f614c79378d89051eb4b514ddbd4d58bc7152d25.jpg","subtitle":"","description":"老许，你要老婆不要？哎，你要老婆，只要你开金口，我等会给你送来！\n\n老许：我全都要???","copyright":"","title":"【老许，你要老婆不要】你要老婆不要，是玄机美女啊（Ⅰ）","review":0,"author":"支付宝AliPlan","mid":215893581,"created":1597669602,"length":"01:30","video_review":0,"aid":286774335,"bvid":"BV1mf4y197cv","hide_click":false,"is_pay":0,"is_union_video":0},{"comment":0,"typeid":172,"play":12,"pic":"//i1.hdslb.com/bfs/archive/8e9fcf1ad51840c7184af056880845462b89f57b.jpg","subtitle":"","description":"唉！保安在哪里呀，保安在哪里呀，哎你有____吗？你在______搞这些动作，有必要吗？不要再给我们_____抹黑了。","copyright":"","title":"最近长大的小橘子这么火？我好怕保安，保安在哪里，保安在哪里","review":0,"author":"支付宝AliPlan","mid":215893581,"created":1597581042,"length":"00:18","video_review":0,"aid":414271661,"bvid":"BV1WV411U74m","hide_click":false,"is_pay":0,"is_union_video":0},{"comment":0,"typeid":17,"play":34,"pic":"//i0.hdslb.com/bfs/archive/658f0972f8b914ff19f655cfabc213e248e0d4b7.jpg","subtitle":"","description":"#靓女又怎样，我是读书人#","copyright":"","title":"蒂法，靓女又怎样？我是______","review":0,"author":"支付宝AliPlan","mid":215893581,"created":1597577455,"length":"00:43","video_review":0,"aid":371817277,"bvid":"BV1aZ4y1K7nQ","hide_click":false,"is_pay":0,"is_union_video":0},{"comment":0,"typeid":65,"play":20,"pic":"//i2.hdslb.com/bfs/archive/c4e08c8d10d6ff53d33d0957f7f90b219845d4b7.jpg","subtitle":"","description":"https://www.douyin.com\n猪老板，苟策划，羊秘书，牛保安","copyright":"","title":"山 海 经 ，就是这样一个弱肉强食的世界","review":0,"author":"支付宝AliPlan","mid":215893581,"created":1597573551,"length":"00:42","video_review":0,"aid":329282915,"bvid":"BV1DA411J7nq","hide_click":false,"is_pay":0,"is_union_video":0},{"comment":6,"typeid":27,"play":117,"pic":"//i1.hdslb.com/bfs/archive/08dc93ad572fd7ace0d6281ab7a57844f41c8699.jpg","subtitle":"","description":"比比东：对不起，你是个好人，可我已经有孩子了 /(ㄒoㄒ)/~~","copyright":"","title":"比比东：对不起，我已经有孩子了 /(ㄒoㄒ)/~~","review":0,"author":"支付宝AliPlan","mid":215893581,"created":1597556243,"length":"00:23","video_review":1,"aid":456867588,"bvid":"BV1h5411h7rT","hide_click":false,"is_pay":0,"is_union_video":0},{"comment":3,"typeid":21,"play":29,"pic":"//i1.hdslb.com/bfs/archive/a19ca1eb765f1b64da7b1ae98a938a558b963d4d.jpg","subtitle":"","description":"宁那叫喜欢吗？宁那是馋人家的身子，宁下贱，弟弟萌?","copyright":"","title":"美丽动人的红装爱丽丝~~你爱的样子都有","review":0,"author":"支付宝AliPlan","mid":215893581,"created":1597548785,"length":"00:30","video_review":0,"aid":371841114,"bvid":"BV1zZ4y1K7Wi","hide_click":false,"is_pay":0,"is_union_video":0},{"comment":7,"typeid":27,"play":17,"pic":"//i0.hdslb.com/bfs/archive/f614c79378d89051eb4b514ddbd4d58bc7152d25.jpg","subtitle":"","description":"老许，你要老婆不要？哎，你要老婆，只要你开金口，我等会给你送来！\n\n老许：我全都要???","copyright":"","title":"【老许，你要老婆不要】你要老婆不要，是玄机美女啊（Ⅰ）","review":0,"author":"支付宝AliPlan","mid":215893581,"created":1597669602,"length":"01:30","video_review":0,"aid":286774335,"bvid":"BV1mf4y197cv","hide_click":false,"is_pay":0,"is_union_video":0},{"comment":0,"typeid":172,"play":12,"pic":"//i1.hdslb.com/bfs/archive/8e9fcf1ad51840c7184af056880845462b89f57b.jpg","subtitle":"","description":"唉！保安在哪里呀，保安在哪里呀，哎你有____吗？你在______搞这些动作，有必要吗？不要再给我们_____抹黑了。","copyright":"","title":"最近长大的小橘子这么火？我好怕保安，保安在哪里，保安在哪里","review":0,"author":"支付宝AliPlan","mid":215893581,"created":1597581042,"length":"00:18","video_review":0,"aid":414271661,"bvid":"BV1WV411U74m","hide_click":false,"is_pay":0,"is_union_video":0},{"comment":0,"typeid":17,"play":34,"pic":"//i0.hdslb.com/bfs/archive/658f0972f8b914ff19f655cfabc213e248e0d4b7.jpg","subtitle":"","description":"#靓女又怎样，我是读书人#","copyright":"","title":"蒂法，靓女又怎样？我是______","review":0,"author":"支付宝AliPlan","mid":215893581,"created":1597577455,"length":"00:43","video_review":0,"aid":371817277,"bvid":"BV1aZ4y1K7nQ","hide_click":false,"is_pay":0,"is_union_video":0},{"comment":0,"typeid":65,"play":20,"pic":"//i2.hdslb.com/bfs/archive/c4e08c8d10d6ff53d33d0957f7f90b219845d4b7.jpg","subtitle":"","description":"https://www.douyin.com\n猪老板，苟策划，羊秘书，牛保安","copyright":"","title":"山 海 经 ，就是这样一个弱肉强食的世界","review":0,"author":"支付宝AliPlan","mid":215893581,"created":1597573551,"length":"00:42","video_review":0,"aid":329282915,"bvid":"BV1DA411J7nq","hide_click":false,"is_pay":0,"is_union_video":0},{"comment":6,"typeid":27,"play":117,"pic":"//i1.hdslb.com/bfs/archive/08dc93ad572fd7ace0d6281ab7a57844f41c8699.jpg","subtitle":"","description":"比比东：对不起，你是个好人，可我已经有孩子了 /(ㄒoㄒ)/~~","copyright":"","title":"比比东：对不起，我已经有孩子了 /(ㄒoㄒ)/~~","review":0,"author":"支付宝AliPlan","mid":215893581,"created":1597556243,"length":"00:23","video_review":1,"aid":456867588,"bvid":"BV1h5411h7rT","hide_click":false,"is_pay":0,"is_union_video":0},{"comment":3,"typeid":21,"play":29,"pic":"//i1.hdslb.com/bfs/archive/a19ca1eb765f1b64da7b1ae98a938a558b963d4d.jpg","subtitle":"","description":"宁那叫喜欢吗？宁那是馋人家的身子，宁下贱，弟弟萌?","copyright":"","title":"美丽动人的红装爱丽丝~~你爱的样子都有","review":0,"author":"支付宝AliPlan","mid":215893581,"created":1597548785,"length":"00:30","video_review":0,"aid":371841114,"bvid":"BV1zZ4y1K7Wi","hide_click":false,"is_pay":0,"is_union_video":0}],
        }
    },
    methods: {
        goUser:function(id){
            this.$router.push({
                name : 'User',
                params : {
                    id
                }
            })
        },
        goUser2:function(id,name){
            this.$router.push({
                path:"/list",
                query:{
                    id,
                    name
                }
            })
         },
                 // 发送Ajax请求
        getContent:function () {
            let app = this;
            axios({
                // api1:自定义的api接口
                url:"/bilibili/x/space/arc/search",
                method:"get",
                params:{
                    mid:'215893581',
                    ps:'30',
                    tid:'0',
                    pn:'1',
                    keyword:"",
                    order:'pubdate',
                    jsonp:'jsonp'

                },
                headers:{
                    "origin": 'https://space.bilibili.com'
                }
            })
            .then(function(response){
                console.log(response);
                if(response.status == 200){
                    app.results = response.data.data.list.vlist;

                    console.log(response.data);
                }else{
                    app.results = [];
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }

    }
}
</script>

<style lang="less" scoped>
    .bilibili{
        width: 100%;
        height: 5em;
        margin-top: 8px;
    }
    .bilibili img{
        width: 100%;
        object-fit: cover; 
        object-position: left;
        
    }
    .per-video{
        padding: 8px;
        overflow-y:scroll
    }
    
    .skill{
        padding: 10px;
        width:100%;
    }
    .skill .process{
        height: 4em;
        width:20em;
    }
    .process img{
        width: 70%;
    }
    .card{
        width: 11.8em;
        height: 15em;
        position: relative;
    }

    .card .header{
        width: 100%;


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
        margin-top: 8px;
        width:100%;
        height:1.5em;
        overflow-y: hidden;
        overflow-x: hidden;
        color: whitesmoke;
        font-size: 2em;
    }
    span{
        font-family: 'Courier New', Courier, monospace;
    }
    .author{
        margin-top: 8px;
        font-size: 1em;
        color: whitesmoke;
    }
    a{
        text-decoration: none;
        color: aliceblue;
    }
    .main{
        overflow: hidden;
        height: 5em;
        position: fixed;
        width: 100%;
        top: 0em;
        left: 0em;
    }
    .tabBar{
        background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
        padding: 10px 0;
        white-space: nowrap;/*文本不会换行，文本会在在同一行上继续*/
        overflow-y: auto;/*可滑动*/
    }
    .box{
        width: 5em;
        margin-left: 8px;
        height: 2.5em;
        display: inline-block; /*行内块级元素*/
    }
    .box p{
        text-align: center;
        font-size: 16px;
        font-family: 'Courier New', Courier, monospace;
    }

    body{
        margin: 0;
        padding: 0;
    }
    .subtitle{
        font-size: 15px;
    }
    .bg{
        width: 100%;
        height: 3em;

        overflow: hidden;   /*父元素添加overflow*/
    }
    .bg p{
        text-align: center;
        color: white;
        font-size: 0.85em;
        margin-top: 1.85em;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        
    }
    .top-box{
        width:100%;
        height :5vh;
        background-image: linear-gradient(to top, #0ba360 0%, #3cba92 80%);
    }
    .time {
        font-size: 13px;
        color: #999;
    }
    
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    button{
        cursor: pointer;
        text-decoration: none;
    }


</style>
