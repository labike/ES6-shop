import Shop from 'utils/shop.js'
import Product from 'service/product-service.js'
import '../common/header'
import '../common/nav'
import template from './index.string'
import Pagination from 'utils/pagination'

const _shop = new Shop()
const _product = new Product()

import './index.css'

const page = {
    data: {
        listParam: {
            keyword: _shop.getUrlParam('keyword') || '',
            categoryId: _shop.getUrlParam('categoryId') || '',
            orderBy: _shop.getUrlParam('orderBy') || 'default',
            pageNum: _shop.getUrlParam('pageNum') || 1,
            pageSize: _shop.getUrlParam('pageSize') || 20
        }
    },
    init(){
        this.onload()
        this.bindEvent()
    },
    onload(){
        this.loadList()
    },
    bindEvent(){
        const _this = this
        $('.sort-item').click(function(){
            const $this = $(this)
            _this.data.listParam.pageNum = 1

            if($this.data('type') === 'default'){
                if($this.hasClass('active')){
                    return
                }else{
                    $this.addClass('active').siblings('.sort-item').removeClass('active asc desc')
                    _this.data.listParam.orderBy = 'default'
                }
            }else if($this.data('type') === 'price'){
                $this.addClass('active').siblings('.sort-item').removeClass('active asc desc')
                
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc')
                    _this.data.listParam.orderBy = 'price_asc'
                }else{
                    $this.addClass('desc').removeClass('asc')
                    _this.data.listParam.orderBy = 'price_desc'
                }
            }
            _this.loadList()
        })
    },
    loadList(){
        const listParam = this.data.listParam
        const _this = this
        const $pListContent = $('.p-list-content')
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId)
        $pListContent.html('<div class="loading"></div>')

        _product.getProductList(listParam).then(res => {
            const listHtml = _shop.renderHtml(template, {
                list: res.list
            })
            $pListContent.html(listHtml)
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            })
        }, errMsg => {
            _shop.errorTips(errMsg)
        })
    },
    loadPagination(pageInfo){
        const _this = this
        this.pagination ?  '' : (this.pagination = new Pagination())
        this.pagination.render(Object.assign({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage(pageNum){
                _this.data.listParam.pageNum = pageNum
                _this.loadList()
            }
        }))
    }
}

$(function(){
    page.init()
})


