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
            password: $.trim($('#password').val())
        }
        var validateResult = this.checkFormData(formData)
        if(validateResult.status){
            _user.login(formData).then(res => {
                window.location.href = _shop.getUrlParam('redirect') || './index.html'
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
        result.status = true
        result.msg = '验证通过'
        return result
    }
}

$(function(){
    page.init()
})