import Shop from 'utils/shop.js'
import User from 'service/user-service.js'
import '../common/header'
import '../common/nav'
import navSide from '../common/nav-side'
const template = require('./index.string')

const _shop = new Shop()
const _user = new User()

import './index.css'

const page = {
    init(){
        this.onload()
    },
    onload(){
        navSide.init({
            name: 'user-center'
        })
        this.loadUserInfo()
    },
    loadUserInfo(){
        let userHtml = ''
        _user.getUserInfo().then(res => {
            userHtml = _shop.renderHtml(template, res)
            $('.panel-body').html(userHtml)
        }, errMsg => {
            _shop.errorTips(errMsg)
        })
    }
}

$(function(){
    page.init()
})

