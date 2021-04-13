<template>
  <div class="payoff">
    <short-cut></short-cut>
    <my-header></my-header>
    <div class="p-container">
      <div class="w">
        <div class="pay-filter-bar">
          <em>填写并核对订单信息</em>
        </div>
        <div class="pay-wrap">
          <div class="pay-info">
            <div class="consig-info">
              <h1>收件人信息</h1>
              <el-row class="c-content">
                <el-col :span="2" class="conTitle consg">
                  <span>收件人姓名:</span>
                </el-col>
                <el-col :span="5"><el-input v-model="formConsig.name" size="small"></el-input></el-col>
                <el-col :span="3" class="conPhone consg">
                  <span>收件人电话号码:</span>
                </el-col>
                <el-col :span="5"><el-input v-model="formConsig.phone" size="small"></el-input></el-col>
              </el-row>
              <el-row :gutter="20" class="a-content">
                <el-col :span="2" class="conAddress consg">
                  <span>收件地址:</span>
                </el-col>
                <el-col :span="8"><el-input v-model="formConsig.address" size="small"></el-input></el-col>
              </el-row>
            </div>
            <div class="order-goods">
              <h1>订单信息</h1>
              <div class="order-item-list">
                <div class="order-item" :key="i" v-for="(item, i) in orderGoods">
                  <span class="o-img">
                    <img :src="item.pics" alt="" width="80px" height="80px" />
                  </span>
                  <span class="o-msg">{{ item.goods_name }}</span>
                  <span class="o-price">￥{{ item.goods_price }}</span>
                  <span class="o-num">x {{ item.goods_num }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="p-total">
            <div class="subtotal">
              <span
                ><i>{{ orderSum }}</i
                >件商品，总商品金额：<em>￥ {{ orderTotal }}</em></span
              >
            </div>
            <div class="jianshao">
              <span>返现：<em>-￥0.00</em></span>
            </div>
            <div class="yunfei">
              <span>运费：<em>￥0.00</em></span>
            </div>
          </div>
          <div class="order-total">
            <div class="total">
              <span
                >应付总额： <i style="color: #df3033; margin-left: 15px">￥{{ orderTotal }}</i></span
              >
            </div>
            <div class="o-info">
              <span
                >寄送到：<i style="margin-right: 7px">{{ formConsig.address }}</i> 收货人：<i style="margin-right: 10px"> {{ formConsig.name }}</i
                ><i>{{ formConsig.phone }}</i></span
              >
            </div>
          </div>
          <div class="putBtn">
            <el-button type="danger" @click="submitOrder">提交订单</el-button>
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
    this.getCartInfo()
  },
  data () {
    return {
      formConsig: {
        name: '',
        phone: '',
        address: ''
      },
      orderGoods: []
    }
  },
  computed: {
    orderSum () {
      let sum = 0
      this.orderGoods.forEach(item => {
        sum += item.goods_num
      })
      return sum
    },
    orderTotal () {
      let total = 0
      this.orderGoods.forEach(item => {
        total += item.goods_price * item.goods_num
      })
      return total
    }
  },
  methods: {
    async getCartInfo () {
      let cartId = this.$route.query.cartId
      if (typeof cartId === 'string') {
        cartId = (cartId.split(' '));
      }
      const { data: res } = await this.$http.post('/my/order/set', cartId)
      console.log(res);
      if (res.status === 1) return false
      res.data.forEach(item => {
        this.orderGoods.push({
          pics: 'http://127.0.0.1:3007' + item.pics_big,
          goods_name: item.goods_name,
          goods_price: item.goods_price,
          goods_num: item.goods_num
        })
      })
    },
    async submitOrder () {
      const str = this.formConsig
      if (str.name === '' || str.phone === '') {
        return this.$message.error('请输入收信人信息')
      } else if (str.address === '') {
        return this.$message.error('请输入收信人信息')
      }
      let cartId = this.$route.query.cartId
      if (typeof cartId === 'string') {
        cartId = (cartId.split(' '));
      }
      const obj = {
        ...this.formConsig,
        cartId: cartId,
        price: this.orderTotal
      }
      const { data: res } = await this.$http.post('my/cart/pay', obj)
      if (res.status === 1) return this.$message.error('支付失败！')
      this.$router.go(-1)
    }
  }

}
</script>

<style lang="less" scoped>
.payoff {
  background-color: #fff;
}
.p-container {
  .pay-filter-bar {
    font-size: 18px;
    color: #666;
  }
  .pay-info {
    margin: 20px 0;
    padding-bottom: 20px;
    border: 1px solid #ddd;
    .consig-info {
      padding: 20px 60px;

      h1 {
        position: relative;
      }
      h1::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: -9px;
        transform: translateX(-50%);
        width: 95%;
        height: 2px;
        background: linear-gradient(rgba(200, 200, 200, 0) 0%, rgba(200, 200, 200, 1) 50%, rgba(200, 200, 200, 0) 100%);
      }
      .c-content {
        margin-top: 26px;
      }
      .a-content {
        margin-top: 12px;
      }
      .consg {
        height: 32px;
        line-height: 32px;
        font-size: 16px;
      }
      .conPhone {
        padding-left: 10px;
        margin-left: 20px;
      }
    }
    .order-goods {
      padding: 0 60px;
      // h1 {
      //   position: relative;
      // }
      // h1::after {
      //   content: '';
      //   position: absolute;
      //   left: 50%;
      //   bottom: -9px;
      //   transform: translateX(-50%);
      //   width: 95%;
      //   height: 2px;
      //   background: linear-gradient(rgba(200, 200, 200, 0) 0%, rgba(200, 200, 200, 1) 50%, rgba(200, 200, 200, 0) 100%);
      // }
      .order-item-list {
        margin-top: 9px;
        padding: 20px 30px 0;
        background-color: rgb(250, 219, 224);
        .order-item {
          position: relative;
          height: 100px;

          .o-msg {
            display: inline-block;
            margin-left: 100px;
            width: 300px;
            vertical-align: top;
          }
          .o-price {
            margin-left: 320px;
            color: #e12228;
            font-size: 20px;
            vertical-align: middle;
          }
          .o-num {
            margin-left: 100px;
          }
        }
      }
    }
  }
  .p-total {
    div {
      display: flex;
      flex-direction: row-reverse;
      font-size: 14px;
      span {
        margin-right: 30px;
        em {
          display: inline-block;
          width: 130px;
          text-align: right;
        }
      }
    }
    .subtotal {
      em {
        color: #df3033;
      }
    }
  }
  .order-total {
    border: 1px solid #ddd;
    background-color: #f4f4f4;
    font-size: 14px;
    div {
      margin-right: 30px;
      display: flex;
      flex-direction: row-reverse;
    }
  }
  .putBtn {
    margin: 20px 30px 20px 0;
    display: flex;
    flex-direction: row-reverse;
    .el-button--danger {
      color: #fff;
      background-color: #df3033;
      border-color: #df3033;
    }
  }
}
/deep/ .footer {
  background-color: #f5f5f5;
}
</style>