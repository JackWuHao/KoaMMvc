const db = require('../db')
const sq = require('sequelize')

var CategoryAll = db('CategoryAll',{
    All_ID: {
        type:sq.STRING,
        unique:true
    },
    MALL_CATEGORY_NAME:sq.STRING,
    IMAGE:{type:sq.STRING},
    TYPE:{type:sq.INTEGER},
    SORT:{type:sq.INTEGER},
    COMMENTS:{type:sq.STRING,allowNull:true}
})

module.exports = CategoryAll