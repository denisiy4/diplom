<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    to: {
      type: Object,
      default: null
    }
  })

  const tag = computed(() => props.to ? 'router-link' : 'button')
</script>

<template>
  <component
    :is="tag"
    :to="to"
    class="
      inline-block
      px-4 py-2
      font-medium tracking-wide text-white capitalize
      transition-colors duration-200 transform
    bg-blue-600 rounded-md hover:bg-blue-500
      focus:outline-none focus:ring focus:ring-blue-300
      focus:ring-opacity-80
    "
  >
    <slot />
  </component>
</template>
