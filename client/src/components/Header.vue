<template>
  <!-- header -->
  <header class="fixed-top">
    <div class="container">
      <div class="row header">
        <div
          class="col col-sm-5 col-md-4 col-lg-3 input-group align-self-center"
        >
          <div class="d-inline p-2" @click="search">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-search cursor"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
              />
              <path
                fill-rule="evenodd"
                d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="搜索"
            class="form-control rounded"
            v-model="searchValue"
          />
        </div>
        <div
          class="col-auto ml-auto d-flex justify-content-end align-self-center pr-lg-0"
        >
          <ul class="nav">
            <li class="nav-item mx-1">
              <router-link
                class="px-2 d-inline-block h-100"
                :to="{ name: 'Index' }"
                >首页</router-link
              >
            </li>
            <li class="nav-item mx-1">
              <router-link
                class="px-lg-2 d-inline-block h-100"
                :to="{
                  name: 'Content',
                  params: { id: $store.state.articleId },
                }"
                >内容</router-link
              >
            </li>
            <li class="nav-item mx-1">
              <router-link
                class="px-lg-2 d-inline-block h-100"
                :to="{ name: 'Message' }"
                >留言</router-link
              >
            </li>
            <li class="nav-item mx-1">
              <router-link
                class="px-lg-2 d-inline-block h-100"
                :to="{ name: 'About' }"
                >关于</router-link
              >
            </li>
            <!-- <li class="nav-item mx-1" v-if="!$store.state.user">
              <router-link
                class="px-lg-2 d-inline-block h-100"
                :to="{ name: 'Register' }"
                >注册</router-link
              >|
              <router-link
                class="px-lg-2 d-inline-block h-100"
                :to="{ name: 'Login' }"
                >登录</router-link
              >
            </li> -->
            <li class="nav-item mx-1" v-if="$store.state.user">
              <div class="dropdown">
                <button
                  class="btn btn-success dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                >
                  {{ $store.state.user.name }}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <router-link
                    :to="{ name: 'Edit' }"
                    class="dropdown-item text-success"
                    href="#"
                    >发布文章</router-link
                  >
                  <a class="dropdown-item text-success" href="#" @click="logout"
                    >退出登录</a
                  >
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
    return {
      show: false,
      isNull: true,
      searchValue: "",
    };
  },
  methods: {
    async logout() {
      const isLogout = confirm("是否注销！");
      if (isLogout) {
        await ajaxIndex.cancleLogin();
        this.$store.commit("userChange", null);
      }
    },
    search() {
      console.log(this.searchValue);
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