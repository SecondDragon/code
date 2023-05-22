import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./modules/counter"

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})


export default store
