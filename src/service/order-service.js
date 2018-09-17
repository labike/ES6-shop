import Shop from 'utils/shop.js'

const _shop = new Shop()

class Order{
    getProductList(){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/order/get_order_cart_product.do'),
                success: resolve,
                error: reject
            })
        })
    }
    createOrder(orderInfo){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/order/create.do'),
                data: orderInfo,
                success: resolve,
                error: reject
            })
        })
    }
    getOrderList(listParam){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/order/list.do'),
                data: listParam,
                success: resolve,
                error: reject
            })
        })
    }
    getOrderDetail(orderNumber){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/order/detail.do'),
                data: {
                    orderNo: orderNumber
                },
                success: resolve,
                error: reject
            })
        })
    }
    cancelOrder(orderNumber){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/order/cancel.do'),
                data: {
                    orderNo: orderNumber
                },
                success: resolve,
                error: reject
            })
        })
    }
}

export default Order