import Vue from 'vue';
import Router from 'vue-router';

import login from '../views/login/login';
import layout from "../layout";
import messageRecipient from '../views/message/recipient';
import messageSend from '../views/message/send';
import messageWrite from '../views/message/write';

Vue.use(Router)

export default new Router({
  routes: [
    {
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
        name: 'messageRecipient',
        component: messageRecipient

      }, {
        path: '/message/send',
        name: 'messageSend',
        component: messageSend
      }, {
        path: '/message/write',
        name: 'messageWrite',
        component: messageWrite
      }]
    },

  ]
})
