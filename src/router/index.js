import Vue from 'vue';
import Router from 'vue-router';

import login from '../views/login/login';
import layout from "../layout";

import inBoxMessage from '../views/message/inBox.vue';
import outBoxMessage from '../views/message/outBox.vue';
import draftBoxMessage from '../views/message/draftBox.vue';
import rubbishBoxMessage from '../views/message/rubbishBox.vue';
import deletedBoxMessage from '../views/message/deletedBox.vue';

import goodsList from "../views/goods/goodsList.vue";
import applyList from "../views/goods/applyList.vue";

import writeMessagePage from '../views/message/write';

Vue.use(Router);



export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout,
      children: [{
        path: '/message/inBox',
        name: 'inBoxMessage',
        component: inBoxMessage

      }, {
        path: '/message/outBox',
        name: 'outBoxMessage',
        component: outBoxMessage
      }, {
        path: '/message/draftBox',
        name: 'draftBoxMessage',
        component: draftBoxMessage
      }, {
        path: '/message/rubbishBox',
        name: 'rubbishBoxMessage',
        component: rubbishBoxMessage
      }, {
        path: '/message/deletedBox',
        name: 'deletedBoxMessage',
        component: deletedBoxMessage
      }, {
        path: '/message/write',
        name: 'writeMessagePage',
        props: true,
        component: writeMessagePage
      }, {
        path: '/goods/list',
        name: 'goodsList',
        props: true,
        component: goodsList
      }, {
        path: '/apply/list',
        name: 'applyList',
        props: true,
        component: applyList
      }]
    },

  ]
})
