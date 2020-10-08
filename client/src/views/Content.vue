<template>
  <div>Content{{ $route.params.id }}</div>
</template>
<script>
import axios from "axios";
import indexAjax from "@/ajax/index.js";
export default {
  mounted() {
    indexAjax.getArticleById(this.$route.params.id).then((req) => {
      console.log(req);
    });
  },
  watch: {
    "$route.params": {
      handler() {
        if (this.$route.path.includes("/content")) {
            // console.log(this.$route.path);
          indexAjax.getArticleById(this.$route.params.id).then((req) => {
            console.log(req);
          });
        }
      },
      immediate: true,
    },
  },
};
</script>