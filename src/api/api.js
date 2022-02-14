import axios from 'axios'

import router from '../router'


import store from "../store"



export  default function setDataFromAxios(url,type,data){
    url = url.replace("/api","http://localhost:8080")
   return new Promise((resolve,reject)=>{
        if(type == 'get'){
        axios.get(url).then(response=>{
            resolve( response.data)
        })
        .catch(error=>{
            reject(error)
        });}else if(type == 'post'){
            //console.log("进入post方法")
            axios.post(url,data).then(response=>{
                //console.log("post返回",response.data)
                resolve( response.data)  
            })
            .catch(error=>{
                reject(error)
            });
        }else if(type == 'put'){
            axios.put(url).then(response=>{
                resolve( response.data)
            })
            .catch(error=>{
                reject(error)
            });
        }
    })
}
// 响应拦截器
axios.interceptors.response.use((config)=>{
    
    var token = config.headers.token;
    if(token != null){
        sessionStorage.setItem("token", token)
    }
    var invalid = config.headers.invalid;
    if(invalid != null){
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        store.commit("againLogin")
    }
    
    if(config.data.code == 401){
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        router.push("/home")
        store.commit("againLogin")
    }
    
    return config
})
//请求拦截器
axios.interceptors.request.use((config)=>{
    var token = sessionStorage.getItem("token");

    if(token != null){
        var user = JSON.parse(sessionStorage.getItem("user"))
        config.headers.token = token
        config.headers.uid = user.uid
    }
    //
    return config
})