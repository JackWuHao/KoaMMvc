const db = require('../db')
const sq = require('sequelize')

var AdverPic = db('AdverPic',{
    PICTURE_ADDRES:sq.STRING
})

module.exports = AdverPic