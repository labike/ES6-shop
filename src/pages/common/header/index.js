import './index.css'

import Shop from 'utils/shop.js'

const _shop = new Shop()

import './index.css'

const header = {
    init(){
        this.onLoad()
        this.bindEvent()
    },
    onLoad(){
        let keyword = _shop.getUrlParam('keyword')
        if(keyword){
            $('#search-input').val(keyword)
        }
    },
    bindEvent(){
        const _this = this
        $('#search-btn').click(function(){
            _this.searchSubmit()
        })
        $('#search-input').keyup(function(e){
            if(e.keyCode === 13){
                _this.searchSubmit()
            }
        })
    },
    searchSubmit(){
        let keyword = $.trim($('#search-input').val())
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword
        }else{
            _shop.goHome()
        }
    }
}

header.init()