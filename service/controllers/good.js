const model = require('../autoAddModel')
const Goods = model.Goods
const APIError = require('../rest').APIError


//查询商品详情
var fn_post_goodDetail = async (ctx, next) => {
   let goodsId = ctx.request.body.goodsId;
   if (goodsId) {
      await Goods.findOne({
         where: {
            GOOD_ID: goodsId
         }
      }).then(data => {
        if (data){
         ctx.restSucess(data, "查询成功")
        }else{
           ctx.restFailure({},'查询失败,ID不存在')
        }   
      }).catch(error => {
         ctx.restFailure(error, '数据库报错')
      })
   }else {
      ctx.restFailure({},'goodsId为空!')
   }

}

var fn_post_categorySub_goodList = async(ctx,next)=>{
   let categorySubId = ctx.request.body.categorySubId;
   let page = ctx.request.body.page;
   let pageCount = 10;
   await Goods.findAll({
      where:{
         SUB_ID:categorySubId
      },
      limit:pageCount,
      offset:pageCount *(page -1)
   }).then(data=>{
      ctx.restSucess(data, "查询成功")
   }).catch(error=>{
      ctx.restFailure(error, '数据库报错')
   })
}



module.exports = {
   'POST /api/getDetailGoodsInfo': fn_post_goodDetail,
   'POST /api/goods/getGoodsListByCategorySubID':fn_post_categorySub_goodList
   
}