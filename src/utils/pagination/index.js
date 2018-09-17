import template from './index.string'
import './index.css'

import Shop from 'utils/shop.js'

const _shop = new Shop()

class Pagination{
    constructor(defaultPagination){
        const _this = this
        this.defaultPagination = {
            container: null,
            pageNum: 1,
            pageRange: 3,
            onSelectPage: null
        }
    
        $(document).on('click', '.pg-item', function(){
            const $this = $(this)
            if($this.hasClass('active') || $this.hasClass('disabled')){
                return
            }
            //console.log(_this.newOption)
            
            typeof _this.option.onSelectPage === 'function' 
            ? _this.option.onSelectPage($this.data('value'))
            : null
        })

    }
    render(userOption){
        this.option = Object.assign({}, this.defaultPagination, userOption)
        if(!(this.option.container instanceof jQuery)){
            return 
        }

        if(this.option.pages <= 1){
            return 
        }

        this.option.container.html(this.getPaginationHtml())
        return this.option
    }
    getPaginationHtml(){
        let html = ''
        const pageArray = []

        const start = this.option.pageNum - this.option.pageRange > 0 
            ? this.option.pageNum - this.option.pageRange
            : 1

        const end = this.option.pageNum + this.option.pageRange < this.option.pages
            ? this.option.pageNum + this.option.pageRange
            : this.option.pages

        pageArray.push({
            name: '上一页',
            value: this.option.prePage,
            disabled: !this.option.hasPreviousPage,
        }) 

        for(let i = start; i <= end; i++){
            pageArray.push({
                name: i,
                value: i,
                active: i === this.option.pageNum
            })
        }

        pageArray.push({
            name: '下一页',
            value: this.option.nextPage,
            disabled: !this.option.hasNextPage
        })

        html = _shop.renderHtml(template, {
            pageArray: pageArray,
            pageNum: this.option.pageNum,
            pages: this.option.pages
        })
        //console.log(pageArray)
        return html
    }
}

export default Pagination