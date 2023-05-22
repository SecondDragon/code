<script lang="jsx">
  import About from './About.vue'

  export default {
    data() {
      return {
        counter: 0
      }
    },

    render() {
      return (
        <div class="app">
          <h2>当前计数: { this.counter }</h2>
          <button onClick={ this.increment }>+1</button>
          <button onClick={ this.decrement }>-1</button>
          <About/>
        </div>
      )
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

<style lang="less" scoped>

</style>
