<template>
  <router-view />
  <div @click="add">
    {{a}}
  </div>
</template>

<script>
  export default {
    setup() {
      // console.log(this);
    }
  }
</script>

<style lang="scss">
  html {
    font-size: (100/7.5) * 1vw;
  }

  body {
    margin: 0;
    width: 100%;
    font-size: 14px;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 100vh;
    display: flex;
    margin: 0 auto;
    box-sizing: border-box;
  }

  // @media 750px
  @media screen and (min-width: 750px) {
    html {
      font-size: 100px;
    }

    #app {
      width: 750px;
    }
  }
  // @media 750px
  @media screen and (min-width: 1024px) {
    html {
      font-size: 100px;
    }

    #app {
      width: 1024px;
    }
  }
</style>