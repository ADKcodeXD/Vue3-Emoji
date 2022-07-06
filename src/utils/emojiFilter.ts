/**
 * 用于过滤unicode版本过高的emoji无法显示在某些地方
 * @param version 指定版本以上的emoji不渲染 默认是13
 */
export const emojiFilter = (version = 13, emojiList: Emoji.EmojiItem[]) => {
  return emojiList.filter(emoji => {
    return !(Number.parseInt(emoji.unicode_version) > version);
  });
};
/**
 * 用于将数据过滤成所需
 * @param data 需要过滤的emojijson data
 * @param options 翻译的obj选项
 * @param unicodeVersion unicode版本 默认11
 * @param disableGroup 需要禁用的选项
 * @param needLocal 是否需要本地存储 显示最近使用的
 * @returns 返回一个 Emoji.ObjectItem
 */
export const filterData = (
  data: Emoji.JsonData,
  options: Emoji.JsonData = {},
  unicodeVersion = 11,
  disableGroup: string[] = []
) => {
  const temp: Emoji.ObjectItem = {};
  //对所有名字进行翻译
  for (const key in options) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      data[options[key]] = data[key];
      delete data[key];
    }
  }
  //禁用不需要的group
  for (const key in data) {
    if (!disableGroup.includes(key)) {
      temp[key] = data[key];
    }
  }
  //筛选过高版本的unicode的emoji
  for (const key in temp) {
    temp[key] = emojiFilter(unicodeVersion, temp[key]);
  }
  return temp;
};
