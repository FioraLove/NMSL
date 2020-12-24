<template>
  <div class="pixiv">
        <el-row :gutter="10" style="padding-top:1em;margin:0px;">
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <p class="item-left">Pixiv</p>
            </el-col>
            <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
                <div class="search">
                    <input class="effect-1" type="text" placeholder="Placeholder Text" v-model="keyword" @keyup.enter="seek"><i class="el-icon-s-promotion" @click="seek"></i>
                </div>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <p class="item-left"><span @click="showDetail" style="cursor:pointer;">排行榜</span></p>
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
        <el-container v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
            <el-main class="images">
                <el-row :gutter="15">
                    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" v-for='(row,index) in photoList' :key="index" style="margin-bottom:8px;">
                        <div class="card">
                            <div class="header" v-viewer>
                                <img v-lazy="row.url" :alt="row.title" class="img-cover">
                                <div class="count" v-if="row.page_count > 1">
                                    <img src="../assets/images/file.svg" class="animation">
                                    <span>{{row.page_count}}</span>
                                </div>
                            </div>
                            <div class="card_footer">
                                <div class="title">
                                    <span :title="row.title">{{row.title}}</span>
                                </div>
                                <div class="artist">
                                    <img :src="row.artist.cover" :alt="row.artist.id">
                                    <span><router-link target="_blank" :to="{path : '/artist', query : {id : row.artist.id}}">#{{row.artist.name}}#</router-link></span>
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
    name:"Pixiv",
    data() {
        return {
            keyword:"",                         // 搜索关键词
            photoList: [],                      // 结果数据集
            isCollapse: false,                  // 菜单是否折叠
            message: "",                        // 搜索关键词合法性校验结果提示
            loading: false,                     // 加载动画
            offset: 0,                          // 搜索起始页
            max_pages: 10,                      // 排行榜最大页数
            willShow:true,                      // 点击排行榜，展示/关闭 选择页面
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
        // 引入樱花特效
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://api.vvhan.com/api/snow';
        document.getElementsByTagName('head')[0].appendChild(script);
    },
    destoryed: function(){

    },

    computed:{

    },
    methods: {
        // 排行榜筛选条件显示/关闭函数
        showDetail:function(){
            if(this.willShow==true){
                this.willShow=false;
            }else{
                this.willShow=true;
            }
        },

        // 排行榜搜索函数
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
                console.log(response);
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
                        let authorInfo = {};
                        obj["title"] = result[index]["work"]["title"];
                        obj["page_count"] = result[index]["work"]["page_count"];
                        authorInfo["name"] = result[index]["work"]["user"]["name"];
                        authorInfo["id"] = result[index]["work"]["user"]["id"];
                        authorInfo["cover"] = (result[index]["work"]["user"]["profile_image_urls"]["px_50x50"].replace("https://i.pximg.net","https://i.pixiv.cat"));
                        obj["artist"] = authorInfo;
                        // 由于原图过大，导致加载缓慢，不得不使用带水印的中图
                        // let image_url = result[index]["work"]["image_urls"]["large"];
                        let image_url = result[index]["work"]["image_urls"]["px_480mw"];
                        // 替换Pixiv图片国外域名
                        obj["url"] = image_url.replace("https://i.pximg.net","https://i.pixiv.cat");
                        rows.push(obj);
                    }
                    // 绑定数据
                    vm.max_pages = pages;
                    vm.photoList = rows;
                    // 加载成功时，右下角提示
                    vm.remarkSuccess();
                } else {
                    vm.remarkError("错误状态："+response.status);
                }
            })
            .catch(function (error) {
                this.remarkError(error.toString());
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
            this.loading = true;
            // 关键字是否为空
            if(this.keyword == '' || this.keyword == null){
                this.message = "关键字不可为空哟... ┑(￣Д ￣)┍ ";
                this.$refs.warning.style.display='block';
                this.$refs.nextpages.style.display='none';
                this.loading = false;
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
                                let authorInfo = {};
                                obj["title"] = result[index]["title"];
                                obj["page_count"] = result[index]["page_count"];
                                authorInfo["name"] = result[index]["user"]["name"];
                                authorInfo["id"] = result[index]["user"]["id"];
                                authorInfo["cover"] = (result[index]["user"]["profile_image_urls"]["medium"].replace("https://i.pximg.net","https://i.pixiv.cat"));
                                obj["artist"] = authorInfo;
                                let image_url = result[index]["image_urls"]["medium"];
                                // 处理图片路径
                                obj["url"] = image_url.replace("https://i.pximg.net","https://i.pixiv.cat");
                                rows.push(obj);
                            }
                            // 绑定数据
                            vm.photoList = rows;
                            vm.$refs.warning.style.display='none';
                            vm.$refs.nextpages.style.display='block';
                            // 加载成功时，右下角提示
                            vm.remarkSuccess();
                        }
                    }
                    // 关闭加载动画
                    vm.loading = false;
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

        // 加载成功提示函数
        remarkSuccess(msg) {
            let message = "请耐心等待图片加载";
            if (msg != "" && msg != null) {
                message = msg
            }
            this.$notify({
                title: '数据获取成功',
                type: 'success',
                message: message,
                position: 'bottom-right'
            });
        },

        // 加载失败提示函数
        remarkError(msg) {
            let message = "≧ ﹏ ≦ 技术小哥正在处理中...";
            if (msg != "" && msg != null) {
                message = msg
            }
            this.$notify({
                title: '发生未知错误',
                type: 'error',
                message: message,
                position: 'bottom-right'
            });
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
    .header .count {
        position: absolute;
        display: inline-block;
        top: 8px;
        right: 8px;
        color: #fff;
        padding: 3px;
        background-color: rgba(0,0,0,.62);
        border-radius: 4px;
    }
    .count img {
        float: left;
        fill: #fff;
        height: 20px;
        width: 20px;
    }
    .count img:hover{
        width: 23px;
        height:23px;
    }
    .header img{
        transition: opacity .3s,transform .3s ease;
    }
    img.animation {
        -webkit-animation: lazy-animation .4s linear;
        animation: lazy-animation .4s linear;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
    }
    .count span {
        float: right;
        color: #fff;
        padding: 0 2px;
        line-height: 20px;
    }    
    @media screen and (max-width:480px){
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 100%;
            min-height: 100px;
        }
        .card{
            max-width: 100%;
            height: 16em;
            position: relative;
        }
        .card .header img.img-cover{
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
            height: 22em;
            position: relative;
            cursor: pointer;
        }
        .card .header img.img-cover{
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
    .artist{
        width:100%;
        height:30px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #009966;
        font-size: 0.85em;
        cursor:auto;
        font-family: 'Times New Roman', Times, serif;
    }
    .artist img{
        width:30px;
        height:30px;
        border-radius: 15px;
        margin-right: 5px;
        vertical-align: middle;
    }
    a{
        text-decoration: none;
    }
    .artist a{
        color: #009966;
    }
    .artist span{
        cursor: pointer;
        vertical-align: middle;
        width:100%;
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
    .images{
        min-height: 84vh;
    }
    .item-left span:hover{
        color: #da7a85;
    }
</style>