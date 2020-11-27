<template>
    <div class="dewu">
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div style="margin-top: 15px;margin:0 auto;width:80%;">
                            <el-alert title="得物鸡汤" type="info" center  show-icon
                                description="有些人二十岁就死了，等到八十岁才被埋葬">
                            </el-alert>
                            <div class="desc"><el-button type="info" icon="el-icon-s-grid" @click="getTel">毒</el-button></div>
                        </div>
                        <div style="margin-top: 15px;margin:0 auto;width:80%;">
                            <br>
                            <el-input type="textarea" :rows="3"  placeholder="解析结果"  v-model="textarea" v-loading="loading"> 
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
    name:"Dewu",
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
                url: "https://api.oioweb.cn/api/binduyan.php",
                method:"get"
            })
            .then(function(response){
                if(response.status == 200){
                    vm.textarea = response.data.txt;
                }else{
                    vm.textarea="干了这碗得物鸡汤！ ☠☠☠";
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
    .dewu{
        background-image: linear-gradient(to right, #434343 0%, black 100%);
        height: 100vh;
    }
</style>