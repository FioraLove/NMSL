<template>
    <div class="play">
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div id="play">
                            <video controls id="playVideos">
                                <source src="" type="video/mp4">
                                <!-- <source src="movie.ogg" type="video/ogg">
                                <source src="movie.webm" type="video/webm">
                                <object data="movie.mp4" width="320" height="240">
                                    <embed src="movie.swf" width="320" height="240">
                                </object> -->
                            </video>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
            <el-footer>
                <!-- 集数播放区 -->
                <el-row :gutter="10">
                    <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="3" v-for="(row,index) in images_rows" :key="index">
                        <div class="chapter">
                            <el-button size="medium" type="success" plain :data-url="row" @click="get_image($event)"><span :data-url="row" @click="get_image($event)"><i class="el-icon-video-play"></i>第{{index+1}}集</span></el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-footer>
        </el-container>
    </div>
</template>


<script>
export default {
    // 
    name:"Play",
    data() {
        return {
            vid:this.$route.query.vid,
            video:"",
            token:"",
            images_rows:[]
        }
    },
    mounted() {
        // 解密token
        this.token = window.btoa(decodeURIComponent(window.location.search.split("token=")[1]));
        this.getContent;
        
    },
    computed: {
        // 发送Ajax请求
        getContent:function () {
            let vm = this;
            let session_token = sessionStorage.getItem("token");
            if(session_token == null || session_token == undefined || session_token==""){
                alert("登录失效，请重新登录");
                window.location.href = "/nmsl/admin/secret";
            }
            axios({
                // api1:自定义的api接口
                url: this.FACTURL.baseUrl+"/nmsl/api/secret/video/chapter/",
                method:"get",
                headers:{
                    // "Authorization":"Token "+this.token,
                    "Authorization":"Token "+window.btoa(sessionStorage.getItem("token")),
                },
                params:{
                    vid:this.vid,
                }
            })
            .then(function(response){
                if(response.status == 200 &&response.data.status == 200){
                    let res = response.data.results;
                    let xe9527 = [];
                    for (let index = 0; index < res.length; index++) {
                        let a = res[index];
                        let b = JSON.parse(a.images_url);
                        for (let i= 0; i< b.length; i++) {
                            let arr = (b[i]).replace("id.8008xs.com","e1.umaaa.xyz").split("url=");
                            xe9527.push(arr[arr.length-1]);                            
                        }
                    }
                    vm.images_rows = xe9527;
                    //初始化默认加载第一个播放视频
                    let videos = document.getElementById('playVideos');
                    videos.src = xe9527[0];

                }else{
                    vm.rows = {"content":"暂无数据。。。"};
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    methods:{
        get_image:function(el){

            // 获取当前点击元素的属性值
            let url = el.target.dataset.url;
            let videos = document.getElementById('playVideos');
            videos.src = url;
        }
    },
    watch: {
        token:{
            handler(newVal,oldVal){
                this.getContent;
            }
        },
        vid:{
            handler(newVal,oldVal){
                this.getContent;
            }
        },
    }
}
</script>


<style scoped>
    .chapter{
        width:100%;
                text-align: center;
    }
    .chapter button{
        margin-top:8px;

    }
    .play{
        background-image: url("../assets/images/master.jpg");
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: cover;
        width:100%;
        height: 100vh;
    }
    @media screen  and (max-width: 500px){
        video{
            width:100%; 
            height:100%;
            object-fit:fill;
        }
        #play{
            width:100%;
            height:13em;
            text-align: center;
            box-shadow: 4px 4px 5px rgba(177, 172, 172, 0.6);
        }
    }
    @media screen  and (min-width: 501px){
        video{
            width:90%; 
            height:100%;
            object-fit:fill;
            box-shadow: 12px 10px 5px rgba(177, 172, 172, 0.6);
        }
        #play{
            width:100%;
            height:85vh;
            text-align: center;
            
        }
    }
    .item {
        margin-top: 10px;
        margin-right: 40px;
    }

</style>