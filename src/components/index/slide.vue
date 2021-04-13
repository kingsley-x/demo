<template>
  <div class="w">
    <div class="slide" ref="slide" @mouseenter.stop="handleStop" @mouseleave.stop="handleGo">
      <!-- 左侧按钮 -->
      <a href="javascript:;" class="arrow-l" @click="prevImg"> </a>
      <!-- 右侧按钮 -->
      <a href="javascript:;" class="arrow-r" @click="nextImg"> </a>
      <!-- 核心的滚动区域 -->
      <ul class="swiper-slide">
        <li :key="i" v-for="(item, i) in slideImg">
          <a href="/#/list"><img :src="item" alt="" /></a>
        </li>
      </ul>
      <!-- 小圆圈 -->
      <ol class="circle">
        <li :class="{ current: currentStyle === i }" :key="i" v-for="(item, i) in slideImg" @click="cutSlideImg(i)"></li>
        <!-- <li></li>
                <li></li> -->
      </ol>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {

  data () {
    return {
      slideImg: [require('../../assets/upload/focus.jpg'), require('../../assets/upload/focus1.jpg'), require('../../assets/upload/focus2.jpg'), require('../../assets/upload/focus3.jpg')],
      currentStyle: 0,
      flag: true,
      num: 0,
      timer: ''
    }
  },

  methods: {
    cutSlideImg (i) {
      this.currentStyle = i
      this.num = i
      const slideWidth = this.$refs.slide.offsetWidth
      $('.swiper-slide').animate({
        left: -i * slideWidth
      }, 1000);
    },
    prevImg () {
      const slideWidth = this.$refs.slide.offsetWidth
      if (this.flag) {
        this.flag = false
        if (this.num === 0) {
          this.num = this.slideImg.length
          $('.swiper-slide').css('left', -this.num * slideWidth + 'px')
        }
        this.num--;
        $('.swiper-slide').stop().animate({
          left: -this.num * slideWidth
        }, 1000, () => {
          this.flag = true;
        });
        this.currentStyle--;
        this.currentStyle = this.currentStyle < 0 ? this.slideImg.length - 1 : this.currentStyle
      }
    },
    nextImg () {
      const slideWidth = this.$refs.slide.offsetWidth
      if (this.flag) {
        this.flag = false
        if (this.num === this.slideImg.length) {
          this.num = 0
          $('.swiper-slide').css('left', 0)
        }
        this.num++;

        $('.swiper-slide').stop().animate({
          left: -this.num * slideWidth
        }, 1000, () => {
          this.flag = true
        });
        this.currentStyle++;
        this.currentStyle = this.currentStyle === this.slideImg.length ? this.currentStyle = 0 : this.currentStyle
      }
    },
    handleGo () {
      this.timer = setInterval(this.nextImg, 3000)
    },
    handleStop () {
      clearInterval(this.timer);
      this.timer = null
    },
    cloneLi () {
      var first = $('.swiper-slide li:first').clone();
      $('.swiper-slide').append(first);
    }
  },
  mounted () {
    this.cloneLi()
    this.handleGo()
  },
  beforeDestroy () {
    this.handleStop()
  }
}

</script>

<style lang="less">
.slide {
  position: relative;
  height: 465px;
  margin-top: 2px;
  overflow: hidden;
}

.slide .swiper-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 700%;
}

.slide .swiper-slide li {
  float: left;
}

.slide .swiper-slide li img {
  width: 1200px;
  height: 465px;
}

.slide .arrow-l,
.slide .arrow-r {
  position: absolute;
  top: 50%;
  margin-top: -30px;
  width: 32px;
  height: 60px;
  z-index: 2;
}

.slide .arrow-r {
  right: 0;
  background: url('../../assets/img/arrow-next.png') no-repeat center;
}

.slide .arrow-l {
  left: 209px;
  background: url('../../assets/img/arrow-prev.png') no-repeat center;
}

.slide .arrow-r:hover,
.slide .arrow-l:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.circle {
  position: absolute;
  bottom: 35px;
  right: 60px;
}

.circle li {
  float: left;
  width: 12px;
  height: 12px;
  border: 2px solid rgba(0, 0, 0, 0.7);
  margin: 0 5px;
  border-radius: 50%;
  /*鼠标经过显示小手*/
  cursor: pointer;
}

.current {
  background-color: rgba(255, 255, 255, 0.6);
}
</style>

