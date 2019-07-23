# [vue-router-auto](https://github.com/MrHzq/vue-router-auto)

[GitHub 源码](https://github.com/MrHzq/vue-router-auto)

[npm 包](https://www.npmjs.com/package/vue-router-auto)

> 功能：将项目文件自动转为相应的路由配置 和`Nuxt`的路由一样，可实现的功能可以参考[这里](https://zh.nuxtjs.org/guide/routing)

## vue 路由自动生成插件

> 将传入的项目目录，自动转为 vue-router 的路由配置，component 使用异步加载

安装：`npm i vue-router-auto -s`

然后在 src/router/index.js 里面统一处理

```ruby
import Vue from 'vue'
import Router from 'vue-router'
import autoRouter from 'vue-router-auto'
Vue.use(Router)

let routes = autoRouter({
    rc: require.context('@/views', true, /\.vue$/), // 页面级的.vue存放位置，必传
    redirect: '/test',  // '/'的重定向，可选
    rootFile: 'views', // 页面级的.vue存放的文件夹，可选，默认为:views
})
export default new Router({ routes })

```

## 基础路由

### 假设 views 的目录结构如下：

```ruby
views/
--| user/
-----| edit.vue
-----| info.vue
-----| index.vue
--| login.vue
--| home.vue
```

### 那么，vue-router-auto 自动生成的路由配置如下：

```ruby
[
    {
        name:'login',
        path:'/login',
        component: () => import('@/views/login.vue')
    },
    {
        name:'home',
        path:'/home',
        component: () => import('@/views/home.vue')
    },
    {
        name:'user',
        path:'/user',
        component: () => import('@/views/user/index.vue')
    },
    {
        name:'user-info',
        path:'/user/info',
        component: () => import('@/views/user/info.vue')
    },
    {
        name:'user-edit',
        path:'/user/edit',
        component: () => import('@/views/user/edit.vue')
    }
]
```

## 嵌套路由

创建内嵌子路由，你需要添加一个 Vue 文件，同时添加一个**与该文件同名**的目录用来存放子视图组件。

### 假设 views 的目录结构如下：

```ruby
views/
--| home/
-----| index.vue
-----| about.vue
-----| product.vue
--| user/
-----| index.vue
-----| info.vue
--| login.vue
--| home.vue
```

### 那么，vue-router-auto 自动生成的路由配置如下：

```ruby
[
    {
        name:'login',
        path:'/login',
        component: () => import('@/views/login.vue')
    },
    {
        path:'/home',
        component: () => import('@/views/home.vue'),
        children:[
            {
                name:'home-index',
                path:'',
                component: () => import('@/views/home/index.vue')
            },
            {
                name:'home-about',
                path:'about',
                component: () => import('@/views/home/about.vue')
            },
            {
                name:'home-product',
                path:'product',
                component: () => import('@/views/home/product.vue')
            }
        ]
    },
    {
        name:'user',
        path:'/user',
        component: () => import('@/views/user/index.vue')
    },
    {
        name:'user-info',
        path:'/user/info',
        component: () => import('@/views/user/info.vue')
    }
]
```

## 动态嵌套路由

### 假设 views 的目录结构如下：

```ruby
views/
--| home/
-----| about.vue
-----| _id.vue
--| user/
-----| user-edit.vue
--| login.vue
--| home.vue
```

### 那么，vue-router-auto 自动生成的路由配置如下：

```ruby
[
    {
        name:'login',
        path:'/login',
        component: () => import('@/views/login.vue')
    },
    {
        name:'home',
        path:'/home',
        component: () => import('@/views/home.vue'),
        children:[
            {
                name:'home-about',
                path:'about',
                component: () => import('@/views/home/about.vue')
            },
            {
                name:'home-id',
                path:':id',
                component: () => import('@/views/home/_id.vue')
            }
        ]
    },
    {
        path:'/user-edit',
        name:'user-edit',
        component: () => import('@/views/user/user-edit.vue')
    }
]
```
