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
  }
};
</script>
<style lang="less">
@menuActiveColor: #e5e5e5;
@menuColor: #555;
.w-nav {
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
  li {
    position: relative;
    display: block;
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
