<template>
  <!-- 首页 -->
  <div class="row mx-0">
    <!-- 左侧内容 -->
    <div class="col-12">
      <left-content
        :article="article"
        v-for="article in articles.rows"
        :key="article.id"
        class="mb-3"
      />
    </div>
    <!-- 分页 -->
    <div class="col-12 pt-3" v-if="articles.count > 6">
      <pager
        v-model="curPage"
        :count="articles.count"
        :curPage="curPage"
        :limit="limit"
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
      articles: [],
      limit: 6,
      curPage: 1,
    };
  },
  components: {
    leftContent,
    pager,
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      ajaxIndex
        .getArticlePage({
          page: this.curPage,
          limit: this.limit,
        })
        .then((req) => {
          this.articles = req.data;
        });
    },
  },
  watch: {
    curPage() {
      this.getArticles();
    },
  },
};
</script>
<style lange="scss" scoped>
</style>