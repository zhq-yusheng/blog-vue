<template>
  <div>
    <banner>
      <p>— 记录学习生活的草根个人博客网站</p>
    </banner>
    <div class="count">
        <div style="width:50%">
         <left></left>   
        </div>
        <div style="width:25%">
            <right/>
        </div>
    </div>
    <beian beianClass='beian'></beian>
  </div>
</template>

<script>
import banner from "./banner";
import left from "./left";
import right from "./right";
import beian from "./beian";
export default {
  components: {
    banner,
    left,
    right,
    beian,
  },
   //通过路由规则进入组件时调用该方法
  beforeRouteEnter (to, from, next) {
    // ...
    document.title = "首页";
    next();
  },
  mounted(){
    var user = sessionStorage.getItem("user");
    if(user == null){
      this.$bus.$emit("invalid")
    }
  }
};
</script>

<style scoped>
.count{
    display: flex;
    justify-content: center;
}
</style>