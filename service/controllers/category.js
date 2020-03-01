const model = require('../autoAddModel')

const category = model.CategoryAll

const categorySub = model.Category

const APIError = require('../rest').APIError



fn_get_categoryList = async(ctx,next)=>{
        
    await category.findAll().then(value=>{
        ctx.restSucess(value, "查询成功")
    }).catch(error=>{
        ctx.restFailure(error, '数据库报错')
    })
     

}

fn_get_categorySub = async(ctx,next)=>{
 
    let categoryId = ctx.params.id
    await categorySub.findAll({
        where:{
            MALL_CATEGORY_ID:categoryId
        },
       
    }).then(value=>{

        ctx.restSucess(value,'查询成功')
    }).catch(error=>{
        ctx.restFailure(error,'数据库报错')
    })
}


module.exports = {
    'GET /api/goodsCategory' : fn_get_categoryList,
    'POST /api/getCategorySubList/:id' : fn_get_categorySub,
    'GET /api/getCategorySubList/:id' : fn_get_categorySub
}