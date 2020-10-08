

















// <template>
//   <!-- 首页左侧内容区的文章简介 -->
//   <div class="row" v-if="article">
//     <div class="bg-white mt-3 w-100">
//       <div class="w-100 bg-white p-3">
//         <h4 class="mb-0">
//           <!-- 文章标题 -->
//           <router-link
//             :to="{ name: 'Content', params: { id: article.id } }"
//             class="text-decoration-none cursor d-inline-block w-100 text-nowrap text-truncate"
//             >{{ article.title }}</router-link
//           >
//         </h4>
//         <!-- 文章正文 -->
//         <p class="mb-0 w-100 ariticle-content">{{ article.content }}</p>
//       </div>
//       <!-- 文章辅助信息 -->
//       <div class="w-100 bg-dark text-white font-weight-light pl-3 py-1">
//         发布于:
//         <span class>{{
//           new Date(article.createdAt).toLocaleDateString()
//         }}</span>
//         <span class="px-2">|</span>浏览:
//         <span class>{{ article.views }}</span>
//         <template v-if="articleTag.length > 0"
//           ><span class="px-2">|</span>Tags:
//           <router-link
//             v-for="tag of articleTag"
//             :key="`${tag}${article.id}`"
//             :to="{ name: 'Content' , params: { id: 27 } }"
//             class="text-decoration-none cursor text-white mr-2"
//             >{{ tag }}</router-link
//           ></template
//         >
//       </div>
//     </div>
//   </div>
// </template>
// <script>
// export default {
//   props: ["article"],
//   data() {
//     return {};
//   },
//   mounted() {},
//   computed: {
//     articleDate() {
//       return new Date(this.article.createdAt).toLocaleDateString();
//     },
//     articleTag() {
//       if (this.article.tag) {
//         return this.article.tag.split(",");
//       }
//       return [];
//     },
//   },
// };
// </script>
// <style lang="scss" scoped>
// .ariticle-content {
//   max-height: 7rem;
//   overflow: hidden;
//   display: -webkit-box;
//   -webkit-line-clamp: 2;
//   -webkit-box-orient: vertical;
// }
// .cursor {
//   cursor: pointer;
//   color: #333;
//   &:hover {
//     color: #27afaf;
//   }
// }
// </style>