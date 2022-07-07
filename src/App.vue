<script setup lang="ts">
import V3Emoji from './components/V3Emoji.vue';
const inputText = ref('');
const clickEmoji = (val: any) => {
  clickEvent.value = val;
  console.log(val);
};
const optionsName = {
  'Smileys & Emotion': '笑脸&表情',
  'Food & Drink': '食物&饮料'
};
const disableGroup = ['食物&饮料'];
const abc = ref('这里是双向绑定的值');
const clickEvent = ref('');
</script>

<template>
  <div id="app">
    <div>
      <h1>输入你的emoji</h1>
      <div class="text-area">
        <V3Emoji
          :disable-group="disableGroup"
          @click-emoji="clickEmoji"
          :options-name="optionsName"
          :recent="true"
          default-select="Animals & Nature"
          :fulldata="true"
          :textArea="true"
          :keep="false"
          size="big"
          :customSize="{ width: 500, height: 300 }"
          v-model="abc"
        />
      </div>
      <input style="width: 100%; margin-top: 10px" v-model="abc" />
      <button @click="abc = ''">清空</button>
    </div>
    <h2>你当前点击的是</h2>
    {{ clickEvent }}
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
.text-area {
  width: 800px;
  height: 300px;
}
</style>
