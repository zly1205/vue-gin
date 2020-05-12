<template>
  <div class="preUser">
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
        <el-button type="primary" @click="submitForm('ruleForm')">用户修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default{
    name:"PreUpdateUser",
    data() {
          return {
            ruleForm: {
              id: null,
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
                { required: true, message: '请输入年龄', trigger: 'blur' }
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
            this.$refs[formName].validate((valid) => {
              if (valid) {
                let user = {
                  id: parseInt(this.ruleForm.id),
                  name: this.ruleForm.name,
                  sex: this.ruleForm.sex,
                  age: parseInt(this.ruleForm.age),
                  telephone: this.ruleForm.telephone,
                  qq: this.ruleForm.qq
                }
                this.axios.put('http://localhost:9090/userAdmin',user,{
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },  //设置的请求头
                }).then((res) => {
                  console.log(res)
                  if (res.data.code == 200) {
                    this.$router.push("/allUsers")
                  }else{
                    alert('修改失败')
                  }
                })
              } else {
                alert('error submit!!');
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
       },
       mounted () {
         this.axios.get('http://localhost:9090/preUserAdmin/'+ this.$route.query.id,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },  //设置的请求头
          }).then((response) => {
           this.ruleForm.id = response.data.user.Id;
           this.ruleForm.name = response.data.user.Name.String;
           this.ruleForm.sex = response.data.user.Sex.String;
           this.ruleForm.age = response.data.user.Age;
           this.ruleForm.telephone = response.data.user.Telephone.String;
           this.ruleForm.qq = response.data.user.Qq.String;
         })
       }
  }
</script>

<style scoped>
  .preUser {
    width: 60%;
    margin: 50px auto;
  }
</style>
