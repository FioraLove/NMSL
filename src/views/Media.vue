<template>
  <div class="video">
    <el-row :gutter="10">


        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            </el-menu>       
        </el-col>
    </el-row>
    <div class="line"></div>
    <el-container>
        <el-aside width="3em" ref="side">Aside</el-aside>
        <el-main>
            <el-row :gutter="15">
                <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" v-for='(row,index) in rows' :key="index" style="margin-top:10px;">
                    <div class="card">
                        <div class="header">
                            <a :href="row.url" :title="row.title"><img :src="row.pic" alt=""></a>
                        </div>
                        <div class="card_date">
                            <span>{{row.score}}</span>
                        </div>
                        <div class="card_update">
                            <span>{{row.update}}</span>
                        </div>
                        <div class="card_footer">
                            <div class="title">
                                <span><a :href="row.url" target="_self" :title="row.title">{{row.title}}</a></span>
                            </div>
                            <div class="author">
                                <span>{{row.author}}</span>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>

        </el-main>
        <el-aside width="200px" ref="side1">Aside</el-aside>
    </el-container>
    
  </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: "1",
            activeIndex2: "1",
            bodyWidth:1920,
            loading:true,
            rows:[{
                    title:"嘴臭生成器",
                    pic:"https://rpg.pic-imges.com/pic/upload/vod/2020-04/1586271875.jpg",
                    contents:"#最简单的嘴臭，最极致的享受#",
                    url:"/loveword",
                    author:"石见舞菜香,岛崎信长,内田雄...",
                    score: (Math.random()*10).toFixed(1),
                    update: "更新到"+Math.ceil(Math.random()*233)+"集",
                },{
                    title:"嘴臭生成器",
                    pic:"https://rpg.pic-imges.com/pic/upload/vod/2020-04/1586271875.jpg",
                    contents:"#最简单的嘴臭，最极致的享受#",
                    url:"/loveword",
                    author:"石见舞菜香,岛崎信长,内田雄...",
                    score: (Math.random()*10).toFixed(1),
                    update: "更新到"+Math.ceil(Math.random()*233)+"集",
                },{
                    title:"嘴臭生成器",
                    pic:"https://rpg.pic-imges.com/pic/upload/vod/2020-04/1586271875.jpg",
                    contents:"#最简单的嘴臭，最极致的享受#",
                    url:"/loveword",
                    author:"石见舞菜香,岛崎信长,内田雄...",
                    score: (Math.random()*10).toFixed(1),
                    update: "更新到"+Math.ceil(Math.random()*233)+"集",
                },{
                    title:"嘴臭生成器",
                    pic:"https://rpg.pic-imges.com/pic/upload/vod/2020-04/1586271875.jpg",
                    contents:"#最简单的嘴臭，最极致的享受#",
                    url:"/loveword",
                    author:"石见舞菜香,岛崎信长,内田雄...",
                    score: (Math.random()*10).toFixed(1),
                    update: "更新到"+Math.ceil(Math.random()*233)+"集",
                },{
                    title:"嘴臭生成器",
                    pic:"https://rpg.pic-imges.com/pic/upload/vod/2020-04/1586271875.jpg",
                    contents:"#最简单的嘴臭，最极致的享受#",
                    url:"/loveword",
                    author:"石见舞菜香,岛崎信长,内田雄...",
                    score: (Math.random()*10).toFixed(1),
                    update: "更新到"+Math.ceil(Math.random()*233)+"集",
                },{
                    title:"嘴臭生成器",
                    pic:"https://rpg.pic-imges.com/pic/upload/vod/2020-04/1586271875.jpg",
                    contents:"#最简单的嘴臭，最极致的享受#",
                    url:"/loveword",
                    author:"石见舞菜香,岛崎信长,内田雄...",
                    score: (Math.random()*10).toFixed(1),
                    update: "更新到"+Math.ceil(Math.random()*233)+"集",
                },{
                    title:"嘴臭生成器",
                    pic:"https://rpg.pic-imges.com/pic/upload/vod/2020-04/1586271875.jpg",
                    contents:"#最简单的嘴臭，最极致的享受#",
                    url:"/loveword",
                    author:"石见舞菜香,岛崎信长,内田雄...",
                    score: (Math.random()*10).toFixed(1),
                    update: "更新到"+Math.ceil(Math.random()*233)+"集"
                },{
                    title:"嘴臭生成器",
                    pic:"https://rpg.pic-imges.com/pic/upload/vod/2020-04/1586271875.jpg",
                    contents:"#最简单的嘴臭，最极致的享受#",
                    url:"/loveword",
                    author:"石见舞菜香,岛崎信长,内田雄...",
                    score: (Math.random()*10).toFixed(1),
                    update: "更新到"+Math.ceil(Math.random()*233)+"集"
                }],
            lists:[]
        };
    },
    mounted:function(){
        this.deal_array();
        this.resizeChart();         //添加窗口变化监听事件   
        this.deal_aside;
    },
    destoryed: function(){
        // 解除监听事件
        window.onresize = null;
    },

    computed:{
        // 窗口变化监听事件
        deal_aside:function() {
             
            window.onresize = () => {
                return (() => {
                this.bodyWidth = document.documentElement.clientWidth;
                if(this.bodyWidth <= 992){
                    this.$refs.side.$el.style.display="none";
                    this.$refs.side1.$el.style.display="none";
                }else{
                    this.$refs.side.$el.style.display="block";
                    this.$refs.side1.$el.style.display="block";
                }
                })();
            }
        }

    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        //重设图表高宽
        resizeChart(){
            //监听窗口高宽变化，注意要使用箭头函数
            window.onresize = () =>{
            };
        },

        deal_array:function() {
            // 定义一个空数组
            let a = this.rows;
            let b = [];
            for (let index = 0; index < a.length; index+=4) {
                b.push(a.slice(index,index+4));
            }
            // 绑定数组
            this.lists = b;
        },
        isPC:function(){  
            let userAgentInfo = navigator.userAgent;
            let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];  
            let flag = true;  
            for (let v = 0; v < Agents.length; v++) {  
                if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
            }  
            return flag;
        },

    },
    watch: {
        
    },
};
</script>

<style scope>
    a{
        text-decoration: none;
        color: black;
    }
    .card{
        max-width: 11.8em;
        height: 18.7em;
        position: relative;
    }

    .card .header{
        width: 100%;
        height: 13.7em;


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
        margin-top: 1em;
        width:100%;
        height:1.5em;
        overflow-y: hidden;
        overflow-x: hidden;
        color: black;
        font-size: 1em;
    }
    .author{
        margin-top: 1em;
        font-size: 12px;

    }
    span{
         font-family: "Microsoft YaHei", "微软雅黑", "STHeiti", "WenQuanYi Micro Hei", SimSun, sans-serif;
    }

</style>





