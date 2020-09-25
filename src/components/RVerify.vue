<template>
  <div class="hello">
    <el-button type="primary" @click="handleDemo">Submit</el-button>
  </div>
</template>

<script>
export default {
  name: "RVerify",
  props: {
    msg: String
  },
  created() {

  },
  methods: {
    handleDemo:function() {
      RVerify.action(function(code) {
        switch (code) {
          case 1:
            alert("Verify successful.");
            break;
          case 2:
            break;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 20px 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
