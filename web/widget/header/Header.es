import './header.less';
import Vue from 'vue';
import Menu from '../menu/w-menu.vue';
import Logo from './w-logo.vue';
let menusData = [{
  id: '01000000',
  name: '首页',
  url: '/'
}, {
  id: '02000000',
  name: '下拉菜单',
  controller: '/dropdown',
  children: [{
    id: '01010000',
    name: 'First item',
    url: '/first'
  }, {
    id: '01020000',
    name: 'Second item',
    url: '/second'
  }, {
    id: '01030000',
    name: 'Third item',
    url: '/third'
  }]
}, {
  id: '03000000',
  name: '关于我们',
  url: '/about'
}];
let logoData = {
  homePage: '/index/index',
  url: '/images/logo.png',
  title: '管理平台',
  subtitle: 'Manage Platform'
};
import './images/logo.png';

let Header = {
  init() {
    this.vm = new Vue({
      el: '#header',
      data() {
        return {
          menus: menusData,
          logo: logoData
        };
      },
      components: {
        'w-menu': Menu,
        'w-logo': Logo
      }
    });
  }
};
export default Header;