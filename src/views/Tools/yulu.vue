<template>
    <div class="yulu">
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div style="margin-top: 15px;margin:0 auto;width:80%;">
                            <el-alert title="精神小伙·精神语录" type="success" center  show-icon
                                description="记住一句话，铁子">
                            </el-alert>
                            <div class="desc"><el-button type="primary" icon="el-icon-s-grid" @click="getTel">Do it !</el-button></div>
                        </div>
                        <div style="margin-top: 15px;margin:0 auto;width:80%;">
                            <br>
                            <el-input type="textarea" :rows="5"  placeholder="解析结果"  v-model="textarea" v-loading="loading"> 
                            </el-input>
                            
                        </div>
                    </el-col>
                </el-row>

            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name:"Yulu",
    data() {
        return {
            textarea:"",
            loading: false
        }
    },
    mounted() {
        
    },
    computed: {
        
    },
    methods: {
        getTel:function () {
            let vm = this;
            // 清空数据
            this.textarea = '';
            // 开始加载数据
            this.loading = true;
            axios({
                url: "https://api.oioweb.cn/api/jsyl.php",
                method:"get"
            })
            .then(function(response){
                if(response.status == 200){
                    vm.textarea = response.data.text;
                }else{
                    vm.textarea="暂无数据，记住一句话，铁子👨‍✈️👨‍✈️👨‍✈️";
                }
                // 关闭加载动画
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
    p{
        color: black;
    }
    .desc{
        text-align: center;
        margin-top: 1em;
    }
</style>