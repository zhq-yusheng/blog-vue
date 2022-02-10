<template>
  <div>
    <el-menu-item-group v-for="child in childs" :key="child.entity.id">
      <el-menu-item :index="child.entity.value.path">
        {{child.entity.alias }}
      </el-menu-item>
    </el-menu-item-group>
  </div>
</template>

<script>
export default {
  props: ["childs"],
};
</script>

<style>
</style>