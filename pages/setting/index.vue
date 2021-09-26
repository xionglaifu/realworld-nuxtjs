<!--
 * @Description:
 * @Author: xionglaifu
 * @Date: 2021-06-23 14:04:32
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-26 15:48:19
 * @company: formssi
-->
<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input v-model="profile.image" class="form-control" type="text" placeholder="URL of profile picture" />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="profile.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="profile.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="profile.email" class="form-control form-control-lg" type="text" placeholder="Email" />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="profile.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
                <button class="btn btn-lg btn-primary pull-xs-right">
                  提交
                </button>
              </fieldset>
              <hr />
              <button @click="loginOut" class="btn btn-outline-danger" style="float:left">
                退出登录
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const Cookie = process.client ? require('js-cookie') : undefined
// 仅在客户端加载 js-cookie 包
export default {
  middleware: 'authenticated',
  name: 'SettingsIndex',
  data() {
    return {
      profile: null
    }
  },
  computed: {
    //用户信息
    ...mapState(['user'])
  },

  methods: {
    //修改个人信息
    async updateUser() {
      await updateUser(this.profile)
      this.loginOut
    },
    //退出登录
    loginOut() {
      this.$store.commit('setUser', null)
      Cookie.set('user', data.user)
      this.$router.push({ name: 'login' })
    }
  },

  created() {
    this.profile = { ...this.$store.state.user }
    console.log(this.profile)
  }
}
</script>

<style></style>
