<!--
 * @Description: 
 * @Author: xionglaifu
 * @Date: 2021-09-25 20:21:07
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-25 20:38:22
 * @company: formssi
-->
<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <div class="comment-author" @click="toProfile(comment.author.username)">
          <img :src="comment.author.image" class="comment-author-img" />
        </div>
        &nbsp;
        <div @click="toProfile(comment.author.username)">
          {{ comment.author.username }}
        </div>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments } from '@/api/article'
import { toProfile } from '@/utils'
export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [], // 文章列表
      toProfile,
    }
  },
  methods: {
    //跳转到个人信息页面
    toProfile(username) {
      this.$Router.push({
        name: 'profile',
        params: {
          username,
        },
      })
    },
  },
  async mounted() {
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  },
}
</script>

<style></style>
