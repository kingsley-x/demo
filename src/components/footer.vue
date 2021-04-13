<template>
  <div class="footer">
    <div class="w">
      <!-- mod_service -->
      <div class="mod_service">
        <ul>
          <li :key="item.id" v-for="item in modService">
            <i class="mod-service-icon" :class="item.className"></i>
            <div class="mod_service_tit">
              <h5>{{ item.title }}</h5>
              <p>{{ item.text }}</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- mod_help -->
      <div class="mod_help">
        <dl class="mod_help_item" :key="i" v-for="(item, i) in modHelp">
          <dt>{{ item }}</dt>
          <dd><a href="javascript:;">购物流程 </a></dd>
          <dd><a href="javascript:;">会员介绍 </a></dd>
          <dd><a href="javascript:;">生活旅行/团购 </a></dd>
          <dd><a href="javascript:;">常见问题 </a></dd>
          <dd><a href="javascript:;">大家电 </a></dd>
          <dd><a href="javascript:;">联系客服 </a></dd>
        </dl>
      </div>

      <!-- mod_copyright  -->
      <div class="mod_copyright">
        <p class="mod_copyright_links">关于我们 | 联系我们 | 联系客服 | 商家入驻 | 营销中心 | 手机品优购 | 友情链接 | 销售联盟 | 品优购社区 | 品优购公益 | English Site | Contact U</p>
        <p class="mod_copyright_info">
          地址：北京市昌平区建材城西路金燕龙办公楼一层 邮编：100096 电话：400-618-4000 传真：010-82935100 邮箱: zhanghj+itcast.cn <br />
          京ICP备08001421号京公网安备110108007702
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modService: [
        {
          id: 1,
          title: '正品保障 ',
          text: '正品保障，提供发票',
          className: 'mod_service_zheng'
        },
        {
          id: 2,
          title: '极速物流 ',
          text: '急速物流，急速送达',
          className: 'mod_service_kuai'
        },
        {
          id: 3,
          title: '无忧售后 ',
          text: '7天无理由退换货',
          className: 'mod_service_bao'
        }, {
          id: 4,
          title: '特色服务 ',
          text: '私人定制家电套餐',
          className: 'mod_service_zheng'
        }, {
          id: 5,
          title: '帮助中心 ',
          text: '您的购物指南',
          className: 'mod_service_bao'
        }
      ],
      modHelp: [
        '购物指南 ', '配送方式', '支付方式', '售后服务', '特色服务'
      ]
    }
  }
}
</script>

<style lang="less">
.footer {
  height: 386px;
  background-color: #fff;
  padding-top: 30px;
}

.mod_service {
  height: 79px;
  border-bottom: 1px solid #ccc;
}

.mod_service li {
  float: left;
  width: 240px;
  height: 79px;
}

.mod-service-icon {
  /*浮动的盒子 可以直接给大小的 不需要转换*/
  float: left;
  width: 50px;
  height: 50px;
  margin-left: 35px;
  background: url('../assets/img/icons.png') no-repeat;
}

.mod_service_zheng {
  background-position: -253px -3px;
}

.mod_service_tit {
  float: left;
  margin-left: 5px;
}

.mod_service_tit h5 {
  margin: 5px 0;
}

.mod_service_kuai {
  background-position: -255px -54px;
}

.mod_service_bao {
  background-position: -257px -105px;
}

.mod_help {
  display: flex;
  justify-content: center;
  height: 187px;
  border-bottom: 1px solid #ccc;
}

.mod_help_item {
  width: 220px;
  padding: 20px 0 0 50px;
}

.mod_help_item dt {
  height: 25px;
  font-size: 16px;
}

.mod_help_item dd {
  height: 22px;
}

.mod_copyright {
  text-align: center;
}

.mod_copyright_links {
  margin: 20px 0 15px 0;
}

.mod_copyright_info {
  line-height: 18px;
}
</style>