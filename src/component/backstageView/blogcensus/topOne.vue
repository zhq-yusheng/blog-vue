<template>
  <div id="echartsOne" style="width: 100%; height: 100%"></div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
export default {
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      setDataFromAxios("/api/backstage/blogTopfive", "get").then((res) => {
        if (res.code == 200) {
          this.echarts(res.data);
        }
      });
    },
    echarts(data) {
      var x = [];
      var y = [];
      data.forEach((blog) => {
        x.push(blog.blogName);
        y.push(blog.popularity);
      });
      let myChart = this.$echarts.init(document.getElementById("echartsOne"));
      var option = {
        title: {
          text: "博客用户点击量top5",
          subtext: "",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "axis",
          showDelay: 1000,
        },
        legend: {
          data: ["点击量"],
          textStyle: {
            color: "#fff",
          },
        },
        toolbox: {
          show: false,
          feature: {
            mark: {
              show: true,
            },
            dataView: {
              show: true,
              readOnly: true,
            },
            magicType: {
              show: false,
              type: ["line", "bar"],
            },
            restore: {
              show: true,
            },
            saveAsImage: {
              show: true,
            },
            dataZoom: {
              show: false,
            },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: x,
            nameTextStyle: {
              color: "rgb(255, 255, 255)",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "点击量",
            type: "bar",
            data: y,
            itemStyle: {
              normal: {
                color: "rgba(64, 97, 175, 0.7)",
              },
            },
          },
        ],
        backgroundColor: "rgba(128, 128, 128, 0)",
        grid: {
          backgroundColor: "rgba(128, 128, 128, 0)",
          borderColor: "rgba(128, 128, 128, 0)",
        },
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style>
</style>