import Shop from 'utils/shop.js'
import Order from 'service/order-service.js'
import '../common/header'
import '../common/nav'
import navSide from '../common/nav-side'
import template from './index.string'
import Pagination from 'utils/pagination'

const _shop = new Shop()
const _order = new Order()

import './index.css'

const page = {
    data: {
        listParam: {
            pageNum: 1,
            pageSize: 10
        }
    },  
    init(){
        this.onload()
    },
    onload(){
        navSide.init({
            name: 'order-list'
        })
        this.loadOrderList()
    },
    loadOrderList(){
        const _this = this
        let orderListHtml = ''

        $('.order-list-content').html('<div class="loading"></div>')
        _order.getOrderList(this.data.listParam).then(res => {
            //_this.dataFilter(res)
            orderListHtml = _shop.renderHtml(template, res)
            $('.order-list-content').html(orderListHtml)
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            })
        }, errMsg => {
            $('.order-list-content').html('<p class="err-tip">加载订单失败, 请刷新后重试</p>')
        })
    },
    // dataFilter(data){
    //     data.isEmpty = data.list.length
    // },
    loadPagination(pageInfo){
        const _this = this
        this.pagination ?  '' : (this.pagination = new Pagination())
        this.pagination.render(Object.assign({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage(pageNum){
                _this.data.listParam.pageNum = pageNum
                _this.loadOrderList()
            }
        }))
    }
}

$(function(){
    page.init()
})

