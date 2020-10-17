<template>
    <div class="tel">
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div style="margin-top: 15px;margin:0 auto;width:80%;">
                            <el-alert title="手机号码归属地查询" type="success" center  show-icon
                                description="将待查询的手机号粘贴到文本框中，查询归属地/号码段/卡类型/运营商...">
                            </el-alert>
                            <el-input type="textarea" placeholder="请输入待查询手机号(e.g., 18888888888)"  v-model="parse" maxlength="66" show-word-limit :rows="3" >
                            </el-input>
                            <br>
                            <div class="desc"><el-button type="primary" icon="el-icon-s-grid" @click="getTel">Run</el-button></div>
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
    name:"Tel",
    data() {
        return {
            rows: [],
            parse:"",
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
                url: "https://tenapi.cn/tel",
                method:"get",
                params:{
                    tel:this.parse.trim()
                }
            })
            .then(function(response){
                if(response.status == 200 && response.data.code==200){
                    vm.textarea = JSON.stringify(response.data);
                }else{
                    vm.textarea="暂无数据，请检查相关参数正确性👨‍✈️👨‍✈️👨‍✈️";
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