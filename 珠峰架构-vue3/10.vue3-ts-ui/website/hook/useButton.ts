import { ref } from "vue";

export const useButton = () => {
    const buttonLoading = ref(true);
    const buttonClick = () => {
        console.log('handle-click')
    }
    setTimeout(() => {
        buttonLoading.value = false
    }, 3000);
    return {
        buttonClick,
        buttonLoading
    }
}