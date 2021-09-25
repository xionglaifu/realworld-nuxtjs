/*
 * @Description: 公共js方法
 * @Author: xionglaifu
 * @Date: 2021-09-25 20:32:57
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-25 20:34:11
 * @company: formssi
 */

import Vue from 'vue'

//跳转到个人信息页面
export const toProfile = (username) => {
  Vue.Router.push({
    name: 'profile',
    params: {
      username,
    },
  })
}
