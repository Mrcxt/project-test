<!--
 * @LastEditTime: 2020-04-17 17:38:48
 * @Description: 
 * @Date: 2020-04-16 21:45:54
 * @Author: @虾哔哔
 -->
<template>
  <div class="header max-width">
    <div class="blog">
      <img class="blog_logo" src="@/assets/image/logo.png" alt="" />
      <h1 class="blog_title">虾哔哔</h1>
    </div>
    <ul class="nav">
      <li
        class="nav-list"
        v-if="item.meta.navIsShow"
        v-for="(item, index) in routes"
        :key="index"
      >
        <router-link :to="item.path">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    routes() {
      return this.$router.options.routes[0].children;
    }
  },
  mounted() {
    console.log(this.$router.options.routes[0].children);
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .blog {
    display: inline-flex;
    align-items: center;
    .blog_logo {
      height: 50px;
    }
    .blog_title {
      margin: 0;
    }
  }
  .nav {
    display: flex;
    list-style: none;
    .nav-list {
      flex-shrink: 0;
      padding: 0 15px;
      &:not(:last-child) {
        border-right: 1px dotted @color-primary;
      }
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
      }
    }
  }
}
</style>
