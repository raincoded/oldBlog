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
                :to="{
                  name: 'Content',
                  params: { id: $store.state.articleId },
                }"
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
            <li class="nav-item mx-1" v-if="!$store.state.user">
              <router-link
                class="pr-2 pl-2 d-inline-block h-100"
                :to="{ name: 'Register' }"
                >注册</router-link
              >|<router-link
                class="pr-2 pl-2 d-inline-block h-100"
                :to="{ name: 'Login' }"
                >登录</router-link
              >
            </li>
            <li class="nav-item mx-1" v-if="$store.state.user">
              <div class="dropdown">
                <button
                  class="btn btn-success dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                >
                 {{$store.state.user.name}}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <router-link :to="{name:'Edit'}" class="dropdown-item text-success" href="#">发布文章</router-link>
                  <a class="dropdown-item text-success" href="#" @click="logout">退出登录</a>
                </div>
              </div>
              <!-- <a ></a> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import ajaxIndex from "@/ajax/index.js";
export default {
  data() {
    return {};
  },
  methods: {
    async logout() {
      const isLogout = confirm("是否注销！");
      if (isLogout) {
        await ajaxIndex.cancleLogin();
        this.$store.commit("userChange", null);
      }
    },
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