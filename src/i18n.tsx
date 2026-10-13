import { createContext, useContext, type ReactNode } from 'react';
import { useApp, type Language } from './state';
import catalogue from './content/translations.json';
import programmeCatalogue from './content/programme-translations.json';
import additionalCatalogue from './content/additional-translations.json';
const Locale=createContext<Language>('en');
const translations:Record<string,string[]>={...catalogue,...programmeCatalogue,...additionalCatalogue};
export const preservedNames=new Set(['NCFE','FETP','MSSP','FEPA','FACT','NFLAT','E-LMS','FinDisha','Pradhan Mantri Jan Dhan Yojana','National Centre for Financial Education','Money Smart School Programme','Financial Education Training Programme','Financial Education Programme for Adults','Financial Awareness and Consumer Training','National Financial Literacy Assessment Test']);
export function translate(input:string|undefined,language:Language):string{
 const text=input??'';
 if(language==='en'||preservedNames.has(text.trim()))return text;
 const key=text.trim().replace(/\s+/g,' ');
 const value=translations[key]?.[language==='hi'?0:1];
 if(value)return text.replace(text.trim(),value);
 if(key.endsWith(' is required.'))return `${translate(key.slice(0,-13),language)}${language==='hi'?' आवश्यक है।':' ଆବଶ୍ୟକ।'}`;
 const stars=key.match(/^(\d) out of 5 stars$/);if(stars)return language==='hi'?`5 में से ${stars[1]} सितारे`:`5 ମଧ୍ୟରୁ ${stars[1]} ତାରା`;
 return text;
}
export function LocaleProvider({children}:{children:ReactNode}){const {language}=useApp();return <Locale value={language}>{children}</Locale>;}
export function useTranslation(){const language=useContext(Locale);return (text:string|undefined)=>translate(text,language);}
