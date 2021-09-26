/*
 * @Description:
 * @Author: xionglaifu
 * @Date: 2021-09-26 09:15:50
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-26 09:32:00
 * @company: formssi
 */
import { request } from '@/plugins/request'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 用户注册
export const register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}

//修改用户信息
export const updateUser = data => {
  return request({
    method: 'post',
    url: '/api/user',
    data
  })
}

//获取个人资料
export const getProfile = userName => {
  return request({
    method: 'get',
    url: `/api/profiles/${userName}`
  })
}
