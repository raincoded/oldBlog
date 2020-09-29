<template>
  <!-- 单独评论评论列表 -->
  <div class="row p-1" :class="{'ml-4':comment.at.memberId}">
    <div class="col-1 px-0">
      <avatar class="commentAvatar" />
    </div>
    <div class="col-11 py-2">
      <div>
        <span v-if="comment.at.memberId">
          <a href="#">{{comment.trueName}}</a> 回复
        </span>
        <span>
          <a href="#" v-if="comment.at.memberId">{{comment.at.trueName}}</a>
          <span v-else>{{comment.trueName}}</span>
          : {{comment.content}}
        </span>
      </div>
      <div class="initialism text-secondary">
        {{comment.createTime}}
        <i class="mx-1" @click="showEditor=true">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-chat-fill align-self-center"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"
            />
          </svg>
        </i>
      </div>
    </div>
    <editor class="col-12" v-if="showEditor" />
  </div>
</template>
<script>
import axios from "axios";
import Avatar from "@/components/Avatar.vue";
import Editor from "@/components/Editor.vue";
export default {
  props: ["comment"],
  components: {
    Avatar,
    Editor,
  },
  data() {
    return {
      editor2: null,
      showEditor: false,
    };
  },
  methods: {},
};
// var obj = {
//   content: "评论内容",
//   memberId: "被评论人Id",
//   objectId: "评论项目Id",
//    "trueName": "张乐超",//评论人名称
//    "headImageUrl": '',//评论人头像
//   objectType: "评论项目类别，评论类型 评论类型,1-课程，2-活动，3-需求",
//   score: [
//     {
//       scoreType: "评分类别: 0-课程，活动 评分;1-场地评分2-态度评分;3-星级评分",
//       scoreValue: "分数",
//     },
//     { scoreType: "评分类别", scoreValue: "分数" },
//   ],
// };
// var obj = {
//   content: "评论内容",
//   memberId: 1,
//   objectId: 2,
//   trueName: "张乐超",
//   createTime: "",
//   headImageUrl: "",
//   at: {},
// };
</script>