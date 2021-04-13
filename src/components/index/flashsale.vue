<template>
  <div class="w">
    <div class="flashsale">
      <div class="flash-hd fl">
        <h2>秒杀</h2>
        <div class="countdown">
          <div class="countdown-text">距离结束还有</div>
          <div class="countdown-desc">
            <span class="time-unit time-hours" ref="timeH"></span>
            <span class="time-unit time-minute" ref="timeM"></span>
            <span class="time-unit time-second" ref="timeS"></span>
          </div>
        </div>
      </div>
      <div class="flash-bd fl" @mouseenter="handleStop" @mouseleave="handleStop2" @click="handleStop">
        <div class="scroll-bar" ref="scrollBar">
          <span class="scroll-pionts" ref="scrollPionts" @mousedown="slideBar($event)"></span>
        </div>
        <div class="flash-list" ref="flashList">
          <a href="/#/list" class="flash-item" :key="i" v-for="(item, i) in fsData">
            <img :src="item.pic" alt="" width="145px" height="145px" />
            <p>{{ item.goods_name }}</p>
            <div class="price">
              <span class="price-miaosha">
                <i>￥</i>
                <span>{{ item.newPrice }}.00</span>
              </span>
              <span class="price-origin">
                <i>￥</i>
                <span>{{ item.oldPrice }}.00</span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import myData from '../../assets/json/flashsale.json'
export default {
  created () {
    this.getTime()
    this.getData()
  },
  data () {
    return {
      timeout: '',
      timer: '',
      fsData: [],
      flag: true,
      listLeft: 0
    }
  },
  computed: {
    listWidth () {
      return this.$refs.flashList.offsetWidth / 2
    },
    barWidth () {
      return this.$refs.scrollBar.offsetWidth - this.$refs.scrollPionts.offsetWidth
    }
    // mylistLeft () {
    //   return this.$refs.flashList.offsetLeft
    // }
  },

  methods: {
    getTime () {
      const dt = new Date()
      const randomH = Math.round(Math.random() * 24)
      const randomMS = Math.round(Math.random() * 60)
      const y = dt.getFullYear()
      const m = dt.getMonth() + 1
      let d = dt.getDate()

      let hh = dt.getHours() + randomH
      let mm = dt.getMinutes() + randomMS
      let ss = dt.getSeconds() + randomMS

      if (hh >= 24) {
        d += 1
        hh = hh - 24
      }
      if (mm >= 60) {
        hh += 1
        mm = mm - 60
      } if (ss >= 60) {
        mm += 1
        ss = ss - 60
      }
      this.time = `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    },
    getData () {
      myData.forEach(item => {
        this.fsData.push({
          pic: require('../../assets/upload/' + item.img),
          goods_name: item.goods_name,
          oldPrice: item.oldPrice,
          newPrice: item.newPrice
        })
      })
    },
    countDown () {
      console.log();
      const newTime = +new Date(this.time)
      var nowTime = +new Date();
      var times = (newTime - nowTime) / 1000
      var h = ~~(times / 60 / 60 % 24);
      h = h < 10 ? '0' + h : h;
      this.$refs.timeH.innerHTML = h
      var m = ~~(times / 60 % 60);
      m = m < 10 ? '0' + m : m;
      this.$refs.timeM.innerHTML = m
      var s = ~~(times % 60);
      s = s < 10 ? '0' + s : s;
      this.$refs.timeS.innerHTML = s
    },
    openCountDown () {
      this.timeout = setInterval(this.countDown, 1000)
    },
    slideBar (e) {
      this.falg = false
      const x = e.pageX
      const piontsLeft = this.$refs.scrollPionts.offsetLeft
      console.log(this.listWidth);

      $(window).on('mousemove', (e) => {
        var moveX = e.pageX - x + piontsLeft;
        if (moveX <= 0) {
          moveX = 0
        } else if (moveX >= this.barWidth) {
          moveX = this.barWidth;
        }
        this.$refs.scrollPionts.style.left = moveX + 'px'
        var listMove = ~~(this.listWidth / this.barWidth * moveX);
        this.listLeft = listMove
        this.$refs.flashList.style.left = -listMove + 'px'
      });
      $(window).on('mouseup', function () {
        $(this).off('mousemove');
        this.flag = true;
        $('.flash-bd').mouseleave();
      });
    },
    getTimer () {
      if (this.listLeft >= this.listWidth) {
        this.listLeft = 0;
      }
      this.listLeft++
      this.$refs.flashList.style.left = -this.listLeft + 'px';
      this.$refs.scrollPionts.style.left = this.listLeft / (this.listWidth / this.barWidth) + 'px';
    },
    handleGo () {
      this.timer = setInterval(this.getTimer, 20);
    },
    handleStop () {
      clearInterval(this.timer);
      this.timer = null
    },
    handleStop2 () {
      clearInterval(this.timer);
      if (this.flag) {
        this.handleGo()
      }
    },
    copyList () {
      const copyList = $('.flash-list .flash-item').clone();
      $('.flash-list').append(copyList);
    }
  },
  mounted () {
    this.openCountDown()
    this.handleGo()
    this.copyList()
  },
  beforeDestroy () {
    this.handleStop()
    clearInterval(this.timeout)
    this.timeout = null
  }
}

</script>

<style lang="less" scoped>
@import '../../assets/css/flashsale.css';
</style>