<!--
 * @Description: 文章详情页面
 * @Author: xionglaifu
 * @Date: 2021-09-25 20:07:10
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-25 20:46:16
 * @company: formssi
-->
<template>
  <div class="article-page">
    <!-- 文章标题 -->
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <!-- 作者相关信息组件 -->
        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>
      <hr />
      <div class="article-actions">
        <!-- 作者相关信息组件 -->
        <article-meta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <!-- 评论组件 -->
          <article-comments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'
export default {
  name: 'ArticleIndex',
  async asyncData({ params }) {
    const res = await getArticle(params.slug)
    console.log(res)
    const { article } = res.data
    //将markdownInt 转为 html
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article,
    }
  },
  components: {
    ArticleMeta,
    ArticleComments,
  },
  data() {
    return {}
  },
  methods: {},
  head() {
    // 设置页面的meta
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [{ hid: 'description', name: 'description', content: this.article.description }],
    }
  },
}
</script>
<style scoped></style>
