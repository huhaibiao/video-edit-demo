/*
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-04-21 22:25:35
 */
import * as VueRouter from 'vue-router'

//路由
// 1. 定义路由组件.
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. 定义一些路由
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

// 3. 创建路由实例并传递 `routes` 配置
export const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes // `routes: routes` 的缩写
})
