<script setup lang="ts">
import V3Emoji from './components/V3Emoji.vue';
const disableGroup = ['Food & Drink'];
const inputText = ref('');
const appendText = (val: string) => {
  inputText.value += val;
};
</script>

<template>
  <div id="app">
    <V3Emoji :disable-group="disableGroup" @click-emoji="appendText" />
    <p>点击我</p>
    <div>{{ inputText }}</div>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
