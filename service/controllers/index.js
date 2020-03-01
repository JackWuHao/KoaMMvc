const model = require('../autoAddModel')
const APIError = require('../rest').APIError

const Recommand = model.Recommand
const Hotgoods = model.HotGoods
const adverPic = model.AdverPic
const Floor = model.Floor
const indexCategory = model.IndexCategory.indexCategory
const bxMallSubDto = model.IndexCategory.bxMallSubDto

const Slides = model.Slides


var fn_get_Index = async (ctx, next) => {
    try {
        let category =  await indexCategory.findAll({
            attributes: ['mallCategoryId', 'mallCategoryName', 'comments', 'image'],
            include: [{
                model: bxMallSubDto,
                attributes: ["mallSubId", "mallCategoryId", "mallSubName", "comments"]
            }
            ]
        })
        let advertesPicture = await adverPic.findAll({
            attributes: ['PICTURE_ADDRES']
        })

        let floor = await Floor.findAll({
            attributes: ['goodsId','image','type']
        })
        let floorName = {
            "floor3": "营养奶品",
            "floor2": "新鲜水果",
            "floor1": "休闲食品"
        }
        let hotgoods = await Hotgoods.findAll(
            {
                attributes: ['mallPrice','image','goodsId','price','name']
            }
        ) 
        let recommand = await Recommand.findAll({
            attributes: ['mallPrice','image','goodsId','price','goodsName']
        })

        let slides = await Slides.findAll({
            attributes: ['image','goodsId']
        })
        
        let floor1 = []
        let floor2 = []
        let floor3 = []
        for (let index = 0; index < floor.length; index++) {
            const element = floor[index];
            if (element.type ===1){
                floor1.push(element)
            }
            else if (element.type===2){
                floor2.push(element)
            }
            else if (element.type===3){
                floor3.push(element)
            }
        }
       
        ctx.restSucess({
            advertesPicture: advertesPicture,
            floor1:floor1,
            floor2:floor2,
            floor3:floor3,
            floorName:floorName,
            slides:slides,
            category: category,
            hotgoods:hotgoods,
            recommend:recommand
        }, "查询成功")

    }
    catch (error) {
        ctx.restFailure(error, '数据库报错')
    }
}

module.exports = {
    'GET /api/getIndex': fn_get_Index
}


