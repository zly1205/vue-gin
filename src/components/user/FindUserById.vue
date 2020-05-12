<template>
	<div>
    <el-breadcrumb class="breadrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户一览</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-input
          placeholder="请输入用户ID"
          prefix-icon="el-icon-search"
          v-model="input">
      </el-input>
      <el-button @click="findById()" type="primary" icon="el-icon-search" plain>搜索</el-button>
    </el-row>
    <el-table
        :data="tableData"
        style="width: 100%"
        min-height="400px"
        max-height="600px">
        <el-table-column
          prop="Id"
          label="编号"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="Name.String"
          label="姓名"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="Sex.String"
          label="性别"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="Age"
          label="年龄"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="Telephone.String"
          label="电话"
          width="200px">
        </el-table-column>
        <el-table-column
          prop="Qq.String"
          label="qq"
          width="200px">
        </el-table-column>
      </el-table>
	</div>
</template>

<script>
  export default {
    name: "FindUserById",
    data() {
        return {
          input: '',
          tableData: null
        }
    },
    methods: {
      findById() {
        const urlStr = "http://localhost:9090/userAdmin/";
        this.axios.get(urlStr + this.input,{
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },  //设置的请求头
        }).then((response) => {
          console.log(response.data)
          if (response.data.code == 200) {
            var arr = []
            arr.push(response.data.user);
            this.tableData = arr;
          }else {
            alert(response.data.msg);
            this.tableData = null;
            this.input = null;
            return
          }
        })
      }
    },
  }
</script>

<style scoped>
  .breadrumb{
    margin: 5px 10px 20px 10px;
  }
  .el-input{
    width: 200px;
  }
</style>
