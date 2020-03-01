<template>
     <div>
         <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goback" /> 
                
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
              
               <van-field v-model="confiurePassword" 
              type="password"
              label="确认密码"
              placeholder="请输入确认密码" 
              required
              />

              <div class="register-button">
                 <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">立马注册</van-button>
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
                 confiurePassword:'',
                 openLoading:false,
                 usernameErrorMsg:'',
                 passwordErrorMsg:'',
                 configurePasswordErrorMsg:'',
             }
         },
         methods:{
             goback(){
                 this.$router.go(-1)
             },
             registerAction(){
                  if (this.checkForm()){
                    this.axiosRegisterUser()
                  }else{
                      if(this.usernameErrorMsg.length>0){
                          Toast(this.usernameErrorMsg)
                      }
                      else if(this.passwordErrorMsg.length>0){
                          Toast(this.passwordErrorMsg)
                      }
                      else if (this.configurePasswordErrorMsg.length>0){
                          Toast(this.configurePasswordErrorMsg)
                      }
                  }
                
             },
             axiosRegisterUser(){
                  this.openLoading = true
                   axios({
                       url: URL.registerUser,
                       method:'POST',
                       data:{
                           username:this.username,
                           password:this.password,
                       }
                   }).then(response=>{
                        this.openLoading=false
                       if (response.data.code === '200'){
                           Toast.success({
                               message:response.data.message,
                               onClose:()=>{
                                   this.$router.push('/')
                               }
                           })
                          
                       }else{
                           Toast.fail("注册失败")
                           console.log(response.data.message);
                       }
                       
                   }).catch(error=>{
                      this.openLoading=false
                      Toast.fail("注册失败")
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
                 }else {
                     this.passwordErrorMsg = ''
                 }
                 if (this.confiurePassword !== this.password){
                     this.configurePasswordErrorMsg = "两次密码输入不一致"
                     isok = false;
                 }
                 else{
                     this.configurePasswordErrorMsg = ''
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
