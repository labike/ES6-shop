import Shop from 'utils/shop.js'
import Product from 'service/product-service.js'
import Cart from 'service/cart-service.js'
import '../common/header'
import '../common/nav'
import template from './index.string'

const _shop = new Shop()
const _product = new Product()
const _cart = new Cart()

import './index.css'

const page = {
    data: {
        productId: _shop.getUrlParam('productId') || '',   
    },
    init(){
        this.onload()
        this.bindEvent()
    },
    onload(){
        if(!this.data.productId){
            _shop.goHome()
        }
        this.loadDetail()
    },
    bindEvent(){
        const _this = this
        $(document).on('mouseenter', '.p-img-item', function(){
            const imageUrl = $(this).find('.p-item').attr('src')
            $('.main-img').attr('src', imageUrl)
        })

        $(document).on('click', '.p-count-btn', function(){
            const type = $(this).hasClass('plus') ? 'plus' : 'minus'
            let currentCount = parseInt($('.p-count').val())
            const minCount = 1
            const maxCount = _this.data.detailInfo.stock || 1

            if(type === 'plus'){
                $('.p-count').val(currentCount < maxCount ? currentCount + 1 : maxCount)
            }else if(type === 'minus'){
                $('.p-count').val(currentCount > minCount ? currentCount - 1 : minCount)
            }
        })

        $(document).on('click', '.cart-add', function(e){
            e.preventDefault()
            console.log(_this.data.productId)
            console.log($('.p-count').val())
            _cart.addToCart({
                productId: _this.data.productId,
                count: $('.p-count').val()
            }).then(res => {
                window.location.href = './result.html?type=cart-add'
            }, errMsg => {
                _shop.errorTips(errMsg)
            })
        })
    },
    loadDetail(){
        const _this = this
        let html = ''
        $('.page-wrap').html('<div class="loading"></div>')
        _product.getProductDetail(this.data.productId).then(res => {
            _this.filter(res)
            _this.data.detailInfo = res
            html = _shop.renderHtml(template, res)
            $('.page-wrap').html(html)
        }, errMsg => {
            $('.page-wrap').html('<p class="error">此商品找不到</p>')
        })
    },
    filter(data){
        data.subImages = data.subImages.split(',')
    }
}

$(function(){
    page.init()
})

