<template>
  <div class="article">
    <section class="article__content" v-html="md"></section>
  </div>
</template>

<script>
  import {
    onMounted,
    ref
  } from "vue";
  import {
    useStore
  } from 'vuex'
  import marked from '@/utils/marked.js';

  export default {
    setup() {
      const store = useStore();

      const md = ref(null);

      onMounted(() => getIssuesDetails())

      const getIssuesDetails = async (number = 1) => {
        let params = {
          number: number
        };
        await store.dispatch("getIssuesDetails", params).then(res => {
          const {
            data: {
              body
            }
          } = res
          md.value = marked(body)
        });
      }

      return {
        md
      }
    }
  };
</script>

<style lang="scss" scoped>
  .article {
    &__content :deep {
      h2 {
        &::before {
          content: '#';
          margin-right: .1rem;
          color: cadetblue;
        }
      }
    }
  }
</style>