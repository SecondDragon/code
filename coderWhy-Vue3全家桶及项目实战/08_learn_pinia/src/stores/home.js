import { defineStore } from 'pinia'

const useHome = defineStore("home", {
  state: () => ({
    banners: [],
    recommends: []
  }),
  actions: {
    async fetchHomeMultidata() {
      const res = await fetch("http://123.207.32.32:8000/home/multidata")
      const data = await res.json()

      this.banners = data.data.banner.list
      this.recommends = data.data.recommend.list
      
      // return new Promise(async (resolve, reject) => {
      //   const res = await fetch("http://123.207.32.32:8000/home/multidata")
      //   const data = await res.json()

      //   this.banners = data.data.banner.list
      //   this.recommends = data.data.recommend.list

      //   resolve("bbb")
      // })
    }
  }
})

export default useHome
