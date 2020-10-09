<template>
  <!-- 分页 -->
  <nav aria-label="Page navigation example" v-if="allPage > 2">
    <ul class="pagination justify-content-center mb-0">
      <li
        class="page-item"
        :class="{ disabled: curPage == 1 }"
        @click="changePage(1)"
      >
        <span class="page-link">首页</span>
      </li>
      <li
        class="page-item"
        :class="{ disabled: curPage == 1 }"
        @click="changePage(curPage - 1)"
      >
        <span class="page-link">上一页</span>
      </li>
      <li class="page-item disabled" v-if="curPage > 5 && allPage > 9">
        <span class="page-link">...</span>
      </li>
      <li
        class="page-item"
        v-for="index in viewPage"
        :key="index"
        :class="{ active: curPage == index }"
        @click="changePage(index)"
      >
        <span class="page-link">{{ index }}</span>
      </li>
      <li
        class="page-item disabled"
        v-if="curPage < allPage - 4 && allPage > 9"
      >
        <span class="page-link">...</span>
      </li>
      <li
        class="page-item"
        :class="{ disabled: curPage == allPage }"
        @click="changePage(curPage + 1)"
      >
        <span class="page-link">下一页</span>
      </li>
      <li
        class="page-item"
        :class="{ disabled: curPage == allPage }"
        @click="changePage(allPage)"
      >
        <span class="page-link">末页</span>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: ["count", "curPage", "limit"],
  model: {
    // 父组件使用 v-model="curPage"传参，并监听curPage去做其他事
    prop: "curPage",
    event: "change",
    maxPage: 9,
  },
  data() {
    return {};
  },
  computed: {
    allPage() {
      // console.log(this.count);
      return Math.floor(this.count / this.limit);
      // return 20;
    },
    viewPage() {
      const arr = [];
      // console.log("allPage", this.allPage);
      // 小于等于9页则最多显示9页
      if (this.allPage <= 9) {
        for (let i = 1; i <= this.allPage; i++) {
          arr.push(i);
        }
        // console.log('小于等于9页',arr);
        return arr;
      } else {
        // 大于9页
        // 前5页
        if (this.curPage <= 5) {
          for (let i = 1; i <= 9; i++) {
            arr.push(i);
          }
          // console.log("首", arr);
          return arr;
        } else {
          // 后5页
          if (this.curPage + 4 >= this.allPage) {
            for (let i = this.allPage; arr.length < 9; i--) {
              arr.unshift(i);
            }
            // console.log('尾',arr);
            return arr;
          } else {
            for (let i = this.curPage - 4; arr.length < 9; i++) {
              arr.push(i);
            }
            // console.log('中间',arr);
            return arr;
          }
        }
      }
    },
  },
  methods: {
    changePage(newPage) {
      // 当前索引有效范围
      if (newPage <= 0 || newPage > this.allPage || newPage == this.curPage) {
        return;
      }
      // console.log(newPage);
      this.$emit("change", newPage); //出发自定义change事件，传值给父组件
    },
  },
};
</script>
<style lang="scss" scoped>
.page-item {
  outline: none;
}
.page-item:hover {
  cursor: pointer;
}
.disabled:hover{
  cursor: not-allowed;
}
</style>