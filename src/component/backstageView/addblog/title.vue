<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input
          v-model="title"
          @blur="onblur"
          placeholder="请输入标题"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="upLoadImg">上传标题图片</el-button>
      </el-form-item>
     <el-form-item label="选择博客类型">
        <el-select v-model="blogType" 
        placeholder="请选择博客类型" 
        >
          <el-option v-for="item in blogTypeData" 
          :label="item.blogType" 
          :value="item.btid" 
          :key="item.btid">
          </el-option> 
        </el-select>
      </el-form-item>
    </el-form>
     <uplpadImg ref="uplpadImg" v-show="uploadImgIsShow"></uplpadImg>
  </div>
</template>

<script>
import uplpadImg from "./uploadImg";
import setDataFromAxios from "../../../api/api";
export default {
  components: {
    uplpadImg,
  },
  data() {
    return {
      title: "",
      uploadImgIsShow: false,
      blogType:"",
      blogTypeData:null
    };
  },
  mounted(){
      this.getAllBlogType();
      this.$bus.$on("clearTileData",this.clearData)
  },
  watch:{
    blogType(newValue){
      var blog = this.$store.state.blog;
      blog.btid = newValue;
      this.$store.commit("saveBlog", blog)
    }
  },
  methods: {
    upLoadImg() {
      this.$refs.uplpadImg.init(1);
      this.uploadImgIsShow = true;
    },
    onblur() {
      if (this.title == "") {
        return;
      }
      var blog = this.$store.state.blog;
      var user = JSON.parse(sessionStorage.getItem("user"))
      var htmlTemplate = `
                          <h2 class='title'>${this.title}</h2>
                          <p class='author'>-作者：${user.username}</p>
                          `
      blog.title = this.title;
      blog.titleHtml = htmlTemplate;
      blog.uid = user.uid;
      this.$store.commit("saveBlog", blog)
    },
    getAllBlogType(){
      setDataFromAxios("/api/index/getAllBlogType",'get')
      .then(res =>{
        if(res.code == 200){
          //console.log("获取到全部未逻辑删除的博客类型:" + res.data);
          this.blogTypeData = res.data;
        }
      })
    },

    clearData(){
      this.title = '',
      this.blogType = "";
    }
  },
};
</script>

<style>

</style>