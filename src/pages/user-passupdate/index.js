import Shop from 'utils/shop.js'
import User from 'service/user-service.js'
import '../common/header'
import '../common/nav'
import navSide from '../common/nav-side'

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
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwodConfirm: $.trim($('#password-confirm').val())
            }
            const validateResult = _this.validateForm(userInfo)
            if(validateResult.status){
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }).then((res, msg) => {
                    _shop.successTips(msg)
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
            name: 'user-passupdate'
        })
    },
    validateForm(formData){
        var result = {
            status: false,
            msg: ''
        }
    
        if(!_shop.validate(formData.password, 'require')){
            result.msg = '原密码不能为空'
            return result
        }
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '密码长度不能少于6位'
            return result
        }
        if(formData.passwordNew !== formData.passwodConfirm){
            result.msg = '两次输入密码不一致'
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

