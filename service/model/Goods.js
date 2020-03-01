const db = require('../db')
const sq = require('sequelize')


var Goods = db('Goods',{
    GOOD_ID:sq.STRING,
    GOODS_SERIAL_NUMBER:sq.STRING,
    SHOP_ID:sq.STRING,
    SUB_ID:{
        type:sq.STRING,
        allowNull:true,
    },
    GOOD_TYPE:sq.INTEGER,
    STATE:sq.INTEGER,
    IS_DELETE:sq.INTEGER,
    NAME:sq.STRING,
    ORI_PRICE:sq.DOUBLE,
    PRESENT_PRICE:sq.DOUBLE,
    AMOUNT:sq.INTEGER,
    DETAIL:{
        type:sq.TEXT,
        allowNull:true,
    },
    BRIEF:{
        type:sq.STRING,
        allowNull:true,
    },
    SALES_COUNT:sq.INTEGER,
    IMAGE1:{
        type:sq.STRING,
        allowNull:true
    },
    IMAGE2:{
        type:sq.STRING,
        allowNull:true
    },
    IMAGE3:{
        type:sq.STRING,
        allowNull:true
    },
    IMAGE4:{
        type:sq.STRING,
        allowNull:true
    },
    IMAGE5:{
        type:sq.STRING,
        allowNull:true
    },
    ORIGIN_PLACE:{
        type:sq.STRING,
        allowNull:true
    },
    GOOD_SCENT:{
        type:sq.STRING,
        allowNull:true
    },
    PICTURE_COMPERSS_PATH:{
        type:sq.STRING,
        allowNull:true
    }

})


module.exports = Goods