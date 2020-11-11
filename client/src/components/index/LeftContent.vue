<template>
  <!-- 首页左侧内容区的文章简介 -->
  <div class="row" v-if="article">
    <div class="bg-white w-100">
      <div class="w-100 bg-white p-3">
        <h4 class="mb-2">
          <!-- 文章标题 -->
          <!-- <router-link
            :to="{ name: 'Content', params: { id: article.id }}"
            v-slot="{ href, navigate, isActive }"
            class="text-decoration-none cursor d-inline-block w-100 text-nowrap text-truncate"
            ><em :active="isActive" :href="href" @click="navigate">{{ article.title }}</em></router-link
          > -->
          <em
            class="text-decoration-none cursor d-inline-block w-100 text-nowrap text-truncate"
            @click="clickHandle(article.id)"
            >{{ article.title }}</em
          >
        </h4>
        <!-- 文章正文 -->
        <p class="mb-0 w-100 ariticle-content" v-html='content'></p>
      </div>
      <!-- 文章辅助信息 -->
      <div class="w-100 bg-dark text-white font-weight-light pl-3 py-1">
        发布于:
        <span class>{{
          new Date(article.createdAt).toLocaleDateString()
        }}</span>
        <span class="px-2">|</span>浏览:
        <span class>{{ article.views }}</span>
        <template v-if="articleTag.length > 0"
          ><span class="px-2">|</span>Tags:
          <router-link
            v-for="tag of articleTag"
            :key="`${tag}${article.id}`"
            :to="{ name: 'Content', params: { id: 27 } }"
            class="text-decoration-none cursor text-white mr-2"
            >{{ tag }}</router-link
          ></template
        >
      </div>
    </div>
  </div>
</template>
<script>
import xssUntil from '@/until/xssUntil.js'
console.log(xssUntil);
export default {
  props: ["article"],
  data() {
    return {};
  },
  methods: {
    clickHandle(id) {
      // console.log(this.$route.path,`/content/${id}`);
      if (this.$store.state.articleId !== id) {
        // console.log("改变", id);
        this.$store.commit("changeStateId", id);
      }
      if (this.$route.path != `/content/${id}`) {
        // console.log("非本页");
        this.$router.push({
          name: "Content",
          params: {
            id: id,
          },
        });
      }
    },
  },
  mounted() {},
  computed: {
    articleDate() {
      return new Date(this.article.createdAt).toLocaleDateString();
    },
    articleTag() {
      if (this.article.tag) {
        return this.article.tag.split(",");
      }
      return [];
    },
    content(){
      return xssUntil.html(this.article.content)
    }
  },
};
</script>
<style lang="scss" scoped>
.ariticle-content {
  max-height: 7rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.cursor {
  cursor: pointer;
  color: #333;
  &:hover {
    color: #27afaf !important;
  }
}
</style>