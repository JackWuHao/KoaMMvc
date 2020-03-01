const db = require('../db')
const sq = require('sequelize')


const HotGoods = db('HotGoods',{
    mallPrice:sq.DOUBLE,
    image:sq.STRING,
    price:sq.DOUBLE,
    name:sq.STRING,
    goodsId:sq.STRING,

})

module.exports = HotGoods