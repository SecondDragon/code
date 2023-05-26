import { ref } from "vue";

export function useCheckbox() {
    const checkVal = ref(['上海','深圳']);
    const checks = ref(['上海','北京','天津','深圳']);
    const checkboxChange = (val) =>{
      console.log(val)
    }
    return {
      checkVal,
      checkboxChange,
      checks
    }
  }