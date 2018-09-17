import Shop from 'utils/shop.js'
import User from 'service/user-service.js'
import '../common/nav-simple'

import './index.css'

const _shop = new Shop()
const _user = new User()

const formError = {
    show(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg)
    },
    hide(){
        $('.error-item').hide().find('.err-msg').text('')
    }
}

const page = {
    init(){
        this.bindEvent()
    },
    bindEvent(){
        const _this = this
        $('#username').blur(function(){
            const username = $.trim($(this).val())
            if(!username) return
            _user.checkUserName(username).then(res => {
                formError.hide()
            }, errMsg => {
                formError.show(errMsg)
            })
        })
        $('#submit').click(function(){
            _this.submit()
        })
        $('.user-input').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit()
            }
        })
    },
    submit(){
        const formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        }
        var validateResult = this.checkFormData(formData)
        if(validateResult.status){
            _user.register(formData).then(res => {
                window.location.href = './result.html?type=register'
            }, errMsg => {
                formError.show(errMsg)
            })
        }else{
            formError.show(validateResult.msg)
        }
    },
    checkFormData(formData){
        var result = {
            status: false,
            msg: ''
        }
        if(!_shop.validate(formData.username, 'require')){
            result.msg = '用户名不能为空'
            return result
        }
        if(!_shop.validate(formData.password, 'require')){
            result.msg = '密码不能为空'
            return result
        }
        if(formData.password.length < 6){
            result.msg = '密码不能小于6位'
            return result
        }
        if(formData.password !== formData.passwordConfirm){
            result.msg = '两次输入密码不一致'
            return result
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