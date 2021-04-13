<template>
  <div class="shopCar">
    <short-cut></short-cut>
    <my-header></my-header>
    <div class="c-container">
      <div class="w">
        <div class="cart-filter-bar">
          <em>全部商品</em>
        </div>
        <!-- 购物车主要核心区域 -->
        <div class="cart-warp">
          <!-- 头部全选模块 -->
          <div class="cart-thead">
            <div class="t-checkbox"><input type="checkbox" class="checkall" ref="checkall" @change="changeCheckall($event)" /> 全选</div>
            <div class="t-goods">商品</div>
            <div class="t-price">单价</div>
            <div class="t-num">数量</div>
            <div class="t-sum">小计</div>
            <div class="t-action">操作</div>
          </div>
          <!-- 商品详细模块 -->
          <div class="cart-item-list">
            <div :key="i" v-for="(item, i) in carInfo" class="cart-item" :class="{ check_cart_item: item.flag }">
              <div class="p-checkbox">
                <input type="checkbox" name="" class="j-checkbox" ref="j_checkbox" @change="changeCheckbox(i, $event)" />
              </div>
              <div class="p-goods">
                <div class="p-img">
                  <img :src="item.pics" alt="" width="80px" height="80px" />
                </div>
                <div class="p-msg">
                  {{ item.goods_name }}
                </div>
              </div>
              <div class="p-price">￥{{ item.goods_price }}</div>
              <div class="p-num">
                <div class="quantity-form">
                  <a href="javascript:;" class="decrement" @click="redNum(i)">-</a>
                  <input type="text" class="itxt" v-model="item.goods_num" />
                  <a href="javascript:;" class="increment" @click="addNum(i)">+</a>
                </div>
              </div>
              <div class="p-sum">￥{{ p_sum(i) }}</div>
              <div class="p-action"><a href="javascript:;" @click="deleteGoods(i)">删除</a></div>
            </div>
          </div>

          <!-- 结算模块 -->
          <div class="cart-floatbar">
            <div class="select-all"><input type="checkbox" name="" id="2" class="checkall" ref="checkall2" @change="changeCheckall2($event)" />全选</div>
            <div class="operation">
              <a href="javascript:;" class="remove-batch" @click="deletePHGoods"> 删除选中的商品</a>
              <a href="javascript:;" class="clear-all" @click="deleteAllGoods">清理购物车</a>
            </div>
            <div class="toolbar-right">
              <div class="amount-sum">
                已经选<em>{{ sum }}</em
                >件商品
              </div>
              <div class="price-sum">
                总价： <em>￥{{ total_p }}</em>
              </div>
              <div class="btn-area" @click="getPayoff">去结算</div>
            </div>
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
    this.getCarInfo()
    this.countSum()
  },
  data () {
    return {
      getItem: false,
      getItemStyle: false,
      checkCartItem: 'checkCartItem',
      carInfo: []
    }
  },
  computed: {
    p_sum () {
      return (i) => {
        return this.carInfo[i].goods_price * this.carInfo[i].goods_num
      }
    },
    total_p () {
      return this.countTotal()
    },
    sum () {
      return this.countSum()
    }

  },

  methods: {
    async getCarInfo () {
      const { data: res } = await this.$http.get('/my/cart/' + localStorage.getItem('id'))
      this.carInfo = []
      if (res.status === 1) return false
      res.data.forEach(item => {
        this.carInfo.push({
          cart_id: item.cart_id,
          pics: 'http://127.0.0.1:3007' + item.pics_big,
          goods_name: item.goods_name,
          goods_price: item.goods_price,
          goods_num: item.goods_num,
          flag: false
        })
      })
    },
    changeCheck (e) {
      const flag = e.target.checked
      this.getItemStyle = flag
      this.carInfo.forEach(item => {
        item.flag = flag
      })
      this.$refs.j_checkbox.forEach(item => {
        item.checked = flag
      })
    },
    changeCheckall (e) {
      this.$refs.checkall2.checked = e.target.checked
      this.changeCheck(e)
    },
    changeCheckall2 (e) {
      this.$refs.checkall.checked = e.target.checked
      this.changeCheck(e)
    },
    changeCheckbox (index, e) {
      this.carInfo[index].flag = e.target.checked
      const num = this.carInfo.filter(item => {
        return item.flag
      })
      if (num.length === this.carInfo.length) {
        this.$refs.checkall.checked = true
        this.$refs.checkall2.checked = true
      } else {
        this.$refs.checkall.checked = false
        this.$refs.checkall2.checked = false
      }
    },
    addNum (i) {
      this.carInfo[i].goods_num++
    },
    redNum (i) {
      if (this.carInfo[i].goods_num <= 1) {
        return false;
      } else {
        this.carInfo[i].goods_num--
      }
    },
    countTotal () {
      let Ptotal = 0;
      this.carInfo.forEach((item, i) => {
        if (item.flag) {
          Ptotal += this.p_sum(i)
        }
      })
      return Ptotal
    },
    countSum () {
      let sum = 0
      this.carInfo.forEach((item, i) => {
        if (item.flag) {
          sum += item.goods_num
        }
      })
      return sum
    },
    async deleteGoods (i) {
      const cartId = [this.carInfo[i].cart_id]
      const { data: res } = await this.$http.post('/my/cart/delete', cartId)
      if (res.status === 1) this.$message.error('删除商品失败！')
      this.$message.success('删除商品成功！')
      this.getCarInfo()
    },
    async deletePHGoods () {
      const cartId = []
      this.carInfo.forEach(item => {
        if (item.flag) {
          cartId.push(item.cart_id)
        }
      })
      const { data: res } = await this.$http.post('/my/cart/delete', cartId)
      if (res.status === 1) this.$message.error('删除商品失败！')
      this.$message.success('删除商品成功！')
      this.getCarInfo()
    },
    async deleteAllGoods () {
      const cartId = []
      this.carInfo.forEach(item => {
        cartId.push(item.cart_id)
      })
      const { data: res } = await this.$http.post('/my/cart/delete', cartId)
      if (res.status === 1) this.$message.error('删除商品失败！')
      this.$message.success('删除商品成功！')
      this.getCarInfo()
    },
    getPayoff () {
      const cartId = []
      this.carInfo.forEach(item => {
        if (item.flag) {
          cartId.push(item.cart_id)
        }
      })
      if (cartId.length !== 0) {
        this.$router.push({
          path: '/payoff',
          query: {
            cartId: cartId
          }
        })
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/css/shopCar.css';
</style>