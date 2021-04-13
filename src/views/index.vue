<template>
  <div class="main">
    <login-shop></login-shop>
    <short-cut></short-cut>
    <my-header></my-header>
    <my-nav :flag="flag"></my-nav>
    <swiper-slide></swiper-slide>
    <flash-sale></flash-sale>
    <floor-nav></floor-nav>
    <my-footer></my-footer>
  </div>
</template>

<script>
import slide from '../components/index/slide'
import flashsale from '../components/index/flashsale'
import floornav from '../components/index/floor'
export default {
  data () {
    return {
      flag: false
    }
  },
  components: {
    'swiper-slide': slide,
    'flash-sale': flashsale,
    'floor-nav': floornav
  }
}

</script>

<style lang="less" scoped>
/deep/.dropdown .dd {
  display: block;
}
</style>>
