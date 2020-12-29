<!--
 * @LastEditTime: 2020-04-17 17:34:53
 * @Description: 
 * @Date: 2020-04-16 21:38:34
 * @Author: @虾哔哔
 -->
<template>
  <div class="layout max-width">
    <header>
      <Header />
    </header>
    <!--  -->
    <div class="main">
      <router-view />
    </div>
    <!--  -->
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default {
  components: {
    Header,
    Footer
  },
  mounted() {
    // this.getIssuesDetails();
  },
  methods: {
    getIssuesDetails() {
      let params = {
        number: 1
      };
      this.$store.dispatch("getIssuesDetails", params).then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>

<style lang="less" scoped>
@header-height: 80px;
.layout {
  position: relative;
  header {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 999;
    height: @header-height;
    background-color: #fff;
    box-shadow: @box-shadow-1;
  }
  .main {
    margin-top: @header-height + 20px;
  }
  footer {
  }
}
</style>
