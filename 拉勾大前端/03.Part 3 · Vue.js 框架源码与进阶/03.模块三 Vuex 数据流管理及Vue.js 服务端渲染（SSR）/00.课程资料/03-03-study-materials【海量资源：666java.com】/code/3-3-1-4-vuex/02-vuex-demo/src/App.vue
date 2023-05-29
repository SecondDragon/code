<template>
  <div id="app">
    <h1>Vuex - Demo</h1>
    <!-- count：{{ $store.state.count }} <br>
    msg: {{ $store.state.msg }} -->
    <!-- count：{{ count }} <br>
    msg: {{ msg }} -->

    count：{{ num }} <br>
    msg: {{ message }}

    <h2>Getter</h2>
    <!-- reverseMsg: {{ $store.getters.reverseMsg }} -->
    reverseMsg: {{ reverseMsg }}

    <h2>Mutation</h2>
    <!-- <button @click="$store.commit('increate', 2)">Mutation</button> -->
    <button @click="increate(3)">Mutation</button>

    <h2>Action</h2>
    <!-- <button @click="$store.dispatch('increateAsync', 5)">Action</button> -->
    <button @click="increateAsync(6)">Action</button>

    <h2>Module</h2>
    <!-- products: {{ $store.state.products.products }} <br>
    <button @click="$store.commit('setProducts', [])">Mutation</button> -->
    products: {{ products }} <br>
    <button @click="setProducts([])">Mutation</button>

    <h2>strict</h2>
    <button @click="$store.state.msg = 'Lagou'">strict</button>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    // count: state => state.count
    // ...mapState(['count', 'msg'])
    ...mapState({ num: 'count', message: 'msg' }),
    ...mapGetters(['reverseMsg']),
    ...mapState('products', ['products'])
  },
  methods: {
    ...mapMutations(['increate']),
    ...mapActions(['increateAsync']),
    ...mapMutations('products', ['setProducts'])
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
