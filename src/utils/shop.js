import Hogan from 'hogan.js'

const conf = {
    serverHost: ''
}

class Shop{
    request(param){
        let _this = this
        $.ajax({
            type: param.type || 'get',
            url: param.url || '',
            dataType: param.dataType || 'json',
            data: param.data || null,
            success: res => {
                if(res.status === 0){
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }else if(res.status === 10){
                    _this.doLogin()
                }else if(res.status === 1){
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error: err => {
                typeof param.error === 'function' && param.error(err.statusText)
            }
        })
    }
    getServerUrl(path){
        return conf.serverHost + path
    }
    getUrlParam(name){
        //const queryString = window.location.search.split('?')[1]
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        const result = window.location.search.substr(1).match(reg)
        //const result = queryString.match(reg)
        return result ? decodeURIComponent(result[2]) : null
    }
    renderHtml(htmlTemplate, data){
        const template = Hogan.compile(htmlTemplate)
        const result = template.render(data)
        return result
    }
    successTips(msg){
        alert(msg || '操作成功!')
    }
    errorTips(msg){
        alert(msg || '哪里出错了?')
    }
    validate(value, type){
        var value = $.trim(value)
        if(type === 'require'){
            return !!value
        }
        if(type === 'phone'){
            return /^1\d{10}$/.test(value)
        }
        if(type === 'email'){
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        }
    }
    doLogin(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href)
    }
    goHome(){
        window.location.href = './index.html'
    }
}

export default Shop