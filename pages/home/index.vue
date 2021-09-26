<!--
 * @Description: home
 * @Author: xionglaifu
 * @Date: 2021-09-24 10:42:16
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-26 11:07:08
 * @company: formssi
-->
<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">拉钩教育</h1>
        <p>A place to improve your ability.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <div @click="changeTab('your_feed')" class="nav-link" :class="{ active: tab === 'your_feed' }" exact>
                  关注文章
                </div>
              </li>
              <li class="nav-item">
                <div
                  @click="changeTab('global_feed')"
                  class="nav-link"
                  :class="{ active: tab === 'global_feed' }"
                  exact
                >
                  公共文章
                </div>
              </li>
              <li v-if="tag" class="nav-item">
                <div @click="changeTab(tag)" class="nav-link" :class="{ active: tab === 'tag' }" exact>
                  {{ tag }}
                </div>
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
                  <span class="date">{{ item.createdAt }}</span>
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

          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                v-for="item in totalPage"
                :key="item"
                :class="{
                  active: item === page
                }"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab
                    }
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
          <!-- /分页列表 -->
        </div>
        <!-- 标签 -->
        <div class="col-md-3">
          <div class="sidebar">
            <p>流行标签</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag: item
                  }
                }"
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
                >{{ item }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticles, getYourFeedArticles, getTags, addFavorite, deleteFavorite } from '@/api/article'
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  //服务器渲染数据
  async asyncData({ query }) {
    console.log('asycnData')
    //处理分页参数
    const page = Number.parseInt(query.page || 1)
    //每页文章数
    const limit = 20
    //tab页
    const tab = query.tab || 'global_feed'
    //标签
    const { tag } = query
    //判断是公共列表还是关注列表来渲染不同的数据
    const loadArticles = tab === 'global_feed' ? getArticles : getYourFeedArticles
    const [articleRes, tagRes] = await Promise.all([
      //调用文章列表接口
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag
      }),
      //调用标签列表接口
      getTags()
    ])
    //获取列表返回数据
    const { articles, articlesCount } = articleRes.data
    //获取标签接口返回数据
    const { tags } = tagRes.data

    articles.forEach(item => (item.favoriteDisabled = false))
    //返回数据
    return {
      articles, //文章列表
      articlesCount, //文章总数
      tags, //标签列表
      limit, //每页大小
      page, // 页码
      tab, // 选项卡
      tag //数据标签
    }
  },
  computed: {
    //用户信息
    ...mapState(['user']),

    //分页列表
    totalPage() {
      //向上取整
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  data() {
    return {
      // toProfile
    }
  },
  //监听参数,刷新页面
  watchQuery: ['page', 'tag', 'tab'],
  methods: {
    changeTab(tab) {
      //切换列表
      this.$router.push({
        name: 'home',
        query: { tab }
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
    },

    // 跳转到文章详情页
    toArticle(slug) {
      this.$router.push({
        name: 'article',
        params: {
          slug
        }
      })
    },

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
