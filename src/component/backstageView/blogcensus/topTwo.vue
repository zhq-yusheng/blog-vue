<template>
  <div id="echartsTwo" style="width: 100%; height: 100%"></div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
export default {
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      setDataFromAxios("/api/backstage/getSevenDayPopularity", "get").then((res) => {
        if (res.code == 200) {
          this.echarts(res.data);
        }
      });
    },
    echarts(data) {
      var x = [];
      var y = [];
      data.forEach((blog) => {
        x.push(blog.date);
        y.push(blog.popularity);
      });
      let myChart = this.$echarts.init(document.getElementById("echartsTwo"));
      var option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["点击量"],
           textStyle: {
            color: "#fff",
          },
        },
        toolbox: {
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
              type: ["line", "bar", "stack", "tiled"],
            },
            restore: {
              show: true,
            },
            saveAsImage: {
              show: true,
            },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: x,
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
            type: "line",
            stack: "总量",
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default"
                }
              },
            },
            data: y,
            smooth: true,
          },
        ],
        title: {
          text: "前一周博客点击量",
           textStyle: {
            color: "#fff",
          },
        },
        backgroundColor: "rgba(78, 164, 255, 0)",
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style>
</style>