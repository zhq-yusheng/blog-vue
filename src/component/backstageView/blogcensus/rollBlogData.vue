<template>
  <div class="box-wrapper">
    <div id="box1" class="box1" style="transform: translateY(-300px)">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      date: new Date(),
    };
  },
  mounted() {
    this.createNode()
  },
  methods: {
    createNode() {
      const box1 = document.querySelector(".box1");
      const boxes2 = Array.from(document.querySelectorAll(".box2"));
      const rep = /-*\d+/;
      //初始化滚动对象数据
      const initBoxes2 = () =>
        boxes2.reverse().map((item, index) => ({
          element: item,
          exceedHeight: item.scrollHeight * index,
        }));
      const boxes2Obj = initBoxes2();
      let stop = null;
      var box = document.getElementById("box1")
      var int = 0;
      setInterval(() => {
        // var li = document.createElement("li");
        // console.log(11)
        box.innerHTML += `<div class='box2'>${int++}</div>`;
        div = document.createElement("div")
        div.setAttribute("class", "box2")
        // box.appendChild(li);
      }, 1000);
      
      const move = () => {
        const y = +rep.exec(box1.style.transform)[0];
        box1.style.transform = `translateY(${y + 1}px)`;
        boxes2Obj.forEach((item, index) => {
          const { exceedHeight } = item;
          //判断是否删除数据
          if (exceedHeight <= y + 3 * 32) {
            box1.removeChild(item.element);
            boxes2Obj.splice(index, 1);
          }
        });
        console.log(32 * 6, y);
        //需要重新请求数据
        //32为你一个元素高度,6为页面展示条数
        if (32 * 6 === y) {
          console.log("需要重新请求");
        }
        //关闭动画
        if (boxes2Obj.length === 0) {
          console.log("数据为空");
          cancelAnimationFrame(stop);
        }
        stop = requestAnimationFrame(move);
      };
      move()
    },
  },
};
</script>

<style scoped>
.box-wrapper {
  width: 400px;
  height: 300px;
  background-color: #939023;
  text-align: center;
  overflow: hidden;
}

.box1 {
  position: relative;
  height: 300px;
}

.box2 {
  line-height: 2;
}
</style>