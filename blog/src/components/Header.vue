<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg">
      <router-link class="navbar-brand" to="/">个人博客</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#h-nav"
        aria-controls="h-nav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="h-nav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/home">
              首页
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/sitemap">地图</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">关于</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/guestbook">留言</router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-light my-2 my-sm-0" type="submit">搜索</button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
a {
  color: #eeeeee;
}
</style>