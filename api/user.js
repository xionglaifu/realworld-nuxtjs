/*
 * @Description: 用户相关接口
 * @Author: xionglaifu
 * @Date: 2021-09-24 11:45:51
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-24 20:11:48
 * @company: formssi
 */
import request from '@/plugins/request'

//登录
export const login = (data) => {
  return request({
    url: '/api/users/login',
    method: 'post',
    data,
  })
}

//注册
export const register = (data) => {
  return request({
    url: '/api/users',
    method: 'post',
    data,
  })
}
