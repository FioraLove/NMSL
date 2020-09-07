<template>
    <div class="axios-demo">
        <div class="bg">
            <p>家人们~~~🤕🤕🤕，抽象圣经，最简单的嘴臭，最极致的享受</p>
        </div>
        <div class="main">
            <p class="res">{{rows.content}}</p>
            <hr>    
        </div>
        <div class="btns">
            <el-button type="danger" plain @click="open">源代码</el-button>
            <el-button type="primary" @click="getContent()">切换</el-button>
            <el-button id="btn" type="success" :data-clipboard-text="rows.content">复制</el-button>
        </div>
    </div>
</template>



<script scope>

import  ClipboardJS  from '../assets/js/clipboard.min.js'
export default {
    name:"axios",
    data() {
        return {
            loading: false,
            rows:{},    // 嘴臭数据集
            currentPage: parseInt(Math.random()*100),     // 当前页数
            limit:1,    // limit偏差限制
            count:0,    // 返回数据量总数
        }
    },
    mounted() {
        this.getContent();
        this.clip();
    },
    methods: {
        clip:function () { 
            let btn = document.getElementById('btn');
            let clipboard = new ClipboardJS(btn);
            clipboard.on('success', function(e) {
                btn.innerText='已复制';
                setTimeout(function (){btn.innerText='复制'; },500);
            });
         },
        getContent:function () { 
            let app = this;
            axios({
                url:"xe9527/nmsl/ndsl/10/",
                method:"get",
                headers:{
                    "Content-Type": "application/json"
                },
                params:{
                    offset: (this.currentPage-1)*this.limit,
                    limit: this.limit
                }
            })
            .then(function(response){
                if(response.status == 200 && (app.currentPage) <= response.data.count ){
                    app.count = response.data.count;
                    app.rows = response.data.result[0];
                    app.currentPage++;
                }else{
                    app.rows = {"content":"暂无数据。。。"};
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        open:function(){
            const h = this.$createElement;
            this.$notify({
            title: '源代码',
            message: h('i', { style: 'color: teal'}, 'https://github.com/FioraLove/Python/blob/master/Python爬虫案例/嘴臭生成器.py ')
        });}
    }
}
</script>

<style scoped>
    .btns{
        margin-bottom: 5em;;
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
    .main{
        width: 85vw;
        height: 50vh;
        padding-right: 1em;
        padding-left: 1em;
        margin-right: auto;
        margin-left: auto;
    }
    .main p{
        padding: 8vh 5vh 5vh 5vh;
        font-size: large;
    }
    .axios-demo{
        text-align: center;
    }
</style>