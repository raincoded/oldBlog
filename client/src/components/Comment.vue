<template>
  <div>
    <div v-for="comment of comments" :key="comment.id">
      <editor-list hiddlen="true" :comment="comment" :main-id="comment.id" />
      <!-- 次评论循环 -->
      <!-- <div v-show="!showSecCom">
          展示10条回复
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-caret-down-fill pointer"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            @click="showSecCom = !showSecCom"
          >
            <path
              d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
            />
          </svg>
        </div> -->
      <div v-if="comment.children.length > 0" v-show="showSecCom">
        <editor-list
          class="ml-4"
          :comment="child"
          :main-id="comment.id"
          v-for="child of comment.children"
          :key="child.id"
          v-model="refreshList"
        />
      </div>
      <!-- <div v-show="showSecCom">
          收起
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-caret-up-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
            />
          </svg>
        </div> -->
    </div>
  </div>
</template>
<script>
import ComInput from "@/components/ComInput.vue";
import EditorList from "@/components/EditorList.vue";
import indexAjax from "@/ajax/index.js";
export default {
  data() {
    return {
      isGood: false,
      article: null,
      user: null,
      praise: {},
      comments: [],
      refresh: Date.now(), // 组件事件信息
      refreshList: Date.now(), // 组件事件信息
      showSecCom: false,
    };
  },
  components: {
    ComInput,
    EditorList,
  },
  methods: {
    async sendAjax(id) {
      indexAjax.getArticleById(id).then((req) => {
        this.article = req;
        indexAjax.getUserById(this.article.userId).then((req) => {
          this.user = req;
        });
        indexAjax
          .getPraiseByArticleId({
            articleId: this.article.id,
          })
          .then((req) => {
            this.praise = req;
          });
        this.getComment();
      });
    },
    getComment() {
      indexAjax.getCommentByArticleId(this.article.id).then((req) => {
        // console.log("comment", req);
        // console.log(req[0].createAt > req[1].createAt);
        const newComment = this.commentHandle(req);
        this.$store.commit('changeCom',newComment)
        this.comments = newComment;
        console.log("新评论", newComment);
      });
    },
    commentHandle(comment) {
      // 整理评论，将回复的整理至回复评论下
      const newCom = []; // 新的数组
      let len = comment.length;
      for (let i = 0; i < len; i++) {
        if (!comment[i].mainId) {
          // 如果为null，直接添加到新数组中
          comment[i].children = [];
          newCom.push(comment[i]);
        } else {
          const result = newCom.find((item) => {
            // 是否之前添加过
            return (item.mainId = comment[i].mainId);
          });
          if (!result) {
            // 没有则添加children属性
            comment[i].children = [];
          }
          // 再次对次评论归类，将同一主评论下的同一次评论放一起
          const secondIndex = result.children.lastIndexOf((item) => {
            return (item.secondId = comment[i].secondId);
          });
          if (secondIndex != -1) {
            result.children.splice(secondIndex, 0, comment[i]);
          }
          result.children.push(comment[i]); // push到children上
        }
      }
      return newCom;
    },
  },
  mounted() {
    // this.sendAjax(this.$route.params.id);
    // console.log('comments',this.$store.state.abc.comments);
    // this.$store.dispatch('getComs',this.getComment)
  },
  computed: {
    views() {
      if (this.article) {
        let view = this.article.views;
        if (view > 10000) {
          return Math.floor(view / 10000) + "万";
        }
        return view;
      }
      return 0;
    },
  },
  watch: {
    "$route.params": {
      async handler() {
        if (this.$route.params.id == undefined) {
          return;
        }
        await indexAjax.addArticleVivew(this.$route.params.id);
        await this.sendAjax(this.$route.params.id); // 获取文章
        if (this.$route.params.id != this.$store.state.articleId) {
          this.$store.commit("changeStateId", this.$route.params.id); // 默认是浏览量最高的
        }
      },
      immediate: true, //由于数据在第一次打开页面时要用，所以需要提前加载
    },
    refresh() {
      // 提交成功后刷新评论
      this.getComment();
    },
    refreshList() {
      // 提交成功后刷新评论
      this.getComment();
    },
  },
};
</script>
<style lang="scss" scoped>