<template>
  <div class="box">
    <h1>NMSL</h1>
    <div class="block">
      <span class="demonstration">页数较少时的效果</span>
      <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
    </div>
    <div class="block">
      <span class="demonstration">大于 7 页时的效果</span>
      <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
    </div>

    <template>
        <el-radio v-model="radio" label="Python">Python</el-radio>
        <el-radio v-model="radio" label="Java">Java</el-radio>
        <el-radio v-model="radio" label="C++" fill="#84fab0">C++</el-radio>
        <el-radio v-model="radio" label="PHP" disabled>PHP</el-radio>
        <p>{{ radio }}</p>
            
    </template>
    <template>
        <el-checkbox-group v-model="checkList">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="禁用" disabled></el-checkbox>
            <el-checkbox label="选中且禁用" disabled></el-checkbox>
        </el-checkbox-group>
        <ul>
            <li v-for="(item,index) in checkList" :key="index">{{item}}</li>
        </ul>
        <el-row :gutter="10">
            <el-col :xs="24" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></el-col>
            <el-col :xs="24" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :xs="24" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></el-col>
            <el-col :xs="24" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
        </el-row>
    </template>
  </div>
  
</template>

<script>
  export default {
    data () {
      return {
        radio: 'Python',
        checkList:['选中且禁用','复选框 A','复选框 B','复选框 C']
      };
    }
  }
</script>

<style scope>
    .box{
        background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    }
    li{
        list-style: none;
        color: cadetblue;
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>





