import Vue from "vue"
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
            name:"index",
            path:"/",
            component:resolve =>require(["../component/userView/home"],resolve),
            redirect:"/home",
            children:[
                {
                    path:'home',
                    component:resolve =>require(["../component/userView/home/home"],resolve)
                },
                {
                    path:'about',
                    component:resolve =>require(["../component/userView/about"],resolve)
                },
                {
                    path:'messageBoard',
                    component:resolve =>require(["../component/userView/messageBoard"],resolve)
                },
                {
                    path:'addUp',
                    component:resolve =>require(["../component/userView/addUp"],resolve)
                },
            
            ]       
        },
        {
            path:"/backstage",
            component:resolve =>require(["../component/backstageView/home"],resolve),
            children:[
                {
                    path:'/backstage/addBlog',
                    component:resolve =>require(["../component/backstageView/addblog/index.vue"],resolve)
                },
                {
                    path:'/backstage/blogType',
                    component:resolve =>require(["../component/backstageView/blogType"],resolve)
                },
                {
                    path:'/backstage/blogcensus',
                    component:resolve =>require(["../component/backstageView/blogcensus"],resolve)
                },
                {
                    path:'/backstage/myBlog',
                    component:resolve =>require(["../component/backstageView/myblog"],resolve)
                },
            ]
        },
        {
            path:"/blog",
            component:resolve =>require(["../component/userView/blog"],resolve)
        }
    ]
})