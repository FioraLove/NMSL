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
            <el-main v-loading="loading">
                <el-row :gutter="15">
                    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" v-for='(row,index) in photoList' :key="index" style="margin-bottom:8px;">
                        <div class="card">
                            <div class="header">
                                <img v-lazy="row.src">
                            </div>
                            <div class="card_footer">
                                <div class="desc">
                                    <span :title="row.title">{{row.info}}</span>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
            <el-footer>
                <div class="next-page" ref="nextpages" style="display:none;"><el-button type="danger" round @click="loadPic">下一页</el-button></div>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
export default {
    name:"Artist",
    data() {
        return {
            id: this.$route.query.id,
            artistDetail: {},
            tableData: [],
            photoList: [],
            url: "",
            loading: false,
        }
    },

    mounted() {
        // url 预加载
        this.url = "https://api.acg-gov.com/public/search/users/illusts?id="+this.$route.query.id+"&offset=30";
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
            let vm = this;
            this.loading = true;
            // url预处理
            if (this.url == "" || this.url == null) {
                this.$refs.nextpages.style.display='none';
                return;
            }
            axios({
                method:"get",
                url: this.url,
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
                        let href = rows[index]["image_urls"]["large"];
                        obj["src"] = cover.replace("https://i.pximg.net","https://i.pixiv.cat");
                        obj["href"] = href.replace("https://i.pximg.net","https://i.pixiv.cat");
                        obj["info"] = rows[index]["title"];
                        items.push(obj);
                    }
                    vm.photoList = items;
                    // 判断是否加载完毕
                    let next_url = response.data.next_url;
                    if (next_url == '' || next_url == null) {
                        vm.url = '';
                        vm.$refs.nextpages.style.display='none';
                    }else{
                        vm.url = response.data.next_url;
                        vm.$refs.nextpages.style.display='block';
                    }
                    
                }
                vm.loading = false;
            })
            .catch(function (error) {
                console.log(error);
            });
        }
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
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #009966;
        font-size: 1em;
        cursor:auto;
        font-family: 'Times New Roman', Times, serif;
    }
    .next-page {
        width: 100%;
        text-align: center;
    }
</style>