import type { Language } from '../state';

// Original Figma card order and labels; only implemented locales are selectable.
export const onboardingLanguages: { native: string; name: string; locale: string; id?: Language }[] = [
  { native: 'English', name: 'Default', locale: 'en', id: 'en' },
  { native: 'অসমীয়া', name: 'Assamese', locale: 'as' },
  { native: 'বাংলা', name: 'Bengali', locale: 'bn' },
  { native: 'भोजपुरी', name: 'Bhojpuri', locale: 'bho' },
  { native: 'बड़ो', name: 'Bodo', locale: 'brx' },
  { native: 'डोगरी', name: 'Dogri', locale: 'doi' },
  { native: 'ગુજરાતી', name: 'Gujarati', locale: 'gu' },
  { native: 'हिन्दी', name: 'Hindi', locale: 'hi', id: 'hi' },
  { native: 'ಕನ್ನಡ', name: 'Kannada', locale: 'kn' },
  { native: 'کٲشُر', name: 'Kashmiri', locale: 'ks' },
  { native: 'कोंकणी', name: 'Konkani', locale: 'kok' },
  { native: 'मैथिली', name: 'Maithili', locale: 'mai' },
  { native: 'മലയാളം', name: 'Malayalam', locale: 'ml' },
  { native: 'মণিপুরী', name: 'Manipuri (Meitei)', locale: 'mni' },
  { native: 'मराठी', name: 'Marathi', locale: 'mr' },
  { native: 'नेपाली', name: 'Nepali', locale: 'ne' },
  { native: 'ଓଡ଼ିଆ', name: 'Odia', locale: 'or', id: 'or' },
  { native: 'ਪੰਜਾਬੀ', name: 'Punjabi', locale: 'pa' },
  { native: 'राजस्थानी', name: 'Rajasthani', locale: 'raj' },
  { native: 'संताली', name: 'Santali', locale: 'sat' },
  { native: 'سنڌي', name: 'Sindhi', locale: 'sd' },
  { native: 'தமிழ்', name: 'Tamil', locale: 'ta' },
  { native: 'తెలుగు', name: 'Telugu', locale: 'te' },
  { native: 'اردو', name: 'Urdu', locale: 'ur' },
];
