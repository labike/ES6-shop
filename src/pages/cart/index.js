import Shop from 'utils/shop.js'
import Cart from 'service/cart-service.js'
import '../common/header'
import nav from '../common/nav'
import template from './index.string'

const _shop = new Shop()
const _cart = new Cart()

import './index.css'

const page = {
    data: {
        cartInfo: ''
    },
    init(){
        this.onload()
        this.bindEvent()
    },
    onload(){
        this.loadCart()
    },
    bindEvent(){
        const _this = this
        $(document).on('click', '.cart-select', function(){
            const productId = $(this).parents('.cart-table').data('product-id')
            if($(this).is(':checked')){
                _cart.selectProduct(productId).then(res => {
                    _this.renderCart(res)
                }, errMsg => {
                    _this.showCarError()
                })
            }else{
                _cart.unselectProduct(productId).then(res => {
                    _this.renderCart(res)
                }, errMsg => {
                    _this.showCarError()
                })
            }
        })

        $(document).on('click', '.cart-select-all', function(){
            if($(this).is(':checked')){
                _cart.selectAllProduct().then(res => {
                    _this.renderCart(res)
                }, errMsg => {
                    _this.showCarError()
                })
            }else{
                _cart.unselectAllProduct().then(res => {
                    _this.renderCart(res)
                }, errMsg => {
                    _this.showCarError()
                })
            }
        })

        $(document).on('click', '.count-btn', function(){
            const $pCount = $(this).siblings('.count-input')
            const type = $(this).hasClass('plus') ? 'plus' : 'minus'
            const productId = $(this).parents('.cart-table').data('product-id')
            const currentCount = parseInt($pCount.val())
            const minCount = 1
            const maxCount = parseInt($pCount.data('max'))
            let newCount = 0

            if(type === 'plus'){
                if(currentCount >= maxCount){
                    _shop.errorTips('该商品数量已经达到上限')
                    return
                }
                newCount = currentCount + 1
            }else if(type === 'minus'){
                if(currentCount <= minCount){
                    return
                }
                newCount = currentCount - 1
            }
            _cart.updateProduct({
                productId: productId,
                count: newCount
            }).then(res => {
                _this.renderCart(res)
            }, errMsg => {
                _this.showCarError()
            })
        })

        $(document).on('click', '.cart-delete', function(){
            if(window.confirm('确认要删除该商品吗')){
                const productId = $(this).parents('.cart-table').data('product-id')
                _this.deleteCartProduct(productId)
            }
        })

        $(document).on('click', '.delete-selected', function(){
            if(window.confirm('确认要删除该商品吗')){
                let arrProductIds = []
                const selectedId = $('.cart-select:checked')
                for(var i = 0, iLen = selectedId.length; i < iLen; i++){
                    arrProductIds.push(
                        $(selectedId[i]).parents('.cart-table').data('product-id'))
                }
                if(arrProductIds.length){
                    _this.deleteCartProduct(arrProductIds.join(','))
                }else{
                    _shop.errorTips('您还没有选中删除的商品')
                }
            }
        })

        $(document).on('click', '.btn-submit', function(){
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './order-confirm.html'
            }else{
                _shop.errorTips('请选择商品后提交')
            }
        })
    },
    loadCart(){
        const _this = this
        _cart.getCartList().then(res => {
            _this.renderCart(res)
        }, errMsg => {
            _this.showCarError()
        })
    },
    renderCart(data){
        this.filter(data)
        this.data.cartInfo = data

        const cartHtml = _shop.renderHtml(template, data)
        $('.page-wrap').html(cartHtml)
        nav.loadCartCount()
    },
    filter(data){
        data.notEmpty = !!data.cartProductVoList.length
    },
    showCarError(){
        $('.page-wrap').html('<p class="err-tip">哪里出错了, 尝试刷新一下吧!</p>')
    },
    deleteCartProduct(productIds){
        const _this = this
        _cart.deleteProduct(productIds).then(res => {
            _this.renderCart(res)
        }, errMsg => {
            _this.showCarError()
        })
    }
}

$(function(){
    page.init()
})

