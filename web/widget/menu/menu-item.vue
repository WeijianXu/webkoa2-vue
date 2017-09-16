<template>
  <li>
    <a :href="menu.url" :class="{'w-nemu-active': isActive}" @click="activeMenu">{{menu.name}}</a>
    <ul v-if="hasChild" class="w-dropdown-menu" :class="{'w-dropdown-open': isOpened}">
      <li v-for="child in menu.children">
        <a :href="child.url">{{child.name}}</a>
      </li>
    </ul>
  </li>
</template>
<script>
export default {
  name: 'menu-item',
  props: {
    menu: {
      type: Object,
      required: true,
      default: []
    }
  },
  data() {
    return {
      isActive: false, // 当前菜单是否选中
      isOpened: false // 切换下拉菜单的显示与隐藏
    };
  },
  computed: {
    hasChild() {
      return this.memu.children.length ? true : false;
    }
  },
  methods: {
    activeMenu() {
      if (this.hasChild) {
        this.isOpened = !this.isOpened; // 切换下拉菜单的显示与隐藏
      } else if (this.isActive) {
        // 当前菜单已经选中，无需刷新页面
        return;
      } else {
        // 没有下拉菜单时，默认事件：直接跳转
        this.isActive = true;
      }
    }
  }
};
</script>
<style lang="less">
.w-nemu-active {
  background: @menuActiveColor;
}

.w-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 12em;
  background: #fff;
  padding: 5px 0;
  border: 2px solid #ccc;
  box-shadow: none;
  list-style: none;
  font-size: 13px;
  border-radius: 2px;
  li {
    a {
      line-height: 32px;
    }
  }
}

.w-dropdown-open {
  display: block;

}
</style>
