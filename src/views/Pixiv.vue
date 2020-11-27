<template>
  <div class="pixiv">
        <el-row :gutter="10" style="padding-top:1em;margin:0px;">
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <p class="item-left">Pixiv</p>
            </el-col>
            <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
                <div class="search">
                    <input class="effect-1" type="text" placeholder="Placeholder Text" v-model="keyword"><i class="el-icon-s-promotion" @click="seek"></i>
                </div>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <p class="item-left" @click="showDetail" style="cursor:pointer;">排行榜</p>
            </el-col>
        </el-row>
        <el-container class="ranking" v-if="!willShow">
            <el-main>
                <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-s-fold"></i>
                            <span slot="title">排行榜</span>
                        </template>

                        <el-form ref="form" :model="form" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="日期">
                                <el-col>
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date"></el-date-picker>
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
                                <el-option label="每周工口" value="weekly_r18" disabled></el-option>
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
                                <el-slider v-model="form.page"  show-input :min="1" :max="max_pages" style="width: 90%;">
                                </el-slider>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">搜索</el-button>
                            </el-form-item>
                        </el-form>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-loading"></i>
                        <span slot="title">Demo</span>
                    </el-menu-item>
                </el-menu>
            </el-main>
        </el-container>
            <div class="search-content search-content-blocked" ref="warning" style="display:none;">
                <p>{{message}}</p>
            </div>
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
            <el-footer>
                <div class="next-page" ref="nextpages" style="display:none;"><el-button type="danger" round @click="loadNext">下一页</el-button></div>
            </el-footer>
        </el-container>
  </div>
</template>

<script>
import Vue from 'vue';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import {toast} from "../assets/js/toast.js";
Vue.use(Viewer);
export default {
    data() {
        name:"Pixiv";
        return {
            keyword:"",                         // 搜索关键词
            photoList: [],                      // 结果数据集
            isCollapse: false,
            message: "",
            offset: 0,
            max_pages: 10,
            willShow:true,
            form: {
                mode: '',
                region: '',
                date: '',
                page: 1,                        // 分页
            }
        };
    },

    //mounted页面DOM加载完毕，可用于初始化页面，执行一些初始化函数 
    mounted:function(){
        this.open();
    },
    destoryed: function(){

    },

    computed:{

    },
    methods: {
        showDetail:function(){
            if(this.willShow==true){
                this.willShow=false;
            }else{
                this.willShow=true;
            }
        },
        search:function (params) {
            let vm = this;
            axios({
                url:"https://api.acg-gov.com/public/ranking",
                method:"get",
                params:params,
                headers:{
                    token: this.FACTURL.pixiv_token
                }
            })
            .then(function(response){
                if (response.status == 200) {
                    if (response["data"]["status"] == "failure") {
                        toast(response["data"]["errors"]["system"]["message"]);
                        return false;
                    }
                    let result = response["data"]["response"][0]["works"];
                    let pages = response["data"]["pagination"]["pages"];
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
                    vm.max_pages = pages;
                    vm.photoList = rows;
                } else {
                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        // 自定义条件排行榜
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
        },

        // 搜索函数
        seek:function(){
            let vm = this;
            let flag_blocked = false;
            
            // 关键字是否为空
            if(this.keyword == '' || this.keyword == null){
                this.message = "关键字不可为空哟... ┑(￣Д ￣)┍ ";
                this.$refs.warning.style.display='block';
                this.$refs.nextpages.style.display='none';
                // 关键词为空时，查询
                return false;
            }

            // 屏蔽词检查
            const BLOCK_WORDS = [/r-?18/i, /18-?r/i, /色图/,/中出/,/自慰/,/射精/,/裸体/];
            for (let pattern of BLOCK_WORDS) {
                if (pattern.test(this.keyword)) {
                    flag_blocked = true;
                    break;
                }
            }
            if (flag_blocked) {
                this.message = "别搜了，这里真的没有色图...";
                this.$refs.warning.style.display='block';
                this.$refs.nextpages.style.display='none';
            } else {
                axios({
                    url:"https://api.acg-gov.com/public/search",
                    method:"get",
                    params: {
                        q: this.keyword,
                        offset: this.offset
                    },
                    headers:{
                        token: this.FACTURL.pixiv_token
                    }
                })
                .then(function(response){
                    if (response.status == 200) {
                        let result = response["data"]["illusts"];
                        // 对返回结果判断
                        if (result.length <1 && response["data"]["next_url"] == null ) {
                            vm.message = "数据加载已加载完毕 (●ˇ∀ˇ●) ";
                            vm.$refs.warning.style.display='block';
                            vm.$refs.nextpages.style.display='none';
                            // 清空数据
                            vm.photoList = [];
                        } else {
                            let rows = [];
                            for (let index = 0; index < result.length; index++) {
                                let obj = {};
                                obj["title"] = result[index]["title"];
                                let image_url = result[index]["image_urls"]["medium"];
                                // 处理图片路径
                                obj["url"] = image_url.replace("https://i.pximg.net","https://i.pixiv.cat");
                                rows.push(obj);
                            }
                            // 绑定数据
                            vm.photoList = rows;
                            vm.$refs.warning.style.display='none';
                            vm.$refs.nextpages.style.display='block';
                        }
                    } else {
                        
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },

        // 加载下一页
        loadNext:function(){
            this.offset = this.offset+30;
            this.seek();
        },

        // 弹窗提示
        open:function(){
            let letter = "本站服务器不会存放任何图片文件，搜索模块仅是实时转发p站图片。Pixiv在国内是无法访问的，但其却有很多的优秀作品。<br><br>"+
                    '<span style="font-weight: bold;">对心怀不轨者：</span><br>'+
                    '本站既不收费也没广告，完全开源，不会依赖这些图片来用于任何盈利性行为，如果这样都要举报的话，那我无话可说。<br><br>'+
                    '<span style="font-weight: bold;">对用户们：</span><br>'+
                    '请用户坚守网络正能量，树立以八荣八耻为主要内容的社会主义荣辱观，拒绝黄赌毒，从我做起<br><br>'+
                    '<span style="float: right;font-weight: bold;">2020.11.11 11:11</span><br>';
            this.$alert(letter, '致用户的一封信', {
                dangerouslyUseHTMLString: true
            });
        }
    },
    watch: {
        keyword:{
            handler: function (newVal, oldVal) {
                this.offset = 0;
            },
            deep: true
        },

    },
}
</script>

<style>
    .el-message-box {
        width: 340px !important;
    }
</style>
<style scoped>
    @import "../assets/css/toast.css";
    input::-webkit-input-placeholder { /* WebKit browsers */ 
        color: #da7a85;
        text-align: center;
        transition: 50ms;
        border-radius: 2rem;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: .05em;
    }
    input{
        color: #da7a85;
        text-align: center;
        transition: 50ms;
        letter-spacing: .05em;
    }
    input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #da7a85;
        text-align: center;
        transition: 50ms;
        border-radius: 2rem;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: .05em;
    }
    input::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #da7a85;
        text-align: center;
        transition: 50ms;
        border-radius: 2rem;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: .05em;
    }
    input:-ms-input-placeholder { /* Internet Explorer 10+ */ 
        color: #da7a85;
        text-align: center;
        transition: 50ms;
        border-radius: 2rem;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: .05em;
    }
    .search-content-blocked {
        width: 100%;
        text-align: center;
        margin-top: 1.8rem;
        color: #da7a85;
        font-weight: 700;
        filter: blur(0.6px);
    }
    .el-menu{
        background-color: transparent !important;
    }
    .next-page {
        width: 100%;
        text-align: center;
    }
    .el-form-item{
        margin-bottom: 8px !important;
    }
    input[type="text"]{
        font-size: 16px;
        font-weight: 600;
        color: #da7a85;
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
        min-height: 100vh;
    }
    .item-left{
        font-weight: 700;
        font-size: 1.35em;
        text-align: center;
        margin-bottom: 0px;
        margin-top: 8px;
        font-family: 'Raleway', Arial, sans-serif;
    }
    a{
        text-decoration: none;
        color: black;
    }
    @media screen and (max-width:480px){
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 100%;
            min-height: 100px;
        }
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
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 99%;
            min-height: 100px;
        }
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
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #009966;
        font-size: 1em;
        cursor:auto;
        font-family: 'Times New Roman', Times, serif;
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