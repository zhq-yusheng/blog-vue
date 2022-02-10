<template>
  <div>
    <el-dialog
      title="登陆"
      :visible.sync="$store.state.login.isLoginShow"
      width="35%"
      :before-close="handleClose"
    >
      <div>
        <el-form
          :model="user"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="email">
            <el-input
              placeholder="请输入注册时的邮箱号"
              v-model="user.email"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input
              type="password"
              v-model="user.pwd"
              autocomplete="off"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登陆</el-button>
            <el-button @click="resetForm">重置</el-button>
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
    var validataUserName = (rule, value, callback) => {
      let re = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
      if (value == "") {
        return callback(new Error("账号不能为空"));
      } else if (!re.test(value)) {
        callback(new Error("账号格式错误"));
      } else {
        this.userName = true;
        callback();
      }
    };
    var validataPwd = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("密码不能为空"));
      } else {
        this.pwd = true;
        callback();
      }
    };
    return {
      islogin: false,
      userName: false,
      pwd: false,
      user: {
        email: "",
        pwd: "",
      },
      rules: {
        email: [{ validator: validataUserName, trigger: "blur" }],
        pwd: [{ validator: validataPwd, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    login() {
      if (!this.userName || !this.pwd) {
        this.$message({
          message: "请先填写登陆信息在登陆",
          type: "warning",
        });
        return;
      }
      setDataFromAxios("/api/login", "post", this.user).then((res) => {
        if (res.code == 200) {
            this.userName = false
            this.pwd = false
            this.$message("登陆成功");
            this.$refs.ruleForm.resetFields();
            var userJson = JSON.stringify(res.obj)
            sessionStorage.setItem("user",userJson);
            this.$emit("loginData",res.obj);
            sessionStorage.setItem("token",res.token)
            this.$bus.$emit("login");
            this.islogin = false;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style>
</style>