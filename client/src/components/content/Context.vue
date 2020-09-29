<template>
  <!-- 文章正文详情 -->
  <div class="row mr-2">
    <!-- 文章头部 -->
    <div class="col-12 bg-dark text-white pt-2">
      <h4>这是标题lorem</h4>
      <p>
        <span class="mr-2 initialism">作者 ：rain</span>
        <span class="mx-2 initialism">发布日期 ：2019-11-1</span>
        <span class="mx-2 initialism">浏览量 ：( 89 )</span>
        <span class="mx-2 initialism">
          <i :class="{isGooded:isGood}" @click="isGood=!isGood">
            <svg
              width="1.2em"
              height="1.2em"
              viewBox="0 0 16 16"
              class="bi bi-hand-thumbs-up"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"
              />
            </svg>
          </i> ：( 18 )
        </span>
      </p>
    </div>
    <!-- 文章正文 -->
    <div class="col-12 py-2 bg-white">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum itaque nesciunt iste placeat voluptas nemo nihil laborum, necessitatibus omnis autem dolorum odit, vitae consequatur fugiat facere commodi natus molestias consectetur?
      Modi cupiditate libero aperiam vel non quod suscipit minima dolore beatae ab eveniet sequi laboriosam iste eaque voluptatem ut ipsa neque, eius autem quas deleniti excepturi omnis, magnam quisquam! Assumenda?
      Fugit ullam nihil rem aliquam ex aut assumenda nesciunt id possimus deleniti. Optio voluptas corrupti, error perferendis suscipit eveniet quia similique laboriosam expedita tempore libero aut ipsum dolorum blanditiis praesentium!
      Odit, corporis, sint assumenda fuga ipsum quibusdam, obcaecati incidunt cum harum impedit distinctio id minima facere sunt sapiente omnis esse illo? Voluptatibus laudantium maiores iusto dolorem enim, explicabo libero soluta.
      Quia ab repellat voluptates. Officia rerum recusandae similique velit beatae porro consectetur! Aspernatur obcaecati accusantium tempore laboriosam doloribus aperiam animi? Inventore nemo fugiat corrupti! Ullam quo aliquid asperiores maxime dolorum.
      Architecto fuga, eius saepe harum assumenda aperiam blanditiis dolore delectus accusantium id dolor ipsa suscipit officiis fugiat placeat beatae magni velit nesciunt! Maxime consequuntur quis sed porro beatae earum officiis!
      Tenetur iusto repudiandae nostrum. Dignissimos ipsum eaque, nostrum fugit nihil nemo minus eum similique reprehenderit eveniet non quaerat iusto, rem molestiae dolorem temporibus nesciunt suscipit explicabo unde veniam itaque? Exercitationem.
      Nesciunt minima ducimus officiis ea ad reprehenderit molestias esse nostrum molestiae odit rem, placeat quas assumenda nemo, cum vel suscipit. A ad ullam iusto corporis repellat obcaecati, deserunt amet assumenda!
      Quis sunt, voluptatum illum voluptatem deserunt odio voluptas cum fugiat vel. Quibusdam, minima. Libero assumenda explicabo minus deleniti tempore debitis, fuga quam consequuntur officiis, laudantium vero, est voluptatum aut error.
      Qui ipsum dicta, sapiente explicabo maiores, mollitia est quis fugiat ipsa debitis, facere temporibus recusandae nisi dolore asperiores cum dolorem dolores similique labore blanditiis rem sed. Pariatur iste minus ipsam!
    </div>
    <!-- 发表评论 -->
    <div class="col-12 bg-white mt-3 p-3">
      <editor ele-id="articalContent" />
    </div>
    <!-- 评论区 -->
    <div class="col-12">
      <editor-list :comment="comments[0]" />
      <editor-list :comment="comments[1]"/>
      <editor-list />
    </div>
  </div>
</template>
<script>
import EditorList from "@/components/EditorList.vue";
import Editor from "@/components/Editor.vue";
export default {
  data() {
    return {
      isGood: false,
      comments: [
        {
          content: "评论内容",
          memberId: 1,
          objectId: 2,
          trueName: "张乐超",
          createTime: "2019年8月16日 21:31",
          headImageUrl: "",
          at: {
            content: "评论内容",
            memberId: 1,
            objectId: 2,
            trueName: "张乐超",
            createTime: "2019年8月16日 21:31",
            headImageUrl: "",
          },
        },
        {
          content: "评论内容",
          memberId: 1,
          objectId: 2,
          trueName: "张乐超",
          createTime: "2019年8月16日 21:31",
          headImageUrl: "",
          at: {},
        },
      ],
    };
  },
  components: {
    Editor,
    EditorList,
  },
};
</script>
<style lang="scss" scoped>
</style>