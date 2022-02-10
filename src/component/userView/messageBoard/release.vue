<template>
  <div>
    <el-dialog
      title="发布留言"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      留言内容:
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="msgValue"
        maxlength="150"
        show-word-limit
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sbmMsg">发布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
export default {
  data() {
    return {
      dialogVisible: false,
      msgValue: "",
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
    sbmMsg() {
      if (this.msgValue == "") {
        this.$message({
          message: "不能发布一条空的留言",
          type: "warning",
        });
        return;
      }
      var user = JSON.parse(sessionStorage.getItem("user"))
     var message = {
        uid : user.uid,
        username : user.username,
        message : this.msgValue
      }
      
      setDataFromAxios("/api/user/addMessage","post",message)
      .then(res => {
        if(res.code == 200){
          this.$message({
          message: res.message,
          type: "success",
        });
        this.msgValue = "";
        this.$emit("freshMessage")// 通知页面刷新最新留言
        this.dialogVisible = false;
        }else{
          this.$message.error(res.message)
        }
      })
    },
    init() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style>
</style>