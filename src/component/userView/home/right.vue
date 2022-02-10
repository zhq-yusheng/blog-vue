<template>
  <div>
    <div class="classifyOne">
      <h3>文章分类</h3>
      <hr />
      <ul>
        <!-- 到时候替换成循环 后台设置添加的 -->
        <li v-for="item in blogTypeData" :key="item.btid">
          <el-button type="info" @click="getBlog(item.btid)" round>{{item.blogType}}文章数({{ item.blogCount }})</el-button>
        </li>
       <!--  <li>
          <el-button type="info" round
            >JavaScript文章数({{ number.JavaScript }})</el-button
          >
        </li>
        <li>
          <el-button type="info" round>java文章数({{ number.java }})</el-button>
        </li>
        <li>
          <el-button type="info" round
            >spring文章数({{ number.spring }})</el-button
          >
        </li>
        <li>
          <el-button type="info" round
            >mybatis文章数({{ number.mybatis }})</el-button
          >
        </li>
        <li>
          <el-button type="info" round
            >mybatisPlus文章数({{ number.mybatisPlus }})</el-button
          >
        </li>
        <li>
          <el-button type="info" round
            >spring Mvc文章数({{ number.springMvc }})</el-button
          >
        </li>
        <li>
          <el-button type="info" round
            >spring boot文章数({{ number.springBoot }})</el-button
          >
        </li>
        <li>
          <el-button type="info" round
            >mysql文章数({{ number.mysql }})</el-button
          >
        </li>
        <li>
          <el-button type="info" round
            >oracle文章数({{ number.oracle }})</el-button
          >
        </li>
        <li>
          <el-button type="info" round
            >redis文章数({{ number.redis }})</el-button
          >
        </li>
        <li>
          <el-button type="info" round
            >websocket文章数({{ number.websocket }})</el-button
          >
        </li> -->
      </ul>
    </div>
    <!-- 站点信息 -->
    <div class="siteInfo">
      <h3>站点信息</h3>
      <hr />
      <div style="display: flex; justify-content: space-around">
        <ul>
          <li>文章总数:{{ SiteInformation.blogCount }}</li>
          <li>分类总数:{{ SiteInformation.blogTypeCount }}</li>
          <li>留言总数:{{ SiteInformation.leavingCount }}</li>
          <li>页面技术:vue2.6</li>
        </ul>

        <ul>
          <li>页面总数:1</li>
          <li>用户总数:{{ SiteInformation.upCount }}</li>
          <li>浏览总数:{{ SiteInformation.popCount }}</li>
          <li>后端语言:java</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
export default {
  data() {
    return {
      blogTypeData: null,
      SiteInformation: {
        blogCount:0,
        blogTypeCount:0,
        leavingCount:0,
        upCount:0,
        popCount:0,
      },
    };  
  },
  mounted(){
    this.getBlogType();
    this.getSiteInformation();
  },
  methods: {
    getBlogType(){
      setDataFromAxios("/api/index/getAllBlogType",'get')
      .then(res =>{
        if(res.code == 200){
          this.blogTypeData = res.data;
        }
      })
    },
    getBlog(btid){
      this.$bus.$emit("blogTypeGetBlog",btid);
    },
    getSiteInformation(){
      setDataFromAxios('/api/index/getSiteInformation','get')
      .then(res =>{
          if(res.code == 200){
            this.SiteInformation = res.obj;
          }
      })
    }
  },
  
};
</script>

<style scoped>
.classifyOne {
  margin-top: 40px;
  text-align: center;
  border: 1px pink solid;
  border-radius: 8px;
  background-color:#FFF;
  box-shadow:2px 2px 5px #000;
}
.classifyOne ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.classifyOne ul li {
  list-style-type: none;
  padding: 10px 0 5px 0;
}

.siteInfo {
  margin-top: 20px;
  background-color:#FFF;
  text-align: center;
  border: 1px pink solid;
  border-radius: 8px;
  box-shadow:2px 2px 5px #000;
}
.siteInfo div ul li {
      padding: 8px 0 5px 0;
}
</style>