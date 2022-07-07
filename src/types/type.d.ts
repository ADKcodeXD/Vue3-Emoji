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
    [rowSize: string]: number; // grid每一格子的大小
    [itemSize: string]: number; //每一项的大小
  }
}
declare module 'vue3-emoji';
