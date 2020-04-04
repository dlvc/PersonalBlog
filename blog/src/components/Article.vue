<template>
  <div class="article bg-white border rounded mt-3">
    <router-link
      :to="{name: 'blogDetail', query: {id: article.id}}"
      class="article-title d-block h5 text-dark pt-3 pl-3"
    >{{ article.title }}</router-link>
    <p class="article-content pl-3">{{ article.content }}</p>
    <div
      class="article-footer bg-dark rounded-bottom pl-3 py-1 text-light"
    >发布于{{ article.date | dateFormat }} | 浏览({{article.views}}) | Tags：{{article.tags}}</div>
  </div>
</template>

<script>
export default {
  props: ["article"],
  filters: {
    dateFormat(value) {
      const date = new Date(value * 1000);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>