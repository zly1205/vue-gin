<template>
    <el-container class="home-container">
      <el-header>
        <header-nav></header-nav>
      </el-header>
      <el-container>
        <el-aside>
          <left-nav></left-nav>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

</template>

<script>
    import HeaderNav from './HeaderNav.vue';
    import leftNav from './LeftNav.vue';
    import HelloWord from './HelloWorld.vue';
    
    export default {
        name: "Home",
        components: {
          HeaderNav,
          leftNav,
          HelloWord
        }
    }
</script>

<style scoped>
  .home-container{
    height: 100%;
  }
  .el-header{
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
  }
</style>
