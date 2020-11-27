<template>
    <div class="express">
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div style="margin-top: 15px;margin:0 auto;width:80%;">
                            <el-alert title="快递单号查询" type="success" center  show-icon
                                description="请必先选择快递公司，再输入快递单号，查看你的宝贝信息">
                            </el-alert>

                           <el-input placeholder="请输入快递单号(e.g., YT2093716459719)" v-model="input_api" class="input-with-select" clearable>
                                <el-select v-model="select" slot="prepend" placeholder="请选择">
                                    <template v-for="(row, index) in rows">
                                        <el-option :label="row.name" :value="row.code" :key="index"></el-option>
                                    </template>
                                </el-select>
                                <el-button slot="append" icon="el-icon-search" @click="getExpress"></el-button>
                            </el-input>

                        </div>
                        <div style="margin-top: 15px;margin:0 auto;width:80%;">
                            <br>
                            <div class="block" v-loading="loading">
                                <div class="radio">
                                    排序：
                                    <el-radio-group v-model="reverse">
                                    <el-radio :label="true">倒序</el-radio>
                                    <el-radio :label="false">正序</el-radio>
                                    </el-radio-group>
                                </div>
                                <br>
                                <el-timeline :reverse="reverse">
                                    <el-timeline-item v-for="(activity, index) in zt_textarea" :key="index" :timestamp="activity.time">
                                        {{activity.content}}
                                    </el-timeline-item>
                                </el-timeline>
                            </div>
                        </div>
                    </el-col>
                </el-row>

            </el-main>
        </el-container>
    </div>
</template>

<script>
import {toast} from "../../assets/js/toast.js";
export default {
    name:"Express",
    data() {
        return {
            rows: [{
                name: "中通",
                code: "ZT"
            },{
                name: "圆通",
                code: "YT"
            },{
                name: "申通",
                code: "ST"
            }],
            reverse: true,
            zt_parse:"",
            zt_textarea: [],
            loading: false,
            input_api:"",                           
            select:"",
        }
    },
    mounted() {
        
    },
    computed: {
        
    },
    methods: {
        getExpress:function () {
            let vm = this;
            // 清空数据
            this.zt_textarea = [];
            // 开始加载数据
            this.loading = true;
            if(this.select == "" || this.input_api == ""){
                toast("请选择具体快递公司和输入正确的快递单号");
                vm.loading=false;
            } else {
                let sid = '';
                switch (this.select) {
                    case "ZT":
                        sid = "105368";
                        break;
                    case "YT":
                        sid = "105370";
                        break;
                    case "ST":
                        sid = "179488";
                        break;
                    default:
                        break;
                }
                axios({
                    url: "http://track.56114.com/",
                    method:"get",
                    params:{
                        act: "4",
                        companyCode: this.select.trim(),
                        code: this.input_api.trim(),
                        source: "pc",
                        sid: sid
                    }
                })
                .then(function(response){
                    if(response.status == 200 && response.data.status==200){
                        vm.zt_textarea = response.data.data;
                    }else{
                        let d = new Date();
                        vm.zt_textarea=[{
                            time: d.getFullYear()+"-"+(parseInt(d.getMonth())+1)+"-"+d.getDate(),
                            content: "在查询单号时，请确保您输入的速递单号是正确的。如无法查询，可通过电话联系速递公司进行查询或登录该公司官网查询。"
                        }];
                    }
                    // 关闭加载动画
                    vm.loading = false;
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
    },

}
</script>

<style scoped>
    @import "../../assets/css/toast.css";
    p{
        color: black;
    }
    .desc{
        text-align: center;
        margin-top: 1em;
    }
</style>