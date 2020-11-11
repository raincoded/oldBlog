<template>
  <!-- 发布文章的编辑器 -->
  <div class="row">
    <div class="col-12 d-flex justify-content-between align-items-center pb-2">
      <div class="input-group mb-3 col-12">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">文章标题</span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="标题"
          aria-label="title"
          aria-describedby="basic-addon1"
          v-model="title"
        />
      </div>
    </div>
    <div class="col-12 d-flex justify-content-between align-items-center pb-2">
      <div class="input-group mb-3 col-5">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">文章标签</span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="标签"
          aria-label="tag"
          aria-describedby="basic-addon1"
          :disabled="tags.length >= 3"
          v-model="curTag"
        />
        <button
          class="btn btn-success"
          :disabled="tags.length >= 3"
          @click="pushTag"
        >
          添加
        </button>
      </div>
      <div v-if="tags.length > 0" class="col-7 d-flex mb-3">
        <div
          v-for="(tag, index) of tags"
          :key="tag"
          class="mr-1 border rounded bg-success text-white lineheight-center"
        >
          <span class="px-3">{{ tag }}</span>
          <button
            class="bg-danger border-0 text-white"
            aria-label="取消"
            @click="deleteTag(index)"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
    <div id="editor" class="col-12"></div>
    <div class="col-12">
      <button type="button" class="btn btn-success" @click="submitHtml">
        发布
      </button>
    </div>
  </div>
</template>
<script>
import ajaxIndex from "@/ajax/index.js";
import ajaxStatic from "@/ajax/static.js";
import xss from "xss";
import xssUtil from "@/until/xssUntil.js";
export default {
  data() {
    return {
      tags: [],
      curTag: "",
      title: "",
    };
  },
  methods: {
    submitHtml() {
      //  console.log();
      let str = this.editor2.txt.html();
      // console.log(str);
      str = xssUtil.unhtmlForUrl(str);
      if (str.length == 0) return;
      const article = {
        title: this.title,
        tag: this.tags.join(","),
        content: str,
      };
      // console.log(article);
      ajaxIndex
        .postArticle(article)
        .then((req) => {
          if (req.code == 0) {
            alert("上传成功");
            this.tags = [];
            this.title = [];
            this.editor2.txt.html('')
            
            this.$router.push({ name: "Index" });
          }
        })
        .catch((err) => {
          alert(err);
        });

      // str = this.html(str)
      // console.log(str);
      // console.log(
      //   xss(this.editor2.txt.html(), {
      //     whiteList: {
      //       div: ["style", "height", "width"],
      //       span: ["style", "height", "width"],
      //       p: ["style", "height", "width"],
      //       a: ["src", "alt", "height", "width"],
      //       img: ["src", "alt", "style"],
      //       br: ["style", "height", "width"],
      //       hr: ["style", "height", "width"],
      //       table: ["style", "height", "width"],
      //       tbody: ["style", "height", "width"],
      //       tr: ["style", "height", "width", "height", "width"],
      //       td: ["style", "height", "width"],
      //       col: ["style", "height", "width"],
      //       colgroup: ["style", "height", "width"],
      //       code: ["style", "height", "width"],
      //       pre: ["style", "height", "width"],
      //     },
      //   })
      // );
    },
    deleteTag(index) {
      this.tags.splice(index, 1);
    },
    pushTag() {
      this.tags.push(xss(this.curTag));
      this.curTag = "";
    },
    unhtmlForUrl(str, reg) {
      return str
        ? str.replace(reg || /[<">']/g, function (a) {
            return {
              "<": "&lt;",
              "&": "&amp;",
              '"': "&quot;",
              ">": "&gt;",
              "'": "&#39;",
            }[a];
          })
        : "";
    },
    html: function (str) {
      return str
        ? str.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function (m) {
            return {
              "&lt;": "<",
              "&amp;": "&",
              "&quot;": '"',
              "&gt;": ">",
              "&#39;": "'",
              "&nbsp;": " ",
            }[m];
          })
        : "";
    },
  },
  mounted() {
    // console.log(this.eleId);
    this.editor2 = new wangEditor(`#editor`);
    this.editor2.customConfig.pasteFilterStyle = false;
    // this.editor2.customConfig.pasteIgnoreImg = true;
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
      ajaxStatic.uploadImg(formData).then((res) => {
        // console.log(res);
        if (res.code === 0) {
          // 上传代码返回结果之后，将图片插入到编辑器中
          // console.log("路径", res.data);
          insert(res.data);
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
  watch: {
    article(newValue, oldValue) {
      return xss(newValue);
    },
    curTag(newValue, oldValue) {
      return xss(newValue);
    },
  },
};

// var xssUtil = {
//     /**
//      * 将url中的html字符转义， 仅转义  ', ", <, > 四个字符
//      * @param  { String } str 需要转义的字符串
//      * @param  { RegExp } reg 自定义的正则
//      * @return { String }     转义后的字符串
//      */
//     unhtmlForUrl: function (str, reg) {
//         return str ? str.replace(reg || /[<">']/g, function (a) {
//             return {
//                 '<': '&lt;',
//                 '&': '&amp;',
//                 '"': '&quot;',
//                 '>': '&gt;',
//                 "'": '&#39;'
//             }[a]

//         }) : '';
//     },
//     /**
//      * 将str中的转义字符还原成html字符
//      * @see UE.utils.unhtml(String);
//      * @method html
//      * @param { String } str 需要逆转义的字符串
//      * @return { String } 逆转义后的字符串
//      * @example
//      * ```javascript
//      *
//      * var str = '&lt;body&gt;&amp;&lt;/body&gt;';
//      *
//      * //output: <body>&</body>
//      * console.log( UE.utils.html( str ) );
//      *
//      * ```
//      */
//     html: function (str) {
//         return str ? str.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function (m) {
//             return {
//                 '&lt;': '<',
//                 '&amp;': '&',
//                 '&quot;': '"',
//                 '&gt;': '>',
//                 '&#39;': "'",
//                 '&nbsp;': ' '
//             }[m]
//         }) : '';
//     },
// }
</script>
<style lang="scss" scoped>
</style>

