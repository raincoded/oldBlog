<template>
  <div>
    <div class="form-group">
      <label for="exampleInputName">邮箱</label>
      <input
        type="name"
        class="form-control"
        id="exampleInputName"
        placeholder="请输入邮箱"
        v-model="name"
        aria-describedby="nameHelp"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">邮箱</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        placeholder="请输入邮箱"
        v-model="email"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">密码</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        placeholder="请输入密码"
        v-model="password"
      />
    </div>
    <button type="submit" class="btn btn-primary" @click="submit">登录</button>
  </div>
</template>
<script>
import ajaxIndex from "@/ajax/index.js";
import xss from "xss";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    submit() {
      if (this.testName() && this.testEmail() && this.testPassword()) {
        ajaxIndex
          .login({
            name: this.name,
            email: this.email,
            password: this.password,
          })
          .then((req) => {
            if (req.code == 0) {
              this.$store.commit("userChange", req.data);
              this.$router.push({ name: "Index" });
            } else if (req.code == 500) {
              alert(req.msg);
            }
          })
          .catch((err) => {
           console.log(err);
          });
      }
    },
    testName() {
      this.name = xss(this.name);
      if (!this.name) {
        alert("邮箱不能为空！");
        return false;
      }
      return true;
    },
    testEmail() {
      this.email = xss(this.email);
      if (!this.email) {
        alert("邮箱不能为空！");
        return false;
      }
      return true;
    },
    testPassword() {
      this.password = xss(this.password);
      if (!this.password) {
        alert("密码不能为空！");
        return false;
      }
      return true;
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  background: #fff;
  border: 1px solid;
}
</style>