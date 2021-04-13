<template>
  <section class="shortcut">
    <div class="w">
      <div class="fl">
        <ul>
          <li>你好！&nbsp;</li>
          <li v-show="this.$store.state.loginFlag">
            <a href="javascript:;" @click="loginShop" class="tologin">请登录</a> &nbsp;
            <a href="/#/reg" class="style_red">免费注册</a>
          </li>
        </ul>
      </div>
      <div class="fr">
        <ul>
          <li><a href="javascript:;" @click="tologinShop">我的订单</a></li>
          <li class="spacer"></li>
          <li class="arrow-icon" @mouseenter="slideDown(0)" @mouseleave="slideup(0)">
            <a href="#">我的商城</a>
            <ul>
              <li><a href="javascript:;">待处理订单</a></li>
              <li><a href="javascript:;">退换货</a></li>
              <li><a href="javascript:;">消息</a></li>
            </ul>
          </li>
          <li class="spacer"></li>
          <li><a href="javascript:;">我的会员</a></li>
          <li class="spacer"></li>
          <li><a href="javascript:;">企业采购</a></li>
          <li class="spacer"></li>
          <li class="arrow-icon" @mouseenter="slideDown(1)" @mouseleave="slideup(1)">
            <a href="#">客户服务</a>
            <ul>
              <li><a href="javascript:;">帮助中心</a></li>
              <li><a href="javascript:;">联系客服</a></li>
              <li><a href="javascript:;">售后服务</a></li>
            </ul>
          </li>
          <li class="spacer"></li>
          <li class="arrow-icon" @mouseenter="slideDown(2)" @mouseleave="slideup(2)">
            <a href="#">网站导航</a>
            <ul>
              <li><a href="javascript:;">手机数码</a></li>
              <li><a href="javascript:;">家用电器</a></li>
              <li><a href="javascript:;">衣鞋服饰</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import $ from 'jquery'

export default {
  methods: {
    tologinShop () {
      const token = window.localStorage.getItem('token')
      if (token === null || token === '') {
        return this.$store.commit('openPop')
      }
      const radio = this.$store.state.radio
      if (radio === 1) {
        this.$router.push('/order')
      } else if (radio === 2) {
        this.$router.push('/seller')
      }
    },
    slideDown (i) {
      $('.arrow-icon ul').eq(i).stop().slideDown()
    },
    slideup (i) {
      $('.arrow-icon ul').eq(i).stop().slideUp()
    },
    loginShop () {
      const token = window.localStorage.getItem('token')
      if (token === null || token === '') {
        return this.$store.commit('openPop')
      }
    }

  }
}

</script>

<style lang="less" >
.shortcut {
  height: 31px;
  line-height: 31px;
  background-color: #f1f1f1;
}

.shortcut ul li {
  float: left;
}

.shortcut .fr > ul > li:nth-child(odd) {
  padding: 0 12px;
}

.shortcut .fr .spacer {
  width: 1px;
  height: 12px;
  background-color: #666;
  margin: 9px 3px 0;
}

.shortcut .arrow-icon {
  position: relative;
}

.shortcut .arrow-icon:hover {
  background-color: #fff;
}

.arrow-icon::after {
  content: '\e932';
  font-family: 'icomoon';
  margin-left: 6px;
}

.shortcut .arrow-icon ul {
  display: none;
  position: absolute;
  top: 31px;
  left: 0px;
  width: 100%;
  border: 1px solid #ccc;
  border-top: 1px solid #fff;
  z-index: 2;
  background-color: #fff;
}

.shortcut .arrow-icon ul li {
  float: none;
  padding-left: 11px;
}
</style>