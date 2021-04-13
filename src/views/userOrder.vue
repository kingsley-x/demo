<template>
  <div class="userOrder">
    <short-cut></short-cut>
    <my-header></my-header>
    <div class="o-container">
      <div class="w">
        <div class="userInfo">
          <h1>
            欢迎<i>{{ username }}</i>
          </h1>
          <el-button type="info" @click="dropOut">退出</el-button>
        </div>
        <div class="order-list">
          <h2>我的订单</h2>
          <div class="order-item" :key="i" v-for="(item, i) in orderInfo">
            <span class="o-img">
              <img src="item.pics" alt="" width="80px" height="80px" />
            </span>
            <span class="o-msg">{{ item.goods_name }}</span>
            <span class="o-price">￥{{ item.goods_price }}</span>
            <span class="o-num">x {{ item.goods_num }}</span>
            <a href="javascript:;" class="deleteBtn" @click="deleteOrder(item.id)">删除</a>
          </div>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  created () {
    this.getUsername()
    this.getUserOrder()
  },
  data () {
    return {
      username: '',
      orderInfo: []
    }
  },
  methods: {
    async getUsername () {
      const id = window.localStorage.getItem('id')
      const { data: res } = await this.$http.get('/api/user/info/' + id)
      if (res.status !== 0) this.$massage.error('获取用户信息失败！')
      this.username = res.data[0].username
    },
    async getUserOrder () {
      const id = window.localStorage.getItem('id')
      const { data: res } = await this.$http.get('/my/order/' + id)
      if (res.status !== 0) return false
      this.orderInfo = []
      if (res.data.length !== 0) {
        res.data.forEach(item => {
          this.orderInfo.push({
            id: item.cart_id,
            pics: 'http://127.0.0.1:3007' + item.pics_big,
            goods_name: item.goods_name,
            goods_price: item.goods_price,
            goods_num: item.goods_num
          })
        })
      }
    },
    async deleteOrder (cartId) {
      const id = [cartId]
      const { data: res } = await this.$http.post('/my/cart/delete', id)
      if (res.status !== 0) this.$message.error('删除订单失败！')
      this.$message.success('删除订单成功！')
      this.getUserOrder()
    },
    dropOut () {
      window.localStorage.clear()
      this.$store.commit('setGoodsNum', 0)
      this.$store.commit('showLoginBtn')
      this.$router.push('/index')
    }
  }
}
</script>

<style lang="less" scoped>
.userOrder {
  background-color: #fff;
}
.userInfo {
  position: relative;
  height: 80px;
  line-height: 80px;
  margin: 20px 0;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  padding-left: 40px;
  /deep/.el-button {
    position: absolute;
    top: 50%;
    right: 40px;
    transform: translateY(-50%);
  }
}
.order-list {
  border: 1px solid #ccc;
  padding: 20px 30px;
  h2 {
    position: relative;
    margin-bottom: 20px;
  }
  h2::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -9px;
    transform: translateX(-50%);
    width: 95%;
    height: 2px;
    background: linear-gradient(rgba(200, 200, 200, 0) 0%, rgba(200, 200, 200, 1) 50%, rgba(200, 200, 200, 0) 100%);
  }

  .order-item {
    position: relative;
    padding: 20px 40px;
    background-color: #f5f5f5;
    margin-bottom: 20px;

    .o-msg {
      display: inline-block;
      margin-left: 50px;
      width: 300px;
      vertical-align: top;
    }
    .o-price {
      margin-left: 80px;
      color: #e12228;
      font-size: 20px;
      vertical-align: middle;
    }
    .o-num {
      margin-left: 50px;
    }
    .deleteBtn {
      margin-left: 350px;
      vertical-align: middle;
      font-size: 14px;
    }
  }
}
/deep/ .footer {
  background-color: #f5f5f5;
}
</style>