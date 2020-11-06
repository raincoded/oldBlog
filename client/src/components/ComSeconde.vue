<template>
  <!-- 循环次要评论 -->
  <div class="ml-3">
    <div class="col-12 cursor decoration modal-dialog-centered" @click="show = !show" v-show="!show">
      展示{{ children.length }}条回复<svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        class="bi bi-caret-down-fill text-secondary"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
        />
      </svg>
    </div>
    <comment
      v-for="comment of children"
      :key="`comment-${comment.id}`"
      :comment="comment"
      :hiddlen="false"
      :main-id="comment.id"
      v-show="show"
    />
    <div class="col-12 cursor decoration  modal-dialog-centered" @click="show = !show" v-show="show">
      收起<svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        class="bi bi-caret-up-fill text-secondary"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
        />
      </svg>
    </div>
  </div>
</template>
<script>
import Comment from "@/components/Comment.vue";
export default {
  data() {
    return {
      show: false,
    };
  },
  props: ["children", "mainId"],
  components: {
    Comment,
  },
};
</script>
<style lang="scss" scoped>
.decoration {
  &:before,
  &:after {
    content: "";
    display: inline-block;
    width: 3rem;
    border: 0.1rem solid #ccc;
    border-left: none;
    border-right: none;
    border-bottom: none;
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
</style>