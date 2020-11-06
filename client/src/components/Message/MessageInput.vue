<template>
  <!-- 评论的表单输入框 -->
  <div class="row py-2 px-3 bg-white" v-document-click="cancelComment">
    <p class="bg-secondary initialism border rounded p-1 text-white">
      ！温馨提示：为了能够更好的留言交流，请务必填写正确可用邮箱，留言回复内容均以邮箱形式发送。
    </p>
    <div
      placeholder="请输入您的意见"
      contenteditable="true"
      class="col-12 border comments py-2"
      :id="id"
      @click="selectComment"
    ></div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">用户名</span>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder="昵称"
        v-model="name"
      />
      <div class="input-group-prepend">
        <span class="input-group-text">邮箱</span>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder="邮箱"
        v-model="email"
      />
    </div>
    <div class="col-12 d-flex justify-content-between p-2">
      <i class="align-self-center cursor" @click="showEmojiHandle">
        <svg
          width="1.3em"
          height="1.3em"
          viewBox="0 0 16 16"
          class="bi bi-emoji-smile"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            fill-rule="evenodd"
            d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683z"
          />
          <path
            d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"
          />
        </svg>
      </i>
      <div class="emoji border p-1" v-show="showEmoji">
        <div
          class="p-1 d-inline-flex"
          v-for="item in $store.state.emoji"
          :key="item.src"
          @click="appendEmoji(item, $event)"
        >
          <img :src="item.url" :alt="item.phrase" class="emojiImg" />
        </div>
      </div>
      <button class="btn btn-success" @click="submitComment">发表</button>
    </div>
  </div>
</template>
<script>
import staticAjax from "@/ajax/static.js";
import indexAjax from "@/ajax/index.js";
import xss from "xss";
export default {
  props: ["comment", "updateCurCom", "id", "curTime"],
  model: {
    prop: "curTime",
    event: "change",
  },
  data() {
    return {
      showEmoji: false,
      editHtml: "",
      name: "",
      email: "",
    };
  },
  computed: {},
  directives: {
    "document-click": {
      inserted(el, binding, vnode) {
        document.addEventListener("click", binding.value);
      },
    },
  },
  methods: {
    // 选中评论框
    selectComment(e) {
      // console.log("选中了");
      e.stopPropagation();
      this.showEmoji = false;
    },
    // 取消选中评论框
    cancelComment(e) {
      // console.log("取消了");
      e.stopPropagation();
      this.showEmoji = false;
    },
    // 显示表情
    showEmojiHandle(e) {
      e.stopPropagation();
      this.showEmoji = !this.showEmoji;
    },
    // 添加表情
    appendEmoji(item, $event) {
      $event.stopPropagation();
      $(
        `<img src="${item.url}" alt="${item.phrase}" class="emojiImg"/>`
      ).appendTo($(`#${this.id}`));
      this.showEmoji = false;
    },
    submitComment() {
      // 对评论内容进行xss处理
      this.editHtml = xss($(`#${this.id}`).html(), {
        whiteList: {
          img: ["class", "src", "alt"],
        },
      });
      if (!this.editHtml) {
        alert("评论不能为空！");
        return;
      }
      const comment = {
        content: this.editHtml,
      };
      // 如果this.comment存在，表示是在回复
      if (this.comment) {
        if (!this.$store.state.userId) {
          const result = confirm("需要登录，是否登录!");
          if (result) {
            this.$router.push({ name: "login" });
            return;
          } else {
            return;
          }
        }
        comment.id = this.comment.id;
        indexAjax
          .replyMessage(comment)
          .then((req) => {
            this.name = "";
            this.email = "";
            this.editHtml = "";
            alert("回复成功!");
          })
          .catch((req) => {
            alert(req);
          });
      } else {
        this.name = xss(this.name);
        this.email = xss(this.email);
        comment.name = this.name;
        comment.email = this.email;
        if (!this.name) {
          alert("昵称不能为空！");
          return;
        }
        if (!this.email) {
          alert("邮箱不能为空！");
          return;
        }
        indexAjax
          .pushMessage(comment)
          .then((req) => {
            console.log("里也有", req);
            if (req.code == 0) {
              this.name = "";
              this.email = "";
              this.editHtml = "";
              $(`#${this.id}`).html("");
              alert("留言成功!");
              this.$emit('change',new Date()) // 通知父组件需要更新留言
               this.$store.dispatch("getNewMessages");
            } else if (req.code == 500) {
              if (req.msg.content) {
                alert("留言内容不能为空!");
                return;
              }
              if (req.msg.name) {
                alert("昵称不能为空!");
                return;
              }
              if (req.msg.email) {
                alert("邮箱不能为空或格式不正确!");
                return;
              }
            }
          })
          .catch((err) => {
            alert(err);
          });
      }
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.comments {
  cursor: text;
  &:empty::before {
    color: lightgrey;
    content: attr(placeholder);
  }
}
.cursor {
  :hover {
    cursor: pointer;
  }
}
.emoji {
  position: absolute;
  height: 15rem;
  width: 14rem;
  bottom: 3rem;
  left: 0;
  background: #fff;
  overflow-y: auto;
  > div {
    height: 2rem;
    width: 2rem;
    border: 1px solid transparent;
    &:hover {
      border-color: #28a745;
    }
  }
  img {
    height: 100%;
  }
}
</style>