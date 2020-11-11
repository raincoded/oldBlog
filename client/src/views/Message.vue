<template>
  <div class="row mx-0">
    <!-- 留言输入 -->
    <div class="col-12">
      <message-input
        id="message-0"
        v-model="curTime"
        :curPage="curPage"
        :limit="limit"
      />
    </div>
    <!-- 留言列表 -->
    <div class="col-12 p-0 mt-3 bg-white" v-if="$store.state.message.messages">
      <div
        class="row border-left border-primary m-2"
        v-for="message of $store.state.message.messages.rows"
        :key="message.id"
      >
        <div class="col-12">
          <span>{{ message.name }} :</span>
          <span class="text-black-50 initialism ml-3">{{
            new Date(message.createdAt).toLocaleString()
          }}</span>
          <span
            class="initialism cursor ml-2"
            v-if="$store.state.user"
            @click="deleteMess(message)"
            >删除</span
          >
          <p v-html="message.content" :class="{ 'mb-0': !message.reply }"></p>
        </div>
        <div class="col-12" v-if="message.reply">
          <span class="text-primary">博主 :</span>
          <span class="text-black-50 initialism ml-3">{{
            new Date(message.updateAt).toLocaleString()
          }}</span>
          <p class="mb-0" v-html="message.reply"></p>
        </div>
      </div>
    </div>
    <!-- 留言分页 -->
    <!-- <div class="col-12 pt-3" v-if="$store.state.message.messages.count > 6"> -->
    <div class="col-12 pt-3" v-if="$store.state.message.messages">
      <pager
        v-model="curPage"
        :count="$store.state.message.messages.count"
        :curPage="curPage"
        :limit="limit"
      />
    </div>
  </div>
</template>
<script>
import MessageInput from "@/components/Message/MessageInput.vue";
import ajaxIndex from "@/ajax/index.js";
import pager from "@/components/index/Pager.vue";
export default {
  data() {
    return {
      limit: 6,
      curPage: 1,
      curTime: new Date(),
    };
  },
  components: {
    MessageInput,
    pager,
  },
  mounted() {
    this.getMessages();
  },
  methods: {
    getMessages() {
      this.$store.dispatch("messagesGet", {
        page: this.curPage,
        limit: this.limit,
      });
    },
    deleteMess(message) {
      ajaxIndex
        .deleteMessage(message.id)
        .then(() => {
          this.$store.dispatch("messagesGet",{
            limit:this.limit,
            page:this.curPage
          });
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  watch: {
    curPage() {
      this.getMessages();
    },
    curTime() {
      // console.log("变化了");
      this.getMessages();
    },
  },
};
</script>
<style lange="scss" scoped>
</style>