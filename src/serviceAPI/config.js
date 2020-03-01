
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo : LOCALURL + "api/getIndex", //首页
    registerUser:LOCALURL + 'api/register', //注册
    logingUser:LOCALURL  + 'api/login', //登录
    goodsDetail:LOCALURL + 'api/getDetailGoodsInfo', //商品详情页
    getCategoryList: LOCALURL + "api/goodsCategory", //大类信息
    getCategorySubList:LOCALURL + 'api/getCategorySubList/',   //得到小类信息
    getGoodsListByCategorySubID : LOCALURL+'api/goods/getGoodsListByCategorySubID',  //小类对应的商品信息
}

module.exports = URL