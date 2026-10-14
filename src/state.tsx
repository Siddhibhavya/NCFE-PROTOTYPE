import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
export type Language = 'en' | 'hi' | 'or';
export const languages: {id: Language; native: string; name: string}[] = [{id:'en',native:'English',name:'Default'},{id:'hi',native:'हिन्दी',name:'Hindi'},{id:'or',native:'ଓଡ଼ିଆ',name:'Odia'}];
export type Draft = Record<string, string>;
export type Message = {id: string; text: string; from: 'user' | 'demo'};
type State = {completedLanguageSelection:boolean; language: Language; setLanguage: (l: Language)=>void; drafts: Record<string,Draft>; setDraft: (id:string,draft:Draft)=>void; messages: Message[]; setMessages: (m:Message[])=>void; resetDemo: ()=>void; dark: boolean; setDark: (v:boolean)=>void; warning: string; setWarning: (message:string)=>void};
const Context = createContext<State | null>(null);
export const availableLanguages: Language[] = ['en','hi','or'];
export function StateProvider({children}:{children:ReactNode}) {
  const [language, updateLanguage] = useState<Language>('en');
  const [completedLanguageSelection,setCompletedLanguageSelection]=useState(false);
  const [warning,setWarning] = useState('');
  // Remove only this prototype's legacy preference; never write a new one.
  useEffect(()=>{try{localStorage.removeItem('ncfe-language');}catch{/* Storage can be unavailable. */}},[]);
  const [drafts, updateDrafts] = useState<Record<string,Draft>>({});
  const [messages,setMessages] = useState<Message[]>([]);
  const [dark,setDark] = useState(false);
  const setLanguage=(l:Language)=>{if(!availableLanguages.includes(l)){setWarning('This language is unavailable.');return;}updateLanguage(l);setCompletedLanguageSelection(true);document.documentElement.lang=l;};
  const setDraft=(id:string,draft:Draft)=>updateDrafts(prev=>({...prev,[id]:draft}));
  const resetDemo=()=>{setCompletedLanguageSelection(false);updateDrafts({});setMessages([]);setWarning('');};
  return <Context value={{completedLanguageSelection,language,setLanguage,drafts,setDraft,messages,setMessages,resetDemo,dark,setDark,warning,setWarning}}>{children}</Context>;
}
export function useApp(){const context=useContext(Context);if(!context)throw new Error('Missing application state');return context;}
