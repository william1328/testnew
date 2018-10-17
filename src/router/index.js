import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
    {
      path: '/',
      meta:{page_title:'首页'},
      component: resolve => require(['../pages/index.vue'], resolve)
    },
    {
      path: '/login',
      meta:{page_title:'登录',noLogin:true},
      component: resolve => require(['../pages/login.vue'], resolve)
    },
    {
      path: '/subjects',
      meta:{page_title:'科目管理',parent_id:'2'},
      component: resolve => require(['../pages/subjects.vue'], resolve),
    },
    {
        name:'subjectsEditOrAdd',
        path: '/subjects/edit',
        meta:{page_title:'添加专题',parent_id:'1'},
        component: resolve => require(['../pages/subjects_edit.vue'], resolve),
    },
    {
        path: '/lesson/add',
        meta:{page_title:'添加课程',parent_id:'1'},
        component: resolve => require(['../pages/login.vue'], resolve),
    },
    {
        path: '/cards',
        meta:{page_title:'学习卡管理',parent_id:'2'},
        component: resolve => require(['../pages/cards.vue'], resolve),
    },

    {
        name:'cardsEditOrAdd',
        path: '/cards/new',
        meta:{page_title:'学习卡创建',parent_id:'1',no_menu:true},
        component: resolve => require(['../pages/card_edit.vue'], resolve),
    },
    {
      path: '/exams',
      meta:{page_title:'考试',nav_id:'2'},
      component: resolve => require(['../pages/exams.vue'], resolve),
    },
    {

        path: '/exams/add',
        meta:{page_title:'考试专题',parent_id:'2'},
        component: resolve => require(['../pages/login.vue'], resolve),
    },
    {
        path: '/exams/add',
        meta:{page_title:'添加课程',parent_id:'2'},
        component: resolve => require(['../pages/login.vue'], resolve),
    },
    {
        path: '/questions',
        meta:{page_title:'题库管理',parent_id:'2'},
        component: resolve => require(['../pages/questions.vue'], resolve),
    },
    {
        path: '/questionsEdit',
        meta:{page_title:'题库编辑',parent_id:'2',no_menu:true},
        component: resolve => require(['../pages/questionsEdit.vue'], resolve),
    },
    {
      path: '/orders',
      meta:{page_title:'订单管理',nav_id:'3'},
      component: resolve => require(['../pages/orders.vue'], resolve),
    },
    {
        path: '/orders/add',
        meta:{page_title:'考试专题',parent_id:'3'},
        component: resolve => require(['../pages/login.vue'], resolve),
    },
    {
        path: '/orders/add',
        meta:{page_title:'添加课程',parent_id:'3'},
        component: resolve => require(['../pages/login.vue'], resolve),
    },
    {
        path: '/material',
        meta:{page_title:'运营',nav_id:'7'},
        component: resolve => require(['../pages/material .vue'], resolve),
    },
    {
        path: '/material',
        meta:{page_title:'素材管理',parent_id:'7'},
        component: resolve => require(['../pages/material .vue'], resolve),
    },

    {
        path: '/info',
        meta:{page_title:'资讯',nav_id:'8'},
        component: resolve => require(['../pages/info.vue'], resolve),
    },
    {
        name:'infoEditOrNew',
        path: '/info/new',
        meta:{page_title:'添加信息',parent_id:'8'},
        component: resolve => require(['../pages/info_edit.vue'], resolve),
    },   

    {
        path: '/messages',
        meta:{page_title:'信息管理',nav_id:'5'},
        component: resolve => require(['../pages/messages.vue'], resolve),
    },
    {
        name:'messagesEditOrNew',
        path: '/messages/new',
        meta:{page_title:'添加信息',parent_id:'5'},
        component: resolve => require(['../pages/messages_edit.vue'], resolve),

    },         

    {
      path: '/users',
      meta:{page_title:'用户管理',nav_id:'4'},
      component: resolve => require(['../pages/users.vue'], resolve),
    },

    {
        path: '/permissions',
        meta:{page_title:'权限管理',nav_id:'6'},
        component: resolve => require(['../pages/permissions.vue'], resolve),
    },
    {
        path: '/users',
        meta:{page_title:'会员列表',parent_id:'4'},
        component: resolve => require(['../pages/users.vue'], resolve),
    },
    {
        path: '/users/manager',
        name:"usersManager",
        meta:{page_title:'管理员',parent_id:'4'},
        component: resolve => require(['../pages/manager.vue'], resolve),
    },
    {
        path: '/users/info',
        name:"usersInfo",
        meta:{page_title:'',parent_id:'4'},
        component: resolve => require(['../pages/users_info.vue'], resolve),
    },
  ]
})
