<template>
  <a :href="logo.homePage" class="w-logo">
    <img :src="logo.url" alt="My Admin" />
    <span class="w-logo-title">{{logo.title}}</span>
    <!-- <span class="w-logo-subtitle">{{logo.subtitle}}</span> -->
  </a>
</template>
<script>
export default {

  name: 'w-logo',
  props: {
    logo: {
      type: Object,
      required: true,
      default: {
        homePage: '/index/index',
        url: '/images/logo.png'
      }
    }
  }
};
</script>
<style lang="less" scoped>
.w-logo {
  text-transform: uppercase;
  font-weight: 600;
  display: inline-block;
  img {
    height: 2em;
    width: 2em;
    padding: 0.5em 1em;
    display: inline-block;
  }
  .w-logo-title {
    font-size: 1.4em;
    font-weight: bold;
    vertical-align: text-top;
  }
  /* .w-logo-subtitle {
    color: #8E8E8E;
    display: inline-block;
  } */
}
</style>
