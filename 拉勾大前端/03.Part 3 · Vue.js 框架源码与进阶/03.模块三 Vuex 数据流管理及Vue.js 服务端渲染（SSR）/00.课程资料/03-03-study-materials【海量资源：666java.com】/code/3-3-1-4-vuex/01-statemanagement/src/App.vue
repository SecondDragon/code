<template>
  <div id="app">
    <h1>父给子传值</h1>
    <parent01></parent01>

    <hr>
    <h1>子给父传值</h1>
    <parent02></parent02>

    <hr>
    <h1>不相关组件传值</h1>
    <sibling0301 :num="num"></sibling0301>
    <sibling0302></sibling0302>
  
    <hr>
    <h1>父直接访问子组件：通过 ref 获取子组件</h1>
    <parent04></parent04>

    <hr>
    <h1>简易的状态管理</h1>
    <componentA05></componentA05>
    <componentB05></componentB05>

  </div>
</template>

<script>
import parent01 from './components/01-props-down/01-Parent'
import parent02 from './components/02-event-up/02-Parent'
import sibling0301 from './components/03-event-bus/03-Sibling-01'
import sibling0302 from './components/03-event-bus/03-Sibling-02'
import parent04 from './components/04-ref/04-Parent'
import componentA05 from './components/05-easystate/05-componentA'
import componentB05 from './components/05-easystate/05-componentB'


export default {
  name: 'App',
  components: {
    parent01,
    parent02,
    sibling0301,
    sibling0302,
    parent04,
    componentA05,
    componentB05
  },
  data () {
    return {
      num: 1
    }
  }
}
</script>

<style>
</style>
