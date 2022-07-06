<template>
  <div class="pollup" ref="pollUpEl">
    <div class="tab-name" v-if="activeTab === 'recent'">
      <p sytle="margin:0 5px;">最近使用</p>
      <a class="delete-recent" @click="deleteRecent">删除所有选项</a>
    </div>
    <p class="tab-name" v-else>{{ activeTab }}</p>
    <div class="emoji-container">
      <template v-if="activeTab === 'recent'">
        <div
          class="emoji-container-item"
          v-for="(emoji, index) in recentData['recent']"
          :key="index"
          @click="clickEmoji(emoji)"
          :title="emoji.name"
          v-html="
            emoji.emoji +
            (emoji.skin_tone_support &&
            Number.parseInt(emoji.skin_tone_support_unicode_version) < 1.1
              ? Skin[skin]
              : '')
          "
        ></div>
      </template>
      <template v-else>
        <div
          class="emoji-container-item"
          v-for="(emoji, index) in renderData[activeTab]"
          :key="index"
          @click="clickEmoji(emoji)"
          :title="emoji.name"
          v-html="
            emoji.emoji +
            (emoji.skin_tone_support &&
            Number.parseInt(emoji.skin_tone_support_unicode_version) < 1.1
              ? Skin[skin]
              : '')
          "
        ></div>
      </template>
    </div>
    <div class="tab-container">
      <!-- 最近使用过的的选项 -->
      <div
        class="tab-item"
        v-if="needLocal"
        @click="changeTab('recent')"
        :class="{ active: activeTab === 'recent' }"
      >
        🔥
      </div>
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
import { filterData } from '../utils/emojiFilter';
import { getItem, removeItem, setItem } from '../utils/storage';
const Skin: Emoji.JsonData = {
  dark: '&#127999;',
  middark: '&#127998;',
  mid: '&#127997;',
  midlight: '&#127996;',
  light: '&#127995;',
  none: ''
};
const props = defineProps<{
  size: string;
  theme: 'dark' | 'default';
  skin: 'dark' | 'middark' | 'mid' | 'midlight' | 'light' | 'none';
  disableGroup: string[];
  optionsName: Emoji.JsonData;
  unicodeVersion: number;
  needLocal: boolean;
}>();
const emit = defineEmits(['clickEmoji']);
const emojiData: Emoji.JsonData = EmojiData;
const sizeData: Emoji.JsonData = SizeData;
const themeData: Emoji.JsonData = ThemeData;
const activeTab = ref('');
const pollUpEl = ref<HTMLElement>();
const renderData = filterData(
  emojiData,
  props.optionsName,
  props.unicodeVersion,
  props.disableGroup
);
const recentData = ref<Emoji.ObjectItem>(getItem('emoji-recent'));
const groupName: string[] = [];
for (let key in renderData) {
  groupName.push(key);
}
activeTab.value = groupName[0];
const changeTab = (tab: string) => {
  activeTab.value = tab;
};
const clickEmoji = (emoji: Emoji.EmojiItem) => {
  //增加一个最近使用的选项 来自本地存储
  if (props.needLocal) {
    if (!recentData.value) {
      setItem('emoji-recent', { recent: [emoji] });
    } else {
      if (recentData.value['recent'].length < 50) {
        const index = recentData.value['recent'].findIndex(item => {
          return item.emoji === emoji.emoji;
        });
        if (index === -1) {
          recentData.value['recent'].unshift(emoji);
        } else {
          recentData.value['recent'].splice(index, 1);
          recentData.value['recent'].unshift(emoji);
        }
      } else {
        //大于50的情况
        recentData.value['recent'].unshift(emoji);
        recentData.value['recent'].pop();
      }
      setItem('emoji-recent', recentData.value);
    }
  }
  emit('clickEmoji', emoji.emoji + Skin[props.skin]);
};
//删除所有最近使用过的emoji
const deleteRecent = () => {
  recentData.value['recent'] = [];
  removeItem('emoji-recent');
};
const changePos = () => {
  if (pollUpEl.value) {
    //这里就是打开弹出层 如果检测到上方空间不够 那就移动到下面
    if (pollUpEl.value.getBoundingClientRect().top < 0) {
      pollUpEl.value.style.bottom = 'unset';
      pollUpEl.value.style.top = '50px';
    }
    if (pollUpEl.value.getBoundingClientRect().left < 0) {
      pollUpEl.value.style.left = '0';
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
  .tab-name {
    font-size: $fontsize;
    margin: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .delete-recent {
      color: rgb(49, 190, 255);
      cursor: pointer;
    }
  }
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
