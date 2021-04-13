<template>
  <div class="seller">
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header>
        <div>
          <img src="" alt="" />
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <!-- 页面主体区域 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="160px">
          <!-- 侧边栏菜单区域 -->
          <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse-transition="false" router>
            <el-menu-item :index="i + ''" v-for="(item, i) in menulist" :key="i" @click="saveNavState(item.path)">
              <template slot="title">
                <span>{{ item.title }}</span>
              </template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 右侧内容主体 -->
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menulist: [{
        title: '管理员列表', path: '/manager'
      }, {
        title: '角色列表', path: '/role'
      }, { title: '商品列表', path: '/goodslist' }, {
        title: '商品分类', path: '/goodsCate'
      }, {
        title: '分类参数', path: '/params'
      }, {
        title: '订单列表', path: '/slorder'
      }
      ]
    }
  },

  methods: {
    logout () {
      window.localStorage.clear()
      this.$router.push('/index')
      this.$store.commit('showShopCar')
      this.$store.commit('showLoginBtn')
      this.$store.commit('changeRadio', 1)
    },
    saveNavState (activePath) {
      this.$router.push(activePath)
    }
  }
}
</script>

<style lang="less" scoped>
.seller {
  background-color: #fff;
}
.home-container {
  height: 800px;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}
</style>