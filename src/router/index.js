import Vue from 'vue'
import VueRouter from 'vue-router' 
/**
 * 重写路由的push方法
*/
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
// 登录/注册页面
import Login from '../components/login/Login.vue'
import Register from '../components/login/Register.vue'
// 首页的书籍页面
import Index from '../components/home/Index.vue'
import Welcome from '../components/book/Welcome.vue'
import Newbook from '../components/book/Newbook.vue'
import Popularbook from '../components/book/Popularbook.vue'
import Guessbook from '../components/book/GuessBook.vue'
import Recommendbook from '../components/book/Recommendbook.vue'
import Searchbook from '../components/book/SearchBook.vue'
// 历史评分页面
import HistoryScore from '../components/score/historyScore.vue'
// 个人资料页面
import Personal from '../components/score/Personal.vue'
// 书籍分类页面
import Social from '../components/category/Social.vue'
import History from '../components/category/History.vue'
import Novel from '../components/category/Novel.vue'
import Study from '../components/category/Study.vue'
import Economic from '../components/category/Economic.vue'
import Life from '../components/category/Life.vue'
import Success from '../components/category/Success.vue'
import Original from '../components/category/Original.vue'
// 后台管理页面
import Management from '../components/home/Management.vue'
import Users from '../components/management/Users.vue'
import Report from '../components/management/Report.vue'
import Roles from '../components/management/Roles.vue'
import Books from '../components/management/Books.vue'
import Express from '../components/management/Express.vue'
import Hot from '../components/management/Hot.vue'

Vue.use(VueRouter)


 const routes = [
	{
		path: '/',
		redirect:'index',
	},
	{
		path: '/index',
		component: Index,
		redirect:'welcome',
		children: [
			{
			path: '/welcome',
			component: Welcome,
			redirect:'/newbook',
			children: [
				{
					path: '/newbook',
					component: Newbook,
				},
				{
				path: '/popularbook',
				component: Popularbook
				},
				{
				path: '/guessbook',
				component: Guessbook
				},
				{
					path: '/recommendbook',
					component: Recommendbook
				},
				{
					path: '/searchbook',
					component: Searchbook
				},
				]
			},
			{
				path:'/social',
				component: Social,
			},
			{
				path: '/histScore',
				component: HistoryScore,
			},
			{
				path:'/history',
				component: History,
			},
			{
				path:'/novel',
				component: Novel,
			},
			{
				path:'/study',
				component: Study,
			},
			{
				path:'/economic',
				component: Economic,
			},
			{
				path:'/life',
				component: Life,
			},
			{
				path:'/success',
				component: Success,
			},
			{
				path:'/original',
				component: Original,
			},
		]
	},
	{
		path: '/management',
		component: Management,
		redirect:'/users',
		children: [
			{path: '/users',component: Users},
			{path: '/report',component: Report},
			{path: '/roles',component: Roles},
			{path: '/books',component: Books},
			{path: '/express',component: Express},
			{path: '/hot',component: Hot},
		]
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/register',
		component: Register
	},
	{
		path: '/personal',
		component: Personal,
	},
	{
		path: '/about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
	}
]

const router = new VueRouter({
	routes
})
// 挂载路由导航守卫 router路由 添加beforeEach导航守卫 
// router.beforeEach((to,from,next) =>{
// 	// to 将要访问的路径
// 	// from 代表从哪个路径跳转而来
// 	//  next 是一个函数, 表示放行 next()放行 next('login') 强制跳转
// 	// 如果路径是login或者是index的就不用继续执行,不是的话就需要跳转到login页面先登录
// 	if(to.path === '/login'||to.path === '/index') return next();
// 	// 获取token
// 	const tokenStr = window.sessionStorage.getItem('token')
// 	if(!tokenStr) return next('login')
// 	next()
// })


export default router
