import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _73de07c4 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages/profile" */))
const _7848f966 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages/signup" */))
const _65a787bf = () => interopDefault(import('..\\pages\\hashtag\\_id\\index.vue' /* webpackChunkName: "pages/hashtag/_id/index" */))
const _3be62726 = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages/post/_id/index" */))
const _3d918998 = () => interopDefault(import('..\\pages\\user\\_id\\index.vue' /* webpackChunkName: "pages/user/_id/index" */))
const _216d0f2d = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/profile",
    component: _73de07c4,
    name: "profile"
  }, {
    path: "/signup",
    component: _7848f966,
    name: "signup"
  }, {
    path: "/hashtag/:id",
    component: _65a787bf,
    name: "hashtag-id"
  }, {
    path: "/post/:id",
    component: _3be62726,
    name: "post-id"
  }, {
    path: "/user/:id",
    component: _3d918998,
    name: "user-id"
  }, {
    path: "/",
    component: _216d0f2d,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
