/*
 * @Description:
 * @Author: xionglaifu
 * @Date: 2021-09-25 21:58:47
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-25 22:00:07
 * @company: formssi
 */

import Vue from "vue";
export const toProfile = username => {
  Vue.Router.push({
    name: "profile",
    params: {
      username
    }
  });
};
