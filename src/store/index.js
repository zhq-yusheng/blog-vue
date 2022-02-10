//引入vuex
import vuex from 'vuex'
//引入vue
import Vue from 'vue'

import setDataFromAxios from '../api/api'


// 使用vuex
Vue.use(vuex)
// 需要有业务操作写的地方 比如需要发送ajax的地方
const actions = {
    getUser(context,data){
        console.log(data)
        setDataFromAxios(`/api/getStudentsByPage/${data.currPage}/${data.pageSize}`,'get').
        then(res=>{
            context.commit('SaveStudentList',res.data);
            context.commit("saveDataTotal",res.total);
        })
    }
}
//操作数据的地方
const mutations = {
    saveImg(state, value){
        state.img = value
    },
    clearImg(state){
        state.img = null;
    },
    saveBlog(state, value){
        console.log("保存数据")
        state.blog = value
    },
    clearBlog(state){
        state.blog.uid = null
        state.blog.title = null
        state.blog.titleHtml = null
        state.blog.btid = null
        state.blog.titleImg = null
        state.blog.body = null
        state.blog.bodyHtml = null
    },
    againLogin(state){
        state.login.isLogin = false;
        state.login.isLoginShow = true;

    },
    updateLogin(state,login){
        state.login = login;
    }
       
}

//数据存入的地方 类似vm上的data 但是全局共享
const state = {
    img:null,
    login:{
        isLogin:false,
        isLoginShow:false
    },
    blog:{
        uid:null,
        btid:null,
        title:null,
        titleHtml:null,
        titleImg:null,
        body:null
    }
}
// 数据加工的地方 多组件复用这个加工的数据且一样就可以用这个 类型计算属性 但是这个全局共享
const getters = {
   
}
//创建暴露Store对象
export default new vuex.Store({ 
    actions,
    mutations,
    state,
    getters
})

