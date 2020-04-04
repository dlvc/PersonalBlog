<template>
  <div class>
    <div class="blog border bg-light p-3 rounded">
      <h5 class="blog-title pt-2">{{ article.title }}</h5>
      <div
        class="blog-msg pb-1"
      >作者：dengylccc 标签：{{ article.tags }} 发布于：{{ article.ctime | dateFormat }} 浏览：{{ article.views }}</div>
      <hr />
      <div class="blog-content" v-html="article.content"></div>
    </div>
    <blog-comment>{{ article.title }}</blog-comment>
  </div>
</template>

<script>
import BlogComment from "@/components/BlogComment.vue";
import axios from 'axios';
export default {
  components: { BlogComment },
  data() {
    return {
      article: {
        id: 0,
        title: "Vue history模式编译后nginx无法访问的问题",
        content:
          "Vue的项目，使用history路由模式相比hash模式来说，url会比较美观。但新手在把项目编译后并使用nginx配置访问时，点击其它页时会空白，F12查看请求，返回304，并且提示“We’re sorry but xxxxxx doesn’t work properly without JavaScript enabled. Please enable it to continue",
        tags: "sdfs",
        ctime: 324324234,
        views: 0
      }
    };
  },
  filters: {
    dateFormat(value) {
      const date = new Date(value * 1000);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
  },
  methods: {
    
  },
  created() {
    this.article.id = parseInt(this.$route.query.id);
    axios({
            method: 'get',
            url: '/api/queryBlogById?bid=' + this.article.id
        }).then(resp => {
            const data = resp.data.data[0];
            this.article.title = data.title;
            this.article.content = data.content;
            this.article.ctime = data.ctime;
            this.article.tags = data.tags;
            this.article.views = data.views;
        }).catch(error => {
            console.log(error);
        })
  }
};
</script>

<style lang="scss" scoped>
.blog-msg {
  font-size: 0.85rem;
}
</style>