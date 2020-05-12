<template>
    <div id="leftNav">
      <el-row class="tac">
        <el-col style="width: 100%;">
          <h5 style="margin-top: 25px;">操作栏</h5>
          <el-menu default-active="1"  :default-openeds="['1']" :router="true">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>人员管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/addUser">增加用户</el-menu-item>
                <el-menu-item index="/allUsers">人员一览</el-menu-item>
                <el-menu-item index="/findUserById">查询用户</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "LeftNav",
        methods: {

        }
    }
</script>

<style scoped>
  .el-submenu{
    padding-left: -20px;
  }
</style>
