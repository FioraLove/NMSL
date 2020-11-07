<template>
    <div class="card">
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div style="margin-top: 15px;margin:0 auto;width:80%;">
                            <el-alert title="身份证查询" type="success" center  show-icon
                                description="郑重声明：不会保存存储身份证信息，仅展示其地区 性别 年龄">
                            </el-alert>
                            <el-input placeholder="请输入内容" v-model="id_card">
                                <template slot="prepend">身份证号：</template>
                                <el-button slot="append" icon="el-icon-search" @click="getCard"></el-button>
                            </el-input>
                            <br>
                            
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
    name:"Card",
    data() {
        return {
            textarea:"",
            id_card: "",
            loading: false
        }
    },
    mounted() {
        
    },
    computed: {
        
    },
    methods: {
        getCard:function () {
            let vm = this;
            // 清空数据
            this.textarea = '';
            // 开始加载数据
            this.loading = true;
            axios({
                url: "https://www.toolnb.com/Dev/Tools/getSfz.html",
                method:"post",
                data:{
                    id: this.id_card
                }
            })
            .then(function(response){
                if(response.status == 200){
                    vm.textarea = response.data.data["0"];
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