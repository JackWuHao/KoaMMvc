var db = require('../db')
var seq = require('sequelize')
var TestUser = db('TestUser',{
    userName:{
        unique:true,
        type:seq.STRING(100)
    },
    password:seq.STRING,
    startDate: seq.BIGINT,
})

module.exports = TestUser