<template>
  <div>
    <!-- 第一块博客简介 -->
    <div class="row bg-white">
      <!-- 右侧上方背景图片 -->
      <div class="col-12 bg-img">
        <img
          class="img-fluid w-100 h-100 pl-3 pr-3 pt-3"
          src="./../assets/wallpaper.webp"
          alt
        />
      </div>
      <!-- 头像 -->
      <div class="col-12 text-center">
        <avatar class="logo" />
      </div>
      <div class="col-12 d-flex justify-content-between">
        <!-- 名字 -->
        <div class="ml-3">
          <span class="font-weight-lighter h2">rain</span>
        </div>
        <!-- github和email -->
        <div class="mr-3">
          <a href="https://github.com/raincoded" target="_blank" class="mr-2" data-toggle="tooltip" data-placement="top" title="前往gitHub">
            <svg
              height="2rem"
              viewBox="0 0 16 16"
              width="1.5rem"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </a>
          <a href="mailto:1614794159@qq.com" class="mr-2" data-toggle="tooltip" data-placement="top" title="发送邮件">
            <svg
              width="2em"
              height="1.5em"
              viewBox="0 0 16 16"
              class="bi bi-envelope-fill text-dark"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"
              />
            </svg>
          </a>
        </div>
      </div>
      <!-- 格言 -->
      <div class="col-12 p-2 text-center">大道至简，知易行难！</div>
      <!-- 博客历史数据统计 -->
      <div class="col-12 d-flex justify-content-center py-2">
        <div class="d-flex flex-column text-center w-25">
          <span class="border-right border-gray">{{
            articleMes.articleRotal
          }}</span>
          <span class="border-right border-gray">文章</span>
        </div>
        <div class="d-flex flex-column text-center w-25">
          <span class="border-right border-gray">{{
            articleMes.viewsRotal
          }}</span>
          <span class="border-right border-gray">阅读</span>
        </div>
        <div class="d-flex flex-column text-center w-25">
          <span class>{{ articleMes.commentRotal }}</span>
          <span class>评论</span>
        </div>
      </div>
    </div>
    <!-- 第二块随笔 -->

    <!-- 第三块最新热门 -->
    <div class="row bg-white mt-3">
      <!-- 导航 -->
      <div class="d-flex align-items-center bg-dark text-white py-2 px-2 w-100">
        <h6 class="mb-0">最新热门</h6>
      </div>
      <div class="col-12 px-0">
        <ul class="list-group list-group-flush">
          <li
            class="list-group-item list-group-item-action list-group-item-light py-1"
            v-for="article in hotArticle.rows"
            :key="article.id"
          >
            <a
              :to="{ name: 'Content', params: { id: article.id } }"
              @click="clickHandle(article.id)"
              class="text-decoration-none cursor d-inline-block w-100 text-nowrap text-truncate"
              >{{ article.title }}{{ article.id }}</a
            >
            <!-- <a
              :to="{name:'Content',params: { id: article.id }}"
              class="text-decoration-none cursor d-inline-block w-100 text-nowrap text-truncate"
              >{{ article.title }}{{ article.id }}</a
            > -->
          </li>
        </ul>
      </div>
    </div>
    <!-- 第四块留言历史 -->
    <div class="row bg-white mt-3">
      <div class="col-12 px-0">
        <!-- 导航 -->
        <div
          class="d-flex align-items-center bg-dark text-white py-2 px-2 w-100"
        >
          <h6 class="mb-0">最新留言</h6>
        </div>
        <div class="row mx-0 mt-1">
          <div class="col-12" v-for="message in $store.state.newMessages.rows" :key="message.id">
            <p class="mb-0">
              <router-link
                :to="{ name: 'Message' }"
                class="text-decoration-none cursor d-inline-block w-100 text-nowrap text-truncate"
                v-html="message.content"
                ></router-link
              >
            </p>
            <p class="min-font text-secondary mb-2">
              <span class="mx-3">{{message.name}}</span>
              <span>评论于 {{new Date(message.createdAt).toLocaleString()}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from "@/components/Avatar.vue";
import indexAjax from "@/ajax/index.js";
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
export default {
  data() {
    return {
      SuiBiIndex: 1,
      hotArticle: [],
      articleMes: { articleRotal: 0, viewsRotal: 0, commentRotal: 0 },
    };
  },
  components: {
    Avatar,
  },
  methods: {
    showSuiBiDetail(index) {
      this.SuiBiIndex = index;
    },
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
  computed: {
    views() {
      if (this.articleAll.length > 0) {
        let view = 0;
        this.articleAll.forEach((element) => {
          view += element.views;
        });
        if (view > 10000) {
          return Math.floor(view / 10000) + "万";
        }
        return view;
      }
      return 0;
    },
  },
  mounted() {
    // 获取热门文章,按照浏览量倒叙
    indexAjax
      .getArticlePage({
        page: 1,
        limit: 6,
        orderProp: "views",
        order: "DESC",
      })
      .then((req) => {
        this.hotArticle = req.data;
        this.$store.commit("changeStateId", req.data.rows[0].id); // 默认是浏览量最高的
      });
    // 获取文章，阅读，评论数量
    indexAjax.getArticleMes().then((req) => {
      this.articleMes = req.data;
    });
    this.$store.dispatch("getNewMessages");
  },
};
</script>
<style lang="scss" scoped>
.logo {
  height: 3rem;
  transform: translateY(-1rem);
}
.cursor {
  cursor: pointer;
  color: #333;
  &:hover {
    color: #27afaf;
  }
}
.min-font {
  font-size: 0.8rem;
}
.detail {
  max-height: 5rem;
  font-size: 0.8rem;
}
.bg-img {
  height: 10rem;
}
/*
    <div class="row bg-white mt-3">
      <div class="col-12 px-0">
        <!-- 导航 -->
        <div
          class="d-flex align-items-center bg-dark text-white py-2 px-2 w-100"
        >
          <h6 class="mb-0">随笔</h6>
        </div>
        <div class="row mx-0">
          <div class="col-12 ml-2 mt-1" v-for="item in 4" :key="item">
            <div class="d-flex justify-content-between">
              <span
                class="cursor text-nowrap text-truncate w-75"
                @click="showSuiBiDetail(item)"
                >天地不过是飘摇的逆旅!天地不过是飘摇的逆旅!</span
              >
              <span>09-11</span>
            </div>
            <div
              class="detail p-2 font-weight-light"
              v-show="item == SuiBiIndex"
            >
              天地不过是飘摇的逆旅，昼夜不过是光阴的门户。——《花镜》人生万千，世事无常。人生是一场短暂的旅程...
              <router-link
                :to="{ name: 'Content' }"
                class="text-decoration-none text-dark"
                >【阅读全文】</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
 */
</style>