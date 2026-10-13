import manifest from './assets.json';
export function asset(screen: string, name: string): string {
  const screens = manifest as Record<string, Record<string, string>>;
  const file = screens[screen]?.[name];
  if (!file) throw new Error(`Missing original Figma asset: ${screen}/${name}`);
  return import.meta.env.BASE_URL + file;
}
export const icons = { home: 'imgHome', book: 'imgBookGlyph', initiatives: 'imgInitiativesGlyph', chatbot: 'imgChatBotGlyph', search: 'imgMaterialSearchBlack22Px', notification: 'imgNotificationIcon', menu: 'imgMenuIcon' } as const;
export type IconName = keyof typeof icons;
