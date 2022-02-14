<template>
  <div>
    <el-dialog
      title="上传图片"
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
          :headers="headers"
          :on-success="success"
          :data="{ uid: uid }"
          :limit="1"
          action="https://www.zhonghq.top:8080/backstage/uploadImg"
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
      type: 0,
      headers: null,
    };
  },
  mounted() {
    var user = JSON.parse(sessionStorage.getItem("user"));
    this.uid = user.uid;
  },
  methods: {
    init(type) {
      this.isShow = true;
      this.type = type;
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
        this.$notify({
          title: "成功",
          message: res.message,
          type: "success",
        });
        var blog = this.$store.state.blog;
        if (this.type == 1) {
          blog.titleImg = res.imgUrl;
          this.$store.commit("saveBlog", blog);
        } else if (this.type == 2) {
          var htmlTemplate = `
                            <div class='bodyImg'>
                              <img src="${res.imgUrl}">
                            </div>
                              `;
          if (blog.bodyHtml == null) {
            blog.bodyHtml = htmlTemplate;
          } else {
            blog.bodyHtml += htmlTemplate;
          }
          this.$store.commit("saveBlog", blog);
          this.$emit("updateImage");
        }
        this.isShow = false;
        this.$refs.uploadRef.clearFiles();
      } else {
        this.$notify.error({
          title: "错误",
          message: res.message,
        });
      }
    },
  },
};
</script>

<style>
</style>