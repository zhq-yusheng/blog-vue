<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="isShow"
      width="30%"
      :before-close="handleClose"
    >
      <span>是否删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deletedBlog"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
export default {
  data() {
    return {
      isShow: false,
      bid: null,
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    deletedBlog() {
      setDataFromAxios(`/api/backstage/deletedBlog/${this.bid}`, "get").then(
        (res) => {
          if (res.code == 200) {
            this.$emit("deletedBlog");
            this.isShow = false;
            this.$message({
              message: res.message,
              type: "success",
            });
          }
        }
      );
    },
    init(bid) {
      this.bid = bid;
      this.isShow = true;
    },
  },
};
</script>

<style>
</style>