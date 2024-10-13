# Vue 3 Emoji

一款简单的 ，还算好看的，基于 Vue3 编写的表情选择组件。

<img align=center  src="https://s1.ax1x.com/2022/07/06/jazn9H.png">

## 2024.10.13 更新

首先感谢一直以来使用该项目的小伙伴们，这个项目是一个练习项目，所以可能会有很多不足之处，如果有什么建议或者问题欢迎提 issue。

我非常抱歉这次更新来的十分晚，由于各种原因，这个仓库一直处于搁置状态，我个人也能力不足，一直没能解决一些问题，非常感谢各位小伙伴们的包容。

本次更新版本号：v3.0.0

- 修复了表情框点击弹出报错问题 #13 #10 #9
- 修复了 fixpos 不起作用的问题 #11

- 增加了 tippy 来控制弹出框的展示
- 去除了集成的文本框和 input 框

## 功能/feature

- 支持自定义配置 可以自定义表情框的大小
- 支持了 emoji 全量数据以及部分数据的选择
- 支持两种不同的主题
- 支持最近使用表情选项卡
- 支持 keep 模式 可以不重复渲染
- 支持自定义选项卡 你可以挑选自己喜欢的 emoji 并放入选项卡
- 支持自定义 size 你可以不使用我定义的尺寸，按照自己所需进行尺寸的调整
- 支持自定义主题 你可以通过传入自定义的样式来设置相应的颜色和风格
- ~~集成文本框 你可以利用双向绑定来获取数据~~

## 启动本项目/start this project

```bash
git clone https://github.com/ADKcodeXD/Vue3-Emoji
cd Vue3-Emoji
yarn install
yarn dev
```

## 使用/Usage

使用 npm

```bash
npm install vue3-emoji
```

使用 yarn

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
		<V3Emoji>
			<div class="my-btn">btn</div>
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

**支持了最近常用表情(基于 localstorage)**

```vue
<template>
	<div>
		<V3Emoji :recent="true" />
	</div>
</template>
```

通过 default-select 你可以指定默认的选项卡

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

**点击 emoji 会触发相应的事件**

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

**你可以通过指定 fulldata 来接受完整的 emojiItem**

```vue
<V3Emoji :disable-group="disableGroup" @click-emoji="appendText" :options-name="optionsName" :recent="true" :fulldata="true" />
//会接受到该参数 { "emoji": "🧨", "skin_tone_support": false, "name": "firecracker", "slug": "firecracker", "unicode_version": "11.0",
"emoji_version": "11.0" }
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
}
</script>
<template>
	<V3Emoji :options-name="optionsName" />
</template>
```

#### disableGroup

同时，你也可以传入**disableGroup**来禁用相应的板块

<!--(注意：如果你先传入了optionsName ，那么就需要使用新的名字来进行禁用)-->

```vue
<script setup lang="ts">
import V3Emoji from './components/V3Emoji.vue'
const inputText = ref('')
const appendText = (val: string) => {
	inputText.value += val
}
const optionsName = {
	'Smileys & Emotion': '笑脸&表情',
	'Food & Drink': '食物&饮料'
}
const disableGroup = ['食物&饮料']
//禁用了食物&饮料的选项卡
</script>

<template>
	<V3Emoji :disable-group="disableGroup" :options-name="optionsName" />
</template>
```

#### keep

**如果你需要在使用完表情框后保持原本打开的状态，可以指定 keep 来开启保持状态**

<!--bug:指定了keep后 无法在第一次打开时检测位置并调整位置-->

```vue
<V3Emoji :keep="true" />
```

#### fixPos

通过 fixpos 可以固定表情弹出框的位置，默认情况下表情弹出框会随着滚动条和屏幕上下移动而变化

**注意:3.0 版本中引入了 tippy，所以 fixpos 的值需要和 tippy 的值对应，具体可以参考 tippy 的文档**
<a href="https://atomiks.github.io/tippyjs/v6/all-props/#placement" target="_blank">tippy 文档配置</a>

```vue
<V3Emoji fix-pos="auto" // or 'auto-start'| 'auto-end' |'bottom' |'bottom-start'| 'bottom-end' />
```

### customSize

**利用 customSize 你可以自定义表情框的大小**

```vue
<script setup lang="ts">
const customSize = {
	'V3Emoji-width': '300px',
	'V3Emoji-height': '20rem',
	'V3Emoji-fontSize': '1rem',
	'V3Emoji-itemSize': '50px'
}
</script>
<template>
	<div class="test">
		<V3Emoji size="big" :custom-size="customSize" />
		<p>customSize</p>
	</div>
</template>
```

### customTab

如果你需要自己自定义一些 emoji 并且将其放到新的板块中，你可以这么做

```vue
<script setup lang="ts">
const customTab = {
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
}
</script>
<template>
	<div class="test">
		<V3Emoji :customTab="customTab" default-select="我的自定义板块" />
		<p>customTab</p>
	</div>
</template>
```

### customIcon

本组件会默认读取数据中的第一个 emoji 作为默认的 icon 你可以通过 customIcon 来定义下方选择的 Icon

```vue
<script setup lang="ts">
const customIcon = {
	'Smileys & Emotion': '😚',
	'Food & Drink': '🍔',
	'Animals & Nature': '🐶',
	Activities: '🎉',
	'Travel & Places': '🚗',
	Objects: '💰'
}
</script>
<template>
	<div class="test">
		<V3Emoji :customIcon="customIcon" />
		<p>customIcon</p>
	</div>
</template>
```

### customTheme

本组件提供了自定义的主题功能，你可以自定义主题色

```vue
<script setup lang="ts">
const customTheme = {
	'V3Emoji-hoverColor': '#ff5500',
	'V3Emoji-activeColor': '#99ff77',
	'V3Emoji-shadowColor': 'rgba(255,255,0,0.5)',
	'V3Emoji-backgroundColor': '#000000',
	'V3Emoji-fontColor': '#ffffff'
}
</script>
<template>
	<div class="test">
		<V3Emoji size="mid" :custom-theme="customTheme" />
		<p>customTheme</p>
	</div>
</template>
```

## 配置/Options

|     配置名     |       配置类型        |       默认值        |                          说明/备注                           |
| :------------: | :-------------------: | :-----------------: | :----------------------------------------------------------: |
|      size      | ‘mid’\|'small'\|'big' |         mid         |                       用于调整整体大小                       |
|     theme      |   'dark'\|'default'   |       default       |                 主题切换 支持亮色和暗黑主题                  |
|  manualClose   |        boolean        |        false        |             设置为 true 可以手动控制弹出框的关闭             |
|  optionsName   |           -           |         {}          |                       翻译原有板块名字                       |
|  disableGroup  |       string[]        |         []          |                         禁用某些板块                         |
| defaultSelect  |        string         | 'Smileys & Emotion' |     默认选中板块，注意：如果指定了新名字，需要传入新名字     |
|     recent     |        boolean        |        false        |                   开启最近使用 emoji 功能                    |
|    fulldata    |        boolean        |        false        | 如果指定为 true 那么 clickEmoji 事件将会传出一个 EmojiItem 类型的对象 |
|     fixPos     |     查看tippy官网     |        tippy        |               可以传入一个值来固定表情框的位置               |
|   customSize   |   Emoji.CustomSize    |     见类型定义      | 如果指定了相应的自定义大小，那么会将 pollup 表情选择框的大小重置，没有指定的将使用相应 size 的默认值 |
|  customTheme   |   Emoji.CustomTheme   |     见类型定义      | 自定义主题颜色，支持五个选项的配置，没有指定的依旧会使用指定的 theme 的默认值 |
|   customIcon   |   Emoji.CustomIcon    |     见类型定义      |                   自定义 tab 切换栏的显示                    |
|   customTab    |   Emoji.ObjectItem    |     见类型定义      | 你可以传入一个对象来指定一个新的选项卡，这个选项卡内可以放置你需要的 emoji |
| unicodeVersion |        number         |         11          |        在某些设备上可能不能兼容高版本的 emojiunicode         |
|     _skin_     |           -           |        none         |                      暂时无法很好的支持                      |
|  tippyOptions  |   自定义tippy的配置   |                     |     https://atomiks.github.io/tippyjs/v6/customization/      |

```ts
type FixType = 'upleft' | 'upright' | 'upcenter' | 'downleft' | 'downright' | 'downcenter' //控制表情弹出框的位置
```

## 方法/Function

| 方法名   | 类型     | 说明           |
| -------- | -------- | -------------- |
| closePop | ()=>void | 关闭表情弹出框 |
| openPop  | ()=>void | 打开表情弹出框 |

## 事件/Events

|   事件名   |           事件类型            |                             说明                             |
| :--------: | :---------------------------: | :----------------------------------------------------------: |
| clickEmoji | (val:string\|EmojiItem)=>void | 点击 emoji 触发的事件，可以通过@clickEmoji 来接收选择的 emoji |
|   close    |             void              |                    表情框关闭时触发的事件                    |

## 类型定义以及默认值/@types

```ts
declare namespace Emoji {
	interface EmojiItem {
		emoji: string
		name: string
		skin_tone_support?: boolean
		unicode_version?: string
		emoji_version?: string
		skin_tone_support_unicode_version?: string
	}
	interface ObjectItem {
		[key: string]: EmojiItem[]
	}
	interface CustomItem {
		src: string
		name: string
	}
	interface JsonData {
		[key: string]: any
	}
	interface CustomSize {
		[key: string]: string
		'V3Emoji-width': string // emoji的宽度
		'V3Emoji-height': string // height is optional
		'V3Emoji-fontSize': string //emoji的大小
		'V3Emoji-itemSize': string //每一项的大小
	}
	interface CustomIcon {
		[key: string]: string
	}
	interface CustomTheme {
		[key: string]: string
		'V3Emoji-backgroundColor': string
		'V3Emoji-hoverColor': string
		'V3Emoji-activeColor': string
		'V3Emoji-shadowColor': string
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
  }
  </script>

  <template>
  	<V3Emoji :options-name="optionsName" />
  </template>
  ```

## Link for npm

https://github.com/ADKcodeXD/Vue3-Emoji.git
https://github.com/ADKcodeXD/Vue3-Emoji

## 许可/Licence

本项目使用 MIT Licence，遵循 MIT 协议进行开源。
