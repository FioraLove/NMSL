<template>
    <div class="trash">
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div style="margin-top: 15px;margin:0 auto;width:80%;">
                            <el-alert title="垃圾分类查询" type="success" center  show-icon
                                description="将待查询的垃圾粘贴到文本框中">
                            </el-alert>
                            <el-input type="textarea" placeholder="请输入待查询垃圾(e.g., 电脑)"  v-model="parse" maxlength="66" show-word-limit :rows="3" >
                            </el-input>
                            <br>
                            <div class="btn"><el-button type="primary" icon="el-icon-s-grid" @click="getTel">Run</el-button></div>
                        </div>
                        <div style="margin-top: 15px;margin:0 auto;width:80%;" v-loading="loading">
                            <br>
                            <p class="info">{{message.msg}}</p>
                            <p><img :src="message['data']['pic']" class="image"></p>
                            <p class="desc">{{message.data.desc}}</p>
                            
                        </div>
                    </el-col>
                </el-row>

            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name:"Trash",
    data() {
        return {
            rows: [],
            parse:"",
            message: {
                data:{
                    pic:"",
                    desc: ""
                },
                msg: ""
            },
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
            // 开始加载数据
            this.loading = true;
            if (this.parse.trim() == '' || this.parse.trim() == null) {
                this.$message.error('错了哦，请输入待分类物品 (+_+)?');
                this.loading = false;
                return;
            }
            axios({
                url: "https://api.oioweb.cn/api/aigarbage.php",
                method:"get",
                params:{
                    key:this.parse.trim()
                }
            })
            .then(function(response){
                if(response.status == 200 && response.data.code == 1){
                    vm.message = response.data;
                }else{
                    vm.message={
                        data:{
                            pic:"",
                            desc: ""
                        },
                        msg: response.data.msg
                    };
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
        text-align: center;
        margin-top: 1em;
    }
    .btn{
        text-align: center;
        margin-top: 1em;
    }
    img.image{
        width: 8em;
    }
    .info{
        font-family: 'Times New Roman', Times, serif;
        font-weight: 700;
        text-align: center;
        font-size: 1.25em;
        margin-top: 0px;
    }
</style>