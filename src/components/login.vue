<template>
  <div class="login">
    <div class="pop">
      <el-dialog title="登录商城" :visible.sync="dialogFormVisible" ref="dialogs" top="0" width="410px">
        <el-form :model="loginForm" :rules="loginFormRules" ref="loginFromRef">
          <el-form-item label-width="0" prop="username">
            <el-input v-model="loginForm.username"><i slot="prefix" class="icon-user iconfSize"></i></el-input>
          </el-form-item>
          <el-form-item label-width="0" prop="password">
            <el-input v-model="loginForm.password" type="password"><i slot="prefix" class="icon-lock-closed-outline iconfSize"></i></el-input>
          </el-form-item>
          <el-radio-group v-model="radio" @change="getNum">
            <el-radio :label="1">我是买家</el-radio>
            <el-radio :label="2">我是管理员</el-radio>
          </el-radio-group>
          <el-form-item label-width="0">
            <el-button type="danger" @click="loginShop" class="loginBtn">登录</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
      radio: 1

    }
  },
  computed: {
    dialogFormVisible: {
      get: function () {
        return this.$store.state.dialogFormVisible
      },
      set: function () {
        return this.$store.commit('closePop')
      }
    }
  },
  methods: {
    loginShop () {
      this.$refs.loginFromRef.validate(async (valid) => {
        if (!valid) return
        if (this.radio === 1) {
          const { data: res } = await this.$http.post('/api/login', this.loginForm)
          if (res.status !== 0) return this.$message.error('登录失败！')
          window.localStorage.setItem('id', res.id)
          window.localStorage.setItem('token', res.token)
          this.$store.commit('closePop')
          this.$store.dispatch('getGoodsNum')
        } else if (this.radio === 2) {
          const { data: res } = await this.$http.post('http://127.0.0.1:3060/api/private/v1/login', this.loginForm)
          if (res.meta.status !== 200) return this.$message.error('登录失败！')
          this.$message.success('登录成功')
          // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
          //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
          //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
          window.localStorage.setItem('token', res.data.token)
          this.$store.commit('closePop')
          this.$router.push('/seller')
        }
        this.$store.commit('hideLoginBtn')
      })
    },
    getNum () {
      this.$store.commit('changeRadio', this.radio)
    }
  }


}
</script>

<style lang="less" scoped >
/deep/.el-dialog {
  margin: 0;
  height: px;
  position: fixed;
  border: #ebebeb solid 1px;
  left: 50%;
  top: 50%;
  background: #fbfbfb;
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  transform: translate(-50%, -50%);
  .el-dialog__header {
    text-align: center;
    .el-dialog__headerbtn {
      position: absolute;
      right: -20px;
      top: -20px;
      width: 40px;
      height: 40px;
      border: 1px solid #ebebeb;
      background-color: #fff;
      border-radius: 20px;
      color: #333333;
      font-size: 14px;
    }
  }
  .iconfSize {
    line-height: 1.5;
    font-size: 25px;
  }
  .el-button {
    margin-top: 10px;
    width: 100%;
  }
  .el-button--danger {
    color: #fff;
    background-color: #f52b00;
    border-color: #f52b00;
  }
}
</style>

