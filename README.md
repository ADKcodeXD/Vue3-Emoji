

# Vue 3 Emoji

一款简单的 ，还算好看的，基于Vue3编写的表情选择组件。

<img align=center src="https://s1.ax1x.com/2022/07/06/jazn9H.png">

## 启动本项目/start this project

```bash
git clone https://github.com/ADKcodeXD/Vue3-Emoji
cd Vue3-Emoji
yarn install
yarn dev
```

## 使用/Usage

使用npm

```bash
npm install vue3-emoji
```

使用yarn

```bash
yarn add vue3-emoji
```

在页面上

```vue
//example.vue
<script setup>
import V3Emoji from 'vue3-emoji'
import 'vue3-emoji/dist/style.css'
</script>

<template>
  <div>
    <V3Emoji />
  </div>
</template>

```

  当然 你可以自定义按钮

```html
<template>
  <div>
      <V3Emoji >
      	<div class="my-btn">
            btn
        </div>
      </V3Emoji>
  </div>
</template>
```

本组件支持了三种不同的大小

```vue
<template>
  <div>
      <V3Emoji size="big" />
      <V3Emoji size="small" />
      <V3Emoji size="mid" />
  </div>
</template>
```

支持了暗黑主题

```vue
<template>
  <div>
      <V3Emoji theme="dark" />
  </div>
</template>
```

支持了最近常用表情(基于localstorage)

```vue
<template>
  <div>
      <V3Emoji :recent="true" />
  </div>
</template>
```

*实验性功能*  支持皮肤的选择

```vue
<template>
  <div>
      <V3Emoji :skin="light" /> 
  </div>
</template>
```



接受emoji， 本组件只提供emoji的emit 您需要自定义函数来接收相应选择的emoji

```vue
<V3Emoji
         :disable-group="disableGroup"
         @click-emoji="appendText"
         :options-name="optionsName"
         :recent="true"
         />
<input v-model="inputText" type="textarea" style="width: 300px" />
</div>
```

当然 您可以通过传入**optionsName**来自定义各个板块的名字

 ```vue
<script setup>
const optionsName = {
  'Smileys & Emotion': '笑脸&表情',
  'Food & Drink': '食物&饮料'
};
</script>
<template>
	<V3Emoji :options-name="optionsName"/>
</template>
 ```

同时，你也可以传入**disableGroup**来禁用相应的板块*(注意：如果您先传入了optionsName ，那么就需要使用新的名字来进行禁用)*

```vue
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
//禁用了食物&饮料的选项卡
</script>

<template>
	<V3Emoji :disable-group="optionsName" :options-name="optionsName" />
</template>
```



## 配置/Options

|     配置名     |       配置类型        | 默认值  |                  说明/备注                   |
| :------------: | :-------------------: | :-----: | :------------------------------------------: |
|      size      | ‘mid’\|'small'\|'big' |   mid   |               用于调整整体大小               |
|     theme      |   'dark'\|'default'   | default |         主题切换 支持亮色和暗黑主题          |
| unicodeVersion |        number         |   11    | 在某些设备上可能不能兼容高版本的emojiunicode |
|     recent     |        boolean        |  false  |            开启最近使用emoji功能             |
|  optionsName   |           -           |   {}    |               翻译原有板块名字               |
|  disableGroup  |       string[]        |   []    |                 禁用某些板块                 |
|     *skin*     |           -           |  none   |              暂时无法很好的支持              |

## 事件/Events

|   事件名   |      事件类型      |                           说明                            |
| :--------: | :----------------: | :-------------------------------------------------------: |
| clickEmoji | (val:string)=>void | 点击emoji触发的事件，可以通过@clickEmoji来接收选择的emoji |
|   close    |        void        |                  表情框关闭时触发的事件                   |

## 许可/Licence

本项目使用MIT Licence，遵循MIT协议进行开源。

