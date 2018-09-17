import Shop from 'utils/shop.js'
import '../common/nav-simple'

import './index.css'

const _shop = new Shop()

$(function(){
    const type = _shop.getUrlParam('type') || 'default'
    const $ele = $('.' + type + '-success')
    if(type === 'payment'){
        const orderNumber = _shop.getUrlParam('orderNumber')
        const $orderNumber = $ele.find('.order-number')
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber)
    }
    $ele.show()
})


