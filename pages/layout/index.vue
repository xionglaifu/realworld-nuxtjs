<!--
 * @Description: 导航组件
 * @Author: xionglaifu
 * @Date: 2021-09-24 10:16:42
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-26 16:35:19
 * @company: formssi
-->
<template>
  <div>
    <!-- 顶部导航栏 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <!-- <a class="navbar-brand" href="index.html">conduit</a> -->
        <!-- 跳转home -->
        <nuxt-link class="navbar-brand" to="/">首页</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <!-- <a class="nav-link active" href="">Home</a> -->
            <!-- 跳转home -->
            <nuxt-link class="nav-link" to="/" exact>首页</nuxt-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <!-- 创建文章 -->
              <nuxt-link class="nav-link" to="/editor"> <i class="ion-compose"></i>&nbsp;发布文章 </nuxt-link>
            </li>
            <li class="nav-item">
              <!-- 跳转到设置 -->
              <nuxt-link class="nav-link" to="/setting"> <i class="ion-gear-a"></i>&nbsp;设置 </nuxt-link>
            </li>
            <li class="nav-item">
              <!-- 个人中心 -->
              <div class="nav-link" @click="toProfile(user.username)">
                <img class="user-pic" :src="user.image" />
                {{ user.username }}
              </div>
            </li>
          </template>

          <template v-else>
            <li class="nav-item">
              <!-- 登录 -->
              <nuxt-link class="nav-link" to="/login">
                登录
              </nuxt-link>
            </li>
            <li class="nav-item">
              <!-- 注册 -->
              <nuxt-link class="nav-link" to="/register">
                注册
              </nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>

    <!-- 子路由 -->
    <nuxt-child />
    <!-- /子路由 -->

    <!-- 底部 -->
    <footer>
      <div class="container">
        <a href="/" class="logo-font">拉钩教育</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://kaiwu.lagou.com/">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
    <!-- /底部 -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'LayoutIndex',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    //跳转到个人信息页面
    toProfile(username) {
      this.$router.push({
        name: 'profile',
        params: {
          username
        }
      })
    }
  }
}
</script>
<style scoped></style>
