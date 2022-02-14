<template>
  <div class="myblogStyle">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="博客编号">
              <span>{{ props.row.bid }}</span>
            </el-form-item>
            <el-form-item label="博客名称">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="博客分类">
              <span>{{ props.row.blogType }}</span>
            </el-form-item>
            <el-form-item label="博客描述">
              <span>{{ props.row.body }}...</span>
            </el-form-item>
            <el-form-item label="博客创建时间">
              <span>{{ props.row.createDatetime }}</span>
            </el-form-item>
            <el-form-item label="博客浏览量">
              <span>{{ props.row.popularity }}</span>
            </el-form-item>
            <el-form-item label="博客地址">
              <span>http://localhost/#/blog?id={{ props.row.bid }}</span>
            </el-form-item>
            <el-form-item label="操作">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="deletedBlog(props.row.bid)"
                circle
              ></el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="博客名称" prop="title"> </el-table-column>
      <el-table-column label="博客类型" prop="blogType"> </el-table-column>
      <el-table-column label="博客创建时间" prop="createDatetime">
      </el-table-column>
      <el-table-column label="是否置顶" prop="createDatetime">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.istoping"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="toping(scope)"
          >
          </el-switch>
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
    </div>
    <deletedMyBlog v-show="deletedBlogIsShow" ref="deletedBlog"></deletedMyBlog>
  </div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
import deletedMyBlog from "./deletedMyBlog";
export default {
  components: { deletedMyBlog },
  data() {
    return {
      pagesize: 8,
      currPage: 1,
      deletedBlogIsShow: false,
      total: 50,
      user: null,
      tableData: [],
      istoping: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    // ...
    document.title = "我的博客";
    next();
  },
  mounted() {
    this.getUser();
    this.getMyBlogData(this.user.uid, 1, this.pagesize);
    this.$refs.deletedBlog.$on("deletedBlog", () => {
      this.getMyBlogData(this.user.uid, 1, this.pagesize);
      this.deletedBlogIsShow = false;
    });
  },
  methods: {
    currPageChange(currPage) {
      this.currPage = currPage;
      this.getMyBlogData(this.user.uid, currPage, this.pagesize);
    },
    getUser() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
    },
    getMyBlogData(uid, currPage, pageSize) {
      setDataFromAxios(
        `/api/backstage/getMyBlogbyPage/${uid}/${currPage}/${pageSize}`,
        "get"
      ).then((res) => {
        if (res.code == 200) {
          this.tableData = this.dateFormart(res.data);
          this.total = res.total;
        }
      });
    },
    dateFormart(list) {
      for (let i = 0; i < list.length; i++) {
        var date = new Date(list[i].createDatetime);
        var year = date.getFullYear(); // 年
        var month =
          date.getMonth() + 1 > 9
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1).toString(); // 月
        var day =
          date.getDate() > 9 ? date.getDate() : "0" + date.getDate().toString(); // 日
        var hours =
          date.getHours() > 9
            ? date.getHours()
            : "0" + date.getHours().toString(); // 时
        var minutes =
          date.getMinutes() > 9
            ? date.getMinutes()
            : "0" + date.getMinutes().toString(); // 分
        list[i].createDatetime =
          year + "-" + month + "-" + day + " " + hours + ":" + minutes;
        if (list[i].body.length > 30) {
          list[i].body = list[i].body.substring(0, 30);
        }

        if (list[i].istoping == 0) {
          list[i].istoping = false;
        } else {
          list[i].istoping = true;
        }
      }
      return list;
    },
    deletedBlog(bid) {
      console.log(bid);
      this.$refs.deletedBlog.init(bid);
      this.deletedBlogIsShow = true;
    },
    toping(value) {
      console.log(value)
      var flag = value.row.istoping ? 1 : 0;
      setDataFromAxios(`/api/backstage/toping/${value.row.bid}/${flag}`, 'get')
      .then(res =>{
        if(res.code == 200){
          this.$message({
            message: "修改成功",
              type: "success",
          })
        }
      })
    },
  },
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
  padding-left: 30px;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.myblogStyle {
  padding: 10px;
}
.page {
  margin-top: 10px;
  text-align: center;
}
</style>