<script setup>
import { computed } from 'vue';
import Nav from '../components/nav.vue';
import { storage } from '../services/storage';

const score = storage.get()

const hasScore = computed(() => Object.keys(score).length > 0)
</script>

<template>
  <div class="space-y-10">
    <h1 class="title">
      Юний математик
    </h1>
    <Nav />
    <div>
      <h2 class="title">
        Статистика
      </h2>

      <table
        v-if="hasScore"
        class="border-collapse table-auto w-full text-sm mt-10"
      >
        <thead>
          <tr>
            <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
              Операція
            </th>
            <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
              Кращий результат
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="s in score" :key="s.title">
            <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
              {{ s.title }}
            </td>
            <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
              {{ s.score }}
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else class="text-slate-400 text-center">
        Поки що немає результатів
      </p>
    </div>
  </div>
</template>

<style scoped>
.title {
  @apply text-center text-rose-500 text-5xl;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>
