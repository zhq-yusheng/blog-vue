<template>
  <div>
    <div>
      <banner>
        <p>—宁愿做过了后悔，也不要错过了后悔。</p>
      </banner>
    </div>
    <div class="message">
      <div class="liuyan">
        <ul>
          <li
            v-for="leavingMessing in leavingMessings"
            :key="leavingMessing.leid"
          >
            <div class="messageItem">
              <div class="title">
                用户:{{ leavingMessing.username }}
                <span class="el-icon-chat-dot-square"></span>
              </div>
              <div class="count">
                <div class="msgCount">
                  <p>{{ leavingMessing.message }}</p>
                </div>
                <div class="msgDate">
                  <p>{{ leavingMessing.createDatetime }}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
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
            <el-button size="small" @click="releaseHandle">发布留言</el-button>
          </div>
        </div>
      </div>
    </div>
    <release v-show="relIsShow" ref="rel"></release>
    <div>
      <beian beianClass="beian1"></beian>
    </div>
  </div>
</template>

<script>
import banner from "../home/banner";
import beian from "../home/beian";
import release from "./release";
import setDataFromAxios from "../../../api/api";
export default {
  data() {
    return {
      pagesize: 5,
      currPage: 1,
      total: 5,
      relIsShow: false,
      leavingMessings: null,
    };
  },
  components: {
    banner,
    beian,
    release,
  },
  mounted() {
    this.getMessage(this.pagesize, 1);
  },
  beforeRouteEnter(to, from, next) {
    // ...
    document.title = "留言";
    next();
  },
  methods: {
    currPageChange(value) { 
      this.getMessage(this.pagesize, value);
    }, //通过路由规则进入组件时调用该方法
    releaseHandle() {
      var user = JSON.parse(sessionStorage.getItem("user"));
      if (user == null) {
        this.$message({
          message: "请先登录在发表留言",
          type: "warning",
        });
        return;
      }
      this.relIsShow = true;
      this.$refs.rel.init();
      this.$refs.rel.$on("freshMessage", () => {
        //console.log("更新页面，获取最新的留言");
        this.relIsShow = false;
        this.getMessage(this.pagesize, 1);
      });
    },
    getMessage(pageSize, currPage) {
      setDataFromAxios(
        `/api/index/getlevingMessage/${pageSize}/${currPage}`,
        "get"
      ).then((res) => {
        if (res.code == 200) {
          //this.leavingMessings = res.data;
          this.leavingMessings = this.dateFormart(res.data);
          //console.log(list)
          this.total = res.total;
        }
      });
    },
    dateFormart(list) {
      var dataLs = list;
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
      }
      return list;
    },
  },
};
</script>

<style scoped>
.message {
  width: 100%;
  height: 800px;
  background-image: url("../../../assets/bg.jpg");
  background-size: 100% 100%;
  overflow: hidden;
}
.liuyan {
  width: 70%;
  height: 700px;
  margin: 50px auto;
}
.messageItem {
  width: 70%;
  height: 110px;
  margin: 0 auto;
}
.liuyan ul li {
  list-style-type: none;
  margin-bottom: 20px;
}
.title {
  background-color: aquamarine;
  height: 30px;
  border-radius: 8px 8px 0 0;
  color: #fff;
  line-height: 30px;
  padding-left: 20px;
}
.count {
  height: 80px;
  background-color: #fff;
  color: aquamarine;
  border-radius: 0 0 8px 8px;
}
.msgCount {
  height: 50px;
  text-align: center;
  font-size: 14px;
  padding-top: 10px;
  padding-left: 2px;
  padding-right: 2px;
  text-indent: 2em;
}
.msgDate {
  font-size: 12px;
  float: right;
  margin-right: 10px;
}
.page {
  display: flex;
  justify-content: center;
}
.release {
  margin-left: 20px;
}
</style>