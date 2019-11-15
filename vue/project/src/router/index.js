import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 自动加载 global 目录下的 .js 结尾的文件
const componentsContext = require.context('./', true, /index\.js$/)

let routes = []

componentsContext.keys().forEach(component => {

  if (component.startsWith("./index"))
    return;

  const componentConfig = componentsContext(component)
  /**
  * 兼容 import export 和 require module.export 两种规范
  */
  const ctrl = componentConfig.default || componentConfig

  routes = routes.concat(ctrl)

})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
