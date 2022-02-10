<template>
  <div>
    <el-dialog
      title="添加博客类型"
      :visible.sync="isShow"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        label-width="100px"
        class="demo-ruleForm"
        :model="tableData"
      >
      <el-form-item label="博客类型名称" prop="blogType">
          <el-input v-model="tableData.blogType"></el-input>
      </el-form-item>
      </el-form>
      <el-button @click="addBlogType" style="margin-left: 35%">添加类型</el-button>
    </el-dialog>
  </div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
export default {
  data() {
    return {
      isShow: false,
      tableData:{
        blogType:""
      }
     
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          this.isShow = false;
          done();
        })
        .catch(() => {});
    },
    init() {
      this.isShow = true;
    },
    addBlogType(){
        if(this.tableData.blogType == ""){
             this.$message({
                message: '请先填写数据进行添加',
                type: 'warning'
            });
            return;
        }
        this.tableData.blogType =  this.tableData.blogType.trim();
        setDataFromAxios(`/api/backstage/addBlogType`,'post',this.tableData)
        .then(res =>{
            if(res.code == 200){
                this.$emit("freshBlogType") // 通知页面刷新最新数据
                this.isShow = false;
                this.$message({
                    message: res.message,
                    type: 'success'
                });
                this.tableData.blogType = ""
            }else{
                this.$message.error(res.message)
            }
        })
    },
  },
};
</script>

<style>
</style>