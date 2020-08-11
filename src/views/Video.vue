<template>
    <div>
        <!-- 在 User.vue 这个父路由，需要使用视图渲染加载子路由 -->
        <div id="dplayer"></div>
        <router-view></router-view>
    </div>
</template>



<!--- vuecli3组件内部引入第三方的css文件只在当前组件生效的办法 --->
<style scoped>
    @import "../assets/css/DPlayer.min.css";
    #dplayer{
        width: 80vw;
        height: 80vh;
        margin: 0 auto;
        margin-top: 3em;
    }
</style>



<script scope>
    import DPlayer from "../assets/js/DPlayer.min.js";
    export default {
        name: "User",
        data() {
            return {
                
            }
        },
        mounted() {
            this.initDPlayer();
        },
        methods: {
            initDPlayer:function(){
                const dp = new DPlayer({
                    container: document.getElementById('dplayer'),
                    autoplay: false,
                    theme: '#FADFA3',
                    loop: true,
                    lang: 'zh-cn',
                    screenshot: true,
                    hotkey: true,
                    preload: 'metadata',
                    // 左上角展示的logo
                    logo: 'https://cdn.jsdelivr.net/gh/FioraLove/Images/D:/data/imagesaaa.png',
                    volume: 0.5,
                    mutex: true,
                    video: {
                            url:"https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
                        defaultQuality: 0,

                        pic: 'https://cdn.jsdelivr.net/gh/FioraLove/Images/531-bigskin-1.jpg',
                        thumbnails: 'https://cdn.jsdelivr.net/gh/FioraLove/Images/531-bigskin-1.jpg',
                        type: 'auto',
                    },
                    // 字幕
                    subtitle: {
                        url: 'https://s-sh-17-dplayercdn.oss.dogecdn.com/hikarunara.vtt',
                        type: 'webvtt',
                        fontSize: '20px',
                        bottom: '8%',
                        color: '#b7daff',
                    },
                    // 弹幕
                    danmaku: {
                        /*
                        * 这是另一个博主搭建的弹幕池
                        * api: 'https://dplayer.moerats.com
                        * id: '9E2E3368B56CDBB45
                        * */
                        id: '9E2E3368B56CDBB4',
                        api: 'https://api.prprpr.me/dplayer/',
                        token: 'tokendemo',
                        maximum: 1000,
                        /*
                        * addition:其实可以直接读取一个由弹幕组成的json
                        * */
                        addition: ['https://s-sh-17-dplayercdn.oss.dogecdn.com/1678963.json'],
                        user: 'AhriLove',
                        bottom: '15%',
                        unlimited: true,
                    },
                    contextmenu: [
                        {
                            text: '二次作者',
                            link: 'https://ahriLove.top'
                        }
                    ],
                    highlight: [
                        {
                            time: 20,
                            text: '这是第 20 秒',
                        },
                        {
                            time: 120,
                            text: '这是 2 分钟',
                        },
                    ]});
                // 快进秒数
                // dp.seek(100);
                
                // // 提交一个新弹幕
                // dp.danmaku.send(
                //     {
                //         text: 'dplayer is amazing',
                //         color: '#b7daff',
                //         type: 'right', // should be `top` `bottom` or `right`
                //     },
                //     function () {
                //         console.log('success');
                //     }
                // );
                // // 实时绘制一个新弹幕
                // dp.danmaku.draw({
                //     text: '我是five，兄弟萌！！555555',
                //     color: '#fff',
                //     type: 'bottom',
                // });
                // // 弹幕透明度
                // dp.danmaku.opacity(0.5);
            }
        }
    }
</script>

