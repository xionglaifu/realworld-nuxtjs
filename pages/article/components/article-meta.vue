<!--
 * @Description:  作者相关信息
 * @Author: xionglaifu
 * @Date: 2021-09-25 20:21:07
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-25 20:38:18
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
        active: article.author.following,
      }"
    >
      <i class="ion-plus-round"></i>
      &nbsp; Follow Eric Simons <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited,
      }"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post <span class="counter">(29)</span>
    </button>
  </div>
</template>

<script>
import { toProfile } from '@/utils'
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      toProfile,
    }
  },
}
</script>

<style></style>
