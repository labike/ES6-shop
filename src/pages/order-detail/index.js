import Shop from 'utils/shop.js'
import Order from 'service/order-service.js'
import '../common/header'
import '../common/nav'
import navSide from '../common/nav-side'
import template from './index.string'

const _shop = new Shop()
const _order = new Order()

import './index.css'

const page = {
    data: {
        orderNumber: _shop.getUrlParam('orderNumber')
    },  
    init(){
        this.onload()
        this.bindEvent()
    },
    bindEvent(){
        const _this = this
        $(document).on('click', '.order-cancel', function(){
            if(window.confirm('确定要取消该订单吗?')){
                _order.cancelOrder(_this.data.orderNumber).then(res => {
                    _shop.successTips('该订单取消成功')
                    _this.loadDetail()
                }, errMsg => {
                    _shop.errorTips(errMsg)
                })
            }
        })
    },
    onload(){
        navSide.init({
            name: 'order-list'
        })
        this.loadDetail()
    },
    loadDetail(){
        const _this = this
        let orderDetailHtml = ''

        $('.content').html('<div class="loading"></div>')
        _order.getOrderDetail(_this.data.orderNumber).then(res => {
            _this.dataFilter(res)
            orderDetailHtml = _shop.renderHtml(template, res)
            $('.content').html(orderDetailHtml)
        }, errMsg => {
            $('.content').html('<p class="err-tip">'+  errMsg +'</p>')
        })
    },
    dataFilter(data){
        data.needPay = data.status === 10
        data.isCancelable = data.status === 10
    }
}

$(function(){
    page.init()
})

