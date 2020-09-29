<template>
  <div class="row">
    <div class="bg-white mt-3">
      <div class="w-100 bg-white p-3">
        <h4 class="mb-0">
          <router-link
            :to="{name:'Content'}"
            class="text-decoration-none cursor d-inline-block w-100 text-nowrap text-truncate"
          >title</router-link>
        </h4>
        <p class="mb-0">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque saepe quisquam explicabo pariatur, voluptates earum dicta blanditiis provident nihil libero dolor, voluptas quas ratione quaerat aspernatur deleniti fugit unde consequuntur.
          Officiis dolor perferendis assumenda tempore, praesentium incidunt illo, quisquam repellendus quaerat voluptatum voluptas ratione quae reprehenderit obcaecati consequuntur similique dolores adipisci aliquid sunt aspernatur? Consequatur eveniet fugiat itaque sed porro.
          enim eum accusamus eius assumenda nihil
        </p>
      </div>
      <div class="w-100 bg-dark text-white font-weight-light pl-3 py-1">
        发布于:
        <span class>2020-08-23</span>
        <span class="px-2">|</span>浏览:
        <span class>158</span>
        <span class="px-2">|</span>Tags:
        <router-link
          :to="{name:'Content'}"
          class="text-decoration-none cursor text-white"
        >win7</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.cursor {
  cursor: pointer;
  color: #333;
  &:hover {
    color: #27afaf;
  }
}
</style>