import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import  ShopMall from '@/components/ShopMall' 
// import temTodo from '@/components/temTodo'
// import Register from '@/components/pages/Register'
// import Login from '@/components/pages/Login'
// import Goods from "@/components/pages/Goods";
// import Category from '@/components/pages/Category'

Vue.use(Router)

export default new Router({
  routes: [
    {
       path:'/',
       name:'Main',
       component:()=> import('../components/pages/Main'),
       meta: {
        keepAlive: true,// 需要被缓存
       },
       children:[
        {
          path: '/',
          name: "Index",
          component:()=> import('../components/ShopMall'),  //按需加载避免首页加载太慢
          meta: {
            keepAlive: true,// 需要被缓存
            isBack:false
          },
        },
        {
          path:'/categoryList',
          name: 'CategoryList',
          component:()=> import('../components/pages/Category')
        },{
          path:'/card',
          name:'Card',
          component:()=> import('../components/pages/Card')
    
        }

       ]
    },
    {
      path:'/register',
      name:'Register',
      component: ()=> import('../components/pages/Register') ,
    },
    {
      path:'/login',
      name:'Login',
      component:()=> import('../components/pages/Login'),
    },
    {
      path:'/goodDetail',
      name:"GoodDetail",
      component:()=> import('../components/pages/Goods')
    },
  ]
})
