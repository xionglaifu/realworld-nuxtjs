<!--
 * @Description:  个人资料页
 * @Author: xionglaifu
 * @Date: 2021-09-24 11:03:05
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-26 15:37:40
 * @company: formssi
-->
<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile" class="user-img" />
            <h4>{{ profile.image }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button @click="toSettings" v-if="self" class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-gear-a"></i>
              &nbsp; edit Profile Settings
            </button>
            <button v-else class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; Follow Eric Simons
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'my_articles'
                  }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'my_articles'
                    }
                  }"
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'favorited_articles'
                  }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'favorited_articles'
                    }
                  }"
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>
          <div class="article-preview" v-for="item in articles" :key="item.slug">
            <div class="article-meta">
              <template @click="toProfile(item.author.username)">
                <img :src="item.author.image" />
              </template>
              <div class="info">
                <div @click="toProfile(item.author.username)">
                  <span>{{ item.author.username }}</span>
                  <span class="date">{{ item.createdAt | date('MMM DD, YYYY') }}</span>
                </div>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: item.favorited
                }"
                @click="onFavorite(item)"
                :disabled="item.favoriteDisabled"
              >
                <i class="ion-heart"></i>{{ item.favoritesCount }}
              </button>
            </div>
            <div class="preview-link" @click="toArticle(item.slug)">
              <h1>{{ item.title }}</h1>
              <h1>{{ item.description }}</h1>
              <span>查看更多....</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProfile } from '@/api/user'
import { getArticles, deleteFavorite, addFavorite } from '@/api/article'
import { mapState } from 'vuex'
export default {
  //在路由匹配组件渲染之前会先执行中间件处理
  middleware: ['authenticated'],
  name: 'ProfileIndex',
  async asyncData({ params, query }) {
    const { data } = await getProfile(params.username)
    console.log(data)
    const tab = query.tab || 'my_articles'
    const obj = query.tab === 'favorited_articles' ? { favorited: params.username } : { author: params.username }
    const articleRes = await getArticles(obj)
    const { articles } = articleRes.data
    console.log(articles)
    return {
      profile: data.profile,
      articles,
      tab
    }
  },
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['user']),
    self() {
      return this.user.username === this.profile.username
    }
  },
  //监听参数,刷新页面
  watchQuery: ['tab'],
  methods: {
    //进入设置
    toSettings(username) {
      this.$router.push({
        name: 'setting',
        params: {
          username
        }
      })
    },
    //文章点赞
    async onFavorite(item) {
      item.favoriteDisabled = true
      if (item.favorited) {
        //取消点赞
        await deleteFavorite(item.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        // 添加点赞
        await addFavorite(item.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      item.favoriteDisabled = false
    }
  }
}
</script>
<style scoped></style>
