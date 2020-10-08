<template>
<!-- 管理员页面 -->
    <div>admin</div>
</template>

<script>
import indexAjax from "@/ajax/index.js";
export default {
    mounted(){
        indexAjax.getArticleById(this.$route.params).then(req=>{
            console.log(req);
        })
    }
}
</script>