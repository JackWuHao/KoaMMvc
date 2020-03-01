const db = require('../db')
const sq = require('sequelize')


const Recommand = db('Recommand',{
    mallPrice:sq.DOUBLE,
    image:sq.STRING,
    price:sq.DOUBLE,
    goodsName:sq.STRING,
    goodsId:sq.STRING,

})

module.exports = Recommand