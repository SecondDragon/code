<template>
  <h2>{{ fullname }}</h2>
  <button @click="setFullname">设置fullname</button>
  <h2>{{ scoreLevel }}</h2>
</template>

<script>
import { reactive, computed, ref } from 'vue'

  export default {
    setup() {
      // 1.定义数据
      const names = reactive({
        firstName: "kobe",
        lastName: "bryant"
      })

      // const fullname = computed(() => {
      //   return names.firstName + " " + names.lastName
      // })
      const fullname = computed({
        set: function(newValue) {
          const tempNames = newValue.split(" ")
          names.firstName = tempNames[0]
          names.lastName = tempNames[1]
        },
        get: function() {
          return names.firstName + " " + names.lastName
        }
      })

      console.log(fullname)

      function setFullname() {
        fullname.value = "coder why"
        console.log(names)
      }


      // 2.定义score
      const score = ref(89)
      const scoreLevel = computed(() => {
        return score.value >= 60 ? "及格": "不及格"
      })

      return {
        names,
        fullname,
        setFullname,
        scoreLevel
      }
    }
  }
</script>

<style scoped>
</style>

