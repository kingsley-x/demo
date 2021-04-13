import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        dialogFormVisible: false,
        cartGoodsNum: 0,
        shopCar: true,
        loginFlag: true,
        radio: 1
    },
    mutations: {
        closePop(state) {
            state.dialogFormVisible = false
        },
        openPop(state) {
            state.dialogFormVisible = true
        },
        setGoodsNum(state, step) {
            state.cartGoodsNum = step
        },
        hideShopCar(state) {
            state.shopCar = false
        },
        showShopCar(state) {
            state.shopCar = true
        },
        hideLoginBtn(state) {
            state.loginFlag = false
        },
        showLoginBtn(state) {
            state.loginFlag = true
        },
        changeRadio(state, step) {
            state.radio = step
        }
    },
    actions: {
        async getGoodsNum(context) {
            const {
                data: res
            } = await axios.get('/my/cart/' + window.localStorage.getItem('id'))
            context.commit('setGoodsNum', res.data.length)
        }
    }
})