<template>
  <!-- 首页 -->
  <div class="row mx-0">
    <!-- 左侧内容 -->
    <div class="col-12" v-if="$store.state.articles">
      <left-content
        :article="article"
        v-for="article in $store.state.articles.rows"
        :key="article.id"
        class="mb-3"
      />
    </div>
    <!-- 分页 -->
    <div
      class="col-12 pt-3"
      v-if="$store.state.articles && $store.state.articles.count > 6"
    >
      <pager
        v-model="curPage"
        :count="$store.state.articles.count"
        :curPage="$store.state.curPage"
        :limit="$store.state.limit"
      />
    </div>
  </div>
</template>
<script>
import leftContent from "@/components/index/LeftContent.vue";
import ajaxIndex from "@/ajax/index.js";
import pager from "@/components/index/Pager.vue";
export default {
  data() {
    return {
      // articles: [],
      // limit: 6,
      curPage: this.$store.state.curPage,
    };
  },
  components: {
    leftContent,
    pager,
  },
  mounted() {
    this.$store.dispatch("getArticles");
    // this.getArticles();
  },
  methods: {
    // getArticles() {
    //   ajaxIndex
    //     .getArticlePage({
    //       page: this.curPage,
    //       limit: this.limit,
    //     })
    //     .then((req) => {
    //       this.articles = req.data;
    //     });
    // },
  },
  watch: {
    "$store.state.curPage"() {
      this.$store.dispatch("getArticles");
      // this.getArticles();
    },
    curPage(value) {
      this.$store.commit("pageChange",value);
    },
  },
};
</script>
<style lange="scss" scoped>
</style>