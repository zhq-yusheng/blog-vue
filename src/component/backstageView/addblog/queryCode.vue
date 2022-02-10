<template>
  <div>
    <el-dialog
      title="查看代码"
      :visible.sync="isShow"
      width="50%"
      :before-close="handleClose"
    >
    <div v-if="this.$store.state.blog.title != null">
      {{this.$store.state.blog.titleHtml}}
      <hr>
    </div>
    <div v-if="this.$store.state.blog.body != null">
        {{this.$store.state.blog.bodyHtml}}
    </div>
    
    </el-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isShow:false
        }
    },
    methods: {
         handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
          this.isShow = false;
        })
        .catch(() => {});
    },
    init(){
      this.isShow = true;
    }
    },
};
</script>

<style>
</style>