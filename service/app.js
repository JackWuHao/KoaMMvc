const model = require('./autoAddModel')
const fs = require('fs')


let HotGoods = model.Recommand
// HotGoods.sync({
//     force:true
// })
fs.readFile('/Users/apple/Downloads/SmileVue-master/service/data_json/index.json','utf-8',function(error,data){
     if(!error){
        data = JSON.parse(data)  
        let now = Date.now();
        let modelArry = data.data.recommend
        let FloorArry = modelArry.map(function(value){
            return {
                'mallPrice':value.mallPrice,
                'image':value.image,
                'goodsId':value.goodsId,
                'price':value.price,
                'goodsName':value.goodsName,
                 'createAt':now,
                 'status':0,
                 'updateAt':now,

            }
        }) 
      HotGoods.bulkCreate(FloorArry)
    }
}) 

// let Slides = model.Slides

// Slides.sync()
// fs.readFile('/Users/apple/Downloads/SmileVue-master/service/data_json/index.json','utf-8',function(error,data){
//      if(!error){
//         data = JSON.parse(data)  
//         let modelArry = data.data.slides
//         let FloorArry = modelArry.map(function(value){
//             return {
//                 'image':value.image,
//                 'goodsId':value.goodsId,
//                 'status':0,

//             }
//         }) 
//         FloorArry.forEach(element => {
//             Slides.create(element).then(value=>{
//                 console.log(value);
                
//             }).catch(error=>{
//                 console.log(error);
//             })
//         });
        
//     }
// }) 

//const IndexCategory = model.IndexCategory.indexCategory
 //const BxMallSubDto = model.IndexCategory.bxMallSubDto

// let IndexCategory = model.IndexCategory
// BxMallSubDto.sync(
//      {
//          force:true
//      }
//  )

// fs.readFile('/Users/apple/Downloads/SmileVue-master/service/data_json/index.json','utf-8',function(error,data){
//      if(!error){
//         data = JSON.parse(data) 
//         let modelArry = data.data.category
//         let FloorArry = modelArry.map(function(value){
//             var number = parseInt(value.mallCategoryId)
//             return {
//                 'comments':value.comments,
//                 'mallCategoryId':number,
//                 'mallCategoryName':value.mallCategoryName,
//                 'image':value.image,
//                 'status':0,
//             }
//         }) 
//         FloorArry.forEach(element => {
//             IndexCategory.create(element).then(value=>{
//                 console.log(value);
                
//             }).catch(error=>{
//                 console.log(error);
//             })
//         });
//     }
// }) 

// fs.readFile('/Users/apple/Downloads/SmileVue-master/service/data_json/index.json','utf-8',function(error,data){
//      if(!error){
//         data = JSON.parse(data) 
//         for (let index = 0; index < 5; index++) {
            
//         let modelArry = data.data.category[index].bxMallSubDto
//         let FloorArry = modelArry.map(function(value){
//             var number = parseInt(value.mallCategoryId)
//             return {
//                 'comments':value.comments,
//                 'mallCategoryId':number,
//                 'mallSubId':value.mallSubId,
//                 'mallSubName':value.mallSubName,
//                 'status':0,

//             }
//         }) 
//         FloorArry.forEach(element => {
//             BxMallSubDto.create(element).then(value=>{
//                 console.log(value);
                
//             }).catch(error=>{
//                 console.log(error);
//             })
//         });
//     } 
//     }
// }) 


// let Floor = model.Floor


// Floor.sync({
//     force:true
// })

// fs.readFile('/Users/apple/Downloads/SmileVue-master/service/data_json/index.json','utf-8',function(error,data){
//      if(!error){
//         data = JSON.parse(data)  
//         let now = Date.now();
//         let modelArry = data.data.floor1 
//         let FloorArry = modelArry.map(function(value){
//             return {
//                 'goodsId':value.goodsId,
//                 'image':value.image,
//                 'type':1,
//                 'createAt':now,
//                 'status':0,
//                 'updateAt':now,

//             }
//         }) 
//         Floor.bulkCreate(FloorArry)
//     }
// }) 


// let AdverPic  = model.AdverPic
// AdverPic.sync()
// AdverPic.create({
//     PICTURE_ADDRES: "http://images.baixingliangfan.cn/advertesPicture/20180404/20180404085441_850.gif",
//     status:0
// })


// let Goods = model.Goods
// Goods.sync({
//     force:true
// })
// fs.readFile('/Users/apple/Downloads/SmileVue-master/service/data_json/goods.json','utf-8',function(error,data){
//      if(!error){
//         data = JSON.parse(data)  
//         let now = Date.now();
//         let modelArry = data.RECORDS
//         let GoodsArry = modelArry.map(function(value){
//             return {
//                 'GOOD_ID':value.ID,
//                 'GOODS_SERIAL_NUMBER':value.GOODS_SERIAL_NUMBER,
//                 'SHOP_ID':value.SHOP_ID,
//                 'SUB_ID':value.SUB_ID,
//                 'GOOD_TYPE':value.GOOD_TYPE,
//                 'STATE':value.STATE,
//                 'IS_DELETE':value.IS_DELETE,
//                 'NAME':value.NAME,
//                 "ORI_PRICE":value.ORI_PRICE,
//                 "PRESENT_PRICE":value.PRESENT_PRICE,
//                 "AMOUNT":value.AMOUNT,
//                 "DETAIL":value.DETAIL,
//                 "BRIEF":value.BRIEF,
//                 "SALES_COUNT":value.SALES_COUNT,
//                 "IMAGE1":value.IMAGE1,
//                 "IMAGE2":value.IMAGE2,
//                 "IMAGE3":value.IMAGE3,
//                 "IMAGE4":value.IMAGE4,
//                 "IMAGE5":value.IMAGE5,
//                 "ORIGIN_PLACE":value.ORIGIN_PLACE,
//                 "GOOD_SCENT":value.GOOD_SCENT,
//                 "PICTURE_COMPERSS_PATH:":value.PICTURE_COMPERSS_PATH,
//                 'createAt':now,
//                 'status':0,
//                 'updateAt':now,

//             }
//         }) 
//         Goods.bulkCreate(GoodsArry)
//     }
// }) 


// let CategoryAll = model.CategoryAll
// CategoryAll.sync({
//     force:true
// })

// fs.readFile('/Users/apple/Downloads/SmileVue-master/service/data_json/category.json','utf-8',function(error,data){
//      if(!error){
//         data = JSON.parse(data)
//         console.log(data);
        
//         let now = Date.now();
//         let modelArry = data.RECORDS
//         let CategoryArry = modelArry.map(function(value){
//             return {
//                 'All_ID':value.ID,
//                 'MALL_CATEGORY_NAME':value.MALL_CATEGORY_NAME,
//                 'TYPE':value.TYPE,
//                 'COMMENTS':value.COMMENTS,
//                 'SORT':value.SORT,
//                 'IMAGE':value.IMAGE,
//                 'createAt':now,
//                 'status':0,
//                 'updateAt':now,

//             }
//         }) 
//         CategoryAll.bulkCreate(CategoryArry)
//     }
// }) 
        
    

// let Category = model.Category

// fs.readFile('/Users/apple/Downloads/SmileVue-master/service/data_json/category_sub.json','utf-8',function(error,data){
//      if(!error){
//         data = JSON.parse(data)
//         let now = Date.now();
//         let modelArry = data.RECORDS
//         let CategoryArry = modelArry.map(function(value){
//             return {
//                 'Category_ID':value.ID,
//                 'MALL_CATEGORY_ID':value.MALL_CATEGORY_ID,
//                 'MALL_SUB_NAME':value.MALL_SUB_NAME,
//                 'COMMENTS':value.COMMENTS,
//                 'SORT':value.SORT,
//                 'createAt':now,
//                 'status':0,
//                 'updateAt':now,

//             }
//         }) 
//         Category.bulkCreate(CategoryArry)
//      }
    
// })
// Category.sync({
//     force:true
// }
// )


// TestUser.sync({
//     force:true
// })
// TestUser.create({
//     userName:"小草",
//     password:"123456",
//     startDate: Date.now(),
//     status:0
// }).then(data=>{
//     console.log(data);
// }).catch((error)=>{
//     console.log(error);
    
// })