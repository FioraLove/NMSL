<template> 
    <div class="media">
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <!-- 告示窗口 -->
                        <div>
                            <el-alert
                                title="关于本页空白的说明"
                                type="warning"
                                center
                                description="灵感匮乏ing，正在思考该做什么功能😭😭😭/🤓🤓🤓（若有建议，请联系我，不吝珠玉）"
                                show-icon>
                            </el-alert>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="10">

                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <!-- 走马灯 -->
                        <div class="bg"></div>
                        <div class="block">
                            <el-carousel :interval="4000" type="card" height="30vh">
                                <el-carousel-item v-for="(row, index) in rows" :key="index">
                                    <img :src="row" alt="">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </el-col>
                </el-row>

            </el-main>

        </el-container>
        
    </div>
</template>

<script>

export default {
    name: 'media',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            rows: [require("../assets/images/beautiful.jpg"),require("../assets/images/tifa.jpg"),
                require("../assets/images/nmsl.jpeg"),require("../assets/images/master.jpg"),
                require("../assets/images/beautiful.jpg"), require("../assets/images/bk.jpg")
            ]
        }
    },
    mounted() {

    },
    computed: {

    },
    methods: {

   }

}
</script>

<style scoped>

    .bg{
        width:100%;
        height:1em;
        background-color: whitesmoke;
    }
    img{
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
    /* @media screen and (max-width: 480px) {
        img{
            width:50vw;
            height:25vh;
        }  
    }
    @media screen and (min-width: 481px) {
        img{
            width:45vw;
            height:30vh;
        }  
    } */
</style>