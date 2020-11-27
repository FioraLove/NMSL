<template>
    <div class="tao">
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div style="margin-top: 15px;margin:0 auto;width:80%;">
                            <div class="desc" v-viewer>
                                <img :src="picture" :alt="title">
                            </div>
                            <div class="desc title">{{title}}</div>
                        </div>
                        <div style="margin:0 auto;width:80%;">
                            <div class="desc"><el-button type="warning" icon="el-icon-picture" @click="getTao">Switch</el-button></div>
                        </div>
                    </el-col>
                </el-row>

            </el-main>
        </el-container>
    </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)
export default {
    name:"Tao",
    data() {
        return {
            picture:"",
            title: ""
        }
    },
    mounted() {
        // 初加载
        this.getTao();
    },
    computed: {
        
    },
    methods: {
        getTao:function () {
            let vm = this;
            axios({
                url: "https://api.vvhan.com/api/tao",
                method:"get",
                params:{
                    type: "json"
                }
            })
            .then(function(response){
                if(response.status == 200){
                    vm.title = response.data.title;
                    vm.picture = response.data.pic;
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }

}
</script>

<style scoped>
    p{
        color: black;
    }
    .desc{
        text-align: center;
        margin-top: 3px;
    }
    .desc.title{
        color: #FFF;
        margin-top: 1em;
        margin-bottom: 8px;
        font-weight: 700;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    img{
        text-align: center;
        height:85vh;
        cursor:pointer;
        box-shadow: 8px 8px 8px rgba(177, 174, 172, 0.6);
        border-radius: 8px;
        max-width: 100vm;
    }
    .tao{
        background-color: #000;
        height: 108vh;
    }
    button{
        color: #000;
        margin-top: 6px;
        background-color: #F90;
        font-size: 17px;
        font-family:'Times New Roman', Times, serif
    }
</style>