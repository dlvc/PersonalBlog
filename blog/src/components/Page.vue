<template>
  <nav aria-label="Page navigation example mt-2">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{disabled: current === 1}" @click="changePage(1)">
        <a class="page-link" href="#">首页</a>
      </li>
      <li class="page-item" :class="{disabled: current === 1}" @click="changePage(current - 1)">
        <a class="page-link" href="#">
          <span>&laquo;</span>
        </a>
      </li>

      <template v-for="item in numbers">
        <li
          class="page-item"
          :class="{active: item === current}"
          :key="item"
          @click="changePage(item)"
        >
          <a class="page-link" href="#">{{ item }}</a>
        </li>
      </template>

      <li
        class="page-item"
        :class="{disabled: current === pageCount}"
        @click="changePage(current + 1)"
      >
        <a class="page-link" href="#">
          <span>&raquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{disabled: current === pageCount}"
        @click.prevent="changePage(pageCount)"
      >
        <a class="page-link" href="#">尾页</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    total: {
      type: Number
    },
    pageSize: {
      type: Number,
      default: 5
    },
    panelCount: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      current: 1, // 当前页码
      // pageSize: 5, // 页容量，每页显示多少条
      // total: 100, // 总数据量
      // panelCount: 5, // 最多显示的数字页码容量
      articleList: []
    };
  },
  computed: {
    pageCount() {
      // 总页数
      return Math.ceil(this.total / this.pageSize);
    },
    numbers() {
      // 用于得到一个数字的数组
      let min = this.current - Math.floor(this.panelCount / 2);
      if (min < 1) {
        min = 1;
      }
      let max = min + this.panelCount - 1;
      if (max > this.pageCount) {
        max = this.pageCount;
      }
      const arr = new Array();
      for (let i = min; i <= max; i++) {
        arr.push(i);
      }
      if (this.pageCount >= this.panelCount && arr.length < this.panelCount) {
        const length = arr.length;
        for (let i = 0; i < this.panelCount - length; i++) {
          arr.unshift(min - i - 1);
        }
      }
      return arr;
    }
  },
  methods: {
    changePage(newPage) {
      if (newPage < 1) {
        newPage = 1;
      }
      if (newPage > this.pageCount) {
        newPage = this.pageCount;
      }
      this.current = newPage;
      // this.getPage(this.current);
      this.$emit('getCurrent', this.current);
    }
  }
};
</script>