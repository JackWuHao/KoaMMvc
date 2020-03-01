<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img v-bind:src="locationIcon" class="search-img" />
        </van-col>
        <van-col span="15" class="search-line">
          <input type="text" class="search-input" placeholder="请输入商品名称" />
        </van-col>
        <van-col span="5" class="search-line">
          <van-button size="mini" class="search-btn">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- 轮播图 -->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner, index) in bannerPicArry" :key="index">
          <img v-lazy="banner.image" class="img-size" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 分类栏 -->
    <div class="type-bar">
      <div v-for="(cate,index) in categery" :key="index">
        <img v-lazy="cate.image" width="80%" class="img_category" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!-- 广告栏 -->
    <div>
      <img v-lazy="adBanner.PICTURE_ADDRES" width="100%" />
    </div>
    <!-- 推荐 -->
    <div class="recommand-area">
      <div class="recommand-title">商品推荐</div>
      <div class="recommand-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommandGoods" :key="index">
            <div class="recommand-item">
              <img src="item.image" class="failue-img" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- //楼层 -->
    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
    <!-- 热卖商品 -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goods-info
                :goodsImage="item.image"
                :goodsName="item.name"
                :goodsPrice="item.price"
                :goodsId="item.goodsId"
              ></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axiso from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "../components/component/floorComponent";
import toMoney from "../filter/toFixed";
import goodsInfo from "../components/component/goodsInfoComponent";
import URL from "../serviceAPI/config";
var height = 0;
export default {
  name: "App",
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
        // direction:'vertical',
      },
      locationIcon: require("../assets/images/location.png"),
      categery: [],
      adBanner: "",
      bannerPicArry: [],
      recommandGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [],
    };
  },
  created() {
    this.initData();
  },
  beforeRouteEnter(to, from, next) {
    console.log(from.name);
    console.log("++++enter");

    if (from.name === "GoodDetail") {
      console.log("height:", to.meta.position);
      height = to.meta.position;
    }
    next();
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "GoodDetail") {
      console.log("DetailPostion");
      let position = document.documentElement.scrollTop;
      from.meta.position = position;
    } else {
      from.meta.position = 0;
    }
    next();
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    btnGoodsItem(item) {
      console.log(item);
    },
    initData() {
      axiso({
        url: URL.getShoppingMallInfo,
        method: "get"
      })
        .then(response => {
          if (response.status == "200") {
            console.log(response.data.data);
            
            this.categery = response.data.data.category;
            this.adBanner = response.data.data.advertesPicture[0];
            this.bannerPicArry = response.data.data.slides;
            this.recommandGoods = response.data.data.recommend;
            this.floor1 = response.data.data.floor1;
            this.floor2 = response.data.data.floor2;
            this.floor3 = response.data.data.floor3;
            this.floorName = response.data.data.floorName;
            this.hotGoods = response.data.data.hotgoods;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mouted() {
    if (height) {
      console.log("height:",height);
      window.scroll(0, height);
    }
  },
  activated() {
    console.log("actived");
  },
  deactivated() {
    // 不显示
    console.log(2);
  }
};
</script>

<style scoped>
.search-bar {
  height: 2.5rem;
  background-color: #e5017d;
  line-height: 1.2rem;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border: 1px solid white;
  border-radius: 5px;
  background-color: #e5017d;
  color: #ffffff;
  font-size: 0.7rem;
  margin-top: -2px;
}
.search-btn {
  margin-left: 0.6rem;
  height: 1.34rem;
}
.search-img {
  width: 2.2rem;
}
.swiper-area {
  width: 20rem;
  clear: both;
}
.search-line {
  padding-top: 10px;
}
.img-size {
  width: 100%;
  height: 10rem;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 0.75rem;
  text-align: center;
}
.img_category {
  width: 3.1rem;
  height: 3.1rem;
}
.recommand-area {
  background-color: #ffffff;
  margin-top: 0.3rem;
}
.recommand-title {
  border-bottom: 1px solid #eeeeee;
  font-size: 14px;
  padding: 2rem;
  color: #e5017d;
  text-align: center;
}
.recommand-body {
  border-bottom: 1px solid #eee;
}
.recommand-item {
  width: 99%;
  /* border-right: 1px solid #eeeeee; */
  font-size: 12px;
  text-align: center;
}
.failue-img {
  width: 6.9rem;
  height: 5rem;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  line-height: 1.8rem;
  margin-bottom: 50px;
}
.hot-goods {
  overflow: hidden;
}
</style>

