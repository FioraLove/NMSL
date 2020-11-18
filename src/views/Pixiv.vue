<template>
  <div class="pixiv">
        <el-row :gutter="10" style="padding-top:1em;margin:0px;">
            <el-col :xs="6" :sm="6" :md="6" :lg="8" :xl="6">
                <p class="item-left">Pixiv</p>
            </el-col>
            <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
                <div class="search">
                    <input class="effect-1" type="text" placeholder="Placeholder Text" v-model="keyword"><i class="el-icon-s-promotion"></i>
                </div>
            </el-col>
        </el-row>
        <el-container>
            <el-main>
                <el-form ref="form" :model="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="日期">
                    <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="模式">
                    <el-select v-model="form.mode" placeholder="请选择模式">
                    <el-option label="每日" value="daily"></el-option>
                    <el-option label="每周" value="weekly"></el-option>
                    <el-option label="每月" value="monthly"></el-option>
                    <el-option label="新画师" value="rookie"></el-option>
                    <el-option label="原创" value="original"></el-option>
                    <el-option label="男性向" value="male"></el-option>
                    <el-option label="女性向" value="female"></el-option>
                    <el-option label="每日工口" value="daily_r18" disabled></el-option>
                    <el-option label="每周工口" value="weekly_r18"></el-option>
                    <el-option label="男性工口" value="male_r18" disabled></el-option>
                    <el-option label="女性腐向" value="female_r18" disabled></el-option>
                    <el-option label="工口加强型（猎奇）" value="r18g" disabled></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排行榜类别">
                    <el-select v-model="form.region" placeholder="请选择排行榜类别">
                    <el-option label="所有" value="all"></el-option>
                    <el-option label="插画" value="illust"></el-option>
                    <el-option label="漫画" value="manga"></el-option>
                    <el-option label="动图" value="ugoira"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="起始页">
                    <el-slider v-model="form.page"  show-input :min="1" :max="10">
                    </el-slider>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                </el-form-item>
                </el-form>
            </el-main>
        </el-container>
        <el-container>
            <el-main class="images"  v-viewer>
                <el-row :gutter="15">
                    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" v-for='(row,index) in photoList' :key="index" style="margin-bottom:8px;">
                        <div class="card">
                            <div class="header">
                                <img v-lazy="row.url">
                            </div>
                            <div class="card_footer">
                                <div class="title">
                                    <span :title="row.title">{{row.title}}</span>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
  </div>
</template>

<script>
import Vue from 'vue';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
Vue.use(Viewer);
export default {
    data() {
        name:"Pixiv";
        return {
            keyword:"",                 // 搜索关键词
            photoList: [],
            ranking_type: "",
            mode: "",
            date: "",
            form: {
                mode: '',
                region: '',
                date: '',
                page: 1,                    // 分页
            }
        };
    },

    //mounted页面DOM加载完毕，可用于初始化页面，执行一些初始化函数 
    mounted:function(){

    },
    destoryed: function(){

    },

    computed:{

    },
    methods: {
        search:function (params) {
            let vm = this;
            axios({
                url:"https://api.acg-gov.com/public/ranking",
                method:"get",
                params:params,
                headers:{
                    token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJCYWR3b21hbiIsInV1aWQiOiI0MDdkZDNhN2ZiZGE0OGQ2YTc0ZmZhOTA1OWE4MjQ0NSIsI"
                        +"mlhdCI6MTYwNTY5MzY3MywiYWNjb3VudCI6IntcImVtYWlsXCI6XCI5ODA3MTA0MjVAcXEuY29tXCIsXCJnZW5kZXJcIjotMSxcImhhc"
                        +"1Byb25cIjowLFwiaWRcIjozODgsXCJwYXNzV29yZFwiOlwiNmI0MzA4ZTc2MjQ4OWQ4NmZkOTgxNTFmYmI0NzZkMmVcIixcInN0YXR1c1"
                        +"wiOjAsXCJ1c2VyTmFtZVwiOlwiQmFkd29tYW5cIn0iLCJqdGkiOiIzODgifQ.xAZKG5COJvneTEBI0Uxs6OgcbTrKhV7XtIZqzNhOwpU"
                }
            })
            .then(function(response){
                if (response.status == 200) {
                    let result = response["data"]["response"][0]["works"];
                    
                    let rows = [];
                    for (let index = 0; index < result.length; index++) {
                        let obj = {};
                        obj["title"] = result[index]["work"]["title"];
                        // 由于原图过大，导致加载缓慢，不得不使用带水印的中图
                        // let image_url = result[index]["work"]["image_urls"]["large"];
                        let image_url = result[index]["work"]["image_urls"]["px_480mw"];
                        // 处理图片路径
                        obj["url"] = image_url.replace("https://i.pximg.net","https://i.pixiv.cat");
                        rows.push(obj);
                    }
                    // 绑定数据
                    vm.photoList = rows;
                } else {
                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        onSubmit:function(){
            let form = this.form;
            let date = form.date;
            let y = date.getFullYear();  
            let m = date.getMonth() + 1;  
            m = m < 10 ? ('0' + m) : m;  
            let d = date.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            let timer = y + '-' + m + '-' + d;
            let params = {
                ranking_type: form.region,
                mode: form.mode,
                date: timer,
                per_page: 30,
                page: form.page
            }
            this.search(params);
        }
    },
    watch: {

    },
};
</script>

<style scoped>
    input[type="text"]{
        font: 15px/24px "Lato", Arial, sans-serif;
        color: #333;
        width: 85%;
        box-sizing: border-box;
        letter-spacing: 1px;
    }
    .effect-1{
        border: 0;
        padding: 4px 0;
        border-bottom: 1px solid #da7a85;
        background-color: transparent;
        outline: none;
    }
    .search{
        text-align: center;
    }
    .search i{
        font-size: 28px;
        color: #da7a85;
        cursor: pointer;
    }
    .pixiv{
        background: #f9f7f6;
    }
    .item-left{
        font-weight: 700;

        font-size: 1.35em;
        margin: 12px 0px 0px 1em ;
        font-family: 'Raleway', Arial, sans-serif;
    }
    a{
        text-decoration: none;
        color: black;
    }
    @media screen and (max-width:480px){
        .card{
            max-width: 100%;
            height: 14em;
            position: relative;
        }
        .card .header img{
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: 6px;
            box-shadow: 4px 4px 5px rgba(177, 172, 172, 0.6);
        }
        .card .header{
            width: 100%;
            height: 11.8em;
        }
        .card .card_update{
            position:absolute;
            left: 3px;
            bottom: 3.2em;
        }    
    }
    @media screen and (min-width:481px){
        .card{
            max-width: 100%;
            height: 20em;
            position: relative;
            cursor: pointer;
        }
        .card .header img{
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: 6px;
            box-shadow: 4px 4px 5px rgba(177, 172, 172, 0.6);
        }
        .card .header{
            width: 100%;
            height: 18em;
            cursor: pointer;
        }
        .card .card_update{
            position:absolute;
            left: 3px;
            bottom: 5.2em;
        }  
    }

    .card .card_date{
        position:absolute;
        right: 3px;
        top: 3px;

        background-color: coral;
        border-radius: 20%;
    }

    .card_date span{
        text-transform: uppercase;
        font-size: 18px;

    }
    .card_update span{
        text-transform: uppercase;
        font-size: 13px;
        color: #ed1941;
    }
    .title{
        margin-top: 8px;
        width:100%;
        height:1.5em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: black;
        font-size: 1em;
    }
    .author{
        margin-top: 1em;
        font-size: 11px;

    }
    .author el-rate{
        font-size: 8px;
    }
    span{
         font-family: "Microsoft YaHei", "微软雅黑", "STHeiti", "WenQuanYi Micro Hei", SimSun, sans-serif;
    }
</style>