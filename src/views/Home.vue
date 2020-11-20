<template>
    <!--组件有且只有一个根标签-->
    <div class="home">
        <div class="bg"></div>
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <!-- 头像模块 -->
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <div class="card">
                            <div class="header">
                                <a href="javascript:;" title="AhriLove"><img src="https://cdn.jsdelivr.net/gh/FioraLove/Images/seraphines.jpg" alt=""></a>
                            </div>

                            <div class="card_footer">
                                <div class="title">
                                    <span>AhriLove</span>
                                </div>
                            </div>
                        </div>
                        <div class="author">
                            <span><b>我一路向北，离开有你的季节</b></span><br><br>
                            <span>一个野生自学者 经常分享学习心得</span>
                        </div>
                        <hr style="width:18em;margin-left:0px;">
                        <div class="skill">
                            <div class="process">
                                <div style="float:left;width:20%;margin-top:12px;"><img src="../assets/images/html.png"></div>
                                <div style="float:left;width:70%;margin-left:1em;">
                                    <p style="width:12em;color:hsla(0,0%,100%,.85);">HTML5</p> 
                                    <div style="width:60%;background-color:yellow;height:4px;"></div>
                                </div>
                            </div>
                            
                            <div class="process">
                                <div style="float:left;width:20%;margin-top:12px;"><img src="../assets/images/python.png"></div>
                                <div style="float:left;width:70%;margin-left:1em;">
                                    <p style="width:12em;color:hsla(0,0%,100%,.85);">Python</p> 
                                    <div style="width:90%;background-color:yellow;height:4px;"></div>
                                </div>
                            </div>
                            
                            <div class="process">
                                <div style="float:left;width:20%;margin-top:12px;"><img src="../assets/images/spider.png"></div>
                                <div style="float:left;width:70%;margin-left:1em;">
                                    <p style="width:12em;color:hsla(0,0%,100%,.85);">Python爬虫</p> 
                                    <div style="width:75%;background-color:yellow;height:4px;"></div>
                                </div>
                            </div>
                            <div class="process">
                                <div style="float:left;width:20%;margin-top:12px;"><img src="../assets/images/vuejs.png"></div>
                                <div style="float:left;width:70%;margin-left:1em;">
                                    <p style="width:12em;color:hsla(0,0%,100%,.85);">Vue.js</p> 
                                    <!-- 下面的width的属性决定进度条多宽 -->
                                    <div style="width:40%;background-color:yellow;height:4px;"></div>
                                </div>
                            </div>
                            <div class="process">
                                <div style="float:left;width:20%;margin-top:12px;"><img src="../assets/images/java.png"></div>
                                <div style="float:left;width:70%;margin-left:1em;">
                                    <p style="width:12em;color:hsla(0,0%,100%,.85);">Java</p> 
                                    <!-- 下面的width的属性决定进度条多宽 -->
                                    <div style="width:35%;background-color:yellow;height:4px;"></div>
                                </div>
                            </div>
                            <div class="process">
                                <div style="float:left;width:20%;margin-top:12px;"><img src="../assets/images/docker.png"></div>
                                <div style="float:left;width:70%;margin-left:1em;">
                                    <p style="width:12em;color:hsla(0,0%,100%,.85);">Docker</p> 
                                    <!-- 下面的width的属性决定进度条多宽 -->
                                    <div style="width:40%;background-color:yellow;height:4px;"></div>
                                </div>
                            </div>
                        </div>
                    </el-col>

                    <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                            <p><b style="color:#f05b72;font-size:1.25em;">动态更新</b></p>
                            <hr>
                            <div class="tabBa">
                                <div class="per-video" :style="{ height:bodyHeight + 'px'}" v-loading="loading">
                                    <template v-for="(row,index) in results">
                                        <div class="bilibili" :key="index">
                                            <div class="bilipic"><img v-lazy="'http:'+row.pic"></div>
                                            <div class="bilibox">
                                                <p class="bilititle">{{row.title}}</p> 
                                                <div><a :href="'https://www.bilibili.com/video/'+row.bvid" target="_blank"><el-button type="primary" size="mini">BILIBILI观看</el-button></a></div>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <div class="follow">
                                <div><p class="star"><a href="https://space.bilibili.com/215893581/" target="_blank"><span><i class="el-icon-s-promotion"></i>关注我</span></a></p></div>
                                <div class="dona"><p class="donations" @click="open()"><a href="javascript:;"><span><i class="el-icon-coffee-cup"></i>赞赏我</span></a></p></div>
                            </div>
                    </el-col>
                </el-row>
                
            </el-main>
            <el-footer style="height:1.25em;">
                <div style="text-align:center;color:hsla(0,0%,100%,.85);font-family: Roboto,sans-serif;">Copyright © 2019-{{nowYear}} AhriLove·鳄鱼邦邦</div>
            </el-footer>
        </el-container>
        
        <!-- 导航栏模块 -->
        <div class="main">
            <div class="tabBar">
                <template v-for='(row,index) in rows'>
                    <div class="box" :key="index" v-if="row.url == '/pixivs' " @click="send">
                        <a href="javascript:;" target="_self"><p>{{row.content}}</p></a>
                        <!-- <a :href="row.url" target="_self"><p>{{row.content}}</p></a> -->
                    </div>
                    <div class="box" :key="index" v-else>
                        <a :href="row.url" target="_blank" v-if="row.content == '联系我'"><p>{{row.content}}</p></a>
                        <a :href="row.url" target="_self" v-else><p>{{row.content}}</p></a>
                    </div>
                </template>
                <div class="box" @click="send">
                    <a href="javascript:;"><p style="color:#F90;font-weight:700;">Pornbar</p></a>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
// 组件 .vue 文件：模板(template) + 脚本(scpirt) + 样式(style)
// 导入自定义的组件
import HelloWorld from '@/components/HelloWorld.vue';
import {toast} from "../assets/js/toast.js";
export default {
    name: 'Home',
    components: {
        HelloWorld
    },

    data(){
        return {
            nowYear:new Date().getFullYear(),
            bodyHeight:100,
            loading: true,
            rows:[{
                    content:"主页",
                    url:"/"
                },{
                    content:"热榜",
                    url:"/news"
                },{
                    content:"漫画",
                    url:"/comic"
                },{
                    content:"音乐",
                    url:"/audio"
                },{
                    content:"Pixiv",
                    url:"/pixiv"
                },{
                    content:"短视频解析",
                    url:"/parse"
                },{
                    content:"抽象圣经",
                    url:"/ndsl"
                },{
                    content:"在线工具",
                    url:"/tools"
                },{
                    url:"https://github.com/FioraLove",
                    content:"Github"
                },{
                    url: "/comments",
                    content:"留言板"
                },{
                    url:"http://wpa.qq.com/msgrd?v=3&uin=3434279505&site=qq&menu=yes",
                    content:"联系我"
                }],
            api: this.FACTURL.baseUrl+"/nmsl/bilibili/",
            results:[]
           
        }
    },

    mounted() {
        this.bodyHeight = document.documentElement.clientHeight-220;
        this.getContent;
    },
    computed:{
        // 发送Ajax请求
        getContent:function () {
            let app = this;
            axios({
                url:this.api,
                method:"get"
            })
            .then(function(response){
                if(response.status == 200 && response.data.status==1){
                    app.loading = false;
                    app.results = (response.data).vlist;
                }else{
                    app.results = [];
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    methods: {
        open:function() {
            this.$alert('你的 <strong>点赞➕关注➕转发➕投币</strong><hr> 就是对我最大的鼓励', 'BILIBILI🍻[]~(￣▽￣)~*', {
               dangerouslyUseHTMLString: true
            });
        },
        send:function() {
            toast("因其特殊性，暂不对外开放，404哟！(ง •_•)ง \n  推荐: https://pixiviz.pwp.app/ \n https://www.acg-gov.com/");
        }

    }
}
</script>

<style lang="less" scoped>
    @import "../assets/css/toast.css";
    .home{
        background-image: url("../assets/images/background.png");
        background-attachment: fixed;
        background-size: cover;
        background-repeat: no-repeat;
        max-width:100vw;
    }

    .bilipic img{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }



    @media screen and (max-width:998px){
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
        .bilibox{
            width:84%;
            margin-left:5.5em;
        }
        .bilibili{
            width: 100%;
            height: 7em;
            margin-top: 8px;
        } 
        .bilipic{
            float:left;
            width:5em;
            height:3em;
            margin-top:1em;
        }
        .bilititle{
            width:90%;
            margin-top:0px;
            margin-bottom:8px;
            // overflow:hidden;
            // text-overflow: ellipsis;
            // white-space: nowrap;
            color:#d3c6a6;
        }
        .donations{
            float:left;
            width:100%;
            height:1.86em;
            cursor: pointer;
            font-size: 1.5em;
            border-radius: 6px;
            background-color: #fba540;
            font-family: 'Courier New', Courier, monospace;
            margin: 0px;
        }
        .donations:hover{
            float:left;
            width:100%;
            height:1.86em;
            font-size: 1.5em;
            background-color:rgba(177, 172, 172, 0.3);
            font-family: 'Courier New', Courier, monospace;
            margin: 0px;
        }
        .dona{
            margin-left:10px;
        }                  
    }
    @media screen and (min-width:999px){
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
        .bilibox{
            float:left;
            width:84%;
            margin-left:1em;
        }
        .bilibili{
            width: 100%;
            height: 5.2em;
            margin-top: 8px;
        } 
        .bilipic{
            float:left;
            width:5em;
            height:3em;
            text-align:center;
        }
        .bilititle{
            width:90%;
            margin-top:0px;
            margin-bottom:8px;
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color:#d3c6a6;
        }
        .donations{
            float:left;
            width:100%;
            height:1.86em;
            cursor: pointer;
            font-size: 1.5em;
            border-radius: 6px;
            background-color: #fba540;
            font-family: 'Courier New', Courier, monospace;
            margin: 0px;
        }
        .donations:hover{
            float:left;
            width:100%;
            height:1.86em;
            font-size: 1.5em;
            background-color:rgba(177, 172, 172, 0.3);
            font-family: 'Courier New', Courier, monospace;
            margin: 0px;
        }
        .dona{
            margin-left:3em;
        }                             
    }


    .follow{
        width: 100%;
        height:5em;
        margin-top: 1em;
        padding:0 6px 0 6px
    }
    .follow div{
        float:left;
        width: 40%;
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
        position: relative;
        top:8px;
    }

    .bilibili img{
        width: 100%;
        object-fit: cover; 
        object-position: left;  
    }
    .tabBa{
        width:100%;
        overflow: hidden;
        background-color:transparent;
    }
    .per-video{
        padding: 8px;
        width: 100%;
        overflow-y:scroll
    }
    .per-video::-webkit-scrollbar {/*滚动条整体样式*/
        width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
        scrollbar-arrow-color:red;
    }
    
    .skill{
        padding: 10px;
        width:100%;
    }
    .skill .process{
        height: 3.8em;
        width:20em;
    }
    .process img{
        width: 70%;
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
        margin-left: 1em;
        margin-right: 6px;
        height: 2.5em;
        display: inline-block; /*行内块级元素*/
    }
    .box p{
        text-align: center;
        font-size: 18px;
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
        height: 2.5em;

        overflow: hidden;   /*父元素添加overflow*/
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
