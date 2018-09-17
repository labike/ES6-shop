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
        this.bindEvent()
    },
    bindEvent(){
        const _this = this
        $(document).on('click', '.btn-submit', function(){
            const userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            }
            const validateResult = _this.validateForm(userInfo)
            if(validateResult.status){
                _user.updateUserInfo(userInfo).then((res, msg) => {
                    _shop.successTips(msg)
                    window.location.href = './user-center.html'
                }, errMsg => {
                    _shop.errorTips(errMsg)
                })
            }else{
                _shop.errorTips(validateResult.msg)
            }
        })
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
    },
    validateForm(formData){
        var result = {
            status: false,
            msg: ''
        }
    
        if(!_shop.validate(formData.phone, 'phone')){
            result.msg = '手机号格式错误'
            return result
        }
        if(!_shop.validate(formData.email, 'email')){
            result.msg = '邮箱格式错误'
            return result
        }
        if(!_shop.validate(formData.question, 'require')){
            result.msg = '问题不能为空'
            return result
        }
        if(!_shop.validate(formData.answer, 'require')){
            result.msg = '答案不能为空'
            return result
        }
        result.status = true
        result.msg = '验证通过'
        return result
    }
}

$(function(){
    page.init()
})

