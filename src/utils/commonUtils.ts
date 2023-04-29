import { Ref } from 'vue'
import { Emoji } from '../types/type'
import { setItem } from './storage'
/**
 * 用与保存emoji到本地
 * @param recentData 最近使用的数据
 * @param currentEmoji 当前选择的emoji
 */
export const saveToLocal = (recentData: Ref<Emoji.JsonData>, currentEmoji: Emoji.EmojiItem) => {
	if (!recentData.value) {
		setItem('emoji-recent', { recent: [currentEmoji] })
	} else {
		if (recentData.value['recent'].length < 50) {
			const index = recentData.value['recent'].findIndex((item: Emoji.EmojiItem) => {
				return item.emoji === currentEmoji.emoji
			})
			if (index === -1) {
				recentData.value['recent'].unshift(currentEmoji)
			} else {
				recentData.value['recent'].splice(index, 1)
				recentData.value['recent'].unshift(currentEmoji)
			}
		} else {
			//大于50的情况
			recentData.value['recent'].unshift(currentEmoji)
			recentData.value['recent'].pop()
		}
		setItem('emoji-recent', recentData.value)
	}
}
