<template> 
    <div class="news">
        <audio autoplay loop>
            <source src="https://cdn.jsdelivr.net/gh/FioraLove/CDN@v1.2.9/M8000012D8zM22KhPg.mp3" type="audio/mpeg">
                您的浏览器不支持audio标签，无法播放音乐！
		</audio>
        <el-container>
            <el-main>
                <!-- 告示窗口 -->
                <!-- <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div>
                            <el-alert
                                title="关于本页空白的说明"
                                type="warning"
                                center
                                description="灵感匮乏ing，正在思考该做什么功能😭😭😭/🤓🤓🤓（若有建议，请联系我，不吝珠玉）"
                                show-icon>
                            </el-alert>
                        </div>
                    </el-col>
                </el-row> -->

                <!-- 轮播图片 -->
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div class="block">
                            <el-carousel :interval="3000" type="card" height="30vh">
                                <el-carousel-item v-for="(row, index) in rows" :key="index">
                                    <img :src="row" alt="">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </el-col>
                </el-row>

                <!-- 新闻资讯 -->
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="6" v-for="(row,num) in results" :key="num">
                        <div class="category">
                            <img :src="row.cover">&nbsp;&nbsp;
                            <span class="company" >{{row.description}}</span>
                            <hr>
                        </div>
                        <div class="outer">
                            <div class="card">
                                <div class="box" v-for="(cols,index) in row.info" :key="index">
                                    <div class="new">
                                        <p>
                                            <span v-if="index <=2" class="order" style="color:red;">{{index+1}}.</span>
                                            <span v-else class="order" style="color:#FFF;">{{index+1}}.</span>
                                            <span class="title"><a :href="cols.Url" target="_blank">{{cols.Title}}</a></span>
                                            <template v-if="cols.hotDesc == null || cols.hotDesc == '' || cols.hotDesc == undefined">
                                                <span class="hot">暂无数据</span>
                                            </template>
                                            <template v-else>
                                                <span class="hot">{{cols.hotDesc}}</span>
                                            </template>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>

                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="titles"><p>十大热门游戏排行榜</p></div>
                        <div ref="main" style="height:35em;"></div>
                    </el-col>
                </el-row>
            </el-main>

        </el-container>
        <el-backtop target=".news" :bottom="100">
            <div class="backtops">UP</div>
        </el-backtop>
    </div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入柱状图组件
    require('echarts/lib/chart/bar')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    require('echarts/lib/component/timeline')
    import axios from 'axios';
    export default {
        name: 'news',
        data() {
            return {
                rows: [require("../assets/images/tifa.jpg"),require("../assets/images/nmsl.jpeg"),require("../assets/images/comic.jpg")],
                results: [],
            }
        },
        mounted() {
            this.resizeChart(); // 监听窗口变化事件
            this.renderBarChart();
            this.query();
        },
        computed: {
            // 基于准备好的dom，初始化echarts实例
            priceCharts:function(){
                return echarts.init(this.$refs.main);
            },
        },
        methods: {
            // 重设窗口高度变化，注意使用箭头函数
            resizeChart:function(){
                window.onresize = () => {
                    this.priceCharts.resize();
                };
            },

            // 定义知乎热搜api
            getZhiHuData:function(){
                return axios({
                    url: "https://www.tophub.fun:8888/v2/GetAllInfoGzip",
                    method:"get",
                    params:{
                        id: 1,
                        page: 0
                    }
                })
            },

            // 定义知乎热搜访问api
            getWeiBoData:function(){
                return axios({
                    url: "https://www.tophub.fun:8888/v2/GetAllInfoGzip",
                    method:"get",
                    params:{
                        id: 58,
                        page: 0
                    }
                })
            },

            // 定义虎扑热搜api
            getHuPuData:function(){
                return axios({
                    url: "https://www.tophub.fun:8888/v2/GetAllInfoGzip",
                    method:"get",
                    params:{
                        id: 2,
                        page: 0
                    }
                })
            },

            // 定义观察者网热搜api
            getViewerData:function(){
                return axios({
                    url: "https://www.tophub.fun:8888/v2/GetAllInfoGzip",
                    method:"get",
                    params:{
                        id: 123,
                        page: 0
                    }
                })
            },

            // 获取热点数据
            query:function(){
                let vm = this;
                axios.all([this.getZhiHuData(),this.getWeiBoData(),this.getHuPuData(),this.getViewerData()])
                .then(axios.spread(function (rsp1,rsp2,rsp3,rsp4) {
                    let rows = [];
                    if(rsp1.status == 200 && rsp1.data.Code == 0){
                        let res = rsp1.data.Data;
                        let data = res["data"];
                        let results = {};
                        let info = [];
                        // 截取前二十个热点
                        if(parseInt(res.page)>=20){
                            info= data.slice(1,21);
                        }else{
                            info = data.slice(1);
                        }
                        results = {
                            info: info,
                            cover: "https://file.ipadown.com/tophub/assets/images/media/zhihu.com.png_50x50.png",
                            description: "知乎 | 热榜"
                        }
                        rows.push(results);
                    }
                    if(rsp2.status == 200 && rsp2.data.Code == 0){
                        let res = rsp2.data.Data;
                        let data = res["data"];
                        let results = {};
                        let info = [];
                        if(parseInt(res.page)>=20){
                            info= data.slice(1,21);
                        }else{
                            info = data.slice(1);
                        }
                        results = {
                            info: info,
                            cover: "https://file.ipadown.com/tophub/assets/images/media/s.weibo.com.png_50x50.png",
                            description: "微博 | 热搜榜"
                        }
                        rows.push(results);
                    }
                    if(rsp3.status == 200 && rsp3.data.Code == 0){
                        let res = rsp3.data.Data;
                        let data = res["data"];
                        let results = {};
                        let info = [];
                        if(parseInt(res.page)>=20){
                            info= data.slice(1,21);
                        }else{
                            info = data.slice(1);
                        }
                        results = {
                            info: info,
                            cover: "https://file.ipadown.com/tophub/assets/images/media/bbs.hupu.com.png_50x50.png",
                            description: "虎扑 | 步行街热帖"
                        }
                        rows.push(results);
                    }
                    if(rsp4.status == 200 && rsp4.data.Code == 0){
                        let res = rsp4.data.Data;
                        let data = res["data"];
                        let results = {};
                        let info = [];
                        if(parseInt(res.page)>=20){
                            info= data.slice(1,21);
                        }else{
                            info = data.slice(1);
                        }
                        results = {
                            info: info,
                            cover: "https://img.printf520.com/img/guanchaz.png",
                            description: "观察者网 | 评论员"
                        }
                        rows.push(results);
                    }

                    // 绑定数据
                    vm.results = rows;
                    


                }))
                .catch(function (error) {
                    console.log(error);
                });
    
            },


            // 渲染排名动态变化
            renderBarChart:function (){
                var years = ['2018', '2019', '2020'];
                var jdData = [
                    ['真三国无双8', '战地5', 'NBA 2K19', '怪物猎人·世界', '古墓丽影·暗影', '使命召唤15', '冰汽时代', '刺客信条·奥德赛', '正当防卫4', '侏罗纪世界·进化'],
                    ['真三国无双8', '战地5', 'NBA 2K19', '怪物猎人·世界', '古墓丽影·暗影', '使命召唤15', '冰汽时代', '刺客信条·奥德赛', '正当防卫4', '侏罗纪世界·进化'],
                    ['真三国无双8', '战地5', 'NBA 2K19', '怪物猎人·世界', '古墓丽影·暗影', '使命召唤15', '冰汽时代', '刺客信条·奥德赛', '正当防卫4', '侏罗纪世界·进化'],
                ]
                var data = [
                    [6804, 4761, 6699, 3958, 2203, 2198, 2379, 2224, 1912, 2004],
                    [1912, 6804, 4761, 6699, 2004, 2224, 2203, 2198, 2379, 3958],
                    [6804, 6699, 4761, 3958, 2379, 2224, 2203, 2198, 2004, 1912],
                ];

                let option = {
                    baseOption: {
                        backgroundColor: '#2c343c', //背景颜色
                        timeline: {
                            data: years,
                            axisType: 'category',
                            autoPlay: true,
                            playInterval: 2000, //播放速度
                            left: '5%',
                            right: '5%',
                            bottom: '-1%',
                            width: '90%',
                            //  height: null,
                            label: {
                                normal: {
                                    textStyle: {
                                        color: 'red',
                                    }
                                },
                                emphasis: {
                                    textStyle: {
                                        color: 'red'
                                    }
                                }
                            },
                            symbolSize: 10,
                            lineStyle: {
                                color: '#red'
                            },
                            checkpointStyle: {
                                borderColor: '#red',
                                borderWidth: 2
                            },
                            controlStyle: {
                                showNextBtn: true,
                                showPrevBtn: true,
                                normal: {
                                    color: '#ff8800',
                                    borderColor: '#ff8800'
                                },
                                emphasis: {
                                    color: 'red',
                                    borderColor: 'red'
                                }
                            },

                        },
                        title: {
                            text: '',
                            right: '2%',
                            bottom: '8%',
                            textStyle: {
                                fontSize: 50,
                                color: 'white' //标题字体颜色
                            }
                        },
                        tooltip: {
                            'trigger': 'axis'
                        },
                        calculable: true,
                        grid: {
                            left: '15%',
                            right: '2%',
                            bottom: '6%',
                            top: '0%',
                            containLabel: true
                        },
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'red'
                                }
                            }
                        },
                        yAxis: [{

                            nameGap: 50,
                            offset: '37',
                            'type': 'category',
                            interval: 50,
                            //inverse: ture,//图表倒叙或者正序排版
                            data: '',
                            nameTextStyle: {
                                color: 'red'
                            },
                            axisLabel: {
                                //rotate:45,
                                show: false,
                                formatter: function(value) {
                                    if (value.length > 6) {
                                        return value.substring(0, 6) + "...";
                                    } else {
                                        return value;
                                    }
                                },
                                textStyle: {
                                    fontSize: 12,
                                    color: function(params, Index) { // 标签国家字体颜色
                                        //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);//随机生成颜色
                                        var colorarrays = ['#6bc0fb', '#7fec9d', '#fedd8b', '#ffa597', '#84e4dd', '#749f83',
                                            '#ca8622', '#bda29a', '#a8d8ea', '#aa96da'];
                                        return colorarrays[jdData[0].indexOf(params)];
                                    },
                                }, //rotate:45,
                                interval: 50

                            },
                            axisLine: {

                                lineStyle: {
                                    color: 'balck' //Y轴颜色
                                },
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: 'balck'
                                }
                            },

                        }],
                        xAxis: [{
                            'type': 'value',
                            'name': '',

                            splitNumber: 8, //轴线个数
                            nameTextStyle: {
                                color: 'balck'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#ffa597' //X轴颜色
                                }
                            },
                            axisLabel: {
                                formatter: '{value} '
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#fedd8b'
                                }
                            },
                        }],
                        series: [{
                                'name': '',
                                'type': 'bar',
                                markLine: {
                                    label: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    lineStyle: {
                                        normal: {
                                            color: 'red',
                                            width: 3
                                        }
                                    },
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'right', //数值显示在右侧
                                        formatter: '{c}'
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: function(params) {
                                            // build a color map as your need.
            
                                            var colorList = ['#6bc0fb', '#7fec9d', '#fedd8b', '#ffa597', '#84e4dd', '#749f83',
                                                '#ca8622', '#bda29a', '#a8d8ea', '#aa96da'
                                            ];
                                            // return colorList[params.dataIndex]

                                            // console.log("111", params.name); //打印序列
                                            return colorList[jdData[0].indexOf(params.name)];
                                        },

                                    }
                                },
                            },

                            {
                                'name': '',
                                'type': 'bar',
                                markLine: {
                                    
                                    
                                    label: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    lineStyle: {
                                        
                                        normal: {
                                            color: 'red',
                                            width: 3
                                        }
                                    },
                                },
                                barWidth: '50%',
                                barGap: '-100%',
                                label: {
                                    normal: {
                                        show: true,
                                        fontSize: 16,  //标签国家字体大小
                                        position: 'left', //数值显示在右侧
                                        formatter: function(p) {
                                            return p.name;
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        
                                        
                                        color: function(params) {
                                            // build a color map as your need.
                                            //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);//随机生成颜色         
                                            var colorList = ['#6bc0fb', '#7fec9d', '#fedd8b', '#ffa597', '#84e4dd', '#749f83',
                                                '#ca8622', '#bda29a', '#a8d8ea', '#aa96da'
                                            ];
                                            // return colorList[params.dataIndex]
                                            return colorList[jdData[0].indexOf(params.name)];
                                        },

                                    }
                                },
                            }
                        ],

                        animationEasingUpdate: 'quinticInOut',
                        animationDurationUpdate: 1500, //动画效果
                    },

                    options: []
                };
                for (var n = 0; n < years.length; n++) {
                    var res = [];
                    for (let j = 0; j < data[n].length; j++) {
                        res.push({
                            name: jdData[n][j],
                            value: data[n][j]
                        });
                    }
                    res.sort(function(a, b) {
                        return b.value - a.value;
                    }).slice(0, 6);

                    res.sort(function(a, b) {
                        return a.value - b.value;
                    });

                    var res1 = [];
                    var res2 = [];
                    for (let t = 0; t < res.length; t++) {
                        res1[t] = res[t].name;
                        res2[t] = res[t].value;
                    }
                    option.options.push({
                        title: {
                            text: years[n] + '年'
                        },
                        yAxis: {
                            data: res1,
                        },
                        series: [{
                            data: res2
                        }, {
                            data: res2
                        }]
                    });
                }
                this.priceCharts.setOption(option,true);
            }
    }

}
</script>

<style scoped>
    .box p{
        word-wrap: break-word;
	    word-break: break-all;
        margin-bottom: 6px;
        margin-top: 10px;
        text-indent: 1em;
        font-size: 16px;
        line-height: 20px;
        width: 94%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .hot{
        background: #F90;
        color: #000;
        padding: 1px 4px;
        border-radius: 2px;
        font-size: 14px;
        margin-left: 1em;
    }
    .title{
        margin: 6px;
        width: inherit;
        color: hsla(0,0%,100%,.85);
    }
    .title a{
        text-decoration: none;
        color: hsla(0,0%,100%,.85);
    }
    .outer{
        width:100%;
        height:28em;
        overflow: hidden;
        
    }
    .outer .card{
        width:104%;
        height: 26em;
        overflow-x: auto;/*可滑动*/
    }

    .box{
        margin-bottom: 10px;
        width: 100%;
    }
    .news{
        background-color: #2c343c;
        max-width: 100%;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .bg{
        width:100%;
        height:1em;
        
    }
    .category img{
        width: 25px;
        height: 25px;
        border-radius: 12.5px;
    }
    .category .company{
        width:36px;
        height: 20px;
        font-weight: 700;
        color: hsla(0,0%,100%,.85);
        position: relative;
        top: -5px;
    }

    .block img{
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    hr{
        margin-bottom: 0px;
    }
    .backtops{
        height: 100%;
        width: 100%;
        background-color: #F90;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #000;
        border-radius: 5px;
    }

</style>