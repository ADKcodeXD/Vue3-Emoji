import { Emoji } from '../types/type'

/**
 * 用于过滤unicode版本过高的emoji无法显示在某些地方
 * @param version 指定版本以上的emoji不渲染 默认是13
 */
export const emojiFilter = (version = 13, emojiList: Emoji.EmojiItem[]) => {
	return emojiList.filter(emoji => {
		if (emoji.unicode_version) return !(Number.parseInt(emoji.unicode_version) > version)
		else return true
	})
}

/**
 * 用于将数据过滤成所需
 * @param newData 需要过滤的emojijson newData
 * @param options 翻译的obj选项
 * @param unicodeVersion unicode版本 默认11
 * @param disableGroup 需要禁用的选项
 * @returns 返回一个 Emoji.ObjectItem
 */
export const filterData = (
	data: Emoji.JsonData,
	options: Emoji.JsonData = {},
	unicodeVersion = 11,
	disableGroup: string[] = [],
	customTab: Emoji.JsonData = {}
) => {
	const temp: Emoji.ObjectItem = {}
	//假如有自定义的tab
	const newData = { ...data, ...customTab }
	//对所有名字进行翻译
	for (const key in newData) {
		// eslint-disable-next-line no-prototype-builtins
		if (options.hasOwnProperty(key)) {
			temp[options[key]] = newData[key]
		} else {
			temp[key] = newData[key]
		}
	}
	//禁用不需要的group
	for (const key of disableGroup) {
		// eslint-disable-next-line no-prototype-builtins
		if (temp.hasOwnProperty(key)) delete temp[key]
	}
	//筛选过高版本的unicode的emoji
	for (const key in temp) {
		temp[key] = emojiFilter(unicodeVersion, temp[key])
	}
	return temp
}
