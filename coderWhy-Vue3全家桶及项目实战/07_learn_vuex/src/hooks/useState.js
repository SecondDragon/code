import { computed } from 'vue'
import { useStore, mapState } from 'vuex'

export default function useState(mapper) {
  const store = useStore()
  const stateFnsObj = mapState(mapper)
  
  const newState = {}
  Object.keys(stateFnsObj).forEach(key => {
    newState[key] = computed(stateFnsObj[key].bind({ $store: store }))
  })

  return newState
}

