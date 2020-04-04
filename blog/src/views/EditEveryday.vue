<template>
  <div class="container mt-5">
    <div class="row justify-center mb-4">
      <h2 class="m-auto text-center">每日一句</h2>
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
        const content = this.content;
        const data = JSON.stringify({
            content
        });
      axios.post('/api/editEveryDay', data).then(resp => {
          alert(resp.data.msg);
          this.content = '编辑';
          this.isShow = true;
      });
    }
  }
};
</script>