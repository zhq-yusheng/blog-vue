<template>
  <div>
    <el-dialog
      title="注册"
      :visible.sync="isShow"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model.number="ruleForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input
              type="password"
              v-model="ruleForm.pwd"
              autocomplete="off"
              placeholder="请输入密码密码长度最少6位"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkpwd">
            <el-input
              type="password"
              v-model="ruleForm.checkpwd"
              autocomplete="off"
              placeholder="请确认密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input
              @blur="isEmail"
              placeholder="请输入邮箱号也会作为账号"
              v-model="ruleForm.email"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="emailPwd">
            <el-input
              placeholder="请先获取邮箱验证码"
              v-model="ruleForm.emailPwd"
            ></el-input>
          </el-form-item>
          <div style="margin-left: 320px; margin-bottom: 20px">
            <el-button :disabled="isDisabled" id="sendBtn" @click="senEmail">获取验证码</el-button>
          </div>
          <el-form-item>
            <el-button
              style="margin-left: 200px"
              type="primary"
              @click="register"
              >注册</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
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
    var validatapwd = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("密码不能为空"));
      } else if (value.length < 6) {
        callback(new Error("密码长度不够密码最少得6位"));
      } else {
        callback();
      }
    };
    var validatacheckpwd = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("密码不能为空"));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error("两次密码不同"));
      } else {
        callback();
      }
    };
    var validataemail = (rule, value, callback) => {
      let re = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
      if (value == "") {
        return callback(new Error("邮箱不能为空"));
      } else if (!re.test(value)) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    };
    var validataemailPwd = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("验证码不能为空"));
      } else {
        callback();
      }
    };
    return {
      isregister: false,
      isShow: false,
      isDisabled:false,
      ruleForm: {
        username: "",
        pwd: "",
        checkpwd: "",
        email: "",
        emailPwd: "",
      },
      rules: {
        username: [{ validator: validataUsername, trigger: "blur" }],
        pwd: [{ validator: validatapwd, trigger: "blur" }],
        checkpwd: [{ validator: validatacheckpwd, trigger: "blur" }],
        email: [{ validator: validataemail, trigger: "blur" }],
        emailPwd: [{ validator: validataemailPwd, trigger: "blur" }],
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
    senEmail() {
      if (this.ruleForm.email == "") {
        this.$message.error("邮箱不能为空");
        return;
      }
      this.btnTime();
      setDataFromAxios(`/api/sendEmail/${this.ruleForm.email}`, "get").then(
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
    register() {
      if (!this.isregister) {
        this.$message({
          message: "请正确填写注册数据",
          type: "warning",
        });
        return;
      }
      setDataFromAxios("/api/register", "post", this.ruleForm).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
          });
          this.$refs.ruleForm.resetFields();
          this.isShow = false;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    isEmail() {
      if (this.ruleForm.email == "") {
        return;
      }
      setDataFromAxios(`/api/isEmail/${this.ruleForm.email}`, "get").then(
        (res) => {
          if (res.code == 200) {
            this.isregister = true;
          } else {
            this.$message.error(res.message);
          }
        }
      );
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    init() {
      this.isShow = true;
    },
    btnTime() {
      var btn = document.getElementById("sendBtn");
      this.isDisabled = true;
      var mis = 60;
      var timeIntval = setInterval(() => {
        if (mis == 0) {
          btn.innerHTML = "获取验证码";
         this.isDisabled = false;
          clearInterval(timeIntval)
        } else {
          btn.innerHTML = `${mis--}秒后重新获取`
        }
      }, 1000);
    },
  },
};
</script>
<style>
</style>