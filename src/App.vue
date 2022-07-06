<script setup lang="ts">
import V3Emoji from './components/V3Emoji.vue';
const inputText = ref('');
const appendText = (val: string) => {
  inputText.value += val;
};
const optionsName = {
  'Smileys & Emotion': '笑脸&表情',
  'Food & Drink': '食物&饮料'
};
const disableGroup = ['食物&饮料'];
</script>

<template>
  <div id="app">
    <div style="margin-top: 500px; display: flex; flex-direction: column; align-items: center">
      <V3Emoji
        :disable-group="disableGroup"
        @click-emoji="appendText"
        :options-name="optionsName"
        :recent="true"
      />
      <p>点击我</p>
      <input v-model="inputText" type="textarea" style="width: 300px" />
    </div>
  </div>
  <V3Emoji
    :disable-group="disableGroup"
    @click-emoji="appendText"
    :options-name="optionsName"
    :recent="true"
  />
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
