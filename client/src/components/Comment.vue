<template>
  <!-- 单独评论评论列表 -->
  <div class="row p-1">
    <div class="col-1 px-0">
      <avatar class="commentAvatar" />
    </div>
    <div class="col-11 py-2">
      <div>
        <span v-if="comment.userId">
          <a href="#">{{ comment.userId.name }}</a>
        </span>
        <!-- 如果是直接评论，那么不会有回复2个字 -->
        <span v-if="!hiddlen">
          回复
          <a href="#">{{ comment.parent.name }}</a>
        </span>
        :
        <span v-html="comment.content"></span>
        <!-- : {{comment.content}} -->
      </div>
      <div class="initialism text-secondary">
        {{ new Date(comment.createdAt).toLocaleString() }}
        <i class="mx-1 cursor" @click="changeShow">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-chat-fill align-self-center"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"
            />
          </svg>
        </i>
      </div>
    </div>
    <com-input
      class="col-12"
      :comment="comment"
      v-if="comment.id == $store.state.comment.curCom"
    />
  </div>
</template>
<script>
import Avatar from "@/components/Avatar.vue";
import ComInput from "@/components/ComInput.vue";
export default {
  props: ["comment", "hiddlen", "mainId", "curCom"],
  components: {
    Avatar,
    ComInput,
  },
  data() {
    return {
      showEditor: false,
    };
  },
  methods: {
    changeShow() {
      if (this.comment.id == this.$store.state.comment.curCom) {
        this.$store.commit('curComChange',null)
      } else {
          this.$store.commit('curComChange',this.comment.id)
      }
    },
  },
  watch: {
  },
};
</script>
<style lang="scss" >
</style>