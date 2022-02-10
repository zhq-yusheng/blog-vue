<template>
  <div>
    <el-row class="tac">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#b3c0d1"
          text-color="#fff"
          width="100px"
          router
          active-text-color="#ffd04b"
        >
          <el-submenu
            v-for="list in menus"
            :key="list.entity.id"
            :index="`${list.entity.id}`"
          >
            <template slot="title">
              <i :class="list.entity.icon"></i>
              <span>{{ list.entity.alias }}</span>
            </template>
            <template v-if="list.childs != null">
              <MyMen :childs="list.childs"></MyMen>
            </template>
          </el-submenu>
        </el-menu>
    </el-row>
  </div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
import MyMen from './MyMen'
export default {
        components:{
        MyMen
    },
  data() {
    return {
      menus: [],
    };
  },
  mounted() {
    setDataFromAxios("/menu", "post").then((res) => {
      this.menus = res.menuData;
    });
   /*  axios.post("/menu").then(res =>{
        console.log(res.data.menuData)
    }) */
  },
};
</script>

<style>
</style>