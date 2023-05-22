<script>
  import { h } from 'vue'
  import Home from "./Home.vue"

  export default {
    data() {
      return {
        counter: 0
      }
    },

    render() {
      return h("div", { className: "app" }, [
        h("h2", null, `当前计数: ${this.counter}`),
        h("button", { onClick: this.increment }, "+1"),
        h("button", { onClick: this.decrement }, "-1"),
        h(Home)
      ])
    },
    methods: {
      increment() {
        this.counter++
      },
      decrement() {
        this.counter--
      }
    }
  }
</script>

<style scoped>

</style>
