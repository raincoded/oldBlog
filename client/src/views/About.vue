<template>
  <div class="row m-0">
    <div class="col-12 bg-white my-2 shadow">
      <h3 class="border-bottom py-3 border-dark h4">关于我</h3>
      <dl class="mb-1">
        <dt class="d-inline mr-1">定位:</dt>
        <dd class="d-inline">安徽桐城</dd>
      </dl>
      <dl class="mb-1">
        <dt class="d-inline mr-1">出生年:</dt>
        <dd class="d-inline">1996年</dd>
      </dl>
      <dl class="mb-1">
        <dt class="d-inline mr-1">学历:</dt>
        <dd class="d-inline">大专</dd>
      </dl>
      <dl class="mb-1">
        <dt class="d-inline mr-1">邮箱:</dt>
        <dd class="d-inline"><a href="mailto:1614794159@qq.com" data-toggle="tooltip" data-placement="top" title="发送邮件">1614794159@qq.com</a></dd>
      </dl>
      <dl class="mb-1">
        <dt class="d-inline mr-1">简介:</dt>
        <dd class="d-inline">
          由于个人兴趣爱好，从18年开始学习前端，只不过一直都在html+css+js打转转，写些静态页面，直到19年才开始学习像jquery、bootstap这些后续知识，
          后来因为工作比较忙，学习的慢，于20年5月辞职开始深度学习前端知识，学习资料皆来自于网络资源，很感谢网络中能有各种资源提供学习。
          以前一直都好奇网站是怎么实现的，现在，我能够利用所学的知识，自己实现了博客，虽然还很弱小，但也满足的以前的好奇心。
          知识是无穷的，学习也永无止境。后面依然还有非常多的知识再等着我去学习。
        </dd>
      </dl>
    </div>
    <div class="col-12 bg-white my-2 shadow">
      <h3 class="border-bottom py-3 border-dark h4">关于博客</h3>
      <p>
        前端：<strong>vue</strong>，<strong>vuex</strong>，<strong>vue-router</strong>，<strong>bootstap</strong>，<strong>axios</strong>，<strong>xss</strong>，<strong
          >wangeditor</strong
        >
      </p>
      <p>
        后端：<strong>NodeJs</strong>，<strong>Express</strong>，<strong>sequelize</strong>，<strong>md5</strong>，<strong>multer</strong>，<strong>validate</strong>，<strong>xss</strong>，<strong
          >cookie-parser</strong
        >
      </p>
      <p>数据库：<strong>MySQL</strong></p>
      <p>包管理工具：<strong>yarn</strong></p>
      <p>仓库：<strong>git</strong></p>
      <p class="p-2 alert-primary">博客中依然有很多不足，待后续继续修正</p>
    </div>
    <div class="col-12 bg-white my-2 shadow">
      <h3 class="border-bottom py-3 border-dark h4">友情链接</h3>
      <p>以下是博主的一些好朋友的博客或github链接</p>
      <p>
        <a href="#" data-toggle="tooltip" data-placement="top" title="前往" class="mr-3 text-success">哈哈</a>
        <a href="#" data-toggle="tooltip" data-placement="top" title="前往" class="mr-3 text-success">哈哈</a>
        <a href="#" data-toggle="tooltip" data-placement="top" title="前往" class="mr-3 text-success">哈哈</a>
      </p>
    </div>
    <strong></strong>
  </div>
</template>
<script>
import indexAjax from "@/ajax/index.js";
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
export default {};
</script>
<style  lang="scss" scoped>
</style>