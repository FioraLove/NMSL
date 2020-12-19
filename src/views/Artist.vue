<template>
    <div class="artist">
        <el-container>
            <el-main>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <!-- 作者基本信息模块 -->
                        <div class="artist-overview">
                            <div class="artist-overview-avatar">
                                <img :src="artistDetail.cover">
                            </div>
                            <div class="title">{{artistDetail.name}}</div>
                            <div class="content">
                                <el-table :data="tableData" style="width: 192.6px;margin: 0 auto;color: #da7a85;font-weight: 600;"  header-align="center">
                                    <el-table-column prop="illusts" label="插画" align="center" width="60"></el-table-column>
                                    <el-table-column prop="manga" label="漫画"   align="center" width="60"></el-table-column>
                                    <el-table-column prop="novels" label="小说"  align="center" width="60"></el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <!-- 简介描述模块 -->
                        <div class="artist-comment">
                            <pre>{{artistDetail.comment}}</pre>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>

        <el-container>
            <el-main v-loading="loading" class="images" v-viewer>
                <el-row :gutter="15">
                    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" v-for='(row,index) in photoList' :key="index" style="margin-bottom:8px;">
                        <div class="card">
                            <div class="header">
                                <img v-lazy="row.src" :data-origin="row.href">
                            </div>
                            <div class="card_footer">
                                <div class="desc">
                                    <span v-if="row.href == '' "><a href="javascript:;" target="_self">{{row.info}}</a></span>
                                    <span v-else><a :href="row.originalSize" target="_blank">{{row.info}}</a></span>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
            <el-footer>
                <div class="next-page">
                    <span ref="prepages" style="display:none;" >
                        <el-button type="danger" round @click="backPic">上一页</el-button>
                    </span>
                    <el-divider direction="horizontal" style="margin:8px 0px ! important;"></el-divider>
                    <span ref="nextpages" style="display:none;margin-bottom:1em">
                        <el-button type="danger" round @click="nextPic">下一页</el-button>
                    </span>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import Vue from 'vue';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
Vue.use(Viewer);
export default {
    name:"Artist",
    data() {
        return {
            id: this.$route.query.id,
            artistDetail: {},
            tableData: [],
            photoList: [],
            url: "",
            offset: 30,
            loading: false,
        }
    },

    mounted() {
        this.loadPic();
        this.getArtist();

    },
    methods: {
        // 查询作者相关信息
        getArtist: function(){
            // 判断id是否存在
            if (this.id == '' || this.id == null) {
                this.$message('作者id不存在或错误，请检查参数');
                return;
            }
            let vm = this;
            axios({
                method:"get",
                url: "https://api.acg-gov.com/public/search/users/details",
                params:{
                    id: this.id
                },
                headers:{
                    token: this.FACTURL.pixiv_token
                }
            })
            .then(function(response){
                if (response.status == 201 || response.status == 200) {
                    let info = response.data;
                    // 整理参数
                    let rsp = {
                        name: info["user"]["name"],
                        comment: info["user"]["comment"],
                        cover: info["user"]["profile_image_urls"]["medium"].replace("https://i.pximg.net","https://i.pixiv.cat"),
                    }
                    vm.tableData = [{
                        illusts: info["profile"]["total_illusts"],
                        manga: info["profile"]["total_manga"],
                        novels: info["profile"]["total_novels"],
                    }];
                    vm.artistDetail = rsp;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        // 查询目标id的作品集
        loadPic:function(){

            this.loading = true;
            let offset = this.offset;
            // offset预处理
            if ( offset == 0 || offset == null) {
                this.$refs.nextpages.style.display='none';
                this.$refs.prepages.style.display='none';
                return;
            }else if(offset == 30) {
                this.$refs.prepages.style.display='none';
            }else if(offset >= 60){
                this.$refs.prepages.style.display='block';
            }
            let vm = this;
            axios({
                method:"get",
                url: "https://api.acg-gov.com/public/search/users/illusts",
                params:{
                    id: this.id,
                    offset: this.offset
                },
                headers:{
                    token: this.FACTURL.pixiv_token
                }
            })
            .then(function(response){
                if (response.status == 201 || response.status == 200) {
                    let rows = response.data.illusts;
                    let items = [];
                    for (let index = 0; index < rows.length; index++) {
                        let obj = {};
                        let cover = rows[index]["image_urls"]["medium"];
                        let originalSize = rows[index]["meta_single_page"]["original_image_url"];
                        let href = "";
                        let original_image = "";
                        if (originalSize != null && originalSize != undefined) {
                            original_image = originalSize;
                            href = originalSize;
                        }

                        obj["src"] = cover.replace("https://i.pximg.net","https://i.pixiv.cat");
                        obj["originalSize"] = original_image.replace("https://i.pximg.net","https://i.pixiv.cat");
                        obj["href"] = href.replace("https://i.pximg.net","https://i.pixiv.cat");
                        obj["info"] = rows[index]["title"];
                        items.push(obj);
                    }
                    vm.photoList = items;
                    // 判断是否加载完毕
                    let next_url = response.data.next_url;
                    if (next_url == '' || next_url == null) {
                        vm.$refs.nextpages.style.display='none';
                    }else{
                        vm.$refs.nextpages.style.display='block';
                    }
                    
                }
                vm.loading = false;
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        // 加载下一页
        nextPic:function(){
            this.offset += 30;
        },
        // 回到上一页
        backPic:function(){
            this.offset -=30;
        }
    },
    watch: {
        offset:{
            handler: function (newVal, oldVal) {
                this.loadPic();
            },
            deep: true
        },
    },
}
</script>

<style scoped>
    .artist{
        width:100%;
        height:100%;
    }
    .artist-overview{
        width: 100%;
        flex-direction: column;
        align-items: center;
    }
    .artist-overview-avatar{
        width: 100%;
        height: 5em;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .artist-overview-avatar img{
        width: 80px;
        height:80px;
        border-radius: 40px;
    }
    .artist-comment{
        height: 14em;
        width: 100%;
        font-size: 14px;
        font-weight: 400;
        color: #da7a85;
        line-height: 24px;
        letter-spacing: .03rem;
        border-top: 1px dashed #da7a85;
        border-bottom: 1px dashed #da7a85;
        margin: 0px;
    }
    .artist-comment pre {
        max-height: 180px;
        overflow-x: hidden;
        overflow-y: scroll;
        margin: 16px 0;
        padding-right: 8px;
        white-space: pre-wrap;
    }
    .title{
        font-size: 26px;
        letter-spacing: .075rem;
        text-align: center;
        color: #da7a85;
        font-weight: 600;
        margin: 12px 0;
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
    .desc{
        margin-top: 8px;
        width:100%;
        height:1.5em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .next-page {
        width: 100%;
        text-align: center;
    }
    .desc span a{
        text-decoration: none;
        font-weight: 600;
        color: #009966;
        font-size: 0.95em;
        font-family: "Microsoft YaHei", "微软雅黑", "STHeiti", "WenQuanYi Micro Hei", SimSun, sans-serif;
    }
</style>