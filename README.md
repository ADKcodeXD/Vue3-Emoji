

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
- 支持keep模式 可以不重复渲染
- 支持自定义选项卡 你可以挑选自己喜欢的emoji并放入选项卡
- 支持自定义size 你可以不使用我定义的尺寸，按照自己所需进行尺寸的调整
- 支持自定义主题 你可以通过传入自定义的样式来设置相应的颜色和风格

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
      <!--你可以指定最近使用表情的tab作为默认tab-->
      <V3Emoji default-select="recenet" :recent="true" />
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

你可以通过传入**optionsName**来自定义各个板块的名字

 ```vue
<script setup>
const optionsName = {
  'Smileys & Emotion': '笑脸&表情',
  'Food & Drink': '食物&饮料',
  'Animals & Nature': '动物&自然',
  'Travel & Places': '旅行&地点',
  'People & Body': '人物&身体',
  Objects: '物品',
  Symbols: '符号',
  Flags: '旗帜',
  Activities: '活动'
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
	<V3Emoji :disable-group="disableGroup" :options-name="optionsName" />
</template>
```

#### keep

**如果你需要在使用完表情框后保持原本打开的状态，可以指定keep来开启保持状态**

<!--bug:指定了keep后 无法在第一次打开时检测位置并调整位置-->

```vue
<V3Emoji
          :keep="true"
        />
```

#### fixPos

通过fixpos 可以固定表情弹出框的位置，默认情况下表情弹出框会随着滚动条和屏幕上下移动而变化

```ts
<V3Emoji
          fix-pos="upright" // or 'upcenter'| 'upleft' |'downright' |'downcenter'|'downleft'
        />
```

### customSize

**利用customSize 你可以自定义表情框的大小**

```vue
<script setup lang="ts">
const customSize= {
  'V3Emoji-width': '300px',
  'V3Emoji-height': '20rem',
  'V3Emoji-fontSize': '1rem',
  'V3Emoji-itemSize': '50px'
};
</script>
<template>
<div class="test">
    <V3Emoji size="big" :custom-size="customSize" />
    <p>customSize</p>
</div>
</template>
```

### customTab

如果你需要自己自定义一些emoji并且将其放到新的板块中，你可以这么做

```vue
<script setup lang="ts">
const customTab= {
  我的自定义板块: [
    {
      emoji: '🍔',
      name: '汉堡包'
    },
    {
      emoji: '🍟',
      name: '薯条'
    }
  ]
};
</script>
<template>
<div class="test">
    <V3Emoji  :customTab="customTab" default-select="我的自定义板块" />
    <p>customTab</p>
</div>
</template>
```

### customIcon

本组件会默认读取数据中的第一个emoji作为默认的icon 你可以通过customIcon来定义下方选择的Icon

```vue
<script setup lang="ts">
const customIcon = {
  'Smileys & Emotion': '😚',
  'Food & Drink': '🍔',
  'Animals & Nature': '🐶',
  Activities: '🎉',
  'Travel & Places': '🚗',
  Objects: '💰'
};
</script>
<template>
<div class="test">
    <V3Emoji  :customIcon="customIcon"  />
    <p>customIcon</p>
</div>
</template>
```

### customTheme

本组件提供了自定义的主题功能，你可以自定义主题色

```vue
<script setup lang="ts">
const customTheme= {
  'V3Emoji-hoverColor': '#ff5500',
  'V3Emoji-activeColor': '#99ff77',
  'V3Emoji-shadowColor': 'rgba(255,255,0,0.5)',
  'V3Emoji-backgroundColor': '#000000',
  'V3Emoji-fontColor': '#ffffff'
};
</script>
<template>
<div class="test">
    <V3Emoji size="mid" :custom-theme="customTheme" />
    <p>customTheme</p>
</div>
</template>
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
|  optionsName   |           -           |         {}          |                       翻译原有板块名字                       |
|  disableGroup  |       string[]        |         []          |                         禁用某些板块                         |
| defaultSelect  |        string         | 'Smileys & Emotion' |     默认选中板块，注意：如果指定了新名字，需要传入新名字     |
|     recent     |        boolean        |        false        |                    开启最近使用emoji功能                     |
|    fulldata    |        boolean        |        false        | 如果指定为true 那么clickEmoji事件将会传出一个EmojiItem类型的对象 |
|      keep      |        boolean        |        false        |         如果指定为true 那么表情框关闭将不会销毁组件          |
|    textArea    |        boolean        |        false        |                      开启文本框功能选项                      |
| textAreaOption | Emoji.TextAreaOptions |     见类型定义      |                 你可以定义textarea的一些选项                 |
|     fixPos     |        六个值         |       FixType       |               可以传入一个值来固定表情框的位置               |
|   customSize   |   Emoji.CustomSize    |     见类型定义      | 如果指定了相应的自定义大小，那么会将pollup表情选择框的大小重置，没有指定的将使用相应size的默认值 |
|  customTheme   |   Emoji.CustomTheme   |     见类型定义      | 自定义主题颜色，支持五个选项的配置，没有指定的依旧会使用指定的theme的默认值 |
|   customIcon   |   Emoji.CustomIcon    |     见类型定义      |                    自定义tab切换栏的显示                     |
|   customTab    |   Emoji.ObjectItem    |     见类型定义      | 你可以传入一个对象来指定一个新的选项卡，这个选项卡内可以放置你需要的emoji |
| unicodeVersion |        number         |         11          |         在某些设备上可能不能兼容高版本的emojiunicode         |
|     *skin*     |           -           |        none         |                      暂时无法很好的支持                      |

```ts
type FixType = 'upleft' | 'upright' | 'upcenter' | 'downleft' | 'downright' | 'downcenter'; //控制表情弹出框的位置
```

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
    skin_tone_support?: boolean;
    unicode_version?: string;
    emoji_version?: string;
    skin_tone_support_unicode_version?: string;
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
    [key: string]: string;
    'V3Emoji-width': string; // emoji的宽度
    'V3Emoji-height': string; // height is optional
    'V3Emoji-fontSize': string; //emoji的大小
    'V3Emoji-itemSize': string; //每一项的大小
  }
  interface CustomIcon {
    [key: string]: string;
  }
   type FixType = 'upleft' | 'upright' | 'upcenter' | 'downleft' | 'downright' | 'downcenter';
  interface CustomTheme {
    [key: string]: string;
    'V3Emoji-backgroundColor': string;
    'V3Emoji-hoverColor': string;
    'V3Emoji-activeColor': string;
    'V3Emoji-shadowColor': string;
  }
}
```

```
//SizeData.json
{
    "small": {
        "V3Emoji-width": "300px",
        "V3Emoji-height": "200px",
        "V3Emoji-fontSize": "14px",
        "V3Emoji-itemSize": "20px"
    },
    "mid": {
        "V3Emoji-width": "500px",
        "V3Emoji-height": "300px",
        "V3Emoji-fontSize": "16px",
        "V3Emoji-itemSize": "30px"
    },
    "big": {
        "V3Emoji-width": "800px",
        "V3Emoji-height": "400px",
        "V3Emoji-fontSize": "20px",
        "V3Emoji-itemSize": "36px"
    }
}
//ThemeData.json
{
    "dark":{
        "V3Emoji-backgroundColor":"#000",
        "V3Emoji-fontColor":"#fff",
        "V3Emoji-hoverColor":"#909090",
        "V3Emoji-activeColor":"#909090",
        "V3Emoji-shadowColor":"rgba(255,255,255,.2)"
    },
    "default":{
        "V3Emoji-backgroundColor":"#fff",
        "V3Emoji-fontColor":"#000",
        "V3Emoji-hoverColor":"#e7e7e7",
        "V3Emoji-activeColor":"#b6b6b6",
        "V3Emoji-shadowColor":"rgba(0,0,0,.4)"
    }
}
```

## 参考设置/example options

- 通过以下设置将所有选项卡变成中文

  ```vue
  <script>
      const optionsName = {
          'Smileys & Emotion': '笑脸&表情',
          'Food & Drink': '食物&饮料',
          'Animals & Nature': '动物&自然',
          'Travel & Places': '旅行&地点',
          'People & Body': '人物&身体',
          Objects: '物品',
          Symbols: '符号',
          Flags: '旗帜',
          Activities: '活动'
      };
  </script>
  
  <template>
  	<V3Emoji :options-name="optionsName"/>
  </template>
  ```

  

## 许可/Licence

本项目使用MIT Licence，遵循MIT协议进行开源。

