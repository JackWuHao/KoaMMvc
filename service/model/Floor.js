const db = require('../db')
const sq = require('sequelize')


var Floor = db('Floor',{
    goodsId:sq.STRING,
    image:sq.STRING,
    type:sq.INTEGER
})


module.exports = Floor