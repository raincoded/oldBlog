<template>
  <div class="Avatar">
    <img class="rounded-circle" src="./../assets/avatar.webp" alt />
  </div>
</template>
<style lang='scss' scoped>

.Avatar {
  height: 3.5rem;
  img {
    height: 3.5rem;
    width: 3.5rem;
    padding: 0.3rem;
    background-color: #fff;
  }
}
@media (max-width: 992px) {
  .Avatar {
    height: 3rem;
    img {
      height: 3rem;
      width: 3rem;
      padding: 0.3rem;
      background-color: #fff;
    }
  }
}
</style>