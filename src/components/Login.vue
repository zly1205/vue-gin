<template>
  <el-container>
    <div class="contbord">
      <h3>用户登录</h3>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px">
        <el-form-item label="手机号码" prop="phone">
          <el-input type="number" v-model.number="ruleForm.phone" placeholder="请输入手机号"
          onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-link type="primary"><router-link to="/register">还没有账号？点击注册</router-link></el-link>
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script>
    export default {
      name: "Login",
      data() {
        let checkPhone = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('手机号不能为空'));
          }
          setTimeout(() => {
            if (!Number.isInteger(value)) {
              callback(new Error('请输入数字值'));
            } else {
              callback();
            }
          }, 1000);
        };
        let validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        return {
          ruleForm: {
            phone: '',
            password: ''
          },
          rules: {
            phone: [
              { validator: checkPhone, trigger: 'blur' }
            ],
            password: [
              { validator: validatePass, trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          let user = {
            "telephone": this.ruleForm.phone.toString(),
            "password": this.ruleForm.password.toString()
          };
          let urlStr = "http://localhost:9090/api/auth/login";
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.axios.post(urlStr,user).then((res) => {
                if (res.data.code == 200) {
                  //保存token
                  localStorage.setItem('token', res.data.data.token)
                  this.$router.push("/allUsers");
                }else{
                  alert('登陆失败')
                  return
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
        }
      }
    }
</script>

<style scoped>
  .el-container{
    background-color: #F5F5F5;
    width: 100%;
    height: 100%;
  }
  .contbord{
    width: 50%;
    background-color: #FFFFFF;
    border-radius: 20px;
    margin: 200px auto;
    text-align: center;
  }
  .contbord h3{
    margin-top: 30px;
  }
  .el-form{
    text-align: center;
    margin: 70px auto;
    width: 60%;
  }

</style>
