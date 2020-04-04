<template>
  <div class="home">
    <every-day />
    <div class="article-list mb-3">
      <my-article v-for="(item, index) in articleList" :key="index" :article="item" />
    </div>
    <page
      :total="total"
      :pageSize="pageSize"
      :panelCount="5"
      @getCurrent="getCurrent"
      v-if="pageShow"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import EveryDay from "@/components/EveryDay.vue";
import MyArticle from "@/components/Article.vue";
import Page from "@/components/Page.vue";
import axios from "axios";
export default {
  name: "Home",
  components: { EveryDay, MyArticle, Page },
  data() {
    return {
      total: 0,
      pageSize: 5,
      page: 1,
      tagId: 0,
      articleList: [
        {
          id: 6,
          title: "Laravel5.4安装passport时遇到的一些问题",
          content:
            "安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加LaravelPassportPassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。",
          date: 123131243,
          views: 0,
          tags: "dsd"
        }
      ]
    };
  },
  computed: {
    pageShow() {
      return this.total > this.pageSize;
    }
  },
  watch: {
    $route(to) {
      if (to.query.tagId) {
        this.page = 1;
        this.tagId = to.query.tagId;
        this.getCoutByTagId(to.query.tagId);
        this.getPageByTagId(1, to.query.tagId);
      } else {
        this.page = 1;
        this.getPageCount();
        this.getPage(1);
      }
    }
  },
  methods: {
    getCurrent(current) {
      this.page = current;
      if (this.$route.query.tagId) {
        this.getPageByTagId(current, this.$route.query.tagId);
      } else {
        this.getPage(current);
      }
    },
    getPageCount() {
      axios({
        method: "get",
        url: `/api/queryBlogCount`
      }).then(resp => {
        this.total = resp.data.data[0].total;
      });
    },
    getPage(page) {
      const pageSize = this.pageSize;
      if (!page) {
        return;
      }
      axios({
        method: "get",
        url: `/api/queryBlogByPage?page=${(page - 1) *
          pageSize}&pageSize=${pageSize}`
      })
        .then(resp => {
          const result = resp.data.data;
          const list = [];
          for (let i = 0; i < result.length; i++) {
            const temp = {};
            temp.id = result[i].id;
            temp.title = result[i].title;
            temp.content = result[i].content;
            temp.date = result[i].ctime;
            temp.views = result[i].views;
            temp.tags = result[i].tags;
            list.push(temp);
          }
          this.articleList = list;
        })
        .catch(error => console.log(error));
    },
    getPageByTagId(page, tagId) {
      axios({
        method: "get",
        url: `/api/queryByTagId?page=${page - 1}&pageSize=${
          this.pageSize
        }&tagId=${tagId}`
      })
        .then(resp => {
          const result = resp.data.data;
          const list = [];
          for (let i = 0; i < result.length; i++) {
            const temp = {};
            temp.id = result[i].id;
            temp.title = result[i].title;
            temp.content = result[i].content;
            temp.date = result[i].ctime;
            temp.views = result[i].views;
            temp.tags = result[i].tags;
            list.push(temp);
          }
          this.articleList = list;
        })
        .catch(error => console.log(error));
    },
    getCoutByTagId(tagId) {
      axios({
        method: "get",
        url: `/api/queryByTagIdCount?tagId=${tagId}`
      }).then(resp => {
        this.total = resp.data.data.count;
      });
    }
  },
  created() {
    if (this.$route.query.tagId) {
      this.getPageByTagId(1, this.$route.query.tagId);
      this.getCoutByTagId(this.$route.query.tagId);
    } else {
      this.getPageCount();
      this.getPage(1);
    }
  }
};
</script>
