<!--
 * @Description: 登录注册页面
 * @Author: xionglaifu
 * @Date: 2021-09-24 10:53:22
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-25 22:03:20
 * @company: formssi
-->
<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
          </p>
          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>
          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                required
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                required
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                required
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login, register } from "@/api/user";
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: ["notAuthenticated"],
  name: "LoginIndex",
  computed: {
    isLogin() {
      return this.$route.name === "login";
    }
  },
  components: {},
  data() {
    return {
      user: {
        email: "",
        password: "",
        username: ""
      },
      errors: {}
    };
  },
  methods: {
    //提交表单
    async onSubmit() {
      try {
        const { data } = this.isLogin
          ? await login({ user: this.user })
          : await register({ user: this.user });
        console.log(data);

        // TODO: 保存用户的登录状态,方便共享
        this.$store.commit("setUser", data.user);

        // 把登录状态存到cookie中
        Cookie.set("user", data.user);

        //跳转到首页
        this.$router.push("/");
      } catch (err) {
        console.dir(err);
        //捕获错误信息
        this.errors = err.response.data.errors;
      }
    }
  }
};
</script>
<style scoped></style>
