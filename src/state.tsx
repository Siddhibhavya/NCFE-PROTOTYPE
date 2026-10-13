import { createContext, useContext, useState, type ReactNode } from 'react';
export type Language = 'en' | 'hi' | 'or';
export const languages: {id: Language; native: string; name: string}[] = [{id:'en',native:'English',name:'Default'},{id:'hi',native:'हिन्दी',name:'Hindi'},{id:'or',native:'ଓଡ଼ିଆ',name:'Odia'}];
export type Draft = Record<string, string>;
export type Message = {id: string; text: string; from: 'user' | 'demo'};
type State = {language: Language; setLanguage: (l: Language)=>void; drafts: Record<string,Draft>; setDraft: (id:string,draft:Draft)=>void; messages: Message[]; setMessages: (m:Message[])=>void; resetDemo: ()=>void; dark: boolean; setDark: (v:boolean)=>void};
const Context = createContext<State | null>(null);
function initialLanguage(): Language { try {const value=localStorage.getItem('ncfe-language'); return value==='hi'||value==='or'?value:'en';}catch{return 'en';} }
export function StateProvider({children}:{children:ReactNode}) {
  const [language, updateLanguage] = useState<Language>(initialLanguage);
  const [drafts, updateDrafts] = useState<Record<string,Draft>>({});
  const [messages,setMessages] = useState<Message[]>([]);
  const [dark,setDark] = useState(false);
  const setLanguage=(l:Language)=>{updateLanguage(l);document.documentElement.lang=l;try{localStorage.setItem('ncfe-language',l);}catch{/* Storage may be disabled. */}};
  const setDraft=(id:string,draft:Draft)=>updateDrafts(prev=>({...prev,[id]:draft}));
  const resetDemo=()=>{updateDrafts({});setMessages([]);};
  return <Context value={{language,setLanguage,drafts,setDraft,messages,setMessages,resetDemo,dark,setDark}}>{children}</Context>;
}
export function useApp(){const context=useContext(Context);if(!context)throw new Error('Missing application state');return context;}
