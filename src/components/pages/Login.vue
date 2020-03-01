<template>
     <div>
         <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goback" /> 
                
        <div class="register-panel">
              <van-field v-model="username" 
              label="用户名" 
              right-icon="clear" 
              placeholder="请输入用户名" 
              required
              @click-icon="username=''"
              />
              
              <van-field v-model="password" 
              type="password"
              label="密码"
              placeholder="请输入密码" 
              required
              />
              
              <div class="register-button">
                 <van-button type="primary" size="large" @click="loginAction" :loading="openLoading">登录</van-button>
              </div>
              
        </div>
     </div>
</template>

<script>
import URL  from "../../serviceAPI/config";
//export default 对一个整体对象进行引入的
import axios from "axios";
//export 对整体对象进行解构，引入整体对象内的单个对象，如：
import {Toast} from "vant";
export default {
         data(){
             return{
                 username:"",
                 password:"",
                 openLoading:false,
                 usernameErrorMsg:'',
                 passwordErrorMsg:'',
               
             }
         },
         created(){
           
            if (localStorage.getItem('username')){
                Toast.success('你已经登录过了')
                this.$router.push('/')
            }
         },
         methods:{
             goback(){
                 this.$router.go(-1)
             },
             loginAction(){
                  if (this.checkForm()){
                    this.axiosLoginUser()
                  }else{
                      if(this.usernameErrorMsg.length>0){
                          Toast(this.usernameErrorMsg)
                      }
                      else if(this.passwordErrorMsg.length>0){
                          Toast(this.passwordErrorMsg)
                      }
                      
                  }
             },
             axiosLoginUser(){
                  this.openLoading = true
                   axios({
                       url: URL.logingUser,
                       method:'POST',
                       data:{
                           username:this.username,
                           password:this.password,
                       }
                   }).then(response=>{
                        this.openLoading = false
                       if (response.data.code === '200'){
                           new Promise((resolve,reject)=>{
                              localStorage.setItem('username',this.username)
                               setTimeout(()=>{
                                   resolve()
                               },500)
                           }).then(()=>{
                               Toast.success({
                                   message:response.data.message,
                                   onClose:()=>{
                                   console.log(localStorage.userInfo);
                                   
                                    this.$router.push('/')
                                   }
                               })
                           }).catch(error=>{
                               Toast.fail('登录状态保存失败')
                               console.log(error);
                           })
                          
                       }else{
                           Toast.fail("登录失败")
                           console.log(response.data.message);
                       }
                       
                   }).catch(error=>{
                     console.log('+++++++error');
                      this.openLoading = false
                      Toast.fail("登录失败")
                       console.log(error);
                   })
             },
             checkForm(){
                 var isok = true;
                 if (this.username.length<5){
                     this.usernameErrorMsg = "用户名不能少于5位"
                     isok  = false;
                 } else{
                     this.usernameErrorMsg = ''
                 }
                 if (this.password.length<6){
                     this.passwordErrorMsg = '密码不能少于6位'
                     isok = false;
                 }else  {
                     this.passwordErrorMsg = ''
                 }
            
                 return isok;
             }

         }  
}
</script>

<style  scoped>
  .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
        background-color: white;
    }
    .register-button{
        padding-top:10px;
    }
</style>
