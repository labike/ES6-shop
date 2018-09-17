import Shop from 'utils/shop.js'

const _shop = new Shop()

class User{
    logout(){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/user/logout.do'),
                type: 'post',
                success: resolve,
                error: reject
            })
        })
    }
    checkLogin(){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/user/get_user_info.do'),
                type: 'post',
                success: resolve,
                error: reject
            })
        })
    }
    login(userInfo){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/user/login.do'),
                data: userInfo,
                type: 'post',
                success: resolve,
                error: reject
            })
        })
    }
    checkUserName(username){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/user/check_valid.do'),
                data: {
                    type: 'username',
                    str: username
                },
                type: 'post',
                success: resolve,
                error: reject
            })
        })
    }
    register(userInfo){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/user/register.do'),
                data: userInfo,
                type: 'post',
                success: resolve,
                error: reject
            })
        })
    }
    getQuestion(username){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/user/forget_get_question.do'),
                data: {
                    username: username
                },
                type: 'post',
                success: resolve,
                error: reject
            })
        })
    }
    checkAnswer(userInfo){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/user/forget_check_answer.do'),
                data: userInfo,
                type: 'post',
                success: resolve,
                error: reject
            })
        })
    }
    resetPassword(userInfo){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/user/forget_reset_password.do'),
                data: userInfo,
                type: 'post',
                success: resolve,
                error: reject
            })
        })
    }
    getUserInfo(){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/user/get_information.do'),
                type: 'post',
                success: resolve,
                error: reject
            })
        })
    }
    updateUserInfo(userInfo){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/user/update_information.do'),
                data: userInfo,
                type: 'post',
                success: resolve,
                error: reject
            })
        })
    }
    updatePassword(userInfo){
        return new Promise((resolve, reject) => {
            _shop.request({
                url: _shop.getServerUrl('/user/reset_password.do'),
                data: userInfo,
                type: 'post',
                success: resolve,
                error: reject
            })
        })
    }
}

export default User