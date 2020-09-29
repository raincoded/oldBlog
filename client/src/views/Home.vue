<template>
  <div class="box">
    <!-- header -->
    <header class="fixed-top">
      <div class="container">
        <div class="row header">
          <!-- <div class="col-sm-1 nav-left">
            <img
              class="img-fluid"
              src="https://www.zzbapp.com/zb_users/upload/2020/03/202003021583149566184656.png"
              alt="logo"
            />
          </div> -->
          <div class="col-4 input-group align-self-center">
            <input type="text" placeholder="搜索" class="form-control" />
            <button type="button" class="btn btn-primary">搜索</button>
          </div>
          <div class="col ml-auto d-flex justify-content-end align-self-center">
            <ul class="nav">
              <li class="nav-item mx-1" :class="{active:$route.path=='/index'}">
                <router-link
                  class="pr-2 pl-2 d-inline-block h-100"
                  
                  :to="{name:'Index'}"
                >首页</router-link>
              </li>
              <li class="nav-item mx-1" :class="{active:$route.path=='/content'}">
                <router-link
                  class="pr-2 pl-2 d-inline-block h-100"                  
                  :to="{name:'Content'}"
                >内容</router-link>
              </li>
              <li class="nav-item mx-1" :class="{active:$route.path=='/message'}">
                <router-link
                  class="pr-2 pl-2 d-inline-block h-100"
                  :to="{name:'Message'}"
                >留言</router-link>
              </li>
              <li class="nav-item mx-1" :class="{active:$route.path=='/about'}">
                <router-link
                  class="pr-2 pl-2 d-inline-block h-100"                  
                  :to="{name:'About'}"
                >关于</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <!-- 内容区 -->
    <router-view class="content py-3" />
    <!-- footer -->
    <footer
      class="text-white"
    >鲁公网安备 12345678901234号 鲁ICP备12345678号 Powered By:Z-Blog Theme By:优美主题 丨免责声明</footer>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  components: {},
};
</script>
<style lang="scss" scoped>
header,
footer {
  height: 3rem;
  background-color: #477aa3;
  // opacity: 0.7;
}
.nav-left {
  height: 3rem;
  width: 3rem;
  margin-left: 0;
  padding: 5px 10px;
  img {
    height: 100%;
  }
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
      a{
        color: #000;
      }
    }
  }
}
footer {
  line-height: 3rem;
  text-align: center;
  font-size: 0.8rem;
}
.box {
  min-height: 100vh;
  padding-top: 3rem;
}
.content {
  min-height: calc(100vh - 6rem);
}
</style>
