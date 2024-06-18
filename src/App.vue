<template>
  <RouterView />
</template>

<script>
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  components: {
    RouterView
  }
})
</script>

<style scoped></style>
