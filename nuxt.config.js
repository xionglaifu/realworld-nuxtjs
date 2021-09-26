/*
 * @Description:
 * @Author: xionglaifu
 * @Date: 2021-09-25 22:11:52
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-26 13:39:37
 * @company: formssi
 */
/**
 * Nuxt.js 配置文件
 */

module.exports = {
  router: {
    linkActiveClass: 'active',
    // 自定义路由表规则
    extendRoutes(routes, resolve) {
      // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0)

      routes.push(
        ...[
          {
            path: '/',
            component: resolve(__dirname, 'pages/layout/'),
            children: [
              {
                path: '', // 默认子路由
                name: 'home',
                component: resolve(__dirname, 'pages/home/')
              },
              {
                path: '/login',
                name: 'login',
                component: resolve(__dirname, 'pages/login/')
              },
              {
                path: '/register',
                name: 'register',
                component: resolve(__dirname, 'pages/login/')
              },
              {
                path: '/profile/:username',
                name: 'profile',
                component: resolve(__dirname, 'pages/profile/')
              },
              {
                path: '/setting',
                name: 'setting',
                component: resolve(__dirname, 'pages/setting/')
              },
              {
                path: '/editor/:slug',
                name: 'update',
                component: resolve(__dirname, 'pages/editor/')
              },
              {
                path: '/editor',
                name: 'editor',
                component: resolve(__dirname, 'pages/editor/')
              },
              {
                path: '/article/:slug',
                name: 'article',
                component: resolve(__dirname, 'pages/article/')
              }
            ]
          }
        ]
      )
    }
  },

  server: {
    host: '0.0.0.0',
    port: 3000
  },

  // 注册插件
  plugins: ['~/plugins/request.js', '~/plugins/dayjs.js']
}
