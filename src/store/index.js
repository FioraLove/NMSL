import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: "hello  world!",
        api: "https://www/baidu.com"
    },
    mutations: {
    },
    actions: {
    },
    getters:{
    }
});

/** Vuex的核心概念
1. State
2. Mutation
3. Getter
4. Action

参考文档：https://blog.csdn.net/weixin_44042074/article/details/107130815

1. State
提供唯一的公共数据源，所有共享的数据都要统一放到 Store 的 state 中进行存储

创建数据
state： { num: 0}

访问数据方式一： this.$store.state.全局数据名称
访问数据方式二： 按需导入
// 1. 从 vuex 中按需导入 mapState 函数 
import { mapState } from 'vuex' 

// 2. 将全局数据，映射为当前组件的计算属性 
computed: { 
  ...mapState(['num']) 
}

2. mutations 用于变更 Store中 的数据。
只能通过 mutations变更 Store 数据，不可以直接操作 Store 中的数据。
通过这种方式虽然操作起来稍微繁琐一些，但是可以集中监控所有数据的变化。

3. Action 用于处理异步任务。
如果通过异步操作变更数据，必须通过 Action，而不能使用 Mutation，但是在 Action 中还是要通过触发 Mutation的方式间接变更数据

*/