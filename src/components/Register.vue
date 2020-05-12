<template>
  <el-container>
    <div class="contbord">
      <h3>用户注册</h3>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model.number="ruleForm.name" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input type="number" v-model.number="ruleForm.phone" placeholder="请输入手机号"
          onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script>
    export default {
      name: "Register",
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
        let validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          ruleForm: {
            name: '',
            phone: '',
            password: '',
            checkPass: ''
          },
          rules: {
            phone: [
              { validator: checkPhone, trigger: 'blur' }
            ],
            password: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          var user = {
            "name": this.ruleForm.name.toString(),
            "telephone": this.ruleForm.phone.toString(),
            "password": this.ruleForm.password.toString()
          }
          const urlStr = "http://localhost:9090/api/auth/register";
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.axios.post(urlStr, user).then((res) => {
                console.log(res.data)
                if (res.data.code == 200) {
                  alert('注册成功')
                  this.$router.push("/login");
                }else{
                  alert('注册失败,' + res.data.mag)
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
