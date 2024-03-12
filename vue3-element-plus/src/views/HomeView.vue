<template>
  <div>
    <div class="home-view">
      <div class="home-view-left">
        <div class="title">物流管理系统</div>
      </div>
      <div class="home-view-right"> 
        <div style="padding: 15px;">
          <div style="font-size: 1.2rem;font-weight: 550;margin-bottom: 20px;"> 管理员登录 </div>
            <el-form :model="form" label-width="auto"  ref="ruleFormRef"  :rules="rules">
              <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="账号"/>
              </el-form-item>
              <el-form-item prop="pwd">
                <el-input v-model="form.pwd" placeholder="密码"/>
              </el-form-item>
              <el-form-item prop="code">
                <div style="display: flex;height: 50px;">
                  <el-input v-model="form.code" placeholder="验证码"/>
                  <div v-html="image" @click="fetchData" ></div>
                </div>
              </el-form-item>
            
              <el-form-item>
                <el-button style="width: 100%;" type="primary" @click="onSubmit">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
var _self
import axios from 'axios';
import { ElMessage } from 'element-plus'

export default {
  name: 'HomeView',
  data () {
    return {
      code_text:'',
      form: {
        username: '',
        pwd: '',
        code: '',
      },
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
        ],
        pwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
        ],
      },
      image:''
    }
  },
  computed: {

  },
  created () {
    _self = this
    this.fetchData();
  },
  mounted () {

  },
  methods: {
    async fetchData () {
      const response = await axios.get('http://localhost:3000/string')

      this.image = response.data.data.data
      this.code_text = response.data.data.text
    },
    onSubmit(){
      this.$refs.ruleFormRef.validate((valid, fields) => {
        if (valid) {
          console.log('submit!')

          if (this.code_text.toLowerCase()!=this.form.code.toLowerCase()) {
            ElMessage.error('验证码输入错误!')
            this.fetchData()
            return
          }

          axios.post('http://localhost:3000/login', {username: this.form.username,pwd: this.form.pwd,}).then((response) => {
            if (response.data.code==200) {
              ElMessage.success('登录成功!')
            } 
            else{
              ElMessage.error('用户名或密码错误!')
            }
          })

        } else {
          console.log('error submit!', fields)
        }
      })
    }
  },
  destroyed () {

  }
}
</script>

<style lang="scss" scoped>
.home-view {
  display: flex;
  justify-content: center; 
  align-items: center;
  
  height: 100vh;
}
.home-view-left {
  width: 65%;
  height: 80%;

  background-image: url("./bg.jpg");
  background-size: contain;
  background-position: center;
  background-repeat:no-repeat;
  background-size:cover;

  .title{
    font-size: 1.8rem;
    color: #fff;
    font-weight: 550;
    margin-top: 15%;
    margin-left: 10%;
  }
}
.home-view-right {
  width: 35%;
  height: 80%;
  
  display: flex;
  justify-content: center; 
  align-items: center;
  // background-color: aquamarine;
}
</style>
