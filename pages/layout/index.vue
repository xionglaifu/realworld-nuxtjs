<!--
 * @Description: 导航组件
 * @Author: xionglaifu
 * @Date: 2021-09-24 10:16:42
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-25 22:07:02
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
              <nuxt-link class="nav-link" to="/editor">
                <i class="ion-compose"></i>&nbsp;发布文章
              </nuxt-link>
            </li>
            <li class="nav-item">
              <!-- 跳转到设置 -->
              <nuxt-link class="nav-link" to="/settings">
                <i class="ion-gear-a"></i>&nbsp;设置
              </nuxt-link>
            </li>
            <li class="nav-item">
              <!-- 个人中心 -->
              <nuxt-link class="nav-link" to="/profile/123">
                <img class="user-pic" :src="user.image" />
                {{ user.username }}
              </nuxt-link>
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
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
    <!-- /底部 -->
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "LayoutIndex",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {}
};
</script>
<style scoped></style>
