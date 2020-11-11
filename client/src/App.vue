<template>
  <div id="app">
    <!-- 首页 -->
    <div class="box">
      <!-- header -->
      <header-ind />
      <!-- 内容区 -->
      <div class="container">
        <div class="row mx-0 py-3">
          <div class="col-12 col-lg-8 px-0 pr-lg-3">
            <keep-alive>
              <router-view />
            </keep-alive>
          </div>
          <div class="col-0 col-lg-4 d-none d-lg-block">
            <right-contain />
          </div>
        </div>
      </div>
      <!-- footer -->
      <footer class="text-white">
        鲁公网安备 12345678901234号 鲁ICP备12345678号 丨免责声明
      </footer>
    </div>
  </div>
</template>
<script>
import headerInd from "@/components/Header.vue";
import RightContain from "@/components/RightContain.vue";
import indexAjax from "@/ajax/index";

export default {
  components: {
    RightContain,
    headerInd,
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
    this.$store.dispatch("emojiGet");

    // 尝试登录
    indexAjax
      .login()
      .then((req) => {
        if (req.code == 0) {
          // console.log("当前用户", req.data);
          this.$store.commit("userChange", req.data);
        } else if (req.code == 500) {
          // console.log("未登录");
          this.$store.commit("userChange", null);
        }
      })
      .catch(() => {
        this.$store.commit("userChange", null);
      });
  },
};
</script>
<style lang="scss">
#app {
  background-color: #f5f5f8;
}
.emojiImg {
  height: 1.3rem;
  width: 1.3rem;
}
.isGooded {
  color: #f40;
}
footer {
  height: 3rem;
  background-color: #477aa3;
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
.cursor {
  cursor: pointer;
}
</style>
