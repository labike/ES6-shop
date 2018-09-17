import Shop from 'utils/shop.js'

const _shop = new Shop()

class Address{
    getAddressList(){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/shipping/list.do'),
                data: {
                    pagSzie: 50
                },
                success: resolve,
                error: reject
            })
        })
    }
    save(addressInfo){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/shipping/add.do'),
                data: addressInfo,
                success: resolve,
                error: reject
            })
        })
    }
    getAddress(shippingId){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/shipping/select.do'),
                data: {
                    shippingId: shippingId
                },
                success: resolve,
                error: reject
            })
        })
    }
    update(addressInfo){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/shipping/update.do'),
                data: addressInfo,
                success: resolve,
                error: reject
            })
        })
    }
    deleteAddress(shippingId){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/shipping/del.do'),
                data: {
                    shippingId: shippingId
                },
                success: resolve,
                error: reject
            })
        })
    }
}

export default Address