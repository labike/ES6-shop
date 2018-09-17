import Shop from 'utils/shop.js'
import Payment from 'service/payment-service.js'
import '../common/header'
import '../common/nav'
import template from './index.string'

const _shop = new Shop()
const _payment = new Payment()

import './index.css'

const page = {
    data: {
        orderNumber: _shop.getUrlParam('orderNumber')
    },  
    init(){
        this.onload()
    },
    onload(){
        this.loadPaymentInfo()
    },
    loadPaymentInfo(){
        const _this = this
        let paymentHtml = ''

        $('.page-wrap').html('<div class="loading"></div>')
        _payment.getPaymentInfo(_this.data.orderNumber).then(res => {
            paymentHtml = _shop.renderHtml(template, res)
            $('.page-wrap').html(paymentHtml)

            _this.listenOrderStatus()
        }, errMsg => {
            $('.page-wrap').html('<p class="err-tip">'+  errMsg +'</p>')
        })
    },
    listenOrderStatus(){
        const _this = this
        this.paymentTimer = window.setInterval(function(){
            _payment.getPaymentStatus(_this.data.orderNumber).then(res => {
                if(res === true){
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber 
                }
            }, errMsg => {
                
            })
        }, 5000)
    }
}

$(function(){
    page.init()
})