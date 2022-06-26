import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
// import { component } from 'vue/types/umd'
import mainView from '../views/mainView'
import selectAnswer from "../views/selectAnswer"
import register from '../views/register'
import personalCenter from '../views/personalCenter'
import resetPassword from '../views/resetPassword'
import userData from '../components/personalCenter/userData'
import bookDetail from '../views/bookDetail'
import note from '../views/note'
import collect from '../components/personalCenter/collect'
import notes from '../components/personalCenter/notes'
import comments from '../components/personalCenter/comments'
import recommend from '../components/personalCenter/recommend'
import adminCenter from '../views/adminCenter'
import adminRegister from '../views/adminRegister'
import adminLogin from '../views/adminLogin'
import adminData from '../components/adminCenter/adminData'
import adminComment from '../components/adminCenter/adminComments'
import adminNotes from '../components/adminCenter/adminNotes'
import adminBook from '../components/adminCenter/adminBook'
import adminBooks from '../components/adminCenter/adminBooks'
import adminUsers from '../components/adminCenter/adminUsers'
import test from '../views/test'
import chat from '../views/chat'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'/test',
      name: 'test',
      component: test
    },
    {
      path:'/chat',
      name:'chat',
      component: chat
    },
    {
      path:"/",
      redirect:"mainView"
    },
    {
      path: '/mainView',
      name: 'mainView',
      component: mainView,
      meta: {
        title: '图书交流平台'
      },
      children:[]
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        title: '账号注册'
      }
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: resetPassword,
      meta:{
        title: '找回密码'
      }
    },
    {
      path: '/adminCenter',
      name: 'adminCenter',
      component: adminCenter,
      redirect:"adminCenter/adminBook",
      meta:{
        title: '管理员中心'
      },
      beforeEnter: (to, from,next) => {
        if (!localStorage.getItem("AdminToken")) next({ name: 'adminLogin' })
        else next()
      },
      children:[
        {
          path: 'adminData',
          component: adminData
        },
        {
          path: 'adminComments',
          component: adminComment
        },
        {
          path: 'adminNotes',
          component: adminNotes
        },
        {
          path: 'adminBook',
          name:'adminBook',
          component: adminBook
        },
        {
          path: 'adminBooks',
          component: adminBooks
        },
        {
          path: 'adminUsers',
          component: adminUsers
        }
      ]
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: adminLogin,
      meta:{
        title: '管理员登录'
      },
    },
    {
      path: '/adminRegister',
      name: 'adminRegister',
      component: adminRegister,
      meta:{
        title: '管理员注册'
      },      
    },
    {
      path: '/personalCenter',
      redirect:'personalCenter/userData',
      name: 'personalCenter',
      component: personalCenter,
      meta: {
        title: '个人中心'
      },
      children:[{
        path: 'userData',
        component: userData,
        meta: {
          title: '个人中心'
        }
      },
      {
        path: 'comments',
        component: comments,
        meta: {
          title: '评论管理'
        }
      },
      {
        path: 'notes',
        component: notes,
        meta: {
          title: '图书笔记'
        }
      },
      {
        path: 'collect',
        component: collect,
        meta: {
          title: '收藏'
        }
      },
      {
        path: 'recommend',
        component: recommend,
        meta: {
          title: '推荐图书'
        }
      }
    ]
    },
    {
      path: '/selectView',
      name: 'selectView',
      component: selectAnswer,
      meta: {
        title: '图书查询'
      }
    },
    {
      path: '/bookDetail',
      name: 'bookDetail',
      component: bookDetail,
      meta: {
        title: '图书详情'
      },
    },
    {
      path: '/note',
      name: 'note',
      component: note,
      meta:{
        title: '读书笔记'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router