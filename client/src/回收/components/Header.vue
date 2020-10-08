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
              <li
                class="nav-item mx-1"
                :class="{ active: $route.path == '/index' }"
              >
                <router-link
                  class="pr-2 pl-2 d-inline-block h-100"
                  :to="{ name: 'Index' }"
                  >首页</router-link
                >
              </li>
              <li
                class="nav-item mx-1"
                :class="{ active: $route.path == '/content' }"
              >
                <router-link
                  class="pr-2 pl-2 d-inline-block h-100"
                  :to="{ name: 'Content', params: { id: 27 } }"
                  >内容</router-link
                >
              </li>
              <li
                class="nav-item mx-1"
                :class="{ active: $route.path == '/message' }"
              >
                <router-link
                  class="pr-2 pl-2 d-inline-block h-100"
                  :to="{ name: 'Message' }"
                  >留言</router-link
                >
              </li>
              <li
                class="nav-item mx-1"
                :class="{ active: $route.path == '/about' }"
              >
                <router-link
                  class="pr-2 pl-2 d-inline-block h-100"
                  :to="{ name: 'About' }"
                  >关于</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
</template>
<style lang="scss" scoped>
header{
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
    }
    &:hover,
    &.active {
      background-color: #fff;
      a {
        color: #000;
      }
    }
  }
}
</style>