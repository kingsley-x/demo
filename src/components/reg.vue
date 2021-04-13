<template>
  <div class="w">
    <header>
      <div class="logo">
        <h1>
          <a href="/#/index" title="优购商城">优购商城</a>
        </h1>
      </div>
    </header>
    <div class="reg_box">
      <h3>
        注册新用户
        <div class="toLogin">我有账号，去<a href="javascript:;" id="toLogin" @click="loginBtn">登陆</a></div>
      </h3>
      <div class="avatar_box">
        <el-form ref="regFormRef" label-width="94px" class="regfrom" :model="regForm" :rules="regFormRules">
          <el-form-item label="用户名：" prop="username">
            <el-input class="inp" v-model="regForm.username"></el-input>
          </el-form-item>
          <el-form-item label="登录密码：" prop="password">
            <el-input show-password class="inp" v-model="regForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="repassword">
            <el-input show-password class="inp" v-model="regForm.repassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain class="regBtn" @click="regUser">注册</el-button>
            <span class="icon-loop2 reset" @click="resetRegForm"></span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var validatePass1 = (rule, value, callback) => {
      if (value !== this.regForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      regForm: {
        username: '',
        password: '',
        repassword: ''
      },
      regFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请再次输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
          { validator: validatePass1, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async resetRegForm () {
      this.$refs.regFormRef.resetFields();
    },
    regUser () {
      this.$refs.regFormRef.validate(async valid => {
        if (!valid) return;
        const { data: result } = await this.$http.post('/api/reguser', this.regForm)
        if (result.status === 1) {
          return this.$message.error(result.message);
        }
        const { data: res } = await this.$http.post('/api/login', this.regForm)
        if (res.status === 1) {
          return this.$message.error('登录失败！');
        }
        window.localStorage.setItem('id', res.id)
        window.localStorage.setItem('token', res.token)

        this.$store.commit('hideLoginBtn')
        this.$router.push('/index')
      })
    },
    loginBtn () {
      this.$store.commit('openPop')
      this.$router.push('/index')
    }
  }
}
</script>

<style lang="less" scoped>
header {
  position: relative;
  height: 105px;
  border-bottom: 2px solid #c81523;

  .logo {
    position: absolute;
    top: 25px;
    width: 60px;
    height: 60px;
    overflow: hidden;
    background-color: #ff6700;

    a {
      display: block;
      width: 60px;
      height: 60px;
      text-indent: -9999px;
    }

    a::before,
    a::after {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      width: 55px;
      height: 55px;
      content: '';
      transition: all 0.3s;
    }

    a::before {
      background: url('../assets/img/logo.png') center center no-repeat;
      background-size: 90%;
      opacity: 1;
    }

    a::after {
      background: url('../assets/img/logo-home.png') center center no-repeat;
      background-size: 160%;
      opacity: 0;
      margin-left: -66px;
    }

    a:hover::before {
      margin-left: 60px;
      opacity: 0;
    }

    a:hover::after {
      margin-left: 0;
      opacity: 1;
    }
  }
}
.reg_box {
  position: relative;
  height: 522px;
  border: 1px solid #ccc;
  margin-top: 20px;

  h3 {
    height: 42px;
    border-bottom: 1px solid #ccc;
    background-color: #ececec;
    line-height: 42px;
    padding: 0 10px;
    font-size: 18px;
    font-weight: 400;
    .toLogin {
      float: right;
      font-size: 14px;

      a {
        color: #c81523;
      }
    }
  }
  .avatar_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;

    .inp {
      width: 242px;
    }
    .regBtn {
      width: 200px;
    }
    .reset {
      display: inline-block;
      width: 30px;
      height: 40px;
      line-height: 44px;
      text-align: center;
      font-size: 20px;
      margin-left: 5px;
      cursor: pointer;
    }
  }
}
</style>
