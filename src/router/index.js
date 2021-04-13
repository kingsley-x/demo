import Vue from 'vue'
import VueRouter from 'vue-router'
import reg from '../components/reg.vue'
import index from '../views/index.vue'
import list from '../views/goodsList.vue'
import detail from '../views/detail.vue'
import shopCar from '../views/shopCar.vue'
import order from '../views/userOrder.vue'
import payoff from '../views/payoff.vue'
import seller from '../views/seller.vue'
import addgoods from '../components/seller/addGoods.vue';
import sellerOrder from '../components/seller/order.vue'
import glist from '../components/seller/list.vue'
import cate from '../components/seller/cate.vue'
import manager from '../components/seller/manager.vue'
import role from '../components/seller/role.vue'
import params from '../components/seller/params.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/index'
}, {
    path: '/index',
    component: index
}, {
    path: '/reg',
    component: reg
}, {
    path: '/list',
    component: list
}, {
    path: '/detail',
    component: detail
}, {
    path: '/shopcar',
    component: shopCar
}, {
    path: '/order',
    component: order
}, {
    path: '/payoff',
    component: payoff
}, {
    path: '/seller',
    component: seller,
    redirect: '/goodslist',
    children: [{
            path: '/addgoods',
            component: addgoods
        },
        {
            path: '/slorder',
            component: sellerOrder
        }, {
            path: '/goodslist',
            component: glist
        }, {
            path: '/goodsCate',
            component: cate
        }, {
            path: '/manager',
            component: manager
        },
        {
            path: '/role',
            component: role
        },
        {
            path: '/params',
            component: params
        }
    ]

}]


const router = new VueRouter({
    routes
})

export default router