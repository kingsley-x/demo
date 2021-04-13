<template>
  <header class="header w">
    <!-- logo模块 -->
    <div class="logo">
      <h1>
        <a href="javascript:;" title="优购商城" @click="toIndex">优购商城</a>
      </h1>
    </div>
    <!-- search搜索模块 -->
    <div class="search">
      <input type="search" name="" id="" placeholder="语言开发" @change="getGoodsList" @keyup="inputKey" v-model="queryInfo.query" />
      <button>搜索</button>
      <div class="goods-list">
        <ul>
          <li class="goods-item" :key="i" v-for="(item, i) in goodslist" @click="skipDetail(item.goods_id)">{{ item.goods_name }}</li>
        </ul>
      </div>
    </div>

    <!-- 购物车模块 -->
    <div class="shopcar" v-if="this.$store.state.shopCar">
      <a href="javascript:;" @click="toShopCar"
        ><i class="car icon-cart"> </i>我的购物车 <i class="arrow icon-cheveron-right"></i> <i class="count">{{ this.$store.state.cartGoodsNum }}</i></a
      >
    </div>
  </header>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('getGoodsNum')
  },
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      goodslist: [],
      timeout: ''

    }
  },
  methods: {
    toShopCar () {
      const token = window.localStorage.getItem('token');
      if (token === null || token === '') {
        return this.$store.commit('openPop')
      }
      this.$store.commit('hideShopCar')
      this.$router.push('/shopcar')
    },
    toIndex () {
      this.$store.commit('showShopCar')
      this.$router.push('/index')
    },

    async getGoodsList () {
      const { data: res } = await this.$http.get('/api/goods/search', {
        params: this.queryInfo
      })

      if (res.status !== 0) {
        return this.$message.error('获取商品列表失败！')
      }

      this.goodslist = res.data
    },
    inputKey (e) {
      if (e.keyCode === 13) {
        this.$store.commit('showShopCar')
        return this.$router.push({
          path: '/detail',
          query: {
            id: this.goodslist[0].goods_id
          }
        })
      }
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.getGoodsList()
      }, 100)
    },
    skipDetail (id) {
      this.$store.commit('showShopCar')
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

<style lang="less"  scoped>
.header {
  position: relative;
  height: 105px;

  .logo {
    position: absolute;
    top: 25px;
    width: 60px;
    height: 60px;
    overflow: hidden;
    background-color: #ff6700;
  }

  .logo a {
    display: block;
    width: 60px;
    height: 60px;
    text-indent: -9999px;
  }

  .logo a::before,
  .logo a::after {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 55px;
    height: 55px;
    content: '';
    transition: all 0.3s;
  }

  .logo a::before {
    background: url('../assets/img/logo.png') center center no-repeat;
    background-size: 90%;
    opacity: 1;
  }

  .logo a::after {
    background: url('../assets/img/logo-home.png') center center no-repeat;
    background-size: 160%;
    opacity: 0;
    margin-left: -66px;
  }

  .logo a:hover::before {
    margin-left: 60px;
    opacity: 0;
  }

  .logo a:hover::after {
    margin-left: 0;
    opacity: 1;
  }

  .search {
    position: absolute;
    left: 346px;
    top: 35px;
    width: 538px;
    height: 36px;
    border: 2px solid #b1191a;
  }

  .search input {
    float: left;
    width: 454px;
    height: 32px;
    padding-left: 10px;
  }

  .search button {
    position: absolute;
    top: -2px;
    right: 0;
    width: 80px;
    height: 36px;
    background-color: #b1191a;
    font-size: 16px;
    color: #fff;
  }
  .goods-list {
    position: absolute;
    top: 34px;
    left: -2px;
    width: 456px;
    background-color: #fff;
    box-shadow: 0 1px 10px 1px rgba(0, 0, 0, 0.1);
    z-index: 1039;
  }
  .goods-item {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .goods-item:hover {
    background-color: #ddd;
  }
  .shopcar a {
    position: absolute;
    right: 60px;
    top: 35px;
    width: 140px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border: 1px solid #dfdfdf;
    background-color: #f7f7f7;
  }

  .car {
    font-family: 'icomoon';
    color: #da5555;
  }

  .arrow {
    font-family: 'icomoon';
    margin-left: 5px;
  }

  .count {
    position: absolute;
    top: -5px;
    left: 105px;
    height: 14px;
    line-height: 14px;
    color: #fff;
    background-color: #e60012;
    padding: 0 5px;
    border-radius: 7px 7px 7px 0;
  }
}
</style>