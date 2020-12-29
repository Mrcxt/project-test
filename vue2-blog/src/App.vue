<!--
 * @LastEditTime: 2020-04-17 17:41:51
 * @Description: 
 * @Date: 2020-04-16 15:30:37
 * @Author: @虾哔哔
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  display: flex;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #2c3e50;
  font-size: 14px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  & > * {
    flex: 1;
  }
  a {
    border-bottom: 1px solid @color-primary;
    color: @color-primary;
    text-decoration: none;
    &:hover {
      border-bottom: 1px solid @color-primary;
    }
  }
  .max-width {
    margin: 0 auto;
    padding: 0 15px;
    max-width: 768px;
    width: 100%;
  }
}
</style>
