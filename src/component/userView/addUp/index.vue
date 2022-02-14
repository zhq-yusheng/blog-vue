<template>
  <div>
    <banner>
      <p>— 真正的大师要懂得分享</p>
    </banner>
    <div class="content">
      <div v-if="!isLogin">
        <p
          style="
            font-size: 25px;
            text-align: center;
            line-height: 500px;
            color: darkgray;
          "
        >
          你没有登录,请先登录
        </p>
      </div>
      <div style="overflow: hidden" v-else-if="isUp">
        <div class="isUp">
          <h3 style="margin-top: 10px; margin-bottom: 10px">UP主站点信息</h3>
          <hr />
          <div style="margin-top: 10px">
            加入up主时间:{{ userUpData.createUpDatetime }} <br />
            发布文章数：{{ userUpData.countBlog }}<br />
            文章总点击量：{{ userUpData.popularity }}<br />
            <el-button style="margin-top: 12px" @click="goBackstage"
              >去后台</el-button
            >
          </div>
        </div>
      </div>
      <div v-else>
        <h3 style="text-align: center; margin-top: 150px">成为up主</h3>
        <br />
        <div class="from">
          <el-form ref="form" :inline="true" label-width="100px">
            <el-form-item label="邮箱验证码">
              <el-input
                placeholder="请先获取邮箱验证码"
                v-model="emailPwd"
              ></el-input>
            </el-form-item>
            <el-button :disabled="isDisabled" @click="getEmailPwd">{{
              btnValue
            }}</el-button>
          </el-form>
          <el-button @click="becomeUp" style="margin-left: 150px"
            >成为up主</el-button
          >
        </div>
      </div>
    </div>
    <beian beianClass="beian1"></beian>
  </div>
</template>

<script>
import banner from "../home/banner";
import beian from "../home/beian";
import setDataFromAxios from "../../../api/api";
export default {
  components: {
    banner,
    beian,
  },
  data() {
    return {
      isLogin: null,
      isUp: false,
      btnValue: "获取验证码",
      isDisabled: false,
      userUpData: {
        createUpDatetime: null,
        countBlog: null,
        popularity: null,
      },
      emailPwd: "",
      user: null,
    };
  },
  mounted() {
    this.getUser();
    
    this.$bus.$on("login", () => {
      this.getUser();
    });
  },
  watch: {
    isUp() {
      this.getUserUpData(this.user.uid);
    },
  }, //通过路由规则进入组件时调用该方法
  beforeRouteEnter(to, from, next) {
    // ...
    document.title = "加入我们";
    next();
  },
  methods: {
    getEmailPwd() {
      this.btnTime();
      setDataFromAxios(`api/user/sendUpEmil/${this.user.email}`, "get").then(
        (res) => {
          if (res.code == 200) {
            this.$message({
              message: res.message,
              type: "success",
            });
          } else {
            this.$message.error(res.message);
          }
        }
      );
    },
    becomeUp() {
      setDataFromAxios(`/api/user/becomeUp/${this.user.uid}`, "get").then(
        (res) => {
          if (res.code == 200) {
            this.$message({
              message: res.message,
              type: "success",
            });
            this.isUp = true;
            this.user.isup = 1;
            var jsonUser = JSON.stringify(this.user);
            console.log(jsonUser);
            sessionStorage.setItem("user", jsonUser);
          } else {
            this.$message.error(res.message);
          }
        }
      );
    },
    goBackstage() {
      window.open(`http://localhost/#/backstage?uid=${this.user.uid}`);
    },
    getUser() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      if (this.user == null) {
        this.isLogin = false;
      } else {
        this.isLogin = true;

        if (this.user.isup == 0) {
          this.isUp = false;
        } else {
          this.isUp = true;
        }
      }
    },
    getUserUpData(uid) {
      setDataFromAxios(`/api/index/getUserUpDataById/${uid}`, "get").then(
        (res) => {
          if (res.code == 200) {
            this.userUpData = this.dateFormart(res.obj);
          }
        }
      );
    },
    dateFormart(userData) {
      var date = new Date(userData.createUpDatetime);
      var year = date.getFullYear(); // 年
      var month = date.getMonth() + 1; // 月
      var day = date.getDate(); // 日

      userData.createUpDatetime = year + "年" + month + "月" + day + "日";

      return userData;
    },
    btnTime() {
      this.isDisabled = true;
      var mis = 60;
      var timeinterval = setInterval(() => {
        if (mis == 0) {
          this.btnValue = "获取验证码";
          this.isDisabled = false;
          clearInterval(timeinterval);
        } else {
          this.btnValue = `${mis--}秒后重新获取`;
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
.content {
  width: 80%;
  height: 500px;
  margin: 0 auto;
}
.isUp {
  margin: 0 auto;
  width: 400px;
  height: 200px;
  font-size: 18px;
  font-family: "微软雅黑";
  text-align: center;
  margin-top: 120px;
  background-color: azure;
  border: 1px solid pink;
  border-radius: 8px;
}
.from {
  width: 600px;
  margin: 0 auto;
  padding-left: 200px;
}
</style>