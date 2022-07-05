<script setup lang="ts">
import V3Emoji from './components/V3Emoji.vue';
import PollUp from './components/PollUp.vue';
const disableGroup = ['Food & Drink'];
const inputText = ref('');
const appendText = (val: string) => {
  inputText.value += val;
};
</script>

<template>
  <div id="app">
    <div style="position: relative; align-self: flex-start; margin-left: 300px; display: flex">
      <p>small</p>
      <PollUp size="small" theme="default" />
    </div>
    <div style="position: relative; align-self: center">
      <p>mid</p>
      <PollUp size="mid" theme="default" />
    </div>
    <div style="position: relative; align-self: flex-end">
      <p>big</p>
      <PollUp size="big" theme="default" />
    </div>
    <div style="margin-top: 600px; display: flex; flex-direction: column; align-items: center">
      <V3Emoji :disable-group="disableGroup" @click-emoji="appendText" theme="dark" />
      <p>点击我</p>
      <input v-model="inputText" type="textarea" style="width: 300px;" />
    </div>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
