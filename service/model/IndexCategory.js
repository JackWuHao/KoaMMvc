const db = require('../db')
const sq = require('sequelize')


const bxMallSubDto = db('bxMallSubDto',{
    mallSubId: sq.STRING,
    mallCategoryId:{
        type:sq.INTEGER,
    },
    mallSubName:sq.STRING,
    comments:{
        type:sq.TEXT,
        allowNull: true,
    }
 }
)


const IndexCategory = db('IndexCategory',{
    mallCategoryId:{
        type:sq.INTEGER,
        primaryKey:true,
        autoIncrement: true 
    },
    mallCategoryName:sq.STRING,
    comments:{
        type:sq.TEXT,
        allowNull: true,
    },
    image:sq.STRING
})

IndexCategory.hasMany(bxMallSubDto,{
    foreignKey:'mallCategoryId',sourceKey:'mallCategoryId',
})

bxMallSubDto.belongsTo(IndexCategory,{
    foreignKey:'mallCategoryId',
    targetKey:'mallCategoryId',
})

module.exports = {
    indexCategory:IndexCategory,
    bxMallSubDto:bxMallSubDto,
}


