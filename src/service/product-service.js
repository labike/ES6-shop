import Shop from 'utils/shop.js'

const _shop = new Shop()

class Product{
    getProductList(listParam){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/product/list.do'),
                data: listParam,
                success: resolve,
                error: reject
            })
        })
    }
    getProductDetail(productId){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/product/detail.do'),
                data: {
                    productId: productId
                },
                success: resolve,
                error: reject
            })
        })
    }
}

export default Product