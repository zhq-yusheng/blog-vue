<template>
  <div class="addBlog">
    <div class="left" style="width:48%;background-color: #dad4d4;">
        <blogtitle></blogtitle>
        <blgSection ref="blgSection"></blgSection>
    </div>
    <div class="reight" style="width:48%;background-color: #e9eeff;">
        预览:
        <hr>
        <div v-if="blog.titleHtml != null" v-html="blog.titleHtml"></div>
        <div v-if="blog.bodyHtml != null" v-html="blog.bodyHtml"></div>
    </div>
        
  </div>
</template>

<script>
import blogtitle from './title'
import blgSection from './section'
export default {
 components:{
      blogtitle,blgSection
  },
  data() {
    return {
      blog:{
        titleHtml:null,
        bodyHtml:null
      }
    }

  },
  mounted(){
    this.getVuexData()
    this.$refs.blgSection.$on("updateBody", ()=>{
      console.log("回调更新数据")
        this.getVuexData()
    }) 
    },
    methods: {
      getVuexData(){
        this.$store.state.blog = this.blog;
      }
    },
   //离开组件时调用该方法
  beforeRouteLeave (to, from, next) {
    this.$store.commit("clearBlog") // 清空blog的数据 
    next();
  },
   beforeRouteEnter (to, from, next) {
    // ...
    document.title = "添加博客"
    next();
  }
}
</script>

<style>
.addBlog{
  display: flex;
  justify-content: space-around;
  padding: 10px;
}
.title{
  text-align: center;
  margin-top: 10px;
}
.author{
  text-align: right;
  padding-right: 50px;
  padding-bottom: 25px;
}
.reight{
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.bodyImg{
  width: 90%;
  margin: 0 auto;
  margin-top: 10px;
}
.bodyImg img{
  width: 100%;
  height: 300px;
}
.section{
  text-indent: 2em;
  margin-top: 10px;
}
.left{
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
</style>