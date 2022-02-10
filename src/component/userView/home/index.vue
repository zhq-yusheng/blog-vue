<template>
  <div>
    <el-container>
      <el-header style="height: 60px">
        <div style="width: 15%">
          <img
            src="../../../assets/log.png"
            alt="钟洪强个人博客"
            style="margin-top: 18px; float: left"
          />
        </div>
        <div style="width: 50%">
          <el-menu
            default-active="1"
            class="el-menu-demo"
            router
            mode="horizontal"
          >
            <el-menu-item index="1" route="/home">首页</el-menu-item>
            <el-menu-item index="2" route="/about">关于我</el-menu-item>
            <el-menu-item index="3" route="/messageBoard">留言板</el-menu-item>
            <el-menu-item index="4" route="/addUp">加入博客网</el-menu-item>
          </el-menu>
        </div>
        <div style="width: 15%; margin-top: -20px" class="login">
          <el-button
            type="primary"
            plain
            v-if="!$store.state.login.isLogin"
            @click="loginShow"
            >登陆</el-button
          >
          <el-button
            type="primary"
            plain
            v-if="!$store.state.login.isLogin"
            @click="registerShow"
            >注册</el-button
          >
          <div
            v-if="$store.state.login.isLogin"
            style="display: flex; justify-content: center"
          >
            <el-dropdown>
              <span class="el-dropdown-link">
                <div
                  ref="tx"
                  class="touxiang"
                  :style="{ backgroundImage: imgUrl }"
                ></div>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout"
                  >退出登陆</el-dropdown-item
                >
                <el-dropdown-item @click.native="upload"
                  >上传头像</el-dropdown-item
                >
                <el-dropdown-item @click.native="userData"
                  >个人资料修改</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <span style="margin-top: 40px; margin-left: 15px"
              >用户：{{ user.username }}</span
            >
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
        <register v-show="isRegisterShow" ref="register"></register>
        <login v-show="$store.state.login.isLoginShow" ref="login"></login>
        <uploadTx v-show="uploadisShow" ref="upload"></uploadTx>
        <userData v-show="userDataIsShow" ref="userData"></userData>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import register from "../user/register";
import login from "../user/login";
import uploadTx from "../user/uploadTx";
import userData from "../user/userData";
export default {
  components: {
    register,
    login,
    uploadTx,
    userData,
  },
  data() {
    return {
      uploadisShow: false,
      userDataIsShow: false,
      isRegisterShow: false,
      imgUrl: null,
      user: null,
    };
  },
  mounted() {
    this.$router.push("/home");

    this.$refs.upload.$on("txImg", (imgUrl) => {
      this.user.imgurl = imgUrl;
      var jsonUser = JSON.stringify(this.user);
      sessionStorage.setItem("user", jsonUser);
      //location.reload()
      this.txApdate();
    });
    this.$refs.login.$on("loginData", (user) => {
      this.updateLogin(true, false);
      this.user = user;
      if (this.user.imgurl == null) {
        this.imgUrl =
          "url(" + "http://localhost/img/1001562.ce88d2ad.jpg" + ")";
      } else {
        this.imgUrl = "url(" + this.user.imgurl + ")";
      }
    });
    this.txApdate();
    this.$refs.userData.$on("updateUser", (user) => {
      this.user = user;
      //console.log("回调：" + user)
      this.userDataIsShow = false;
    });
  },
  methods: {
    txApdate() {
      var userJson = sessionStorage.getItem("user");
      if (userJson != null) {
        this.updateLogin(true, false);
        this.user = JSON.parse(userJson);
        if (this.user.imgurl == null) {
          this.imgUrl =
            "url(" + "http://localhost/img/1001562.ce88d2ad.jpg" + ")";
        } else {
          this.imgUrl = "url(" + this.user.imgurl + ")";
        }
      }
    },
    registerShow() {
      this.isRegisterShow = true;
      this.$refs.register.init();
    },
    loginShow() {
      this.updateLogin(false, true);
    },
    logout() {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      this.updateLogin(false, false);
      (this.user = null), (this.imgUrl = null);
    },
    upload() {
      this.$refs.upload.init(this.user.uid);
      this.uploadisShow = true;
    },
    userData() {
      //this.$refs.userData.init(this.user);
      this.userDataIsShow = true;
      this.$refs.userData.showView();
    },
    updateLogin(islogin, isLoginShow){
     var login = this.$store.state.login;
     login.isLogin = islogin;
     login.isLoginShow = isLoginShow;
     this.$store.commit("updateLogin", login);
    }
  },
};
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  padding: 0;
}
.el-header {
  padding: 0;
  display: flex;
  justify-content: space-around;
}
.el-menu-demo {
  display: flex;
  justify-content: space-around;
}
.login {
  text-align: center;
}
.login button {
  margin-top: 30px;
}
.el-avatar {
  margin-top: 18px;
}
.touxiang {
  width: 40px;
  height: 40px;
  margin-top: 30px;
  border-radius: 50px;
  /* background-image: url('../../assets/1001562.jpg'); */
  background-size: 100% 100%;
}
</style>