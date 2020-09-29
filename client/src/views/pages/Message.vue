<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        message
      </div>
      <right-contain class="col-4"/>
    </div>
  </div>
</template>
<script>
import RightContain from "@/components/RightContain.vue";
export default {
  components: {
    RightContain,
  },
};
</script>