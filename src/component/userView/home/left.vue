<template>
  <div class="left">
    <div class="search">
      <form class="parent">
        <input type="text" v-model="searchValue" />
        <input type="button" style="cursor: pointer" @click="search" value="搜索" />
      </form>
    </div>
    <div class="blogCount">

      <ul v-if="blogList != false">
        <li v-for="blog in blogList" :key="blog.bid" class="box">
          <div class="blogItem" @click="toBlog(blog.bid)">
            <div style="width: 20%">
              <img
                :src="blog.titleimg"
                width="140px"
                height="105px"
                style="margin-top: 5px"
              />
            </div>
            <div style="width: 75%; margin-left: 10px">
              <i style="font-size:19px">{{blog.title}}</i>
              <i style="float: right;">分类:{{blog.blogType}}</i>
              <hr />
              <div style="height: 43px">
                <p style="text-indent: 2em;">{{blog.body}}......</p>
              </div>
              <div style="padding-top:15px">
               <span style="margin-top: 10px">作者:{{blog.username}}</span>
                &nbsp;&nbsp;&nbsp;&nbsp; 发布时间:{{blog.createDatetime}}
                <span style="float: right">
                  <span class="el-icon-view"></span>
                  点击量:{{blog.popularity}}次
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="noBlog">
          <p>暂无博客文章</p>
      </div>
    </div>
    <!-- 分页条 -->
    <div v-if="blogList != false">
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
  </div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
export default {
  data() {
    return {
      total: 100,
      pagesize: 8,
      currPage: 1,
      code:0, // 0为默认就是开始的排序翻页 1为搜索翻页 2为点击旁边分类栏翻页
      codeValue:"", // 每个code 对应的value和请求的接口不一样这个来存值
      blogList:[],
      searchValue:""
    };
  },
  mounted(){
    this.getBlogByPage(1, this.pagesize),
    this.$bus.$on("blogTypeGetBlog",(btid)=>{
      this.getBlogByblogTypeByPage(1,this.pagesize,btid);
      this.code = 2;
      this.currPage = 1;
      this.codeValue = btid;
    })
  },
  methods: {
    currPageChange(currPage) {
      if(this.code == 0){
        this.getBlogByPage(currPage, this.pagesize);
      }else if(this.code == 1){
        this.searchBlogByPage(this.codeValue, currPage, this.pagesize);
      }else{
        this.getBlogByblogTypeByPage(currPage, this.pagesize, this.codeValue);
      }
      this.currPage = currPage;
    },
    toBlog(bid) {
      window.open(`http://localhost/#/blog?id=${bid}`)
    },
    search(){
      if(this.searchValue == ""){
        this.$notify({
          title: '警告',
          message: '请先输入想搜索的内容在点击搜索',
          type: 'warning'
        });
        return;
      }
        setDataFromAxios(`/api/index/search/${this.searchValue}`,'get')
        .then(res=>{
          if(res.code == 200){
            this.blogList = this.dateFormart(res.data);
            this.total = res.total;
            this.code = 1;
            this.currPage = 1;
            this.codeValue = this.searchValue;
            console.log(this.blogList)

          }
        })
    },
    searchBlogByPage( title, currPage, pageSize){
      setDataFromAxios(`/api/index/searchBlogByPage/${title}/${pageSize}/${currPage}`,'get')
      .then(res =>{
        if(res.code == 200){
            this.blogList = this.dateFormart(res.data);
            this.total = res.total;
          }
      })

    },
    getBlogByblogTypeByPage(currPage, pageSize, btid){
      setDataFromAxios(`/api/index/getBlogByblogTypeByPage/${pageSize}/${currPage}/${btid}`,'get')
      .then(res =>{
        if(res.code == 200){
            this.blogList = this.dateFormart(res.data);
            this.total = res.total
            console.log(this.blogList)
          }
      })
    },
    getBlogByPage(currPage, pageSize){
      setDataFromAxios(`/api/index/getBlogByPage/${pageSize}/${currPage}`,'get')
      .then(res =>{
        if(res.code == 200){
            this.blogList = this.dateFormart(res.data);
            this.total = res.total
          }
      })
    },
    dateFormart(list){
      for(let i = 0; i < list.length; i++) {
        var date = new Date(list[i].createDatetime)
        var year = date.getFullYear() // 年
        var month = date.getMonth() + 1 > 9 ? date.getMonth()+1 :"0" + (date.getMonth()+1).toString(); // 月
        var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate().toString(); // 日

        list[i].createDatetime = year + "-" + month + "-" + day;
      }
      return list;
    },
  },
};
</script>

<style scoped>
.left {
  padding-top: 40px;
  padding-right: 60px;
}

.blogItem {
  padding: 10px;
  width: 100%;
  display: flex;
  border: 1px rgb(116, 98, 98) solid;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
}
.blogItem:hover {
  border: 2px rgb(116, 98, 98) solid;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgb(68, 66, 66);
  background-color: #e9eef3;
}
.box {
  list-style-type: none;
  padding-bottom: 20px;
}
.search {
  width: 500px;
  height: 50px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.parent {
  width: 100%;
  height: 42px;
  top: 4px;
  position: relative;
}

.parent > input:first-of-type {
  /*输入框高度设置为40px, border占据2px，总高度为42px*/
  width: 380px;
  height: 40px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
}

.parent > input:first-of-type:focus {
  border: 1px solid #317ef3;
  padding-left: 10px;
}

.parent > input:last-of-type {
  /*button按钮border并不占据外围大小，设置高度42px*/
  width: 100px;
  height: 44px;
  position: absolute;
  background: #317ef3;
  border: 1px solid #317ef3;
  color: #fff;
  font-size: 16px;
  outline: none;
}
.noBlog{
  width: 100%;
  height: 300px;
  line-height: 300px;
  font-size: 20px;
  padding-left:250px;
}
</style>