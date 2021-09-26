<!--
 * @Description:  作者相关信息
 * @Author: xionglaifu
 * @Date: 2021-09-25 20:21:07
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-26 13:40:06
 * @company: formssi
-->
<template>
  <div class="article-meta">
    <!-- 作者头像 -->
    <div @click="toProfile(article.author.username)">
      <img :src="article.author.image" />
    </div>
    <div class="info">
      <div class="author" @click="toProfile(article.author.username)">
        {{ article.author.username }}
      </div>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <button
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following
      }"
      v-if="!isAuthor"
    >
      <i class="ion-plus-round"></i>
      &nbsp; Follow Eric Simons <span class="counter">(10)</span>
    </button>
    <button
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following
      }"
      v-if="isAuthor"
      @click="updateArticle(article.slug)"
    >
      <i class="ion-edit"></i>
      &nbsp; Edit Article <span class="counter"></span>
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited
      }"
      v-if="!isAuthor"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post <span class="counter"></span>
    </button>
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited
      }"
      v-if="isAuthor"
    >
      <i class="ion-trash-a"></i>
      &nbsp; Delete Article <span class="counter"></span>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['user']),

    isAuthor() {
      return this.user.username === this.article.author.username
    }
  },
  methods: {
    //跳转到个人信息页面
    toProfile(username) {
      this.$router.push({
        name: 'profile',
        params: {
          username
        }
      })
    },
    //进入修改文章页
    updateArticle(slug) {
      console.log(slug)
      this.$router.push({
        name: 'update',
        params: {
          slug
        }
      })
    }
  }
}
</script>

<style></style>
