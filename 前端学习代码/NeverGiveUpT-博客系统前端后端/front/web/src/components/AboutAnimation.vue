<template>
  <canvas ref="canvas" style="width:100%">Canvas not supported.</canvas>
</template>
<script>
import { about_fullScreenAnimation } from "@/utils";
export default {
  mounted() {
    about_fullScreenAnimation(this.$refs.canvas);
  }
};
</script>