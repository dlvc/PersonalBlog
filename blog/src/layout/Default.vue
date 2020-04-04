<template>
  <div class>
    <header class="header">
      <my-header />
    </header>
    <div class="main pb-3">
      <div class="container pt-4">
        <div class="row">
          <div class="col-8">
            <router-view></router-view>
          </div>
          <div class="col-4">
            <my-right />
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div
        class="text-white p-3 text-center"
      >Copyright © 2010-2020 郑晓个人博客 All rights reserved. 由免费开源的WordPress强力驱动. 鲁ICP备14017955号站长统计</div>
    </footer>
  </div>
</template>

<script>
import MyHeader from "@/components/Header.vue";
import MyRight from "@/components/Right.vue";
export default {
  components: {
    MyHeader,
    MyRight
  }
};
</script>

<style lang="scss" scoped>
.header {
  background: #080808;
}
.main {
  background: url("../assets/bg.jpg");
}
.footer {
  background: #080808;
}
</style>