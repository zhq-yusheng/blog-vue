<template>
  <div>
    请添加一段的内容：
    <el-input type="textarea" autosize placeholder="请输入内容" v-model="body">
    </el-input>
    <div class="btn">
      <el-button type="primary" plain @click="addBody">添加段落</el-button>
      <el-button type="primary" plain @click="addBodyImg"
        >添加段落图片</el-button
      >
      <el-button type="primary" plain @click="queryCode">查看代码</el-button>
      <el-button type="primary" plain @click="addBlog">发布博客</el-button>
    </div>

    <uplpadImg v-show="uploadImgIsShow" ref="uplpadImg"></uplpadImg>
    <queryCode v-show="queryCodeIsShow" ref="queryCode"></queryCode>
  </div>
</template>

<script>
import uplpadImg from "./uploadImg";
import queryCode from "./queryCode";
import setDataFromAxios from "../../../api/api";
export default {
  components: {
    uplpadImg,
    queryCode,
  },
  data() {
    return {
      body: "",
      uploadImgIsShow: false,
      queryCodeIsShow: false,
    };
  },
  methods: {
    addBody() {
      if (this.body == "") {
        this.$message.error("请先输入在添加");
        return;
      }
      var blog = this.$store.state.blog;
      var htmlTemplate = `
                          <p class='section'>${this.body}</p>
                          `;
      if (blog.body == null) {
        if (this.body.length <= 30) {
          blog.body = this.body;
        } else {
           blog.body = this.body.substring(0,60)
        }
        blog.bodyHtml = htmlTemplate;
       
        this.$store.commit("saveBlog",  JSON.parse(JSON.stringify(blog)));
      } else {
        blog.bodyHtml += htmlTemplate;
        this.$store.commit("saveBlog",  JSON.parse(JSON.stringify(blog)));
      }
      this.$emit("updateBody")
      this.body = "";
    },
    addBodyImg() {
      this.$refs.uplpadImg.init(2);
      this.uploadImgIsShow = true;
    },
    queryCode() {
      this.$refs.queryCode.init();
      this.queryCodeIsShow = true;
    },
    addBlog() {
      var blog = this.$store.state.blog;

      if (blog.title == null || blog.title == "") {
        this.$message.error("标题不能为空,请先填写标题在发布");
        return;
      }
      if (blog.titleImg == null || blog.titleImg == "") {
        this.$message.error("标题图片不能为空,请先上传标题图片在发布");
        return;
      }
      if (blog.btid == null) {
        this.$message.error("博客类型不能为空,请先选择博客类型在发布");
        return;
      }
      if (blog.body == null || blog.body == "") {
        this.$message.error("文章不能为空,请先填写标文章在发布");
        return;
      }

      setDataFromAxios("/api/backstage/addBlog", "post", blog).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
          });

          this.$store.commit("clearBlog"); // 清空blog的数据
          this.$bus.$emit("clearTileData"); // 全局事件中心清除兄弟组件的数据
        } else {
          this.$message.error("博客发布失败！请联系管理员");
        }
      });
    },
  },
  mounted() {
    this.$refs.uplpadImg.$on("updateImage",()=>{
            console.log("图片上传回调")
            this.$emit("updateBody")
      })
  },
};
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
</style>