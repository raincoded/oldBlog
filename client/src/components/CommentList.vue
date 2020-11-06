<template>
  <div>
    <!-- 循环主要第一次评论 -->
    <div v-for="comment of $store.state.comment.comments" :key="`comment-${comment.id}`">
      <comment hiddlen="true" :comment="comment" :main-id="comment.id"/>
      <com-seconde
        :main-id="comment.id"
        :children="comment.children"
        v-if="comment && comment.children.length>0"
      />
    </div>
  </div>
</template>
<script>
import ComInput from "@/components/ComInput.vue";
import Comment from "@/components/Comment.vue";
import ComSeconde from "@/components/ComSeconde.vue";
import indexAjax from "@/ajax/index.js";
export default {
  data() {
    return {
    };
  },
  components: {
    ComInput,
    Comment,
    ComSeconde,
  },
};
</script>