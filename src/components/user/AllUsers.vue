<template>
  <div>
    <el-breadcrumb class="breadrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户一览</el-breadcrumb-item>
    </el-breadcrumb>
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
        <el-table-column
          label="操作"
          width="300px">
          <template slot-scope="scope">
            <el-button @click="hrefClick(scope.row.Id)" type="text" size="small">修改</el-button>
            <el-button @click="delUser(scope.row.Id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>

</template>

<script>
  export default{
    name:"AllUsers",
    methods: {
      hrefClick(val) {
        this.$router.push("/preUpdateUser?id="+val);
      },
      //删除用户
      delUser(val) {
        const urlStr = "http://localhost:9090/userAdmin/";
        if (confirm('是否删除')) {
          this.axios.delete(urlStr + val, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },  //设置的请求头
          }).then(res => {
              console.log(res.data)
              if (res.data.code == 200) {
                alert('删除成功');
                location.reload()
              }else {
                alert('删除失败');
                return
              }
          })
        }else {
          return
        }

      }
    },
    data() {
      return {
            tableData: null
          }
    },

    mounted() {
      const urlStr = "http://localhost:9090/userAdmin";
      this.axios.get(urlStr,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },  //设置的请求头
      }).then((response) => {
        console.log(response.data)
        this.tableData = response.data.user
      })
    }

  }
</script>

<style scoped>
  .breadrumb{
    margin: 5px 10px 20px 10px;
  }
</style>
