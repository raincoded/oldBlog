<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <context />
      </div>
      <right-contain class="col-4"/>
    </div>
  </div>
</template>
<script>
import RightContain from "@/components/RightContain.vue";
import Context from "@/components/content/Context.vue";
export default {
  components: {
    RightContain,
    Context
  },
};
</script>