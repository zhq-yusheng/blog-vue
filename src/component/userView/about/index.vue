<template>
  <div>
    <div>
      <banner>
        <p>—兴趣及未来</p>
      </banner>
    </div>
    <div class="about">
      <h3>人生是没有穷尽的，所以也就没有什么所谓的归宿</h3>

      <div
        style="
          width: 100%;
          height: 300px;
          line-height: 300px;
          text-align: center;
          color: #e9eef3;
        "
      >
        <p>作者很神秘,不想暴露太多</p>
      </div>
      <!-- <p>
        我叫钟洪强,是一名00年的00后，学的是大数据hadoop那一套，但是却对java后端开发有着无比热情的少年，对网站的SEO搜索引擎优化也有一定的了解。也是被迫学起了vue等前端流行框架，我当时
        以为java就够了，但是现在发现都在往全栈走，我只能拿着我java后端的基础来啃前端的框架，发现前端入门不是很难，但是想
        精通就很难，没办法我天生就可能对前端的页面不感兴趣，我对后端的这些数据感兴趣。所以现在我的情况就是前端能写，但是要写
        多漂亮就得UI这些了，我天生审美就不行，与生俱来对页面感冒，对于java后端我学习的路线是java
        web这条路线，这网站我也会分享
        我学习的笔记之类的。这也算我学vue写的第一个网站，也欢迎各位来帮完善网站，后面有我的联系方式，也欢迎大家一起分享自己的心得体会，
        没办法，国内这一点是得真比不过外国佬的就是开源精神，我这也算是为国家的进步做出贡献。到时候我会将中国博客的全部源码交由github和giee托管开源。
        一如开发深似海，希望各位江湖朋友能互帮互助。还有就是别吐槽我页面丑，没办法我不是专门写前端的，也请不起UI里帮我设计页面。所以各位被吐槽了！！！！
      </p> -->
      <p style="text-align: center">
        分享一下我的联系方式吧！QQ:2545763087&nbsp;&nbsp;&nbsp;邮箱:2545763087@qq.com
      </p>
    </div>
    <br />
    <br />
    <hr />
    <div class="money">
      <h4 style="color: burlywood; padding-bottom: 10px">打赏</h4>
      <p style="padding-bottom: 10px">有钱的捧个钱场，没钱的捧个人场</p>
      <div>
        <el-popover placement="top-start" width="200" trigger="hover">
          <img
            src="../../../assets/wx.jpg"
            width="200px"
            height="200px"
            alt=""
          />
          <el-button slot="reference">微信打赏</el-button>
        </el-popover>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-popover placement="top-start" width="200" trigger="hover">
          <img
            src="../../../assets/zfb.jpg"
            width="200px"
            height="200px"
            alt=""
          />
          <el-button slot="reference">支付宝打赏</el-button>
        </el-popover>
      </div>
    </div>
    <div>
      <beian beianClass="beian"></beian>
    </div>
  </div>
</template>

<script>
import banner from "../home/banner";
import beian from "../home/beian";
export default {
  components: {
    banner,
    beian,
  },
  //通过路由规则进入组件时调用该方法
  beforeRouteEnter(to, from, next) {
    // ...
    document.title = "关于我";
    next();
  }
};
</script>

<style>
.about {
  width: 80%;
  margin: 0 auto;
  margin-top: 40px;
  background-color: #fff;
  padding: 10px;
}
.about h3 {
  padding-bottom: 30px;
  text-align: center;
}
.about p {
  text-indent: 2em;
  font-size: 20px;
  padding: 10px 0;
}
.money {
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
}
</style>