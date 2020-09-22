import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/contentMgr/user'
  },

  {
    path: '/contentMgr',
    component: Layout,
    redirect: 'user',
    meta: { title: '内容管理', icon: 'content', badge: 'contentMgr' },
    children: [
      {
        path: 'user',
        name: 'contentMgr/user',
        component: () => import('@/views/contentMgr/user'),
        meta: { title: '用户管理', icon: 'user', badge: 'user' }
      },
      {
        path: 'activity',
        name: 'contentMgr/activity',
        component: () => import('@/views/contentMgr/activity'),
        meta: { title: '活动内容管理', icon: 'activity', badge: 'activity' }
      },
      {
        path: 'avatorCensor',
        name: 'contentMgr/avatorCensor',
        component: () => import('@/views/contentMgr/avatorCensor'),
        meta: { title: '头像照片审核', icon: 'avator', badge: 'avatorCensor' }
      },
      {
        path: 'userImgCensor',
        name: 'contentMgr/userImgCensor',
        component: () => import('@/views/contentMgr/userImgCensor'),
        meta: { title: '用户照片审核', icon: 'userTrace', badge: 'userImgCensor' }
      },
      {
        path: 'activityImageCensor',
        name: 'contentMgr/activityImageCensor',
        component: () => import('@/views/contentMgr/activityImageCensor'),
        meta: { title: '活动照片审核', icon: 'picture', badge: 'activityImageCensor' }
      },
      {
        path: 'speechCensor',
        name: 'contentMgr/speechCensor',
        component: () => import('@/views/contentMgr/speechCensor'),
        meta: { title: '语音审核', icon: 'publish', badge: 'speechCensor' }
      },
      {
        path: 'report',
        name: 'contentMgr/report',
        component: () => import('@/views/contentMgr/report'),
        meta: { title: '举报内容管理', icon: 'report', badge: 'report' }
      },
      {
        path: 'banner',
        name: 'contentMgr/banner',
        component: () => import('@/views/contentMgr/banner'),
        meta: { title: '推荐Banner管理', icon: 'apecity_activitytype', badge: 'banner' }
      },
      {
        path: 'ranking',
        name: 'contentMgr/ranking',
        component: () => import('@/views/contentMgr/ranking'),
        meta: { title: '榜单管理', icon: 'role', badge: 'ranking' }
      }
    ]
  },

  // {
  //   path: '/operationMgr',
  //   component: Layout,
  //   redirect: '/operationMgr/activityType',
  //   meta: { title: '运营管理', icon: 'operation' },
  //   children: [
  // {
  //   path: 'activityType',
  //   name: 'operationMgr/activityType',
  //   component: () => import('@/views/operationMgr/activityType'),
  //   meta: { title: '活动类型', icon: 'activityType' }
  // },
  // {
  //   path: 'topic',
  //   name: 'operationMgr/topic',
  //   component: () => import('@/views/operationMgr/topic'),
  //   meta: { title: '热门话题', icon: 'topic' }
  // }
  // {
  //   path: 'interest',
  //   name: 'operationMgr/interest',
  //   component: () => import('@/views/operationMgr/interest'),
  //   meta: { title: '兴趣管理', icon: 'interest' }
  // },
  // {
  //   path: 'label',
  //   name: 'operationMgr/label',
  //   component: () => import('@/views/operationMgr/label'),
  //   meta: { title: '标签管理', icon: 'label' }
  // }
  //   ]
  // },

  {
    path: '/dataCenter',
    component: Layout,
    redirect: '/dataCenter/overview',
    meta: { title: '数据中心', icon: 'dataCenter' },
    children: [
      {
        path: 'overview',
        name: 'dataCenter/overview',
        component: () => import('@/views/dataCenter/overview'),
        meta: { title: '数据概览', icon: 'overview' }
      },
      {
        path: 'DAU',
        name: 'dataCenter/DAU',
        component: () => import('@/views/dataCenter/DAU'),
        meta: { title: 'DAU统计', icon: 'DAU' }
      },
      {
        path: 'MAU',
        name: 'dataCenter/MAU',
        component: () => import('@/views/dataCenter/MAU'),
        meta: { title: 'MAU统计', icon: 'MAU' }
      },
      {
        path: 'keep',
        name: 'dataCenter/keep',
        component: () => import('@/views/dataCenter/keep'),
        meta: { title: '留存分析', icon: 'keep' }
      },
      {
        path: 'userTrace',
        name: 'dataCenter/userTrace',
        component: () => import('@/views/dataCenter/userTrace'),
        meta: { title: '日均使用', icon: 'userTrace' }
      },
      {
        path: 'age',
        name: 'dataCenter/age',
        component: () => import('@/views/dataCenter/age'),
        meta: { title: '年龄分布', icon: 'age' }
      },
      {
        path: 'active',
        name: 'dataCenter/active',
        component: () => import('@/views/dataCenter/active'),
        meta: { title: '活跃时间', icon: 'active' }
      },
      {
        path: 'silent',
        name: 'dataCenter/silent',
        component: () => import('@/views/dataCenter/silent'),
        meta: { title: '沉默用户', icon: 'silent' }
      },
      {
        path: 'publish',
        name: 'dataCenter/publish',
        component: () => import('@/views/dataCenter/publish'),
        meta: { title: '发帖时间', icon: 'publish' }
      },
      {
        path: 'role',
        name: 'dataCenter/role',
        component: () => import('@/views/dataCenter/role'),
        meta: { title: '角色分布', icon: 'role' }
      },
      {
        path: 'group',
        name: 'dataCenter/group',
        component: () => import('@/views/dataCenter/group'),
        meta: { title: '类型分布', icon: 'group' }
      },
      {
        path: 'prefergroup',
        name: 'dataCenter/prefergroup',
        component: () => import('@/views/dataCenter/prefergroup'),
        meta: { title: '喜欢类型', icon: 'prefergroup' }
      },
      {
        path: 'activitytype',
        name: 'dataCenter/activitytype',
        component: () => import('@/views/dataCenter/activitytype'),
        meta: { title: '活动类型', icon: 'apecity_activitytype' }
      },
      {
        path: 'usercity',
        name: 'dataCenter/usercity',
        component: () => import('@/views/dataCenter/usercity'),
        meta: { title: '城市分布', icon: 'usercity' }
      },
      {
        path: 'qcode',
        name: 'dataCenter/qcode',
        component: () => import('@/views/dataCenter/qcode'),
        meta: { title: '二维码统计', icon: 'rise' }
      },
      {
        path: 'mjlive',
        name: 'dataCenter/mjlive',
        component: () => import('@/views/dataCenter/mjlive'),
        meta: { title: '面基动态', icon: 'prefergroup' }
      },
      {
        path: 'mjactive',
        name: 'dataCenter/mjactive',
        component: () => import('@/views/dataCenter/mjactive'),
        meta: { title: '面基活动', icon: 'publish' }
      }
      
    ]
  },
  {
    path: '/matchMgr',
    component: Layout,
    redirect: '/matchMgr/calc',
    meta: { title: '匹配度', icon: 'prefergroup' },
    children: [
      {
        path: 'calc',
        name: 'matchMgr/calc',
        component: () => import('@/views/matchMgr/calc'),
        meta: { title: '计算公式', icon: 'publish'}
      },
      {
        path: 'role',
        name: 'matchMgr/role',
        component: () => import('@/views/matchMgr/role'),
        meta: { title: '角色', icon: 'role' }
      },
      {
        path: 'body-self',
        name: 'matchMgr/body-self',
        component: () => import('@/views/matchMgr/body-self'),
        meta: { title: '身材', icon: 'age' }
      },
      {
        path: 'nature',
        name: 'matchMgr/nature',
        component: () => import('@/views/matchMgr/nature'),
        meta: { title: '性格', icon: 'group' }
      },
      {
        path: 'interest',
        name: 'matchMgr/interest',
        component: () => import('@/views/matchMgr/interest'),
        meta: { title: '兴趣因子', icon: 'prefergroup' }
      },
      {
        path: 'con',
        name: 'matchMgr/con',
        component: () => import('@/views/matchMgr/con'),
        meta: { title: '星座', icon: 'dataCenter' }
      },
    ]
  },
  {
    path: '/shopMgr',
    component: Layout,
    redirect: '/shopMgr/member',
    meta: { title: '商户管理', icon: 'usercity' },
    children: [
      {
        path: 'member',
        name: 'shopMgr/member',
        component: () => import('@/views/shopMgr/member'),
        meta: { title: '商户信息管理', icon: 'publish'}
      },
      {
        path: 'active',
        name: 'shopMgr/active',
        component: () => import('@/views/shopMgr/active'),
        meta: { title: '商户活动管理', icon: 'role' }
      },
      {
        path: 'hotmanager',
        name: 'shopMgr/hotmanager',
        component: () => import('@/views/shopMgr/hotmanager'),
        meta: { title: '热门管理', icon: 'activityType', badge: 'hotmanager' }
      }
    ]
  },
  {
    path: '/msgMgr',
    component: Layout,
    redirect: '/msgMgr/setting',
    meta: { title: '消息管理', icon: 'rise' },
    children: [
      {
        path: 'setting',
        name: 'msgMgr/setting',
        component: () => import('@/views/msgMgr/setting'),
        meta: { title: '消息设置', icon: 'user'}
      },
      {
        path: 'record',
        name: 'msgMgr/record',
        component: () => import('@/views/msgMgr/record'),
        meta: { title: '消息发送记录', icon: 'specify' }
      },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
