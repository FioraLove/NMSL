<template>
    <div class="girl">
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div style="margin-top: 15px;margin:0 auto;width:80%;">
                            <div class="desc">
                                <img :src="picture">
                            </div>
                        </div>
                        <div style="margin:0 auto;width:80%;">
                            <div class="desc"><el-button type="warning" icon="el-icon-picture" @click="getGirl">Switch</el-button></div>
                        </div>
                    </el-col>
                </el-row>

            </el-main>
        </el-container>
    </div>
</template>

<script>

export default {
    name:"Girl",
    data() {
        return {
            picture:"https://api.vvhan.com/api/mobil.girl?type=https",
        }
    },
    mounted() {
        
    },
    computed: {
        
    },
    methods: {
        getGirl:function () {
            // get请求的url，随机拼接查询字符串,这样就可以刷新请求了
            this.picture = "https://api.vvhan.com/api/mobil.girl?type=https"+"&num="+parseInt(Math.random()*100)
        }
    },

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
    img{
        text-align: center;
        height:85vh;
        cursor:pointer;
        box-shadow: 8px 8px 8px rgba(177, 174, 172, 0.6);
        border-radius: 8px;
        max-width: 100vm;
    }
    .girl{
        background-color: #000;
        height: 100vh;
    }
    button{
        color: #000;
        margin-top: 6px;
        background-color: #F90;
        font-size: 17px;
        font-family:'Times New Roman', Times, serif
    }
</style>