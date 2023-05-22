function thunk(store) {
  const next = store.dispatch
  function dispatchThunk(action) {
    if (typeof action === "function") {
      action(store.dispatch, store.getState)
    } else {
      next(action)
    }
  }
  store.dispatch = dispatchThunk
}

export default thunk
