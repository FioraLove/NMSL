<template>
    <div class="love-word">

        <el-container>
            <el-header style="height:20px;width:100%;margin-top:5em;margin-bottom:10px;">
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div class="top-box"></div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <!-- el-row与bootstrap的布局的row均表示每一行的意思 -->
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-left: -2em;">
                        <div class="block">
                            <el-timeline>
                                <el-timeline-item 
                                    v-for="(row,index) in rows" 
                                    :key="index" 
                                    :timestamp="row.timestamp"
                                    :icon="row.icon"
                                    :type="row.type"
                                    :color="row.color"
                                    :size="row.size"
                                    placement="top">
                                    <el-card>
                                        <h4 style="margin-top:0px;">{{row.title}}</h4>
                                        <p>{{row.content}}</p>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                            </div>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div class="block"></div>

                    </el-col>
                </el-row>
            </el-main>
        </el-container>
        <div class="bg">
            <p>家人们~~~🤕🤕🤕，抽象圣经，最简单的嘴臭，最极致的享受</p>
        </div>
    </div>
</template>

<script>
export default {
    name:"loveword",
    data() {
        return {
            activities: [{
                    content: '支持使用图标',
                    timestamp: '2018-04-12 20:46',
                    size: 'large',
                    type: 'primary',
                    icon: 'el-icon-more'
                }, {
                    content: '支持自定义颜色',
                    timestamp: '2018-04-03 20:46',
                    color: '#0bbd87'
                }, {
                    content: '支持自定义尺寸',
                    timestamp: '2018-04-03 20:46',
                    size: 'large'
                }, {
                    content: '默认样式的节点',
                    timestamp: '2018-04-03 20:46'
            }],

            rows:[{
                title:"Hello Python",
                content: 'He is dragon',
                timestamp: '2018-04-12',
                size: 'large',
                type: 'primary',
                color: '#0bbd87',
                icon: 'el-icon-lollipop'
            },{
                title:"Hello C++",
                content: 'He is dragon',
                timestamp: '2028-04-28',
                size: 'large',
                type: 'primary',
                color: 'pink',
                icon: 'el-icon-orange'
            },{
                title:"Hello Java",
                content: 'He is dragon',
                timestamp: '2028-04-28',
                size: 'large',
                type: 'info',
                color: 'blue',
                icon: 'el-icon-orange'
            },{
                title:"Hello Monik",
                content: 'He is dragon',
                timestamp: '2020-07-31',
                size: 'large',
                type: 'success',
                color: 'blue',
                icon: 'el-icon-orange'
            },{
                title:"Hello Monik",
                content: 'He is dragon',
                timestamp: '2020-07-31',
                size: 'large',
                type: 'success',
                color: 'blue',
                icon: 'el-icon-orange'
            },{
                title:"Hello Monik",
                content: 'He is dragon',
                timestamp: '2020-07-31',
                size: 'large',
                type: 'success',
                color: 'blue',
                icon: 'el-icon-orange'
            }
            ]

        };
    }
}
</script>

<style scoped>
    .bg{
        position: fixed;
        top:0px;
        width: 100%;
        height: 4em;
        background-color: black;
        overflow: hidden;   /*父元素添加overflow*/
    }
    .bg p{
        text-align: center;
        color: white;
        font-size: 0.85em;
        margin-top: 1.85em;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        
    }
    .top-box{
        width:100%;
        height :5vh;
        background-image: linear-gradient(to top, #0ba360 0%, #3cba92 80%);
    }

</style>