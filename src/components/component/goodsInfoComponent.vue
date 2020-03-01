<template>
  <div class="goods-info" @click="btnGoodItem">
      <div class="good-image"> 
           <img v-lazy="goodsImage" width="100%">
      </div>
      <div class="goods-name">{{goodsName}}</div>
      <div class="goods-price">￥{{goodsPrice | monyFilter}}</div>
  </div>
</template>

<script>
import toMoney  from "../../filter/toFixed";
export default {
    props:['goodsImage',"goodsName","goodsPrice","goodsId"],
    filters:{
        monyFilter(money){
            return toMoney(money)
        }
    },
    methods:{
        btnGoodItem(){
            this.$router.push({
                path:'/goodDetail',
                query:{
                    goodsId:this.goodsId
                }
            })
        }
    }
}
</script>

<style scoped>
  .goods-name{
      padding: 0 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }

</style>