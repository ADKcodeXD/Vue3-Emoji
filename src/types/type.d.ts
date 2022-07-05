declare namespace Emoji {
  interface EmojiItem {
    emoji: string;
    name: string;
    skin_tone_support: boolean;
    unicode_version: string;
    emoji_version: string;
  }
  interface ObjectItem {
    [key: string]: EmojiItem[];
  }
  interface CustomItem {
    src: string;
    name: string;
  }
}