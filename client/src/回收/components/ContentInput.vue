<template>
<!-- 发布文章的编辑器 -->
  <div class="row">
    <div class="col-12 d-flex justify-content-between align-items-center pb-2">
      <h4 class="mb-0">发表文章</h4>
      <button type="button" class="btn btn-success" @click="submitHtml">发布</button>
    </div>
    <div :id="eleId" class="col-12"></div>
  </div>
</template>
<script>
// import xss from "xss"
// var html = xss('<script>alert("xss");
import axios from "axios";
export default {
  props: ["eleId"],
  data() {
    return {};
  },
  methods: {
    submitHtml() {
      console.log(this.editor2.txt.html());
    },
  },
  mounted() {
    // console.log(this.eleId);
    this.editor2 = new wangEditor(`#${this.eleId}`);
    this.editor2.customConfig.zIndex = 0;
    // 隐藏“网络图片”tab
    this.editor2.customConfig.showLinkImg = false;
    // 将图片大小限制为 3M
    this.editor2.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
    // 限制一次最多上传 1 张图片
    this.editor2.customConfig.uploadImgMaxLength = 1;
    this.editor2.customConfig.debug = true;

    this.editor2.customConfig.customUploadImg = (files, insert) => {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      const formData = new FormData();
      formData.append("img", files[0]);
      axios.post("/api/upload", formData).then((res) => {
        // console.log(res);
        if (res.status === 200) {
          // 上传代码返回结果之后，将图片插入到编辑器中
          insert(res.data.data);
        }
      });
    };

    this.editor2.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "image", // 插入图片
      "code", // 插入代码
    ];
    this.editor2.create();
  },
};
</script>

