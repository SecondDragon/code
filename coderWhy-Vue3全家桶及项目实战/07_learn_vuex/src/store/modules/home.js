export default {
  state: () => ({
    // 服务器数据
    banners: [],
    recommends: []
  }),
  mutations: {
    changeBanners(state, banners) {
      state.banners = banners
    },
    changeRecommends(state, recommends) {
      state.recommends = recommends
    }
  },
  actions: {
    fetchHomeMultidataAction(context) {
      return new Promise(async (resolve, reject) => {
        // 3.await/async
        const res = await fetch("http://123.207.32.32:8000/home/multidata")
        const data = await res.json()
        
        // 修改state数据
        context.commit("changeBanners", data.data.banner.list)
        context.commit("changeRecommends", data.data.recommend.list)

        resolve("aaaaa")
      })
    }
  }
}
