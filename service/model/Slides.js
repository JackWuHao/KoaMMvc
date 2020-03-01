const db = require('../db')
const sq = require('sequelize')



const Slides = db('Slides',{
    image:sq.STRING,
    goodsId:sq.STRING
})


module.exports = Slides