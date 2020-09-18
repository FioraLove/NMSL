<template> 
    <div class="echart">
        <el-container>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">

                    </el-col>
                </el-row>
            </el-main>

        </el-container>
        
    </div>
</template>

<script>

export default {
    name: 'hello',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    mounted() {
        // this.renderDrawLine();
        // this.resizeChart(); // 监听窗口变化事件
        // this.renderBarChart();
    },
    computed: {
        // 基于准备好的dom，初始化echarts实例
        priceCharts:function(){
            return echarts.init(this.$refs.main);
        },
        pinCharts:function(){
            return echarts.init(this.$refs.barbox);
        }
    },
    methods: {
        // 重设窗口高度变化，注意使用箭头函数
        resizeChart:function(){
            window.onresize = () => {
                this.priceCharts.resize();    // 重设新经营指标费用宽高
                this.pinCharts.resize();
            };
        },

        renderDrawLine:function(){
            // 绘制图表
            var num1 = 75;
            var num2 = 80;
            var num3 = 55;
            let option = {
                backgroundColor: '#393265',
                title: [{
                    text: 'Donut Chart',
                    x: '50%',
                    y: 50,
                    textAlign: 'center',
                    textStyle: {
                        fontSize: '30',
                        fontWeight: '100',
                        color: '#fff',
                        textAlign: 'center',
                    },
                }, {
                    text: '16%',
                    left: '19.5%',
                    top: '47%',
                    textAlign: 'center',
                    textStyle: {
                        fontSize: '50',
                        fontWeight: '100',
                        color: '#fff',
                        textAlign: 'center',
                    },
                }, {
                    text: '7%',
                    left: '49.5%',
                    top: '47%',
                    textAlign: 'center',
                    textStyle: {
                        fontSize: '50',
                        fontWeight: '100',
                        color: '#fff',
                        textAlign: 'center',
                    },
                }, {
                    text: '31%',
                    left: '79.5%',
                    top: '47%',
                    textAlign: 'center',
                    textStyle: {
                        fontSize: '50',
                        fontWeight: '100',
                        color: '#fff',
                        textAlign: 'center',
                    },
                }, ],
                series: [{
                        type: 'pie',
                        startAngle: 0,
                        radius: ['31%', '33%'],
                        center: ['20%', '50%'],
                        data: [{
                                hoverOffset: 1,
                                value: num1,
                                name: '',
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                                            offset: 0,
                                            color: '#ef29b1'
                                        }, {
                                            offset: 1,
                                            color: '#fd7225'
                                        }]),
                                        shadowColor: '#1c1b3a',
                                        shadowBlur: 1,
                                        shadowOffsetX: '0',
                                        shadowOffsetY: '25',
                                    }
                                },
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    normal: {
                                        smooth: true,
                                        lineStyle: {
                                            width: 0
                                        }
                                    }
                                },
                                hoverAnimation: false,
                            },
                            {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    normal: {
                                        smooth: true,
                                        lineStyle: {
                                            width: 0
                                        }
                                    }
                                },
                                value: 100 - num1,
                                hoverAnimation: false,
                                itemStyle: {
                                    color: 'rgba(251, 200, 79, 0)',
                                },
                            }
                        ]
                    },

                    {
                        type: 'pie',
                        startAngle: 20,
                        radius: ['31%', '33%'],
                        center: ['50%', '50%'],
                        data: [{
                                hoverOffset: 1,
                                value: num2,
                                name: '',
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                                            offset: 0,
                                            color: '#ef29b1'
                                        }, {
                                            offset: 1,
                                            color: '#fd7225'
                                        }]),
                                        shadowColor: '#1c1b3a',
                                        shadowBlur: 1,
                                        shadowOffsetX: '0',
                                        shadowOffsetY: '25',
                                    }
                                },
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    normal: {
                                        smooth: true,
                                        lineStyle: {
                                            width: 0
                                        }
                                    }
                                },
                                hoverAnimation: false,
                            },
                            {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    normal: {
                                        smooth: true,
                                        lineStyle: {
                                            width: 0
                                        }
                                    }
                                },
                                value: 100 - num2,
                                hoverAnimation: false,
                                itemStyle: {
                                    color: 'rgba(232, 85, 63, 0)',
                                },
                            }
                        ]
                    },

                    {
                        type: 'pie',
                        startAngle: -75,
                        radius: ['31%', '33%'],
                        center: ['80%', '50%'],
                        data: [{
                                hoverOffset: 1,
                                value: num3,
                                name: '',
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                                            offset: 0,
                                            color: '#ef29b1'
                                        }, {
                                            offset: 1,
                                            color: '#fd7225'
                                        }]),
                                        shadowColor: '#1c1b3a',
                                        shadowBlur: 1,
                                        shadowOffsetX: '0',
                                        shadowOffsetY: '25',
                                    }
                                },
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    normal: {
                                        smooth: true,
                                        lineStyle: {
                                            width: 0
                                        }
                                    }
                                },
                                hoverAnimation: false,
                            },
                            {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    normal: {
                                        smooth: true,
                                        lineStyle: {
                                            width: 0
                                        }
                                    }
                                },
                                value: 100 - num3,
                                hoverAnimation: false,
                                itemStyle: {
                                    color: 'rgba(89, 180, 157, 0)',
                                },
                            }
                        ]
                    },
                ]
            };
            this.priceCharts.setOption(option,true);
        },

        renderBarChart:function (){
            let bgColor = '#fff';
            let title = '总量';
            let color = ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'];
            let echartData = [{
                    name: "A类",
                    value: "3720"
                },
                {
                    name: "B类",
                    value: "2920"
                },
                {
                    name: "C类",
                    value: "2200"
                },
                {
                    name: "D类",
                    value: "1420"
                }
            ];

            let formatNumber = function(num) {
                let reg = /(?=(\B)(\d{3})+$)/g;
                return num.toString().replace(reg, ',');
            }
            let total = echartData.reduce((a, b) => {
                return a + b.value * 1
            }, 0);

            let option = {
                backgroundColor: bgColor,
                color: color,
                title: [{
                    text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
                    top: 'center',
                    left: 'center',
                    textStyle: {
                        rich: {
                            name: {
                                fontSize: 14,
                                fontWeight: 'normal',
                                color: '#666666',
                                padding: [10, 0]
                            },
                            val: {
                                fontSize: 32,
                                fontWeight: 'bold',
                                color: '#333333',
                            }
                        }
                    }
                },{
                    text: '单位：个',
                    top: 20,
                    left: 20,
                    textStyle: {
                        fontSize: 14,
                        color:'#666666',
                        fontWeight: 400
                    }
                }],
                series: [{
                    type: 'pie',
                    radius: ['45%', '60%'],
                    center: ['50%', '50%'],
                    data: echartData,
                    hoverAnimation: false,
                    itemStyle: {
                        normal: {
                            borderColor: bgColor,
                            borderWidth: 2
                        }
                    },
                    labelLine: {
                        normal: {
                            length: 20,
                            length2: 120,
                            lineStyle: {
                                color: '#e6e6e6'
                            }
                        }
                    },
                    label: {
                        normal: {
                            formatter: params => {
                                return (
                                    '{icon|●}{name|' + params.name + '}{value|' +
                                    formatNumber(params.value) + '}'
                                );
                            },
                            padding: [0 , -100, 25, -100],
                            rich: {
                                icon: {
                                    fontSize: 16
                                },
                                name: {
                                    fontSize: 14,
                                    padding: [0, 10, 0, 4],
                                    color: '#666666'
                                },
                                value: {
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: '#333333'
                                }
                            }
                        }
                    },
                }]
            };
            this.pinCharts.setOption(option,true);
        }
   }

}
</script>

<style scoped>

</style>