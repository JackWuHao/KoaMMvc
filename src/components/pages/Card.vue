<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车"></van-nav-bar>
    </div>
    <div v-if="cardInfo.length>0">
      <div class="card-title">
        <van-button size="small" type="danger" @click="clearCard" plain>清空购物车</van-button>
      </div>
      <div class="card-list">
        <div class="pang-row" v-for="(item,index) in cardInfo" :key="index">
          <div class="pang-img">
            <img :src="item.image" width="100%" />
          </div>
          <div class="pang-text">
            <div class="pang-goods-name">{{item.Name}}</div>
            <div class="pang-control">
              <van-stepper v-model="item.count" />
            </div>
          </div>
          <div class="pang-goods-price">
            <div>￥{{item.price | moneyFilter}}</div>
            <div>x{{item.count}}</div>
            <div class="allPrice">￥{{item.price*item.count | moneyFilter}}</div>
          </div>
        </div>
      </div>
      <div class="totalMoeny">
        商品总价:
        <span class="allPrice">￥{{totalMoney | moneyFilter}}</span>
      </div>
    </div>
    <div v-else class="empty">
        购物车为空，请先添加购物
    </div>
  </div>
</template>

<script>
import toMomey from "../../filter/toFixed";
export default {
  data() {
    return {
      cardInfo: [],
      isEmpty: false
    };
  },
  created() {
    this.getCardInfo();
  },
  methods: {
    getCardInfo() {
      if (localStorage.cardInfo) {
        this.cardInfo = JSON.parse(localStorage.cardInfo);
      }
      console.log(" this.cardInfo:" + JSON.stringify(this.cardInfo));
      this.isEmpty = this.cardInfo.length > 0 ? true : false;
    },
    clearCard() {
      localStorage.removeItem("cardInfo");
      this.cardInfo = [];
    }
  },
  computed: {
    totalMoney() {
      let allMoney = 0;
      this.cardInfo.forEach(element => {
        allMoney += element.price * element.count;
      });
      //修改缓存内容
      localStorage.cardInfo = JSON.stringify(this.cardInfo);
      return allMoney;
    }
  },
  mouted() {},
  filters: {
    moneyFilter(money) {
      return toMomey(money);
    }
  }
};
</script>

<style scoped>
.card-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.card-list {
  background-color: #ffffff;
}
.pang-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}

.pang-img {
  flex: 6;
}
.pang-text {
  flex: 14;
  padding-left: 10px;
}
.pang-control {
  padding-top: 10px;
}
.pang-goods-price {
  flex: 4;
  text-align: right;
}
.allPrice {
  color: red;
}
.totalMoeny {
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  line-height: 2rem;
}
.empty{
    position: absolute;
    top: 50%;
    width: 100%;
    font-size: 18px;
    text-align: center;
    color: gray;
}
</style>