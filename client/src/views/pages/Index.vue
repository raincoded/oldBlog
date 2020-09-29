<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <div class="row mr-2">
          <div class="col-12 bg-dark text-white px-2 py-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias sunt, quae eveniet natus magnam quasi porro est ullam quis, delectus exercitationem maiores laborum quibusdam molestiae nobis sequi earum pariatur. Possimus?
            Provident inventore natus pariatur consequatur quisquam modi itaque aperiam dignissimos, adipisci recusandae, illo odit cum ullam laboriosam perferendis quaerat nihil cupiditate, molestias officia placeat rem suscipit obcaecati. Nesciunt, repudiandae illum!
          </div>
          <div class="col-12">
            <left-content />
            <left-content />
            <left-content />
          </div>
        </div>
      </div>
      <right-contain class="col-4" />
    </div>
  </div>
</template>
<script>
import LeftContent from "@/components/index/LeftContent.vue";
import RightContain from "@/components/RightContain.vue";

$("#accordion .collapse").collapse();
export default {
  components: {
    LeftContent,
    RightContain,
  },
};
</script>
<style lang="scss" scoped>
</style>