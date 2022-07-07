

# Vue 3 Emoji

一款简单的 ，还算好看的，基于Vue3编写的表情选择组件。

<img align=center  src="https://s1.ax1x.com/2022/07/06/jazn9H.png">

<img align=center src="https://s1.ax1x.com/2022/07/07/j0Uy26.png">

## 功能/feature

- 集成文本框 你可以利用双向绑定来获取数据
- 支持自定义配置 可以自定义表情框的大小
- 支持了emoji全量数据以及部分数据的选择
- 支持两种不同的主题
- 支持最近使用表情选项卡
- 支持保持模式 可以不重复渲染

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

### 基本使用 /basic usage

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

  **当然 你可以自定义按钮**

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

**本组件支持了三种不同的大小**

```vue
<template>
  <div>
      <V3Emoji size="big" />
      <V3Emoji size="small" />
      <V3Emoji size="mid" />
  </div>
</template>
```

**支持了暗黑主题**

```vue
<template>
  <div>
      <V3Emoji theme="dark" />
  </div>
</template>
```

**支持了最近常用表情(基于localstorage)**

```vue
<template>
  <div>
      <V3Emoji :recent="true" />
  </div>
</template>
```

通过default-select你可以指定默认的选项卡

```vue
<template>
  <div>
      <V3Emoji default-select="Animals & Nature" />
  </div>
</template>
```

<!--*实验性功能*-->  

支持皮肤的选择

```vue
<template>
  <div>
      <V3Emoji :skin="light" /> 
  </div>
</template>
```

#### @click-emoji

**点击emoji会触发相应的事件**

```vue
<V3Emoji
         :disable-group="disableGroup"
         @click-emoji="appendText"
         :options-name="optionsName"
         :recent="true"
         />
<textarea v-model="inputText" style="width: 300px" />
</div>
```

#### fulldata

**你可以通过指定fulldata来接受完整的emojiItem**

```vue
<V3Emoji
         :disable-group="disableGroup"
         @click-emoji="appendText"
         :options-name="optionsName"
         :recent="true"
         :fulldata="true"
         />
//会接受到该参数
{ "emoji": "🧨", "skin_tone_support": false, "name": "firecracker", "slug": "firecracker", "unicode_version": "11.0", "emoji_version": "11.0" }
```

#### optionsName

当然 你可以通过传入**optionsName**来自定义各个板块的名字

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

#### disableGroup

同时，你也可以传入**disableGroup**来禁用相应的板块

<!--(注意：如果你先传入了optionsName ，那么就需要使用新的名字来进行禁用)-->

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

#### keep

**如果你需要在使用完表情框后保持原本打开的状态，可以指定keep来开启保持状态**

```vue
<V3Emoji
          :keep="false"
        />
```

#### customSize

**利用customSize 你可以自定义表情框的大小**

```vue
<V3Emoji
          :disable-group="disableGroup"
          :customSize="{ width: 500, height: 300, fontSize: 20, itemSize: 20 }"
          v-model="abc"
        />
```

### 文本框集成使用

本组件集成了一个简单的文本框，你可以通过textArea选项来进行开启他。

textArea的大小随着父容器的变化而变化，所以推荐你最好使用一个div容器对组件进行包裹

```vue
<V3Emoji
          :textArea="true"
          size="big"
        />
```

textarea支持了双向数据绑定，你可以直接使用v-model来进行绑定

```vue
<script setup lang="ts">
import V3Emoji from './components/V3Emoji.vue';
const clickEmoji = (val: any) => {
  clickEvent.value = val;
  console.log(val);
};
const disableGroup = ['食物&饮料'];
const abc = ref('这里是双向绑定的值');
</script>

<template>
    <div class="text-area">
        <V3Emoji
                 :disable-group="disableGroup"
                 @click-emoji="clickEmoji"
                 v-model="abc"
                 />
    </div>
</template>
```

## 配置/Options

|     配置名     |       配置类型        |       默认值        |                          说明/备注                           |
| :------------: | :-------------------: | :-----------------: | :----------------------------------------------------------: |
|    v-model     |        string         |         ‘’          |          可以进行数据的双向绑定（需要开启textArea）          |
|      size      | ‘mid’\|'small'\|'big' |         mid         |                       用于调整整体大小                       |
|     theme      |   'dark'\|'default'   |       default       |                 主题切换 支持亮色和暗黑主题                  |
|    fulldata    |        boolean        |        false        | 如果指定为true 那么clickEmoji事件将会传出一个EmojiItem类型的对象 |
| defaultSelect  |        string         | 'Smileys & Emotion' |     默认选中板块，注意：如果指定了新名字，需要传入新名字     |
|    textArea    |        boolean        |        false        |                      开启文本框功能选项                      |
| textAreaOption | Emoji.TextAreaOptions |     见类型定义      |                 你可以定义textarea的一些选项                 |
|      keep      |        boolean        |        false        |         如果指定为true 那么表情框关闭将不会销毁组件          |
|   customSize   |   Emoji.CustomSize    |     见类型定义      | 如果指定了相应的自定义大小，那么会将pollup表情选择框的大小重置，没有指定的将使用相应size的默认值 |
| unicodeVersion |        number         |         11          |         在某些设备上可能不能兼容高版本的emojiunicode         |
|     recent     |        boolean        |        false        |                    开启最近使用emoji功能                     |
|  optionsName   |           -           |         {}          |                       翻译原有板块名字                       |
|  disableGroup  |       string[]        |         []          |                         禁用某些板块                         |
|     *skin*     |           -           |        none         |                      暂时无法很好的支持                      |

## 事件/Events

|   事件名   |           事件类型            |                           说明                            |
| :--------: | :---------------------------: | :-------------------------------------------------------: |
| clickEmoji | (val:string\|EmojiItem)=>void | 点击emoji触发的事件，可以通过@clickEmoji来接收选择的emoji |
|   close    |             void              |                  表情框关闭时触发的事件                   |
| changeText |      (val:string)=>void       |              用于接受文本框改变时触发的事件               |

## 类型定义以及默认值/@types

```ts
declare namespace Emoji {
  interface EmojiItem {
    emoji: string;
    name: string;
    skin_tone_support: boolean;
    unicode_version: string;
    emoji_version: string;
    skin_tone_support_unicode_version: string;
  }
  interface ObjectItem {
    [key: string]: EmojiItem[];
  }
  interface CustomItem {
    src: string;
    name: string;
  }
  interface JsonData {
    [key: string]: any;
  }
  interface TextAreaOptions {
    placeholder?: string;
    rows?: number;
    cols?: number;
    resize?: StyleValue;
  }
  interface CustomSize {
    [width: string]: number; // emoji的宽度
    [height: string]: number; // height is optional
    [fontSize: string]: number; //emoji的大小
    [itemSize: string]: number; //每一项的大小
  }
}
```

```json
//SizeData.json
{
    "small":{
        "width":300,
        "height":200,
        "fontSize":14,
        "itemSize":20,
    },
    "mid":{
        "width":500,
        "height":300,
        "fontSize":16,
        "itemSize":30,
    },
    "big":{
        "width":800,
        "height":400,
        "fontSize":20,
        "itemSize":36,
    }
}
```



## 许可/Licence

本项目使用MIT Licence，遵循MIT协议进行开源。

