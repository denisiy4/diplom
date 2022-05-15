<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { randomNumber } from '../lib/random-number';
import { storage } from '../services/storage';
import { ExpressionGenerator } from '../services/expression-generator';
import Button from '../components/button.vue';

const IMAGE_NUMBER = randomNumber(4);
const imageUrl = computed(() => `/${IMAGE_NUMBER}.jpeg`);

const route = useRoute();
const brain = new ExpressionGenerator(route.query.type)

const score = ref(0)
const isFailed = ref(false)
const expression = ref(null)

function generate() {
  expression.value = brain.generate()
}

function handleCheck(value) {
  const is = brain.check(value)

  if (is) {
    score.value += 1
    generate()
  } else {
    isFailed.value = true

    if (score.value > 0) {
      storage.updateResult({
        operation: expression.value.operator,
        score: score.value
      })
    }
  }
}

function resetState() {
  isFailed.value = false
  score.value = 0

  generate()
}

onMounted(generate)
</script>

<template>
  <div class="w-96 h-3/4 flex flex-col space-y-2">
    <div class="flex justify-between items-center">
      <Button :to="{name: 'home-view'}">
        На головну
      </Button>

      <span
        v-if="!isFailed"
        class="text-3xl font-thin"
      >
        Результат: {{ score }}
      </span>

      <Button
        v-else
        @click="resetState"
      >
        Почату знову
      </Button>
    </div>

    <section class="border-gray-300 border relative flex-1 flex">
      <img
        :src="imageUrl"
        class="object-cover w-full h-full absolute left-0 top-0 blur-sm opacity-50"
      />

      <div
        v-if="!isFailed && expression !== null"
        class="z-1 relative px-5 py-10 flex flex-col h-full w-full"
      >
        <div class="text-7xl flex justify-center text-rose-500 expression">
          <span>
            {{ expression.firstOperand }}
          </span>

          <span>
            {{ expression.operator }}
          </span>

          <span>
            {{ expression.secondOperand }}
          </span>
          <span>
            = ?
          </span>
        </div>

        <div class="mt-auto space-y-4">
          <Button
            v-for="variant in expression.variants"
            :key="variant"
            class="w-full"
            @click="handleCheck(variant)"
          >
            {{ variant }}
          </Button>
        </div>
      </div>

      <div class="text-3xl text-center text-rose-500 m-auto expression" v-else>
        Кінець!
        <br>
        Твій результат: {{ score }}
      </div>
    </section>
  </div>
</template>

<style scoped>
.expression {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>
