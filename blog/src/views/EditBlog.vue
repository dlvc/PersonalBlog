<template>
  <div class="container mt-5">
    <div class="row justify-center">
      <!-- <div class="col-4"></div> -->
      <h2 class="m-auto text-center">文章标题</h2>
    </div>
    <div class="row mt-4 mb-4">
      <div class="col-4 mr-3">
        <input type="text" class="form-control" placeholder="请输入标题" v-model="title" />
      </div>
      <div class="col-4">
        <input type="text" class="form-control" placeholder="请输入标签，用逗号隔开" v-model="tags" />
      </div>
    </div>
    
    <quill-editor
      ref="myTextEditor"
      v-model="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    ></quill-editor>
    <button class="btn btn-primary mt-2" @click="handleClick">提交</button>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import axios from 'axios';
export default {
  components: { quillEditor },
  data() {
    return {
      content: "编辑",
      title: '',
      tags: '',
      isShow: true,
      editorOption: {}
    };
  },
  methods: {
    onEditorBlur(e) {
      e;
    },
    onEditorFocus(e) {
      e;
      if(this.isShow) {
          this.content = '';
          this.isShow = false;
      }
    },
    onEditorReady(e) {
      e;
    },
    handleClick() {
        const title = this.title;
        const tags = this.tags;
        const content = this.content;
        const data = JSON.stringify({
            title,
            tags,
            content
        })
      axios.post('/api/editBlog', data).then(resp => {
          alert(resp.data.msg);
          this.title = '';
          this.tags = '';
          this.content = '编辑';
          this.isShow = true;
      });
    }
  }
};
</script>