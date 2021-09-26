<!--
 * @Description: 
 * @Author: xionglaifu
 * @Date: 2021-09-26 09:15:50
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-26 14:23:45
 * @company: formssi
-->
<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  v-model="article.title"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  v-model="article.description"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  v-model="article.body"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="tag" type="text" class="form-control" placeholder="Enter tags" @keyup.enter="addTag" />
                <div class="tag-list">
                  <span v-for="tag in article.tagList" :key="tag" class="tag-default tag-pill ng-binding ng-scope">
                    <span class="ion-close-round" @click="deleteTag(tag)">X</span>
                    {{ tag }}</span
                  >
                </div>
              </fieldset>
              <button v-if="isEdit" @click="updateArticle" class="btn btn-lg pull-xs-right btn-primary" type="button">
                修改
              </button>
              <button v-else @click="createArticle" class="btn btn-lg pull-xs-right btn-primary" type="button">
                发表
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, getArticle, updateArticle } from '@/api/article'
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: 'EditorIndex',
  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      tag: '',
      isEdit: null
    }
  },

  methods: {
    //添加文章标签
    addTag() {
      //将输入框中的内容添加到tagList中
      if (this.tag) {
        //判断标签是否存在
        if (this.article.tagList.find(tag => tag === this.tag)) {
          alert('标签已经存在')
        } else {
          //标签不存在
          this.article.tagList.push(this.tag)
          //清空输入框内容
          this.tag = ''
        }
      }
    },
    //删除标签
    deleteTag(tag) {
      this.article.tagList = this.article.tagList.filter(item => item !== tag)
    },

    //发表文章
    async createArticle() {
      console.log(1111)
      const { data } = await createArticle(this.article)
      this.toArticle(data.article.slug)
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
    //修改文章
    async updateArticle() {
      const { article } = this
      const { data } = await updateArticle(article.slug, article)
      this.toArticle(data.article.slug)
    }
  },

  async created() {
    const { params } = this.$route
    if (params && params.slug) {
      this.isEdit = true
      const res = await getArticle(params.slug)
      const { article } = res.data
      this.article = article
      console.log(article)
    }
  }
}
</script>

<style>
.article-tag {
  background-color: black;
  color: #fff;
  margin-left: 5px;
}
.icon-delete {
  font-size: 14px;
  padding-right: 3px;
  padding-left: 3px;
  cursor: pointer;
  color: red;
}
</style>
