<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar fixed :title="goodsInfo.NAME" left-text="返回" left-arrow @click-left="goback" />
    </div>
    <div class="topimage-div">
      <img v-lazy="goodsInfo.IMAGE1" width="100%" />
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：<span>{{goodsInfo.PRESENT_PRICE | monyFilter}}元</span></div>
    <div>
      <van-tabs  color="#fff" swipeable sticky> 
        <van-tab title="商品详情" >
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
         <div>
           <van-button size="large" type="primary" @click="addGoodsToCard">
               加入购物车
           </van-button>
         </div>
         <div>
           <van-button size="large" type="danger">
               直接购买
           </van-button>
         </div>

    </div>
  </div>
</template>

<script>
const axios = require("axios");
import URL from "../../serviceAPI/config";
import toMoney from '../../filter/toFixed';
import {Toast} from 'vant'
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {}
    };
  },
  created() {
    console.log('create');
    
  },
  filters:{
    monyFilter(money){
      return toMoney(money)
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    initLoadData() {
      console.log();
      
      this.goodsId = this.$route.query.goodsId
        ? this.$route.query.goodsId
        : this.$route.params.goodsId;
     console.log(this.goodsId);
        
      axios({
        url: URL.goodsDetail,
        data: {
          goodsId: this.goodsId
        },
        method: "POST"
      })
        .then(response => {
          if (response.data.code === "200") {
            this.goodsInfo = response.data.data; 
          } else {
            console.log("失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addGoodsToCard(){
      let cardInfo = localStorage.cardInfo ? JSON.parse(localStorage.cardInfo) :[]
      let isHaveGoods=cardInfo.find(cart=>cart.goodsId==this.goodsId)
      if (! isHaveGoods){
        let newGoodsInfo = {
                goodsId: this.goodsInfo.GOOD_ID,
                Name:this.goodsInfo.NAME,
                price:this.goodsInfo.PRESENT_PRICE,
                image:this.goodsInfo.IMAGE1,
                count:1
         }
         cardInfo.push(newGoodsInfo) //添加到购物车
         localStorage.cardInfo = JSON.stringify(cardInfo)
         Toast.success('添加成功')
      }else{
        Toast.success(以添加过此商品)
      }
      this.$router.push({
        name:'Card'
      })

    }

  },
  mounted(){
    this.initLoadData();
  },
   beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    console.log('leave------');
    
    to.meta.keepAlive = true; // 让 A 缓存，即不刷新
    next();
  }
};
</script>

<style scoped>
.detail{
  font-size:0px;
}
.goods-name{
  background-color: #ffffff;
  text-align: center;
}
.goods-price{
  background-color: #ffffff;
  text-align: center;
}
.goods-price>span{
  color: red
}
.goods-bottom{
    position: fixed;
    bottom: 0px;
    left: 0px;
    background-color: #ffffff;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;

}
.goods-bottom>div{
  flex: 1;
  padding: 5px;
}

</style>