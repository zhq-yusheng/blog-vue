<template>
  <div>
    <el-dialog
      title="登陆"
      :visible.sync="isShow"
      width="35%"
      :before-close="handleClose"
      @open="open"
    >
      <div style="margin-left: 50px">
        <el-upload
          class="upload-demo"
          :drag="true"
          ref="uploadRef"
          :on-success="success"
          :data="{ uid: uid }"
          :limit="1"
          :headers="headers"
          action="/api/user/uploadTx"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uid: null,
      isShow: false,
      headers: null,
    };
  },
  methods: {
    init(uid) {
      this.uid = uid;
      this.isShow = true;
    },
    open() {
      var headers = {};
      headers.token = sessionStorage.getItem("token");
      headers.uid = this.uid;
      this.headers = headers;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    success(res) {
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: res.message,
        });
        this.isShow = false;
        this.$emit("txImg", res.imgUrl);
        this.$refs.uploadRef.clearFiles();
      } else {
        this.$message.error(res.message);
      }
    },
  },
};
</script>

<style>
</style>