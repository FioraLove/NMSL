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
                            <div class="desc"><el-button type="primary" icon="el-icon-s-grid" @click="query">Do it !</el-button></div>
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
            textarea:"",        // 展示文本内容
            loading: false,     // 加载提示
            max_number: 125     // 语录最大展示数
        }
    },
    mounted() {
        
    },
    computed: {
        
    },
    methods: {
        query:function () {
            let vm = this;
            // 清空数据
            this.textarea = '';
            // 开始加载数据
            this.loading = true;

            // 以application/x-www-form-urlencoded格式发送数据
            // const params = new URLSearchParams();
            // params.append('category', 1);
            // params.append('uid', parseInt((this.max_number)*Math.random()));
            // axios({
            //     url: this.FACTURL.baseUrl+"/nmsl/api/yulu",
            //     method:"post",
            //     params: params,
            //     headers: { 
            //         "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            //     }
            // })
            axios({
                url: this.FACTURL.baseUrl+"/nmsl/api/yulu",
                method:"post",
                data: {
                    uid: Math.ceil((this.max_number)*Math.random()),
                    category: 1
                },
                headers: {
                    "content-type": "multipart/form-data"
                }
            })
            .then(function(response){
                if(response.data.status == 200 && response.data.results.length > 0 ){
                    vm.textarea = response.data.results[0].content;
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