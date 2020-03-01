<template>
    <div>
         <div class="main-div">
             <keep-alive>
             <router-view v-if="$route.meta.keepAlive"></router-view>
             </keep-alive>
              <router-view v-if="!$route.meta.keepAlive"></router-view>
            
         </div>
         <van-tabbar fixed v-model="active" @change="changeTabbar(active)"> 
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="records">列表页</van-tabbar-item>
            <van-tabbar-item icon="cart">购物车页</van-tabbar-item>
            <van-tabbar-item icon="contact" info="20">会员中心</van-tabbar-item>
         </van-tabbar>
    </div>
</template>

<script>
export default {
   data(){
      return {
          active:0,
          curPath:'',
      }
   },
   created(){
     console.log('created--------')
     this.changeTabBarActive()
   },
   updated(){
     this.changeTabBarActive()
   },
   methods:{
       changeTabBarActive(){
               this.curPath = this.$route.path
               if(this.curPath=='/card'){
                   this.active=2
               }
        },
       changeTabbar(active){
           switch (active) {
               case 0:
                   console.log('+++++++pushIndex++');
                   
                    this.$router.push({
                        name:'Index'
                    })
                   break;
               case 1:
                    this.$router.push({
                        name:'CategoryList'
                    })
                   break;
                case 2:
                    this.$router.push({
                        name:'Card'
                    }) 
                    break;  
           
               default:
                   break;
           }
       }
   }
}
</script>

<style scoped>

</style>