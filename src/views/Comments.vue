<template> 
    <div class="comments">
        <div class="bk"></div>
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <!-- 左侧留言模块 -->
                    <template v-if="flag">
                        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="5em" class="demo-ruleForm" style="margin-top: 3em;">
                                <el-form-item prop="email" label="邮箱" placeholder="seraphine@example.com"
                                    :rules="[
                                    { required: true, message: '请输入邮箱地址:.,seraphine@example.com', trigger: 'blur' },
                                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                                    ]">
                                    <el-input v-model="ruleForm.email"></el-input>
                                    </el-form-item>
                                <el-form-item label="留言" prop="desc">
                                    <el-input type="textarea" v-model="ruleForm.desc" maxlength="200" show-word-limit></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="danger" @click="submitForm('ruleForm')">立即创建</el-button>
                                    <p>{{msg}}</p>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </template>
                    <template v-else>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="5em" class="demo-ruleForm" style="margin-top: 3em;">
                                <el-form-item prop="email" label="邮箱" placeholder="seraphine@example.com"
                                    :rules="[
                                    { required: true, message: '请输入邮箱地址:.,seraphine@example.com', trigger: 'blur' },
                                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                                    ]">
                                    <el-input v-model="ruleForm.email"></el-input>
                                    </el-form-item>
                                <el-form-item label="留言" prop="desc">
                                    <el-input type="textarea" v-model="ruleForm.desc" maxlength="200" show-word-limit></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="danger" @click="submitForm('ruleForm')">立即创建</el-button>
                                    <p>{{msg}}</p>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </template>

                    <!-- 右侧留言展示框 -->
                    <template v-if="flag">
                        <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
                            <template v-for="(row,index) in rows">
                                <div class="comment" :key="index">
                                    <div class="title">
                                        <span>{{row.update}}</span>                                   
                                        <el-divider direction="vertical"></el-divider>
                                        <span>{{ (row.ip).split(".")[0]+"."+(row.ip).split(".")[1]+".*.*"}}</span>
                                    </div>
                                    <el-divider></el-divider>
                                    <p class="content">{{ "编号【"+row.uid+"】："+row.contents}}</p>
                                    <template v-if="row.reply != null && row.reply != 'undefined' ">
                                        <p class="reply">{{ "管理员回复："+row.reply}}</p> 
                                    </template>
                                </div>
                            </template>
                            <el-container>
                                <!-- 翻页函数 -->
                                <el-footer>
                                    <div class="block">
                                        <template v-if="flag">
                                            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="page_size" layout="prev, pager, next, jumper" :total="count" :pager-count="pager_count">
                                            </el-pagination>
                                        </template>
                                        <template v-else>
                                            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="page_size" layout="prev, pager, next" :total="count" :pager-count="pager_count">
                                            </el-pagination>       
                                        </template>

                                    </div>
                                </el-footer>
                            </el-container>
                        </el-col>
                    </template>
                    <template v-else>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <template v-for="(row,index) in rows">
                                <div class="comment" :key="index">
                                    <div class="title">
                                        <span>{{row.update}}</span>                                   
                                        <el-divider direction="vertical"></el-divider>
                                        <span>{{ (row.ip).split(".")[0]+"."+(row.ip).split(".")[1]+".*.*"}}</span>
                                    </div>
                                    <el-divider></el-divider>
                                    <p class="content">{{ "编号【"+row.uid+"】："+row.contents}}</p>
                                    <template v-if="row.reply != null && row.reply != 'undefined' ">
                                        <p class="reply">{{ "管理员回复："+row.reply}}</p> 
                                    </template>
                                </div>
                            </template>
                            <el-container>
                                <!-- 翻页函数 -->
                                <el-footer>
                                    <div class="block">
                                        <template v-if="flag">
                                            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="page_size" layout="prev, pager, next, jumper" :total="count" :pager-count="pager_count">
                                            </el-pagination>
                                        </template>
                                        <template v-else>
                                            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="page_size" layout="prev, pager, next" :total="count" :pager-count="pager_count">
                                            </el-pagination>       
                                        </template>

                                    </div>
                                </el-footer>
                            </el-container>
                        </el-col>
                    </template>

                </el-row>
            </el-main>

        </el-container>
        <div class="bg">
            <p>家人们，家人们~~🤕🤕🤕文明之语我来讲，礼仪之星我来当</p>
        </div>
    </div>
</template>

<script>
let Base64 = require('js-base64').Base64;
export default {
    name: 'comments',
    data() {
        return {
            flag:true,                              // 是否是PC端
            msg: '',                                // Ajax的POST请求返回提示
            page_size: 10,
            pager_count:5,                  // 页码按钮的数量，当总页数超过该值时会折叠
            flag:true,                      // 是否是PC端
            count:0,                    // 查询返回的数据总数
            currentPage:1,             // 当前页数
            ruleForm: {
                desc: '',
                email: ''
            },
            rows:[],
            rules: {
                desc: [{ required: true, message: '请填写留言内容', trigger: 'blur' }]
            },


        }
    },
    mounted() {
        // 引入ip地址获取文件
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://pv.sohu.com/cityjson?ie=utf-8';
        document.getElementsByTagName('head')[0].appendChild(script);
        this.isPC();
        this.getContent();
    },
    computed: {

    },
    methods: {
        // 页码改变触发事件
        handleCurrentChange:function(val){
            // 点击页码跳转时，执行改计算属性
            this.getContent();
        },
        // 判断当前设备
        isPC:function(){  
            let userAgentInfo = navigator.userAgent;
            let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];  
            let flag = true;  
            for (let v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
            }
            this.flag = flag;
        },

        // 留言发送函数
        submitForm: function(formName) {
            let vm = this;
            RVerify.action(function(code) {
                switch (code) {
                    case 1:
                        vm.$refs[formName].validate((valid) => {
                            if (valid) {
                                // 发送Ajax请求
                                axios({
                                    url: vm.FACTURL.baseUrl+"/nmsl/api/comments/",
                                    method:"post",
                                    data:{
                                        ip: Base64.encode(returnCitySN["cip"]),
                                        uid: returnCitySN["cid"],
                                        location: returnCitySN["cname"],
                                        email: vm.ruleForm.email,
                                        contents: vm.ruleForm.desc
                                    }
                                })
                                .then(function(response){
                                    if(response.status == 200 && response.data.status == 1){
                                        vm.msg = "hey，提交成功🤶🤶🤶";
                                    }else{
                                        vm.msg = "hey，提交失败😖😖😖";
                                    }
                                    // 关闭加载动画
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                            } else {
                                console.log('error submit!!');
                                return false;
                            }
                        });
                        break;
                    case 2:
                        break;
                    }
                }
            );
        },
        // 发送Ajax请求
        getContent:function () {
            let vm = this;
            axios({
                url: this.FACTURL.baseUrl+"/nmsl/api/comments/",
                method:"get",
                params:{
                    offset:this.page_size*(this.currentPage-1),
                    limit: this.page_size,
                }
            })
            .then(function(response){
                if(response.status == 200){
                    vm.rows = response.data.results;
                    vm.count = response.data.count;
                }else{
                    vm.rows = {"content":"暂无数据。。。"};
                }
                // 关闭加载动画
                vm.loading=false;
            })
            .catch(function (error) {
                console.log(error);
            });
        }        
   }

}
</script>

<style scoped>
    .comments{
        background-image: url("http://tool.liumingye.cn/bingimg/img.php");
        background-attachment: fixed;
        background-size: cover;
        background-repeat: no-repeat;
        max-width:100vw;
        min-height: 100vh;
    }
    p,span{
        color:hsla(0,0%,100%,.85);
    }
    .bk{
        height: 2em;
    }
    .block{
        margin-top: 2em;
    }
    .content{
        margin-top: -10px;
        margin-bottom: 8px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .title{
        margin-bottom: -16px;
    }
    .reply{
        margin-top: 8px;
        margin-bottom: 8px;
        color: #F90;
    }
    .bg{
        width: 100%;
        height: 4em;
        position: fixed;
        top: 0px;
        background-color: black;
        overflow: hidden;   /*父元素添加overflow*/
    }
    .bg p{
        text-align: center;
        color: white;
        font-size: 0.85em;
        margin-top: 1.55em;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; 
    }
    @media screen and (max-width: 480px) {
        .comment{
            margin-top: 2em;
        }
    }
    @media screen and (min-width: 481px) {
        .comment{
            padding-left:3em;
            margin-top: 3em;
        }
    }
</style>