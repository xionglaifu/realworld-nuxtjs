/*
 * @Description:
 * @Author: xionglaifu
 * @Date: 2021-09-24 16:18:28
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-24 20:12:45
 * @company: formssi
 */
import request from '@/plugins/request'

//获取公共文章列表
export const getArticles = (params) => {
  return request({
    url: '/api/articles',
    method: 'get',
    params,
  })
}

//获取用户关注文章列表
export const getYourFeedArticles = (params) => {
  return request({
    url: '/api/articles/feed',
    method: 'get',
    params,
  })
}

// 获取文章标签列表
export const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags',
  })
}

//取消点赞
export const deleteFavorite = (slug) => {
  return request({
    method: 'delete',
    url: `/api/articles/${slug}/favorite`,
  })
}

// 添加点赞
export const addFavorite = (slug) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  })
}

// 获取文章详情
export const getArticle = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })
}

// 获取文章评论
export const getComments = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`,
  })
}
