import Vue from 'vue';
import Router from 'vue-router';

import login from '../views/login/login';
import layout from "../layout";
import recipientMessagePage from '../views/message/recipient';
import sendedMessagePage from '../views/message/sended';
import writeMessagePage from '../views/message/write';
import draftMessagePage from '../views/message/draft';
import rubbishMessagePage from '../views/message/rubbish';
import deletedMessagePage from '../views/message/deleted';

Vue.use(Router)

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
        path: '/message/recipient',
        name: 'recipientMessagePage',
        component: recipientMessagePage

      }, {
        path: '/message/sended',
        name: 'sendedMessagePage',
        component: sendedMessagePage
      }, {
        path: '/message/write',
        name: 'writeMessagePage',
        component: writeMessagePage
      }, {
        path: '/message/draft',
        name: 'draftMessagePage',
        component: draftMessagePage
      }, {
        path: '/message/rubbish',
        name: 'rubbishMessagePage',
        component: rubbishMessagePage
      }, {
        path: '/message/deleted',
        name: 'deletedMessagePage',
        component: deletedMessagePage
      }]
    },

  ]
})
