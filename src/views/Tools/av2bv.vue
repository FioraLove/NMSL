<template>
    <div class="json">
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div style="margin-top: 15px;margin:0 auto;width:80%;">
                            <el-alert title="bilibili AV与BV号互转" type="success" center show-icon
                                description="将AV或BV号粘贴到文本框中">
                            </el-alert>
                            <el-input type="textarea" placeholder="请输入AV号或BV号：（如av170001或BV17x411w7KC）"  v-model="parse" maxlength="66" show-word-limit :rows="3" >
                            </el-input>
                            <br>
                            <div class="desc"><el-button type="primary" icon="el-icon-sort" @click="switchArray">Start</el-button></div>
                        </div>
                        <div style="margin-top: 15px;margin:0 auto;width:80%;">
                            <br>
                            <el-input type="textarea" :rows="3"  placeholder="解析结果"  v-model="textarea"> 
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
    name:"Av2bv",
    data() {
        return {
            rows: [],
            parse:"",
            textarea:"",
            tr:{},
            s:[11,10,3,8,4,6],
            xor:177451812,
            add:8728348608,
            table: 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'
        }
    },
    mounted() {
            let table='fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF';
            let tr={};
            for (let index = 0; index < 58; index++) {
                tr[table[index]] = index;
            }
            this.tr = tr;
    },
    computed: {
        
    },
    methods: {
        dec:function(x) {
            let r = 0;
            let s = [11,10,3,8,4,6];
            for (let i = 0; i < 6; i++) {
                r += (this.tr)[x[s[i]]] * Math.pow(58, i);
            }
            return (r - this.add) ^ this.xor;
        },
        enc:function(x) {
            x = (x ^ this.xor) + this.add;
            let r = "BV1  4 1 7  ".split("");
            for (let i = 0; i < 6; i++) {
                r[this.s[i]] = this.table[Math.floor(x / Math.pow(58, i)) % 58];
            }
            return r.join("");
        },
        switchArray:function(){
            let _0x9527 = this.parse.trim();
            switch (_0x9527.toLowerCase().substr(0,2)) {
                case "av":
                    this.textarea = "BV号："+this.enc(_0x9527.substr(2));
                    break;
                case "bv":
                    this.textarea = "AV号：av"+this.dec(_0x9527);
                    break;  
                default:
                    this.textarea = "请检查相关参数，（如av170001或BV17x411w7KC）";
                    break;
            }
            
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