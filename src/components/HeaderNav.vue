<template>
  <div id="headerNav">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item class="title">
        用户管理系统
      </el-menu-item>
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">数据可视化</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><router-link to="/login">退出登录</router-link></el-menu-item>
      <div style="float: right;margin-right: 30px;">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
      </div>
    </el-menu>
  </div>

</template>

<script>
    export default {
      name: "HeaderNav",
      data() {
        return {
          activeIndex: '1',
          activeIndex2: '1'
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>
  #headerNav{
    width: 100%;
  }
</style>
