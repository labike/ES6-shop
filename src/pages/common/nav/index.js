import Shop from 'utils/shop.js'
import User from 'service/user-service.js'
import Cart from 'service/cart-service.js'

const _shop = new Shop()
const _user = new User()
const _cart = new Cart()

import './index.css'

const nav = {
    init(){
        this.bindEvent()
        this.loadUserInfo()
        this.loadCartCount()
        return this
    },
    bindEvent(){
        $('.js-login').click(function(){
            _shop.doLogin()
        })
        $('.js-register').click(function(){
            window.location.href = './register.html'
        })
        $('.js-logout').click(function(){
            _user.logout().then(res => {
                window.location.reload()
            }, errMsg => {
                _shop.errorTips(errMsg)
            })
        })
    },
    loadUserInfo(){
        _user.checkLogin().then(res => {
            $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username)
        }, errMsg => {
            
        })
    },
    loadCartCount(){
        _cart.getCartCount().then(res => {
            $('.cart-count').text(res || 0)
        }, errMsg => {
            $('.cart-count').text(0)
        })
    }
}

export default nav.init()