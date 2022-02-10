<template>
  <div class="bigStyle">
    <div class="box">
      <p class="Datatitle">大数据博客统计</p>
    </div>
    <div class="date">
     当前时间：{{ date }}
    </div>

    <div class="top">
      <div class="echartsStyle">
        <topOne></topOne>
      </div>
      <div class="echartsStyle">
        <topTwo></topTwo>
      </div>
    </div>
    <div class="bottom">
      <div class="echartsStyle">
       <!--  <rollBlogData></rollBlogData> -->
      </div>
      <div class="echartsStyle"></div>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import topOne from "./topOne";
import topTwo from "./topTwo";
import rollBlogData from './rollBlogData'

export default {
  components: { topOne, topTwo,rollBlogData },
  data() {
    return {
      date: null,
    };
  },
  mounted() {
    //console.log(this.$echarts);
    this.getDateTime();
  },
  beforeRouteEnter(to, from, next) {
    // ...
    document.title = "博客统计";
    next();
  },
  methods: {
    getDateTime() {
      setInterval(() => {
        this.dateFormart(new Date(Date.now()));
      }, 1000);
    },
    dateFormart(date) {
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
      var mis =
        date.getSeconds() > 9
          ? date.getSeconds()
          : "0" + date.getSeconds().toString(); // 分
      this.date = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + mis;
    },
  },
};
</script>

<style>
.top {
  display: flex;
  justify-content: space-around;
}
.bottom {
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
}
.box {
  border-top: 50px solid rgba(18, 56, 128, 0.7);
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  height: 10px;
  width: 300px;
  margin: 0 auto;
}
.Datatitle {
  margin-top: -38px;
  text-align: center;
  font-size: 20px;
  color: aliceblue;
}
.el-main {
  padding: 0;
}
.echartsStyle {
  width: 40%;
  height: 300px;
  background-color: rgba(18, 56, 128, 0.5);
  border: 3px solid #194aac;
  border-radius: 8px;
}
.bigStyle {
  background-image: url("../../../assets/bigBg.png");
  background-size: 100% 100%;
}
.date {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: #fff;
  width: 350px;
  background-color: rgba(18, 56, 128, 0.5);
  float: right;
  margin-top: -50px;
  margin-right: 70px;
  border-radius: 20px;
}
</style>