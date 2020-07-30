<template>
    <!--组件有且只有一个根标签-->
    <div class="home">
        <div class="bg">
            <p>家人们~~~🤕🤕🤕，抽象圣经，最简单的嘴臭，最极致的享受</p>
        </div>
        <el-container style="padding: 1em;">
            <el-header style="height:20px;width:100%;">
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div class="top-box"></div>
                    </el-col>
                </el-row>
            </el-header>

            <el-main>
                <!---gutter表示栅栏间隔-->
                <el-row :gutter="30">
                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="(o) in 4" :key="o" style="margin-top:12px;">
                        <el-card :body-style="{ padding: '0px' }">
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" data-action="zoom">
                        <div style="padding: 14px;">
                            <span>好吃的汉堡</span>
                            <div class="bottom clearfix">
                            <time class="time">{{ currentDate }}</time>
                            <el-button type="text" class="button" @click="goUser2(o,'chd')">操作按钮</el-button>
                            </div>
                        </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>    

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
    data(){
        return {
            msg:"牛蛙点点",
            age:18,
            currentDate:new Date()
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
    }
}
</script>

<style scoped>
    body{
        margin: 0;
        padding: 0;
    }
    .bg{
        width: 100%;
        height: 4em;
        background-color: black;
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

    .clearfix:before, .clearfix:after {
        display: table;
        content: "";
    }
    
    .clearfix:after {
        clear: both
    }
</style>
