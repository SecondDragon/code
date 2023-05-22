import { createRouter, createWebHashHistory } from 'vue-router'
import routes, { beforeEachHandler, afterEachHandler } from './config'
import happyFramework from '../framework'
import { upgradeRouter, useRouteAlive } from 'happykit'
import LoadPlaceholder from '@/views/home/load-placeholder'
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes // short for `routes: routes`
})

// 升级路
const happyKitRouter = upgradeRouter(happyFramework, router)

router.beforeEach(beforeEachHandler)
router.afterEach(afterEachHandler)

const { getCached, getIncludes, RouteAlive, removeComponentCache } = useRouteAlive({
  framework           : happyFramework,
  router,
  placeHolderComponent: LoadPlaceholder
})

export {
  getCached, getIncludes, RouteAlive, removeComponentCache
}

export default happyKitRouter
