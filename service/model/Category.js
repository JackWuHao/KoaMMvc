const db = require('../db')
const sq = require('sequelize')

var Category = db('Category',{
    Category_ID:{
        type:sq.STRING,
        unique:true,
    },
    MALL_CATEGORY_ID : sq.STRING,
    MALL_SUB_NAME:sq.STRING,
    COMMENTS:{
        type:sq.STRING,
        allowNull:true,
    },
    SORT:sq.BIGINT,
})

module.exports = Category