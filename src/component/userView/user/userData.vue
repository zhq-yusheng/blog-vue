<template>
  <div>
    <el-dialog
      title="个人信息修改"
      :visible.sync="isshow"
      width="40%"
      :before-close="handleClose"
      @open='open'
    >
      <div>
        <div style="margin-left: 50px; margin-bottom: 10px">
          <span style="float: left; margin-top: 15px; font-size: 16px"
            >头像</span
          >
          <div class="tx" :style="{ backgroundImage: imgUrl }"></div>
          <div
            style="
              float: left;
              margin-top: 15px;
              font-size: 16px;
              margin-left: 10px;
              overflow: hidden;
              color: rgba(122, 117, 117, 0.849)
            "
          >
            <span>头像修改头请重新上传头像,不上传头像使用默认头像</span>
          </div>
          <div style="clear: both"></div>
        </div>
        <el-form
          :model="user"
          status-icon
          ref="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model.number="user.username"
              
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input
              placeholder="请输入邮箱号也会作为账号"
              v-model="user.email"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="margin-left: 140px"
              type="primary"
              @click="updateUser"
              >修改</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import setDataFromAxios from "../../../api/api";

export default {
  data() {
    var validataUsername = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    return {
      isshow: false,
      imgUrl:null,
      user:{
        username:null,
        email:null,
      },
      rules: {
        username: [{ validator: validataUsername, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          this.isShow = false;
          done();
        })
        .catch(() => {});
    },
    init(user){
      if(user.imgurl != null){
          this.imgUrl = "url(" + user.imgurl + ")";
      }else{
         this.imgUrl = "url(" + "http://localhost/img/1001562.ce88d2ad.jpg" + ")";
      }
      
    },
    open(){
      var user = JSON.parse(sessionStorage.getItem("user"))
      this.init(user);
      this.user = user;
    },
    showView(){
      this.isshow = true;
    },
    updateUser(){
      setDataFromAxios("/api/user/updateUser","post",this.user)
      .then(res =>{
        if(res.code == 200){
          this.$message({
               type:"success",
               message:res.message
           })
           this.$emit("updateUser", this.user)
           sessionStorage.setItem("user",JSON.stringify(this.user))
           this.isshow = false;

        }else{
          this.$message.error(res.message)
        }
      })
    }
  },
};
</script>

<style scoped>
.tx {
  background-size: 100% 100%;
  height: 60px;
  width: 60px;
  /* background-image: url("../../assets/1001562.jpg"); */
  float: left;
  margin-left: 15px;
  
}
</style>