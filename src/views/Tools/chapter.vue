<template>
    <div class="chapter">
        <el-container>
            <el-main class="images"  v-viewer>
                <el-row :gutter="15">
                    <template v-if="flag">
                        <div class="box" v-for="(row,index) in img_list" :key="index" ><img style="width:640px;" v-lazy="row"></div>
                    </template>
                    <template v-else>
                        <div class="box" v-for="(row,index) in img_list" :key="index" ><img style="width:100vw;" v-lazy="row"></div>
                    </template>
                </el-row>
                <el-backtop target=".chapter" :bottom="100">
                    <div class="backtops">
                        <div class="backtops">UP</div>
                    </div>
                </el-backtop>
            </el-main>
        </el-container>


    </div>
</template>


<script>
import { Base64 } from 'js-base64';
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';
import Vue from 'vue';
Vue.use(Viewer)
export default {
    data() {
        name:"Chapter"
        return {
            sid: '',
            cid: '',
            img_list: [],
            loading: true,
            flag:true,                      // 是否是PC端
        }
    },
    
    mounted() {
        this.sid=this.$route.query.sid;
        this.cid=this.$route.query.cid;
        this.isPC();
        this.getContent();
    },

    computed: {

    },

    methods: {
        isPC:function(){  
            let userAgentInfo = navigator.userAgent;
            let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];  
            let flag = true;  
            for (let v = 0; v < Agents.length; v++) {  
                if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
            }  
            this.flag = flag;
        },

        // 发送Ajax请求
        getContent:function(){
            let vm = this;
            axios({
                url: this.FACTURL.baseUrl+"/nmsl/api/comic/chapter/",
                method:"get",
                params:{
                    uid: Base64.encode(this.sid),
                    cid: this.cid
                }
            })
            .then(function(response){
                vm.loading = true;
                if(response.status == 200 && response.data.status == 0){
                    let img_list = (response.data.results.images_url);
                    let xe9527 = (img_list).split("'");
                    let arr = [];
                    for (let index = 1; index < xe9527.length; index+=2) {
                        // 由于数据库数据结构设置错误，导致无法使用json
                        arr.push(xe9527[index]);
                    }
                    if (arr.length<1) arr = JSON.parse(img_list);
                    vm.img_list = arr;
                }else{
                    vm.img_list = [];
                }
                vm.loading = false;
            })
            .catch(function (error) {
                console.log(error);
            });
        },

    },
    watch: {
        cid: {
            deep: true,
            handler: function (newVal, oldVal) {
                this.getContent();
            }
        },
        sid: {
            deep: true,
            handler: function (newVal, oldVal) {
                this.getContent();
            }
        },
    },
    
}
</script>

<style scoped>
    .box{
        text-align: center;
    }
    .box img{
        cursor: pointer;
    }
    .chapter{
        max-width: 100%;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .backtops{
        height: 100%;
        width: 100%;
        background-color: #F90;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #000;
        border-radius: 5px;
    }
</style>