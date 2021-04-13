 <template>
  <div class="detail">
    <login-shop></login-shop>
    <short-cut></short-cut>
    <my-header></my-header>
    <my-nav :flag="flag"></my-nav>
    <div class="de_container w">
      <!-- 面包屑导航 -->
      <div class="crumb_wrap">
        <span class="sep" :key="i" v-for="(item, i) in goods_cat">{{ item }} <i>〉</i> </span>
      </div>
      <!-- 产品介绍模块 -->
      <div class="product_intro clearfix">
        <!-- 预览区域 -->
        <div class="preview_wrap fl">
          <div class="preview_img" @mouseenter="showMask" @mouseleave="hideMask" @mousemove="moveMask($event)">
            <img :src="this.previewImg.img" alt="" height="398px" width="398px" class="specImg" />
            <div class="mask"></div>
            <div class="big">
              <img :src="this.previewImg.img" alt="" class="bigImg" width="800px" height="800px" />
            </div>
          </div>
        </div>
        <!-- 产品详细信息 -->
        <div class="itemInfo_wrap fr">
          <div class="sku_name">{{ this.goods_name }}</div>
          <div class="summary">
            <dl class="summary_price">
              <dt>价格</dt>
              <dd>
                <i class="price">￥{{ this.price }} </i>
              </dd>
            </dl>
            <dl class="summary_promotion">
              <dt>促销</dt>
              <dd><em>加购价</em> 满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换 购热销商品</dd>
            </dl>
            <dl class="summary_support">
              <dt>支持</dt>
              <dd>以旧换新，闲置手机回收 4G套餐超值抢 礼品购</dd>
            </dl>
            <div>选择商品</div>
            <div class="preview_list">
              <a href="javascript:;" class="arrow_prev" @click="prevImg"></a>
              <a href="javascript:;" class="arrow_next" @click="nextImg"></a>
              <ul class="list_item">
                <li :key="i" v-for="(item, i) in pics" :class="{ current: changeCurrentStyle === i }" @click="changeCurrent(i)">
                  <img :src="item.img" height="56px" width="56px" />
                </li>
              </ul>
            </div>

            <div class="choose_btns">
              <div class="choose_amount">
                <input type="text" name="num" v-model="num" class="buyNum" @change="changeGoodsNum" />
                <a href="javascript:;" class="add" @click="addGoodsNum">+</a>
                <a href="javascript:;" class="reduce" @click="redGoodsNum">-</a>
              </div>
              <a class="addcar" @click.prevent="getShopCar">加入购物车</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>


<script>
import $ from 'jquery'
export default {
  created () {
    this.getGoodsInfo()
    this.getGoodsId()
  },
  data () {
    return {
      flag: true,
      goods_id: '',
      goods_cat: [],
      goods_name: '',
      price: '',
      pics: [],
      num: 1,
      changeCurrentStyle: 0,
      previewImg: ''

    }
  },
  methods: {
    getGoodsId () {
      this.goods_id = this.$route.query.id
    },
    async getGoodsInfo () {
      const { data: res } = await this.$http.get('/api/goods/info/' + this.$route.query.id)
      if (res.status === 1) this.$message.error('获取商品信息失败！')
      res.data.forEach(item => {
        this.goods_cat.push(item.cat_name)
      })
      this.goods_name = res.data[0].goods_name
      this.price = res.data[0].goods_price
      const mypic = res.data[0].pics
      this.previewImg = {
        pics_id: mypic[0].pics_id,
        img: 'http://127.0.0.1:3007' + mypic[0].pics_mid
      }
      mypic.forEach(item => {
        this.pics.push({
          pics_id: item.pics_id,
          img: 'http://127.0.0.1:3007' + item.pics_mid
        })
      })
    },
    async getShopCar () {
      const token = window.localStorage.getItem('token')
      if (token === '' || token === null) {
        return this.$store.commit('openPop')
      }
      const shop = {
        user_id: window.localStorage.getItem('id'),
        goods_id: this.goods_id,
        pics_id: this.previewImg.pics_id,
        goods_num: this.num
      }
      const { data: res } = await this.$http.post('/my/cart/add', shop)
      if (res.status === 1) this.$message.error('添加购物车失败！')
      this.$message({
        message: res.message,
        type: 'success'
      });
      this.$store.dispatch('getGoodsNum')
    },
    changeCurrent (i) {
      this.changeCurrentStyle = i
      this.previewImg = this.pics[i]
    },
    addGoodsNum () {
      if (this.num === 1) {
        $('.reduce').css('cursor', 'pointer')
      }
      this.num++
    },
    redGoodsNum () {
      if (this.num === 1) {
        return false;
      } else if (this.num === 2) {
        $('.reduce').css('cursor', 'not-allowed')
      }
      this.num--;
    },
    changeGoodsNum () {
      if (this.num > 1) {
        $('.reduce').css('cursor', 'pointer')
      }
    },
    showMask () {
      $('.mask').stop().show();
      $('.big').stop().show();
    },
    hideMask () {
      $('.mask').stop().hide();
      $('.big').stop().hide();
    },
    moveMask (e) {
      var x = e.pageX - $('.preview_img').position().left;
      var y = e.pageY - $('.preview_img').position().top

      var maskX = x - $('.mask').outerWidth() / 2;
      var maskY = y - $('.mask').outerHeight() / 2;
      var maskMax = $('.preview_img').outerWidth() - $('.mask').outerWidth();
      if (maskX <= 0) {
        maskX = 0;
      } else if (maskX >= maskMax) {
        maskX = maskMax;
      };
      if (maskY <= 0) {
        maskY = 0;
      } else if (maskY >= maskMax) {
        maskY = maskMax;
      };
      $('.mask').css('left', maskX + 'px');
      $('.mask').css('top', maskY + 'px');
      var bigMax = $('.bigImg').outerWidth() - $('.big').outerWidth();
      var bigX = maskX * bigMax / maskMax;
      var bigY = maskY * bigMax / maskMax;
      $('.bigImg').css('left', -bigX + 'px');
      $('.bigImg').css('top', -bigY + 'px');
    },
    prevImg () {
      this.changeCurrentStyle--
      if (this.changeCurrentStyle < 0) {
        this.changeCurrentStyle = this.pics.length - 1
      }
      this.previewImg = this.pics[this.changeCurrentStyle]
    },
    nextImg () {
      this.changeCurrentStyle++
      if (this.changeCurrentStyle === this.pics.length) { this.changeCurrentStyle = 0 }
      this.previewImg = this.pics[this.changeCurrentStyle]
      console.log(this.previewImg);
    }

  }
}

</script>

<style scoped>
@import '../assets/css/detail.css';
</style>