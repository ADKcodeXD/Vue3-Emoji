<template>
  <div class="pollup" ref="pollUpEl">
    <div class="emoji-container">
      <div
        class="emoji-container-item"
        v-for="(emoji, index) in renderData[activeTab]"
        :key="index"
        @click="clickEmoji(emoji.emoji)"
        :title="emoji.name"
      >
        {{ emoji.emoji }}
      </div>
    </div>
    <div class="tab-container">
      <div
        class="tab-item"
        v-for="tab in groupName"
        :title="tab"
        :key="tab"
        @click="changeTab(tab)"
        :class="{ active: tab === activeTab }"
      >
        {{ renderData[tab][0].emoji }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import EmojiData from '../assets/emojidata/emoji-data.json';
import { emojiFilter } from '../utils/emojiFilter';
const disableGroup = inject<string[]>('disableGroup', []);
const emit = defineEmits(['clickEmoji']);
const data: Emoji.ObjectItem = Object.create(EmojiData);
const activeTab = ref('');
const pollUpEl = ref<HTMLElement>();
const filterData = (data: any) => {
  let temp: Emoji.ObjectItem = {};
  for (let key in data) {
    if (!disableGroup.includes(key)) {
      temp[key] = data[key];
    }
  }
  return temp;
};
const renderData = filterData(data);
const groupName: string[] = [];
for (let key in renderData) {
  renderData[key] = emojiFilter(11, renderData[key]);
  groupName.push(key);
}
activeTab.value = groupName[0];
const changeTab = (tab: string) => {
  activeTab.value = tab;
};
const clickEmoji = (val: string) => {
  emit('clickEmoji', val);
};
const changePos = () => {
  if (pollUpEl.value) {
    //这里就是打开弹出层 如果检测到上方空间不够 那就移动到下面
    if (pollUpEl.value.getBoundingClientRect().top < 0) {
      pollUpEl.value.style.bottom = 'unset';
      pollUpEl.value.style.top = '50px';
    }
  }
};
onMounted(() => {
  changePos();
  document.addEventListener('scroll', changePos);
});
onBeforeUnmount(() => {
  document.removeEventListener('scroll', changePos);
});
</script>

<style lang="scss" scoped>
.pollup {
  width: 600px;
  height: 400px;
  position: absolute;
  right: 0;
  bottom: 50px;
  transition: all ease 0.5s;
  background-color: rgb(255, 255, 255);
  box-shadow: 3px 3px 10px rgba($color: #000000, $alpha: 0.3);
  border-radius: 15px;
  overflow: hidden;
  .emoji-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 50px);
    grid-template-rows: repeat(auto-fill, 50px);
    justify-content: space-between;
    overflow-y: auto;
    height: 90%;
    &-item {
      width: 30px;
      height: 30px;
      padding: 10px;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: #e7e7e7;
      }
    }
  }
  .tab-container {
    position: absolute;
    width: 100%;
    height: 10%;
    bottom: 0;
    display: flex;
    background-color: rgb(255, 255, 255);
    box-shadow: 3px 3px 10px rgba($color: #000000, $alpha: 0.3);
    .tab-item {
      padding: 15px;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &.active {
        background-color: rgb(192, 192, 192);
      }
    }
  }
}
</style>
