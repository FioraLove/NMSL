<template>
  <div class="video">
    <!-- <el-container>
      <el-header>
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
          <el-menu-item index="4">
            <a href="https://www.ele.me" target="_blank">订单管理</a>
          </el-menu-item>
        </el-menu>
        </el-header>
        <el-main>
            
        </el-main>
    </el-container> -->
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
            <el-row :gutter="10" v-for="(array,i) in lists" :key="i">
                <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="4" v-for='(row,index) in array' :key="index" style="margin-top:20px;">
                    <a href="javascript:;"  rel="noopener noreferrer">
                        <el-card :body-style="{ padding: '0px' }" shadow="hover">
                            <img :src="row.pic" class="image" data-action="zoom">
                            <div style="padding: 14px;">
                                <span><b>{{row.title}}</b></span>
                                <div class="bottom clearfix">
                                    <span class="subtitle">{{row.contents}}</span>
                                </div>
                            </div>
                        </el-card>
                    </a>
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
            rows:[{
                    title:"嘴臭生成器",
                    pic:"https://cdn.jsdelivr.net/gh/FioraLove/Images/1a97ae8b1294b307dced650f396fc22e.jpg",
                    contents:"#最简单的嘴臭，最极致的享受#",
                    url:"/loveword"
                },{
                    title:"浮生日记",
                    pic: require("../assets/images/nmsl.jpeg"),
                    contents:"谎言不会伤人，真相才是快刀🔪",
                    url:"/media"
                },{
                    title:"雪之下雪乃",
                    pic: require("../assets/images/nmsl.jpeg"),
                    contents:"西蒂蒙，冲🚴🚴",
                    url:"/video"
                },{
                    title:"NMSL",
                    pic: require("../assets/images/nmsl.jpeg"),
                    contents:"命数如织，当为磐石",
                    url:"/ndsl"
                },{
                    title:"浮生日记",
                    pic: require("../assets/images/nmsl.jpeg"),
                    contents:"谎言不会伤人，真相才是快刀🔪",
                    url:"/media"
                },{
                    title:"雪之下雪乃",
                    pic: require("../assets/images/nmsl.jpeg"),
                    contents:"西蒂蒙，冲🚴🚴",
                    url:"/video"
                },{
                    title:"嘴臭生成器",
                    pic:"https://cdn.jsdelivr.net/gh/FioraLove/Images/1a97ae8b1294b307dced650f396fc22e.jpg",
                    contents:"#最简单的嘴臭，最极致的享受#",
                    url:"/loveword"
                },{
                    title:"浮生日记",
                    pic: require("../assets/images/nmsl.jpeg"),
                    contents:"谎言不会伤人，真相才是快刀🔪",
                    url:"/media"
                },{
                    title:"雪之下雪乃",
                    pic: require("../assets/images/nmsl.jpeg"),
                    contents:"西蒂蒙，冲🚴🚴",
                    url:"/video"
                },{
                    title:"NMSL",
                    pic: require("../assets/images/nmsl.jpeg"),
                    contents:"命数如织，当为磐石",
                    url:"/ndsl"
                },{
                    title:"浮生日记",
                    pic: require("../assets/images/nmsl.jpeg"),
                    contents:"谎言不会伤人，真相才是快刀🔪",
                    url:"/media"
                },{
                    title:"雪之下雪乃",
                    pic: require("../assets/images/nmsl.jpeg"),
                    contents:"西蒂蒙，冲🚴🚴",
                    url:"/video"
                },{
                    title:"嘴臭生成器",
                    pic:"https://cdn.jsdelivr.net/gh/FioraLove/Images/1a97ae8b1294b307dced650f396fc22e.jpg",
                    contents:"#最简单的嘴臭，最极致的享受#",
                    url:"/loveword"
                },{
                    title:"浮生日记",
                    pic: require("../assets/images/nmsl.jpeg"),
                    contents:"谎言不会伤人，真相才是快刀🔪",
                    url:"/media"
                },{
                    title:"雪之下雪乃",
                    pic: require("../assets/images/nmsl.jpeg"),
                    contents:"西蒂蒙，冲🚴🚴",
                    url:"/video"
                },{
                    title:"NMSL",
                    pic: require("../assets/images/nmsl.jpeg"),
                    contents:"命数如织，当为磐石",
                    url:"/ndsl"
                },{
                    title:"浮生日记",
                    pic: require("../assets/images/nmsl.jpeg"),
                    contents:"谎言不会伤人，真相才是快刀🔪",
                    url:"/media"
                },{
                    title:"雪之下雪乃",
                    pic: require("../assets/images/nmsl.jpeg"),
                    contents:"西蒂蒙，冲🚴🚴",
                    url:"/video"
                }],
            lists:[]
        };
    },
    mounted:function(){
        this.deal_array();
        this.deal_aside();
        this.resizeChart();         //添加窗口变化监听事件   
    },
    conputed:{

    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        //重设图表高宽
        resizeChart(){
            //监听窗口高宽变化，注意要使用箭头函数
            window.onresize = () => {
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
        deal_aside:function() { 
            if(! this.isPC()){
                this.$refs.side.$el.style.display="none";
                this.$refs.side1.$el.style.display="none";
            }
        }
    }
};
</script>

<style scope>
    .el-menu{
        text-align: center;
    }
    .image {
        width: 100%;
        display: block;
    }
    a{
        text-decoration: none;
    }
</style>





