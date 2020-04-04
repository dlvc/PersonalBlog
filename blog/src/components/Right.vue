<template>
  <div class="right">
    <div class="card text-white mb-3" style="max-width: 18rem;">
      <div class="card-header">随机标签云</div>
      <div class="card-body">
        <router-link
          :to="{name: 'home', query: {tagId: tag.id}}"
          v-for="tag in tags"
          :key="tag.id"
          :style="{color: randomColor(), fontSize: randomSize()}"
          class="p-1"
        >{{ tag.tag }}</router-link>
      </div>
    </div>

    <div class="card text-white mb-3" style="max-width: 18rem;">
      <div class="card-header">最近热门</div>
      <div class="card-body">
        <ul class="new-hot">
          <li class v-for="item in hotList" :key="item.id">
            <router-link class="d-block p-2" to="{name: 'blogDetail', query: {id: item.id}}">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="card text-white mb-3" style="max-width: 18rem;">
      <div class="card-header">友情链接</div>
      <div class="card-body">
        <div class="l-link">
          <span>
            <a href="/">kTWO博客</a>
          </span>
          <span>
            <a href="/">Lizenghai's Blog</a>
          </span>
          <span>
            <a href="/">Skymoon</a>
          </span>
          <span>
            <a href="/">docker技术网站</a>
          </span>
          <span>
            <a href="/">小张个人博客</a>
          </span>
          <span>
            <a href="/">Yusure的个人博客</a>
          </span>
          <span>
            <a href="/">陆鉴鑫的博客</a>
          </span>
          <span>
            <a href="/">柚子工具</a>
          </span>
          <span>
            <a href="/">薛才杰个人博客</a>
          </span>
          <span>
            <a href="/">陈学虎的小窝</a>
          </span>
          <span>
            <a href="/">黄信强个人博客</a>
          </span>
          <span>
            <a href="/">萌新blog</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return { tags: [], hotList: [] };
  },
  methods: {
    randomColor() {
      const red = Math.random() * 255;
      const green = Math.random() * 255;
      const blue = Math.random() * 255;
      return `rgb(${red}, ${green}, ${blue})`;
    },
    randomSize() {
      const size = Math.random() * 20 + 12 + "px";
      return size;
    }
  },
  created() {
    axios.get("api/queryRandomTags").then(resp => {
      const result = resp.data.data;
      let tags = [];
      for (let i = 0; i < result.length; i++) {
        let temp = {};
        temp.id = result[i].id;
        temp.tag = result[i].tag;
        tags.push(temp);
      }
      this.tags = tags;
    });

    axios.get("/api/queryHotBlog").then(resp => {
      let result = [];
      for (let i = 0; i < resp.data.data.length; i++) {
        let temp = {};
        temp.id = resp.data.data[i].id;
        temp.title = resp.data.data[i].title;
        result.push(temp);
      }
      this.hotList = result;
    });
  }
};
</script>

<style lang="scss" scoped>
.card {
    background-color: #191818;
    .new-hot {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
            border-bottom: 1px solid #222;
            a {
                color: #999;
            }
        }
    }
    .l-link {
        font-size: 13px;
        span {
            display: inline-block;
            width: 50%;
            box-sizing: border-box;
            a {
                display: block;
                color: #e33edf;
                padding: 2px 1px;
            }
        }
    }
}

</style>