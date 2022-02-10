<template>
  <div>
    <banner> — 好好学习天天向上 </banner>
    <div style="width: 80%; margin: 0 auto">
      <template v-if="blog != null">
        <div v-html="blog.titleHtml"></div>
        <div v-html="blog.bodyHtml"></div>
      </template>
      <template v-if="isdeleted">
        <div style="height:500px;width:100;line-height: 500px;text-align: center;">
            该文章已被删除，请去首页查看其它文章吧
        </div>
      </template>
    </div>
    <br />
    <a @click="openHome" title="返回首页" class="icon-top cd-is-visible"></a>
    <beian beianClass="beian1"></beian>
  </div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
import banner from "../home/banner";
import beian from "../home/beian";
export default {
  components: {
    banner,
    beian,
  },
  data() {
    return {
        isdeleted:null,
      blog: null,
    };
  },
  mounted() {
    var url = document.location.href;
    var bid = url.split("?")[1].split("=")[1];
    this.getBlog(bid);
  },
  methods: {
    getBlog(bid) {
      setDataFromAxios(`/api/index/getBlogById/${bid}`, "get").then((res) => {
        if (res.code == 200) {
          this.blog = res.obj;
          if(res.obj == null){
              this.isdeleted = true;
          }
          document.title = res.obj.title;
        }
      });
    },
    openHome() {
      window.open("http://www.zhonghq.top/#/home");
    }
  },
};
</script>

<style>
* {
  background-color: #e9eef3;
}
.title {
  text-align: center;
  margin-top: 10px;
}
.author {
  text-align: right;
  padding-right: 50px;
  padding-bottom: 25px;
}
.reight {
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.bodyImg {
  width: 80%;
  margin: 0 auto;
  margin-top: 10px;
}
.bodyImg img {
  width: 100%;
  height: 400px;
}
.section {
  text-indent: 2em;
  margin-top: 10px;
}
.icon-top {
  background: url("../../../assets/home.png") no-repeat center #333;
  background-size: 24px;
  width: 48px;
  height: 48px;
  position: fixed;
  right: 40px;
  bottom: 10%;
  transition: all 0.3s;
  z-index: 9999999;
  border-radius: 100%;
  opacity: 0;
  cursor: pointer;
}

.cd-is-visible {
  opacity: 1;
}
</style>