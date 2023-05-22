import { defineStore } from 'pinia'


const useCityStore = defineStore("city", {
  state: () => ({
    cities: []
  }),
  actions: {

  }
})

export default useCityStore
