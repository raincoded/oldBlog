<template>
  <!-- header -->
  <header class="fixed-top">
    <div class="container">
      <div class="row header">
        <div class="col-4 input-group align-self-center">
          <input type="text" placeholder="搜索" class="form-control" />
          <button type="button" class="btn btn-primary">搜索</button>
        </div>
        <div class="col ml-auto d-flex justify-content-end align-self-center">
          <ul class="nav">
            <li class="nav-item mx-1">
              <router-link
                class="pr-2 pl-2 d-inline-block h-100"
                :to="{ name: 'Index' }"
                >首页</router-link
              >
            </li>
            <li class="nav-item mx-1">
              <router-link
                class="pr-2 pl-2 d-inline-block h-100"
                :to="{ name: 'Content', params: { id: $store.state.articleId } }"
                >内容</router-link
              >
            </li>
            <li class="nav-item mx-1">
              <router-link
                class="pr-2 pl-2 d-inline-block h-100"
                :to="{ name: 'Message' }"
                >留言</router-link
              >
            </li>
            <li class="nav-item mx-1">
              <router-link
                class="pr-2 pl-2 d-inline-block h-100"
                :to="{ name: 'About' }"
                >关于</router-link
              >
            </li>
            <li class="nav-item mx-1" v-if="!isLogin">
              <router-link
                class="pr-2 pl-2 d-inline-block h-100"
                :to="{ name: 'Register' }"
                >注册</router-link
              >
            </li>
            <li class="nav-item mx-1" v-if="!isLogin">
              <router-link
                class="pr-2 pl-2 d-inline-block h-100"
                :to="{ name: 'Login' }"
                >登录</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      isLogin: false,
    };
  },
};
</script>
<style lang="scss" scoped>
header {
  height: 3rem;
  background-color: #477aa3;
}
.nav {
  .nav-item {
    height: 3rem;
    line-height: 3rem;
    a {
      text-decoration: none;
      color: #fff;
      &:hover {
        color: #000;
      }
      &.router-link-active {
        font-size: bold;
        color: #27afaf;
      }
    }
  }
}
</style>