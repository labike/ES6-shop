import Shop from 'utils/shop.js'
const template = require('./index.string')

const _shop = new Shop()

import './index.css'

const navSide = {
    option: {
        name: '',
        navList: [
            {name: 'user-center', desc: '个人中心', href: './user-center.html'},
            {name: 'order-list', desc: '我的订单', href: './order-list.html'},
            {name: 'user-passupdate', desc: '修改密码', href: './user-passupdate.html'},
            {name: 'about', desc: '关于Shop', href: './about.html'}
        ]
    },
    init(option){
        $.extend(this.option, option)
        //Object.assign({}, option)
        this.renderNav()
    },
    renderNav(){
        for(let i = 0, iLen = this.option.navList.length; i< iLen; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true
            }
        }
        const navHtml = _shop.renderHtml(template, {
            navList: this.option.navList
        })
        $('.nav-side').html(navHtml)
    }
}

export default navSide