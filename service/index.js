const Koa = require('koa')
const router = require('koa-router')();
const bodyParse = require('koa-bodyparser')
const cors = require('koa2-cors')
const app = new Koa()
const rest = require('./rest')

const controllers = require('./controller')


app.use(async(ctx,next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next ();    
})

//解析post参数
app.use(bodyParse())

//支持跨域
app.use(cors())

//添加区别api和其他请求的区别
//给response.body添加失败和成功方法统一处理
app.use(rest.restifySucess())
app.use(rest.restfyFailure())

//管理get post 请求
controllers(router)



app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)