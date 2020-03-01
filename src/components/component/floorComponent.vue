<template>
     <div>
         <div class="floor">
            <div class="floor-title"> {{floorTitle}} </div>
            <div class="floor-anomaly">
                <div class="floor-one"><img :src="floorData0.image" class="img-size" /></div>
                <div>
                    <div class="floor-two"><img :src="floorData1.image" class="img-size" /></div>
                    <div><img :src="floorData2.image"  class="img-size" /></div>
                </div>
            </div>

            <div class="floor-rule">
                <div v-for="(item ,index) in floorData.slice(3)" :key="index" class="floor-rule-width">
                    <img :src="item.image" class="img-size"/>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

export default {
       props:['floorData','floorTitle'],
       data(){
           return {
               floorData0:{},
               floorData1:{},
               floorData2:{}
           }
       },
       created(){

       },
       watch:{
           floorData:function(val){
                this.floorData0=this.floorData[0]
                this.floorData1=this.floorData[1]
                this.floorData2=this.floorData[2]
               
         }
       }
}
</script>

<style scoped>

.floor-anomaly{
     display: flex;
     flex-direction: row;
     background-color: #fff;
     border-bottom: 1px solid #dddddd;
   }
   .floor-anomaly div{
     width: 20rem;
     box-sizing: border-box;
     -webkit-box-sizing: border-box;
   }
   .floor-one{
     border-right: 1px solid #dddddd;

   }
   .floor-two{
     border-bottom: 1px solid #dddddd;
   }
   .floor-rule{
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     /* background-color:red; */
   }
   .floor-rule div{
     -webkit-box-sizing: border-box;
     box-sizing: border-box;
     border-bottom: 1px solid #dddddd;
   }
   .floor-rule div:nth-child(odd){
     border-right: 1px solid #dddddd;
   }
   .floor-rule-width{
     width: 10rem;
   }
   .img-size{
   width: 100%;
   height:10rem;
   }
   .floor-rule-width{
     width: 10rem;
   }
   .floor-title{
      text-align:center;
      font-size:0.875rem;
      height: 1.8rem;
      line-height: 1.8rem;
  }

</style>