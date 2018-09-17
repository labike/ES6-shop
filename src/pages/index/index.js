import Shop from 'utils/shop.js'
import '../common/header'
import '../common/nav'
import template from './index.string'
import navSide from '../common/nav-side'
import 'utils/slider'

const _shop = new Shop()

import './index.css'

navSide.init({
    name: 'user-center'
})

$(function() {
    const bannerHtml = _shop.renderHtml(template)
    $('.banner-content').html(bannerHtml)
    const $slider = $('.banner').unslider({
        dots: true
    });
    $('.banner-arrow').click(function(){
        const forward = $(this).hasClass('prev') ? 'prev' : 'next'
        $slider.data('unslider')[forward]()
    })
});


