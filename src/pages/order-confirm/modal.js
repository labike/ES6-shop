import Shop from 'utils/shop.js'
import Address from 'service/address-service.js'
import _cities from 'utils/city'

import templateAddressModal from './address-modal.string'

const _shop = new Shop()
const _address = new Address()

const addressModal = {
    show(option){
        this.option = option
        this.option.data = option.data || {}
        this.$modalWrap = $('.modal-wrap')
        this.loadModal()
        this.bindEvent()
    },
    hide(){
        this.$modalWrap.empty()
    },
    bindEvent(){
        const _this = this
        this.$modalWrap.find('#receiver-province').change(function(){
            const selectProvince = $(this).val()
            _this.laodCities(selectProvince)
        })

        this.$modalWrap.find('.address-btn').click(function(e){
            e.preventDefault()
            const receiverInfo = _this.getReceiverInfo()
            const isUpdate = _this.option.isUpdate
            console.log(isUpdate)
            //判断是更新还是新增  false新增, true更新  
            if(!isUpdate && receiverInfo.status){
                _address.save(receiverInfo.data).then(res => {
                    _shop.successTips('添加地址成功')
                    _this.hide()
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res)
                }, errMsg => {
                    _shop.errorTips(errMsg)
                })
            }else if(isUpdate && receiverInfo.status){
                _address.update(receiverInfo.data).then(res => {
                    _shop.successTips('更新地址成功')
                    _this.hide()
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res)
                }, errMsg => {
                    _shop.errorTips(errMsg)
                })
            }else{
                _shop.errorTips(receiverInfo.errMsg || '出错了')
            }
        })

        this.$modalWrap.find('.modal-container').click(function(e){
            e.stopPropagation()
        })

        this.$modalWrap.find('.close').click(function(){
            _this.hide()
        })
    },
    loadModal(){
        const addressModalHtml = _shop.renderHtml(templateAddressModal, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        })
        
        this.$modalWrap.html(addressModalHtml)
        this.laodProvince()
    },
    laodProvince(){
        const provinces = _cities.getProvinces() || []
        const $provinceSelect = this.$modalWrap.find('#receiver-province')

        $provinceSelect.html(this.getSelectOption(provinces))

        if(this.option.isUpdate && this.option.data.receiverProvince){
            $provinceSelect.val(this.option.data.receiverProvince)
            this.laodCities(this.option.data.receiverProvince)
        }
    },
    getSelectOption(optionArray){
        let html = '<option value="">请选择</option>'

        for(let i = 0, iLen = optionArray.length; i < iLen; i++){
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>'
        }
        return html
    },
    laodCities(provinceName){
        const city = _cities.getCities(provinceName) || []
        const $citySelect = this.$modalWrap.find('#receiver-city')

        $citySelect.html(this.getSelectOption(city))

        if(this.option.isUpdate && this.option.data.receiverCity){
            $citySelect.val(this.option.data.receiverCity)
        }
    },
    getReceiverInfo(){
        const receiverInfo = {}
        const result = {
            status: false
        }
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val())
        receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val()
        receiverInfo.receiverCity = this.$modalWrap.find('#receiver-city').val()
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val())
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val()) 
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val())

        if(this.option.isUpdate){
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val()
        }
        if(!receiverInfo.receiverName){
            result.errMsg = '请输入收件人姓名'
        }else if(!receiverInfo.receiverProvince){
            result.errMsg = '请选择收件人所在省份'
        }else if(!receiverInfo.receiverCity){
            result.errMsg = '请选择收件人所在城市'
        }else if(!receiverInfo.receiverAddress){
            result.errMsg = '请输入收件人详细地址'
        }else if(!receiverInfo.receiverPhone){
            result.errMsg = '请输入收件人手机号'
        }else{
            result.status = true
            result.data = receiverInfo
        }
        return result
    }
}

export default addressModal