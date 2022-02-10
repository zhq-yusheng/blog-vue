<template>
  <div style="padding:10px">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="btid" label="博客类型编号" width="150">
      </el-table-column>
      <el-table-column prop="blogType" label="博客类型" width="200">
      </el-table-column>
      <el-table-column prop="createDatetime" label="创建时间" width="300">
      </el-table-column>
      <el-table-column prop="blogCount" label="类型博客文章数" width="200">
      </el-table-column>
      <el-table-column prop="del" label="是否删除" width="200">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template  slot-scope="scope">
          <el-button  
          v-if="scope.row.del == '否'" 
          type="text" 
          @click="updateBlogType(scope.row.btid, 1)" 
          size="small">
          删除
          </el-button>
          <el-button 
          v-else
          @click="updateBlogType(scope.row.btid, 2)"  
          type="text" 
          size="small">
          恢复
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页条 -->
    <div class="page">
      <el-pagination
        :page-size="pagesize"
        :current-page="currPage"
        @current-change="currPageChange"
        background
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
      <div class="release">
        <el-button size="small" @click="addBlogType">添加博客类型</el-button>
      </div>
    </div>
    <addBlogType ref="addBlogType" v-show="addTypeIsShow"></addBlogType>
  </div>
</template>
<script>
import setDataFromAxios from "../../../api/api";
import addBlogType from "./addBlogType";
export default {
  data() {
    return {
      tableData: [],
      pagesize: 8,
      currPage: 1,
      total: 20,
      addTypeIsShow: false,
    };
  },
  components: {
    addBlogType
  },
  mounted() {
    this.getBlogTypeData(1, this.pagesize);
  },
  methods: {
    currPageChange(value) {
      this.currPage = value;
     this.getBlogTypeData(value, this.pagesize)
    },

    getBlogTypeData(currPage, pageSize) {
      setDataFromAxios(
        `/api/backstage/getBlogType/${pageSize}/${currPage}`,
        "get"
      ).then((res) => {
        if (res.code == 200) {
          this.tableData = this.dateFormart(res.data);
          this.total = res.total;
        } else {
          this.$message.error("出现错误，请先联系管理员")
        }
      });
    },

    addBlogType(){
      this.$refs.addBlogType.init();
      this.$refs.addBlogType.$on("freshBlogType",()=>{
        console.log("收到回调更新最新博客类型数据")
        this.getBlogTypeData(1, this.pagesize);
    })
      this.addTypeIsShow = true;
    },

    dateFormart(list){
      for(let i = 0; i < list.length; i++) {
        var date = new Date(list[i].createDatetime)
        var year = date.getFullYear() // 年
        var month = date.getMonth() + 1 > 9 ? date.getMonth()+1 :"0" + (date.getMonth()+1).toString(); // 月
        var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate().toString(); // 日
        var hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours().toString(); // 时
        var minutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes().toString();// 分
        list[i].createDatetime = year + "-" + month + "-" + day + " " + hours + ":" + minutes;
        if(list[i].del == 0){
          list[i].del = "否"
        }else{
          list[i].del = "是"
        }
      }
      return list;
    },

     updateBlogType(btid, type) {
       console.log(btid, type)
       setDataFromAxios(`/api/backstage/updateBlogType/${btid}/${type}`,'put')
       .then(res=>{
         if(res.code == 200){
           this.$message({
                    message: res.message,
                    type: 'success'
                });
           this.getBlogTypeData(this.currPage, this.pagesize)
         }
       })
      }
  },
   beforeRouteEnter (to, from, next) {
    // ...
    document.title = "博客类型管理"
    next();
  }
};
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.release {
  margin-left: 20px;
}
</style>