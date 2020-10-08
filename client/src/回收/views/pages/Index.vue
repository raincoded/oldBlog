<template>
  <!-- 首页 -->
  <div class="row mx-0">
    <!-- 最上部的格言 -->
    <div class="col-12 bg-dark text-white px-2 py-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias sunt,
      quae eveniet natus magnam quasi porro est ullam quis, delectus
      exercitationem maiores laborum quibusdam molestiae nobis sequi earum
      pariatur. Possimus? Provident inventore natus pariatur consequatur
      quisquam modi itaque aperiam dignissimos, adipisci recusandae, illo odit
      cum ullam laboriosam perferendis quaerat nihil cupiditate, molestias
      officia placeat rem suscipit obcaecati. Nesciunt, repudiandae illum!
    </div>
    <!-- 文章简介区域 -->
    <div class="col-12">
      <!-- 每一个文章简介 -->
      <left-content
        v-for="article of articles.rows"
        :key="article.id"
        :article="article"
      />
    </div>
    <div class="col-12">
      <page
      class="mt-3"
      :count="articles.count"
      v-model="curPage"
      :limit="limit"
    />
    </div>
  </div>
</template>
<script>
import Page from "@/components/Page.vue";
import LeftContent from "@/components/index/LeftContent.vue";
import indexAjax from "@/ajax/index.js";
$("#accordion .collapse").collapse();
export default {
  data() {
    return {
      motto: "",
      articles: [],
      curPage: 1,
      limit: 6,
    };
  },
  components: {
    Page,
    LeftContent,
  },
  mounted() {
    indexAjax
      .getArticlePage({
        page: this.curPage,
        limit: this.limit,
        orderProp: "createdAt",
        prder: "DESC",
      })
      .then((req) => {
        if (req.data.code == 0) {
          this.articles = req.data.data;
        }
      });
  },
  watch: {
    curPage() {
      // console.log("监听", this.curPage);
      indexAjax
        .getArticlePage({
          page: this.curPage,
          limit: this.limit,
          orderProp: "createdAt",
          prder: "DESC",
        })
        .then((req) => {
          if (req.data.code == 0) {
            this.articles = req.data.data;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>