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
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init(){
        this.onload()
        this.bindEvent()
    },
    onload(){
        this.stepUserName()
    },
    bindEvent(){
        const _this = this
        $('#submit-username').click(function(){
            let username = $.trim($('#username').val())
            if(username){
                _user.getQuestion(username).then(res => {
                    _this.data.username = username
                    _this.data.question = res
                    _this.stepQuestion()
                }, errMsg => {
                    formError.show(errMsg)
                })
            }else{
                formError.show('请输入用户名')
            }
        })
    },
    stepUserName(){
        $('.step-username').show()
    },
    stepQuestion(){
        const _this = this
        formError.hide()
        $('.step-username').hide().siblings('.step-question')
            .show().find('.question').text(this.data.question)
        
        $('#submit-question').click(function(){
            let answer = $.trim($('#answer').val())
            if(answer){
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }).then(res => {
                    _this.data.answer = answer
                    _this.data.token = res
                    _this.stepPassword()
                }, errMsg => {
                    formError.show(errMsg)
                })
            }else{
                formError.show('请输入问题答案')
            }
        })
    },
    stepPassword(){
        const _this = this
        formError.hide()
        $('.step-question').hide().siblings('.step-password').show()

        $('#submit-password').click(function(){
            let password = $.trim($('#password').val())
            if(password && password.length >= 6){
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }).then(res => {
                    window.location.href = './result.html?type=passreset'
                }, errMsg => {
                    formError.show(errMsg)
                })
            }else{
                formError.show('请输入不少于6位的新密码')
            }
        })
    }
}

$(function(){
    page.init()
})