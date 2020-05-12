<template>
  <div class="addUser">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="ruleForm.sex" placeholder="请选择性别" style="float: left;">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input type="number" v-model="ruleForm.age" placeholder="请使用数字键盘输入"
        onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )">
        </el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="telephone">
        <el-input type="number" v-model="ruleForm.telephone" placeholder="请使用数字键盘输入"
        onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"
        autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="qq号码" prop="qq" autocomplete="off">
        <el-input type="number" v-model="ruleForm.qq" placeholder="请使用数字键盘输入"
        onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default{
    name:"AddUser",
    data() {
          return {
            ruleForm: {
              name: '',
              sex: '',
              age: null,
              telephone: '',
              qq: '',
            },
            rules: {
              name: [
                { required: true, message: '请输入用户名字', trigger: 'blur' },
                { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
              ],
              sex: [
                { required: true, message: '请选择性别', trigger: 'change' }
              ],
              age: [
                { required: true, message: '请输入年龄', trigger: 'blur'}
              ],
              telephone: [
                { required: true, message: '请输入电话号码', trigger: 'blur' }

              ],
              qq: [
                { required: true, message: '请输入qq号码', trigger: 'blur' }
              ],
            }
          };
        },
        methods: {
          submitForm(formName) {
            let user = {
              name: this.ruleForm.name,
              sex: this.ruleForm.sex,
              age: parseInt(this.ruleForm.age),
              telephone: this.ruleForm.telephone,
              qq: this.ruleForm.qq
            }
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.axios.post('http://localhost:9090/userAdmin',user,{
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },  //设置的请求头
                }).then((res) => {
                  console.log(res)
                  if (res.data.code == 200) {
                    this.$router.push("/allUsers")
                  }else{
                    alert('添加失败')
                  }
                })
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          },
        }
  }
</script>

<style scoped>
  .addUser {
    width: 60%;
    margin: 50px auto;
  }
</style>
