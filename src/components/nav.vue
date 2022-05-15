<script setup>
  import Button from './button.vue';

  const actions = [
    {
      name: 'Додавання', value: 'plus',
    },
    {
      name: 'Віднімання', value: 'minus',
    },
    {
      name: 'Множення', value: 'multiple',
    },
    {
      name: 'Ділення', value: 'division',
    },
  ]
</script>

<template>
  <ul class="flex space-x-2">
    <li v-for="action in actions" :key="action.value">
      <Button :to="{name: 'task-view', query: {type: action.value}}">
        {{ action.name }}
      </Button>
    </li>
  </ul>
</template>
