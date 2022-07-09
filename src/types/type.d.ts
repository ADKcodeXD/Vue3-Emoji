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
  interface CustomTheme {
    [key: string]: string;
    'V3Emoji-backgroundColor': string;
    'V3Emoji-hoverColor': string;
    'V3Emoji-activeColor': string;
    'V3Emoji-shadowColor': string;
  }
}
declare module 'vue3-emoji';
