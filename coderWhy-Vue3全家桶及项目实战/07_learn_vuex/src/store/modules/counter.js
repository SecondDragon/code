const counter = {
  namespaced: true,
  state: () => ({
    count: 99
  }),
  mutations: {
    incrementCount(state) {
      console.log(state)
      state.count++
    }
  },
  getters: {
    doubleCount(state, getters, rootState) {
      return state.count + rootState.rootCounter
    }
  },
  actions: {
    incrementCountAction(context) {
      context.commit("incrementCount")
    }
  }
}

export default counter
