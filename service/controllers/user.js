
const model = require('../autoAddModel')
const TestUser = model.TestUser;
const APIError = require('../rest').APIError


var fn_get_index = async(ctx ,next)=>{
    ctx.body="这是用户操作首页"
}

//注册
var fn_post_register = async(ctx ,next)=>{
     
    await TestUser.create({
        userName:ctx.request.body.username,
        password:ctx.request.body.password,
        startDate: Date.now(),
        status:0 
    }).then(data=>{
        console.log("添加用户成功");
        ctx.restSucess({},'注册成功')
    }).catch(error=>{
        console.log("添加用户失败");
        ctx.restFailure(error,'注册失败')
    })
    
}
//登录
var fn_post_login = async(ctx,next)=>{
    await TestUser.findOne({
         where:{
             userName:ctx.request.body.username
         }
     }).then(value=>{
       var findUser = value.dataValues;
       if (findUser){
        ctx.restSucess(findUser,'登录成功')
       }else{
        ctx.restFailure({},'登录失败')
       }  
     }).catch(error=>{
        ctx.restFailure(error,'登录失败')
     })   
}

module.exports = {
    'GET /': fn_get_index,
    'POST /api/register':fn_post_register,
    'POST /api/login':fn_post_login,
}