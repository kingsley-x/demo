<template>
  <div class="goodslist">
    <login-shop></login-shop>
    <short-cut></short-cut>
    <my-header></my-header>
    <my-nav :flag="flag"></my-nav>
    <div class="w goods_info">
      <ul class="more_list clearfix">
        <li class="more_item" :key="i" v-for="(item, i) in goodsInfo">
          <a href="javascript:;" class="more_link" @click="moveGoodsdetail(item.goods_id)">
            <div class="more_img"><img :src="item.img" alt="" /></div>
            <p class="more_info">{{ item.goods_info }}</p>
            <div class="price-l">
              <i>￥</i>
              <span>{{ item.price }}</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  created () {
    this.getGoodsList()
  },
  data () {
    return {
      flag: true,
      goodsInfo: []
    }
  },
  methods: {
    async getGoodsList () {
      const { data: res } = await this.$http.get('/api/goods/list')
      console.log(res);
      if (res.status === 1) this.$message.error('获取商品列表失败！')
      res.data.forEach(item => {
        this.goodsInfo.push({
          goods_id: item.goods_id,
          goods_info: item.goods_name,
          price: item.goods_price,
          img: 'http://127.0.0.1:3007' + item.pics[0].pics_mid
        })
      })
    },
    moveGoodsdetail (id) {
      console.log(this.$router);
      this.$router.push({
        path: '/detail',
        query: {
          id: id
        }

      })
    }
  }

}
</script>

<style lang="less">
.goods_info {
  margin-top: 20px;
}
.more_list {
  margin: 0 -6px;

  .more_item {
    float: left;
    width: 291px;
    height: 400px;
    margin: 0 6px 10px;
    background-color: #fff;

    .more_link {
      display: block;
      width: 291px;
      height: 400px;

      .more_img {
        width: 291px;
        height: 291px;
        padding: 30px;
        img {
          width: 231px;
          width: 231px;
        }
      }
      .more_info {
        height: 48px;
        line-height: 24px;
        font-size: 14px;
        margin: 0 20px;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .price-l {
        font-size: 22px;
        color: #c81623;
        margin-top: 10px;
        margin-left: 20px;

        i {
          font-size: 14px;
        }
      }
    }
  }
  .more_item:hover {
    border: 1px solid #c81623;
  }
}
</style>