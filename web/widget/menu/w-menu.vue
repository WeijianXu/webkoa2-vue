<template>
  <ul v-if="menus.length" class="w-nav w-navbar">
    <menu-item v-for="(menu, index) in menus" :menu="menu" :key="index.id" :index="index"></menu-item>
  </ul>
</template>
<script>
import MenuItem from './menu-item.vue';
export default {

  name: 'w-menu',

  props: {
    menus: {
      type: Array,
      required: true,
      default: []
    }
  },
  components: {
    'menu-item': MenuItem
  }
};
</script>
<style lang="less">
@import '../common/config.less';
.w-nav {
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
  border-left: @menuBorder;
  li {
    position: relative;
    display: block;
    border-right: @menuBorder;
    a {
      line-height: 3em;
      display: block;
      padding: 0 15px;
    }
  }
}

.w-navbar {
  margin: 0;
  position: relative;
  z-index: 1032;
  float: left;
  li {
    float: left;
    a {
      color: @menuColor;
      &:hover {
        background: @menuActiveColor;
      };
    }
  }
  .w-dropdown-menu {
    margin-top: 0;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
}
</style>
