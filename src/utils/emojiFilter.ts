/**
 * 用于过滤unicode版本过高的emoji无法显示在某些地方
 * @param version 指定版本以上的emoji不渲染 默认是13
 */
export const emojiFilter = (version = 13, emojiList: Emoji.EmojiItem[]) => {
  return emojiList.filter(emoji => {
    return !(Number.parseInt(emoji.unicode_version) > version);
  });
};
