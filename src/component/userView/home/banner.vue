<template>
  <div class="banner">
      <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.banner{
    background-image: url("../../../assets/banner.jpg");
    background-size:100% 100%;
    font-size: 26px;
    text-align: center;
    height: 208px;
    width: 100%;
    line-height: 208px;
    margin-top:5px;
    color: aliceblue;
    
}
</style>