<template>
  <div :class="beianClass">
      © 2021 钟洪强. 版权所有 | 备案号：&nbsp;&nbsp;<a href = "https://beian.miit.gov.cn/">蜀ICP备2021015388号-1</a>
  </div>
</template>

<script>
export default {
  props:['beianClass']
}
</script>

<style scoped>
.beian{
    margin-top:20px ;
    width: 100%;
    height: 70px;
    text-align: center;
    line-height: 70px;
    background-color: dimgray;
}
.beian1{
    width: 100%;
    height: 70px;
    text-align: center;
    line-height: 70px;
    color: #fff;
    background-color: #131a2a;
}
</style>