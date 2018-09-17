import Shop from 'utils/shop.js'
import Order from 'service/order-service.js'
import Address from 'service/address-service.js'
import '../common/header'
import '../common/nav'
import templateProduct from './product.string'
import templateAddress from './address.string'
import addressModal from './modal.js'

const _shop = new Shop()
const _order = new Order()
const _address = new Address()

import './index.css'

const page = {
    data: {
        selectedAddressId: null
    },
    init(){
        this.onload()
        this.bindEvent()
    },
    onload(){
        this.loadAddressList()
        this.loadProductList()
    },
    bindEvent(){
        const _this = this

        //选择地址
        $(document).on('click', '.address-item', function(){
            $(this).addClass('active').siblings('.address-item').removeClass('active')
            _this.data.selectedAddressId = $(this).data('id')
        })

        //订单提交
        $(document).on('click', '.order-submit', function(){
            const shippingId = _this.data.selectedAddressId
            if(shippingId){
                _order.createOrder({
                    shippingId: shippingId
                }).then(res => {
                    window.location.href = './order-payment.html?orderNumber=' + res.orderNo
                }, errMsg => {
                    _shop.errorTips(errMsg)
                })
            }else{
                _shop.errorTips('请选择地址后提交')
            }
        })

        //新增地址
        $(document).on('click', '.address-add', function(){
            addressModal.show({
                isUpdate: false,
                onSuccess: () => {
                    _this.loadAddressList()
                }
            })
        })

        //地址回填
        $(document).on('click', '.address-update', function(e){
            e.stopPropagation()
            const shippingId = $(this).parents('.address-item').data('id')
            _address.getAddress(shippingId).then(res => {
                addressModal.show({
                    isUpdate: true,
                    data: res,
                    onSuccess: () => {
                        _this.loadAddressList()
                    }
                })
            }, errMsg => {
                _shop.errorTips(errMsg)
            })
        })
        
        //删除地址
        $(document).on('click', '.address-delete', function(e){
            e.preventDefault()
            e.stopPropagation()
            const id = $(this).parents('.address-item').data('id')

            if(window.confirm('确认要删除该地址吗?')){
                _address.deleteAddress(id).then(res => {
                    _this.loadAddressList()
                }, errMsg => {
                    _shop.errorTips(errMsg)
                })
            }
        })
    },
    loadAddressList(){
        const _this = this
        $('.address-content').html('<p class="laoding"></p>')
        _address.getAddressList().then(res => {
            this.addressFilter(res)
            const addressListHtml = _shop.renderHtml(templateAddress, res)
            $('.address-content').html(addressListHtml)
        }, errMsg => {
            $('.address-content').html('<p class="err-tip">地址加载失败, 请尝试刷新</p>')
        })
    },
    addressFilter(data){
        if(this.data.selectedAddressId){
            let selectIdFlag = false
            for(let i = 0, iLen = data.list.length; i < iLen; i++){
                if(data.list[i].id === this.data.selectedAddressId){
                    data.list[i].isActive = true
                    selectIdFlag = true
                }
            }
            if(!selectIdFlag){
                this.data.selectedAddressId = null
            }
        }
    },
    loadProductList(){
        const _this = this
        $('.product-content').html('<p class="laoding"></p>')
        _order.getProductList().then(res => {
            const productListHtml = _shop.renderHtml(templateProduct, res)
            $('.product-content').html(productListHtml)
        }, errMsg => {
            $('.product-content').html('<p class="err-tip">订单加载失败, 请尝试刷新</p>')
        })
    }
}

export default page.init()