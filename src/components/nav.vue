
<template>
  <div class="nav">
    <div class="w">
      <ul class="nav-list" id="nav-list" @mouseleave="getItemHide">
        <li class="dropdown fl" @mouseenter="getMenuShow" @mouseleave="getMenuHide">
          <div class="dt">全部商品分类</div>
          <div class="dd">
            <div class="menu_children" @mouseenter="getMenuGoodsShow" @mouseleave="getMenuGoodsHide">
              <ul class="menu_children_list">
                <li class="menu_children_item" :key="i" v-for="(item, i) in menuCatGoods">
                  <a href="/#/list">
                    <img :src="item.img" alt="" width="40px" height="40px" /><span class="title">{{ item.text }}</span>
                  </a>
                </li>
              </ul>
            </div>
            <ul class="menu" id="menu" @mouseleave="getMenuGoodsHide">
              <li class="menu_item" :key="i" v-for="(item, i) in menuItem" @mouseenter="setMenuCatGoods(item)">
                <a href="/#/list">{{ item }}</a> <i></i>
              </li>
            </ul>
          </div>
        </li>

        <li class="navitems fl" :key="i" v-for="(item, i) in navitems" @mouseenter="getItemShow(item)">
          <div class="navCat">{{ item }}</div>
          <div class="item-children">
            <div class="w">
              <ul>
                <li :key="i" v-for="(item, i) in menuCatGoods">
                  <a href="/#/list">
                    <div><img :src="item.img" width="110px" height="110px" /></div>
                    <div class="title">{{ item.text }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  props: ['flag'],
  data () {
    return {
      menuItem: ['家用电器', '手机、数码、通信', '电脑、办公', '家居、家具、家装、厨具', '男装、女装、童装、内衣', '个户化妆、清洁用品、宠物', '鞋靴、箱包、珠宝、奢侈品', '运动户外、钟表', '汽车、汽车用品', '母婴、玩具乐器', '食品、酒类、生鲜、特产', '医药保健', '图书、音像、电子书', '彩票、旅行、充值、票务', '理财、众筹、白条、保险'],
      navitems: ['服装城', '美妆馆', '全球购', '闪购', '团购', '拍卖', '有趣'],
      listCatGoods: [],
      menuCatGoods: []
    }
  },
  methods: {
    getItemShow (item) {
      $('.item-children').stop().slideDown();
      console.log(item);
    },
    getItemHide () {
      $('.item-children').stop().slideUp();
    },
    getMenuHide () {
      if (this.flag) {
        $('.dd').stop().slideUp();
      }
    },
    getMenuShow () {
      $('.item-children').stop().slideUp();
      if (this.flag) {
        $('.dd').stop().slideDown();
      }
    },
    getMenuGoodsShow () {
      $('.menu_children').stop().fadeIn()
    },
    getMenuGoodsHide () {
      $('.menu_children').stop().fadeOut()
    },
    setMenuCatGoods (item) {
      this.getMenuGoodsShow()
      this.getMenuCatGoods(item)
    },
    async getMenuCatGoods (item) {
      const data = {
        cat_name: item
      }
      const { data: res } = await this.$http.post('api/cat/goods', data)
      if (res.status === 1) this.$message.error('获取商品信息失败！')
      this.menuCatGoods = []
      res.data.forEach(item => {
        this.menuCatGoods.push({
          img: 'http://127.0.0.1:3007' + item.pics[0].pics_sma,
          text: item.goods_name
        })
      })
    }
  }
}

</script>

<style lang="less" scoped>
@import url('../assets/css/nav.css');
</style>>
