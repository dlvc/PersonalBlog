<template>
  <div>
    <div class="blog-comments">
      <span class="blog-comments-msg d-block py-2">
        <slot />
        ：目前有{{ total }} 条留言
      </span>
      <div
        class="blog-comment pl-3 mb-2 py-2 text-info border border-info rounded"
        v-for="comment in comments"
        :key="comment.id"
      >
        <span>
          <b>{{ comment.user_name }}</b>
          ：{{ comment.options }} 发表于 {{ comment.ctime | dateFormat }}
          <a
            href="#send-comment"
            @click="reply(comment.id, comment.user_name)"
          >[回复]</a>
        </span>
        <div class>{{ comment.comments }}</div>
      </div>
    </div>

    <div class="pl-3" id="send-commont">
      <div class="send-commont row mt-4 border rounded bg-light py-2">
        <h6 class="col-12 pb-2">发表评论</h6>
        <div class="form-group col-4">
          <input type="text" class="form-control" v-model="commentName" placeholder="昵称" />
        </div>
        <div class="form-group col-5">
          <input type="email" class="form-control" placeholder="邮箱" v-model="commentEmail" />
        </div>
        <div class="form-group col-12">
          <textarea class="form-control" v-model="commentContent" placeholder="无意义的内容我可能不会回复你"></textarea>
        </div>
        <div class="form-group col-12">
          <input
            type="text"
            class="form-control d-inline-block w-25"
            v-model="commentCode"
            placeholder="验证码"
          />
          <span class="d-inline-block" v-html="vcode" @click="changeCode"></span>
        </div>
        <div class="from-group col-2">
          <button class="btn btn-outline-warning" @click="sendComment">提交留言</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from 'jquery';
export default {
  data() {
    return {
      total: 1,
      comments: [],
      commentReply: -1,
      commentReplyName: "0",
      commentName: "",
      commentEmail: "",
      commentContent: "",
      commentCode: "",
      vcode: "",
      rightCode: ""
    };
  },
  filters: {
    dateFormat(value) {
      const date = new Date(value * 1000);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
  },
  methods: {
    reply(id, username) {
      this.commentReply = id;
      this.commentReplyName = username;
    },
    getComments(bid) {
      axios({
        method: "get",
        url: `/api/queryCommentsByBlogId?bid=${bid}`
      })
        .then(resp => {
          const result = resp.data.data;
          for (let i = 0; i < result.length; i++) {
            if (result[i].parent > -1) {
              result[i].options = `回复@${result[i].parent_name}`;
            }
          }
          this.comments = result;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCommentsCount(bid) {
      axios({
        method: "get",
        url: "/api/queryCommentsCountByBlogId?bid=" + bid
      })
        .then(resp => {
          this.total = resp.data.data[0].count;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCode() {
      axios({
        method: "get",
        url: "/api/queryRandomCode"
      })
        .then(resp => {
          this.vcode = resp.data.data.data;
          this.rightCode = resp.data.data.text;
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeCode() {
      this.getCode();
    },
    sendComment() {
      const code = this.commentCode;
      if (code.toLowerCase() != this.rightCode.toLowerCase()) {
        alert("验证码有误");
        return;
      }
      let bid = this.$route.query.id || -10;

      const reply = this.commentReply;
      const replyName = this.commentReplyName;
      const name = this.commentName;
      const email = this.commentEmail;
      const content = this.commentContent;
      axios({
        method: "get",
        url: `/api/addComment?bid=${bid}&parent=${reply}&parentName=${replyName}&userName=${name}&email=${email}&content=${content}`
      })
        .then(resp => {
          alert(resp.data.msg);
          this.commentReply = -1;
          this.replyName = "0";
          $("body").scrollTop(0);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getCode();
    let bid = this.$route.query.id || -10;
    this.getComments(bid);
    this.getCommentsCount(bid);
  }
};
</script>