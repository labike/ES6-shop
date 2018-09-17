import Shop from 'utils/shop.js'

const _shop = new Shop()

class Cart{
    getCartCount(){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/cart/get_cart_product_count.do'),
                success: resolve,
                error: reject
            })
        })
    }
    addToCart(productInfo){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/cart/add.do'),
                data: productInfo,
                success: resolve,
                error: reject
            })
        })
    }
    getCartList(){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/cart/list.do'),
                success: resolve,
                error: reject
            })
        })
    }
    selectProduct(productId){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/cart/select.do'),
                data: {
                    productId: productId
                },
                success: resolve,
                error: reject
            })
        })
    }
    unselectProduct(productId){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/cart/un_select.do'),
                data: {
                    productId: productId
                },
                success: resolve,
                error: reject
            })
        })
    }
    selectAllProduct(){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/cart/select_all.do'),
                success: resolve,
                error: reject
            })
        })
    }
    unselectAllProduct(){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/cart/un_select_all.do'),
                success: resolve,
                error: reject
            })
        })
    }
    updateProduct(productInfo){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/cart/update.do'),
                data: productInfo,
                success: resolve,
                error: reject
            })
        })
    }
    deleteProduct(productIds){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/cart/delete_product.do'),
                data: {
                    productIds: productIds
                },
                success: resolve,
                error: reject
            })
        })
    }
}

export default Cart