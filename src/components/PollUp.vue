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
import '../assets/styles/V3Emoji.scss';
import EmojiData from '../assets/emojidata/emoji-data.json';
import SizeData from '../assets/options/SizeData.json';
import ThemeData from '../assets/options/ThemeData.json';
import { emojiFilter } from '../utils/emojiFilter';
const props = defineProps<{
  size: string;
  theme: 'dark' | 'default';
}>();
const disableGroup = inject<string[]>('disableGroup', []);
const emit = defineEmits(['clickEmoji']);
const data: Emoji.ObjectItem = Object.create(EmojiData);
const sizeData: Emoji.JsonData = Object.create(SizeData);
const themeData: Emoji.JsonData = Object.create(ThemeData);
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
  if (pollUpEl.value) {
    for (let key in sizeData[props.size]) {
      pollUpEl.value.style.setProperty(`--${key}`, sizeData[props.size][key] + 'px');
    }
    for (let key in themeData[props.theme]) {
      pollUpEl.value.style.setProperty(`--${key}`, themeData[props.theme][key]);
    }
  }
});
onBeforeUnmount(() => {
  document.removeEventListener('scroll', changePos);
});
</script>

<style lang="scss" scoped>
$fontsize: var(--fontsize);
$itemsize: var(--itemsize);
$width: var(--width);
$rowsize: var(--rowsize);
$backgroundcolor: var(--backgroundcolor);
$hovercolor: var(--hovercolor);
$activecolor: var(--activecolor);
$shadowcolor: var(--shadowcolor);
.pollup {
  width: $width;
  height: 400px;
  position: absolute;
  right: 0;
  bottom: 50px;
  transition: all ease 0.5s;
  background-color: $backgroundcolor;
  box-shadow: 3px 3px 10px $shadowcolor;
  border-radius: 15px;
  overflow: hidden;
  .emoji-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, $rowsize);
    grid-template-rows: repeat(auto-fill, $rowsize);
    justify-content: space-between;
    overflow-y: auto;
    height: 90%;
    &-item {
      width: $itemsize;
      height: $itemsize;
      padding: 10px;
      font-size: $fontsize;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: $hovercolor;
      }
    }
  }
  .tab-container {
    position: absolute;
    width: 100%;
    height: 10%;
    overflow: auto;
    bottom: 0;
    display: flex;
    background-color: $backgroundcolor;
    box-shadow: 3px 3px 10px $shadowcolor;
    .tab-item {
      padding: 15px;
      font-size: $fontsize;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &.active {
        background-color: $activecolor;
      }
    }
  }
}
</style>
