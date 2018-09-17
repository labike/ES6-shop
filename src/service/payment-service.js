import Shop from 'utils/shop.js'

const _shop = new Shop()

class Payment{
    getPaymentInfo(orderNumber){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/order/pay.do'),
                data: {
                    orderNo: orderNumber
                },
                success: resolve,
                error: reject
            })
        })
    }
    getPaymentStatus(orderNumber){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/order/query_order_pay_status.do'),
                data: {
                    orderNo: orderNumber
                },
                success: resolve,
                error: reject
            })
        })
    }
}

export default Payment