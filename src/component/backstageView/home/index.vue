<template>
  <div>
    <el-container>
      <el-header>
          欢迎来到博客后台
      </el-header>
      <el-container>
        <el-aside width="200px"> 
            <left></left>
            </el-aside>
        <el-main>
          <div style="height:660px">
          <router-view>
          </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import left from './left'
import setDataFromAxios from "../../../api/api";

export default {
    components:{
        left
    },
    mounted(){
      var url = document.location.href;
      var uid = url.split("?")[1].split("=")[1]
      this.getUser(uid)
    },
    beforeRouteEnter(to, from, next) {
      // ...
      //console.log("进入")
       document.title = "博客后台";
      next();
    },
    methods:{
      getUser(uid){
        if(uid == null){
          return;
        }
        setDataFromAxios(`/api/user/getUserById/${uid}`,'get')
        .then(res =>{
          if(res.code == 200){
            sessionStorage.setItem("user",JSON.stringify(res.obj))
          }
        })
      }
    }
};
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 660px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
</style>