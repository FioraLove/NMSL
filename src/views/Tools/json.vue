<template>
    <div class="json">
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div style="margin-top: 15px;margin:0 auto;width:80%;">
                            <el-alert title="Json标准数组在线生成工具" type="success" center
                                description="将多组字符串粘贴到文本框中，每组字符串请使用统一的英文逗号来分隔">
                            </el-alert>
                            <el-input type="textarea" placeholder="请输入内容"  v-model="parse" maxlength="888" show-word-limit :rows="5" >
                            </el-input>
                            <br>
                            <div class="desc"><el-button type="primary" icon="el-icon-s-grid" @click="switchArray">Run</el-button></div>
                        </div>
                        <div style="margin-top: 15px;margin:0 auto;width:80%;">
                            <br>
                            <el-input type="textarea" :rows="5"  placeholder="解析结果"  v-model="textarea"> 
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
    name:"Json",
    data() {
        return {
            rows: [],
            parse:"",
            textarea:""
        }
    },
    mounted() {
        
    },
    computed: {
        
    },
    methods: {
        switchArray:function(){
            let _0x9527 = (this.parse.trim()).split(",");
            this.textarea = JSON.stringify(_0x9527);
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