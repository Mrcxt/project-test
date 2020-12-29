<!--
 * @LastEditTime: 2020-04-17 14:31:54
 * @Description: 
 * @Date: 2020-04-16 16:52:47
 * @Author: @虾哔哔
 -->
<template>
  <div class="article">
    <div class="js-toc"></div>
    <div class="content js-toc-content" v-html="md"></div>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";

import "@/style/markdown/github.less";
import "@/style/highlight/vue.less";
// import "highlight.js/styles/github.css";
import md from "@/mock/test.md";

export default {
  data() {
    return {
      md: null
    };
  },
  mounted() {
    this.marked();
  },
  methods: {
    marked() {
      const renderer = new marked.Renderer();

      renderer.code = function(code, language) {
        language = language ? language : "bash";
        return `<pre><code class="hljs language-${language}" data-language="${language}">${
          hljs.highlight(language, code).value
        }</code></pre>`;
      };

      marked.setOptions({
        renderer: renderer,
        breaks: true // md中的空行识别为分段，默认为false
      });

      this.md = marked(md);
    }
  }
};
</script>

<style lang="less" scoped>
.article {
  .content {
  }
}
</style>
