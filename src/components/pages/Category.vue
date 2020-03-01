<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>
    <div>
      <van-row style="background-color: #fff;">
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                v-for="(item,index) in category"
                :key="index"
                @click="clickCategory(index,item)"
                :class="{categoryActive:categoryIndex===index}"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub" >
              <van-tab v-for="(item,index) in categorySub" :key="index">
                <div ellipsis slot="title">{{item.MALL_SUB_NAME}}</div>
              </van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <van-pull-refresh v-model="isRefrsh" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <div
                class="list-item"
                @click="goGoodsInfo(item.GOOD_ID)"
                v-for="(item,index) in goodList"
                :key="index"
              >
                <div class="list-item-img">
                  <img :src="item.IMAGE1" width="100%" :onerror="errorImg" />
                </div>
                <div class="list-item-text">
                  <div>{{item.NAME}}</div>
                  <div>
                    <span style="color:red">￥{{item.ORI_PRICE | moneyFilter}}</span>
                  </div>
                </div>
              </div>
            </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import URL from "../../serviceAPI/config";
import { Toast } from "vant";
import toMoney from "../../filter/toFixed";
export default {
  data() {
    return {
      category: [],
      categorySub: [],
      categoryIndex: 0,
      goodList: [],
      active: 0,
      loading: false,
      finished: false,
      isRefrsh: false,
      page: 1,
      categorySubId: "", //商品子类ID
      errorImg: 'this.src="' + require("@/assets/images/errorimg.png") + '"'
    };
  },
  created() {
    this.initData();
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    initData() {
      axios({
        url: URL.getCategoryList,
        method: "GET"
      })
        .then(response => {
          if (response.data.code === "200") {
            this.category = response.data.data;
            this.getCategorySub(this.category[0].id);
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    clickCategory(index, item) {
      this.categoryIndex = index;
      this.page = 1;
      this.finished = false;
      this.goodList = [];
      this.getCategorySub(item.id);
    },
    getCategorySub(categoryId) {
      var url = URL.getCategorySubList + String(categoryId);
      axios({
        url: url,
        method: "GET"
      })
        .then(response => {
          if (response.data.code === "200") {
            this.categorySub = response.data.data;
            this.active = 0;
            this.categorySubId = this.categorySub[0].Category_ID;
            this.onLoad();
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onLoad() {
      if (this.categorySub.length>0){
        this.categorySubId = this.categorySubId
        ? this.categorySubId
        : this.categorySub[0].Category_ID;
        this.getGoodList();
      }
     

    },
    onRefresh() {
     
      setTimeout(() => {
        if(this.isRefrsh){
          this.isRefrsh = false;
        }
        this.finished = false;
        this.loading = true;
        this.page = 1;
        this.goodList = [];
        this.onLoad();
      }, 500);
    },
    getGoodList() {
      axios({
        url: URL.getGoodsListByCategorySubID,
        method: "POST",
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(response => {
          if (response.data.code === "200") {
             console.log('page:',this.page);
            this.page++;
            response.data.data.forEach(element => {
              this.goodList.push(element);
            });
            this.loading = false;
            if (response.data.data.length<10){
              this.finished = true
            }
            
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    goGoodsInfo(goodsId) {
     this.$router.push({
       path:'/goodDetail',
       query:{
            goodsId:goodsId
        }
     })
    },
    onClickCategorySub(index, title) {
      this.categorySubId = this.categorySub[index].Category_ID;
      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    }
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46 + "px";
    document.getElementById("list-div").style.height =
      winHeight - 90 - 50 + "px";
  }
};
</script>

<style scoped>
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.span-color {
  background-color: #ffffff;
}
.categoryActive {
  background-color: magenta;
}
.list-item {
  text-align: center;
  line-height: 26px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>