<template>
  <div class="w">
    <div class="floor">
      <div class="jiadian" :key="i" v-for="(item, i) in floorPic">
        <div class="box-hd">
          <h3>{{ item.title }}</h3>
          <div class="tab-list">
            <ul>
              <li><a href="javascript:;" class="style-red">热门</a>|</li>
              <li><a href="javascript:;">大家电</a>|</li>
              <li><a href="javascript:;">生活电器</a>|</li>
              <li><a href="javascript:;">厨房电器</a>|</li>
              <li><a href="javascript:;">个护健康</a>|</li>
              <li><a href="javascript:;">应季电器</a>|</li>
              <li><a href="javascript:;">空气/净水</a>|</li>
              <li><a href="javascript:;">新奇特</a>|</li>
              <li><a href="javascript:;">高端电器</a></li>
            </ul>
          </div>
        </div>
        <div class="box-bd">
          <ul class="tab-con">
            <li class="w209">
              <ul class="tab-con-list">
                <li>
                  <a href="javascript:;">节能补贴</a>
                </li>
                <li>
                  <a href="javascript:;">4K电视</a>
                </li>
                <li>
                  <a href="javascript:;">空气净化器</a>
                </li>
                <li>
                  <a href="javascript:;">IH电饭煲</a>
                </li>
                <li>
                  <a href="javascript:;">滚筒洗衣机</a>
                </li>
                <li>
                  <a href="javascript:;">电热水器</a>
                </li>
              </ul>
              <img src="../../assets/upload/floor-1-1.png" alt="" />
            </li>
            <li class="w329">
              <a href="/#/list"><img :src="item.pic" alt="" srcset="" /></a>
            </li>
            <li class="w219">
              <div class="tab-con-item">
                <a href="/#/list">
                  <img src="../../assets/upload/floor-1-2.png" alt="" />
                </a>
              </div>
              <div class="tab-con-item">
                <a href="/#/list">
                  <img src="../../assets/upload/floor-1-3.png" alt="" />
                </a>
              </div>
            </li>
            <li class="w220">
              <div class="tab-con-item">
                <a href="/#/list">
                  <img src="../../assets/upload/floor-1-4.png" alt="" />
                </a>
              </div>
            </li>
            <li class="w220">
              <div class="tab-con-item">
                <a href="/#/list">
                  <img src="../../assets/upload/floor-1-5.png" alt="" />
                </a>
              </div>
              <div class="tab-con-item">
                <a href="/#/list">
                  <img src="../../assets/upload/floor-1-6.png" alt="" />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="fixedtool">
      <ul class="floor-list">
        <li class="current floor-item">家用电器</li>
        <li class="floor-item">手机通讯</li>
        <li class="floor-item">电脑办公</li>
        <li class="floor-item">精品家具</li>
      </ul>
      <div class="backTop">返回顶部</div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      floorPic: [
        {
          pic: require('../../assets/upload/pic1.png'),
          title: '家用电器'
        },
        {
          pic: require('../../assets/upload/pic2.png'),
          title: '手机通信'
        },
        {
          pic: require('../../assets/upload/pic3.png'),
          title: '电脑办公'
        },
        {
          pic: require('../../assets/upload/pic1.png'),
          title: '精品家居'
        }
      ]
    }
  }
}
$(function () {
  var flag = true;
  // 1.显示隐藏电梯导航
  var toolTop = $('.flashsale').offset().top;
  toggleTool();

  function toggleTool () {
    if ($(document).scrollTop() >= toolTop) {
      $('.fixedtool').fadeIn();
    } else {
      $('.fixedtool').fadeOut();
    };
  }
  $(window).on('scroll', function () {
    toggleTool();
    if (flag) {
      $('.floor>div').each(function (i, ele) {
        if ($(document).scrollTop() >= $(ele).offset().top) {
          $('.fixedtool li').eq(i).addClass('current').siblings().removeClass('current');
        }
      })
    }
  });

  $('.fixedtool li').on('click', function () {
    flag = false;
    var current = $('.floor>div').eq($(this).index()).offset().top;
    $('body, html').stop().animate({
      scrollTop: current
    }, function () {
      flag = true;
    });

    $(this).addClass('current').siblings().removeClass('current');
  })
  $('.backTop').on('click', function () {
    flag = false;
    $('body, html').stop().animate({
      scrollTop: 0
    }, function () {
      flag = true;
    })
  })
})
</script>

<style lang="less" scoped>
@import '../../assets/css/floor.css';
</style>