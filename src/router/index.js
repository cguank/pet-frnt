import Vue from 'vue'
import Router from 'vue-router'

import {isLogin} from "@/assets/js/utils";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'withusercenter',
      component: () => import('@/components/withusercenter'),
      meta: {
        title: '首页',
        requireAuth: false
      },
      children: [
        {
        path: '/home',
        component: () => import('@/pages/home'),
        meta: {
          title: '首页',
          requireAuth: false
        }
      },
        {
          path: '/forum',
          name: 'forum',
          component: () => import('@/pages/forum'),
          meta: {
            title: '宠友圈',
            keepAlive: true,
            requireAuth: true //要true
          }
        },
        {
          path: '/petshop',
          name: 'petshop',
          component: () => import('@/pages/petshop'),
          meta: {
            title: '宠商城',
            requireAuth: false //要true
          }
        },
        {
          path: '/petinfo',
          name: 'petinfo',
          component: () => import('@/pages/petinfo'),
          meta: {
            title: '宠资讯',
            keepAlive: true,
            requireAuth: false //要true
          }
        },
        {
          path: '/notifydetail',
          name: 'notifydetail',
          component: () => import('@/pages/notifydetail'),
          meta: {
            title: '通知详情',
            requireAuth: false //要true
          }
        },
        {
          path: '/petinfodetail',
          name: 'petinfodetail',
          component: () => import('@/pages/petinfodetail'),
          meta: {
            title: '正文',
            requireAuth: false
          }
        },
        {
          path: '/usercenter',
          name: 'usercenter',
          component: () => import('@/pages/usercenter'),
          meta: {
            title: '个人中心',
            requireAuth: true
          }
        },
        {
          path: '/postdetail',
          name: 'postdetail',
          component: () => import('@/pages/postdetail'),
          meta: {
            title: '详情',
            requireAuth: true,
            keepAlive:true
          }
        },
        {
          path: '/watchmoreanswer',
          name:'watchmoreanswer',
          component: () => import('@/pages/watchmoreanswer'),
          meta: {
            title: '查看更多',
            requireAuth: true
          }
        },
      ]
    },
    {
      path: '/expertlist',
      component: () => import('@/pages/expertlist'),
      meta: {
        title: '专家列表',
        requireAuth: false
      }
    },
    {
      path: '/expertintroduction',
      component: () => import('@/pages/expertintroduction'),
      meta: {
        title: '专家简介',
        requireAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login'),
      meta: {
        title: '登录',
        requireAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/register'),
      meta: {
        title: '注册',
        requireAuth: false
      }
    },
    {
      path: '/registersuccess',
      name: 'registersuccess',
      component: () => import('@/pages/registersuccess'),
      meta: {
        title: '注册成功',
        requireAuth: false
      }
    },
    {
      path: '/forgetpwd',
      name: 'forgetpwd',
      component: () => import('@/pages/forgetpwd'),
      meta: {
        title: '忘记密码',
        requireAuth: false
      }
    },
    {
      path: '/resetpwdsuccess',
      name: 'resetpwdsuccess',
      component: () => import('@/pages/resetpwdsuccess'),
      meta: {
        title: '密码重置成功',
        requireAuth: false
      }
    },
    {
      path: '/counsel',
      component: () => import('@/pages/counsel'),
      meta: {
        title: '图文问诊',
        requireAuth: true //要true
      }
    },
    {
      path: '/consultationinstructions',
      name: 'consultationinstructions',
      component: () => import('@/pages/consultationinstructions'),
      meta: {
        title: '问诊须知',
        requireAuth: false
      }
    },
    {
      path: '/selfservice',
      name: 'selfservice',
      component: () => import('@/pages/selfservice'),
      meta: {
        title: '自助诊断',
        requireAuth: false
      }
    },
    {
      path: '/selfdiagnose',
      component: () => import('@/pages/selfdiagnose'),
      meta: {
        title: '自助诊断',
        requireAuth: true //要true
      }
    },
    {
      path: '/mycounsel',
      component: () => import('@/pages/mycounsel'),
      meta: {
        title: '我的问诊',
        requireAuth: true //要true
      }
    },
    {
      path: '/mycounseldetail',
      component: () => import('@/pages/mycounseldetail'),
      meta: {
        title: '我的问诊详情',
        requireAuth: true //要true
      }
    },
    {
      path: '/publishpost',
      component: () => import('@/pages/publishpost'),
      meta: {
        title: '发布',
        requireAuth: true //要true
      }
    },

    {
      path: '/usercenter',
      component: () => import('@/pages/usercenter'),
      meta: {
        title: '个人中心',
        requireAuth: true
      }
    },
    {
      path: '/userpage',
      component: () => import('@/pages/userpage'),
      meta: {
        title: '个人主页',
        requireAuth: true
      }
    },
    {
      path: '/mypet',
      component: () => import('@/pages/mypet'),
      meta: {
        title: '我的宠物',
        requireAuth: true
      }
    },
    {
      path: '/friends',
      component: () => import('@/pages/friends'),
      meta: {
        title: '宠友',
        requireAuth: true
      }
    },
    {
      path: '/collect',
      component: () => import('@/pages/collect'),
      meta: {
        title: '我的收藏',
        requireAuth: true
      }
    },
    {
      path: '/likesanddiscuss',
      component: () => import('@/pages/likesanddiscuss'),
      meta: {
        title: '消息',
        requireAuth: true
      }
    },
    {
      path: '/expertauthenticate',
      component: () => import('@/pages/expertauthenticate'),
      meta: {
        title: '专家认证',
        requireAuth: true
      }
    },
    {
      path: '/petdetail',
      component: () => import('@/pages/petdetail'),
      meta: {
        title: '宠物资料',
        requireAuth: true
      }
    },
    {
      path: '/changepetname',
      component: () => import('@/pages/changepetname'),
      meta: {
        title: '修改宠物名称',
        requireAuth: true
      }
    },
    {
      path: '/changepetsex',
      component: () => import('@/pages/changepetsex'),
      meta: {
        title: '修改宠物性别',
        requireAuth: true
      }
    },
    {
      path: '/changepetage',
      component: () => import('@/pages/changepetage'),
      meta: {
        title: '修改宠物年龄',
        requireAuth: true
      }
    },
    {
      path: '/changepetbirthday',
      component: () => import('@/pages/changepetbirthday'),
      meta: {
        title: '修改宠物生日',
        requireAuth: true
      }
    },
    {
      path: '/changepetweight',
      component: () => import('@/pages/changepetweight'),
      meta: {
        title: '修改宠物体重',
        requireAuth: true
      }
    },
    {
      path: '/changepetheadimg',
      component: () => import('@/pages/changepetheadimg'),
      meta: {
        title: '修改宠物头像',
        requireAuth: true
      }
    },
    {
      path: '/authenticate',
      component: () => import('@/pages/authenticate'),
      meta: {
        title: '专家认证',
        requireAuth: true
      }
    },
    {
      path: '/authenticatesendsuccess',
      component: () => import('@/pages/authenticatesendsuccess'),
      meta: {
        title: '提交成功',
        requireAuth: true
      }
    },
    {
      path: '/addfriends',
      component: () => import('@/pages/addfriends'),
      meta: {
        title: '添加好友',
        requireAuth: true
      }
    },
    {
      path: '/addpet',
      component: () => import('@/pages/addpet'),
      meta: {
        title: '添加宠物',
        requireAuth: true
      }
    },
    {
      path: '/addpetsuccess',
      component: () => import('@/pages/addpetsuccess'),
      meta: {
        title: '添加宠物成功',
        requireAuth: true
      }
    },

    {
      path: '/momentdetail',
      component: () => import('@/pages/momentdetail'),
      meta: {
        title: '娱乐休闲动态详情',
        requireAuth: true
      }
    },
    {
      path: '/publishmoment',
      component: () => import('@/pages/publishmoment'),
      meta: {
        title: '发布娱乐休闲动态',
        requireAuth: true
      }
    },
    {
      path: '/userInfo2',
      component: () => import('@/pages/userInfo2'),
      meta: {
        title: '新个人信息',
        requireAuth: true
      }
    },


  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    //console.log('token是', localStorage.getItem('token'))
    if (isLogin()) {
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});

// router.afterEach((to,from,next)=>{
//
//   window.scrollTo(0,0)
//
// })
export default router
