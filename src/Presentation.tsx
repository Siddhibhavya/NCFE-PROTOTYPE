import { useEffect, useRef, useState } from 'react';
import s from './styles/App.module.css';
export function Presentation({children}:{children:React.ReactNode}) {
  const params=new URLSearchParams(window.location.search);
  const [desktop,setDesktop]=useState(window.innerWidth>=768);
  const [closed,setClosed]=useState(false);
  const frame=useRef<HTMLIFrameElement>(null);
  useEffect(()=>{const update=()=>setDesktop(window.innerWidth>=768);window.addEventListener('resize',update);return()=>window.removeEventListener('resize',update);},[]);
  const send=(action:string)=>frame.current?.contentWindow?.postMessage({type:'ncfe-wrapper',action},window.location.origin);
  const close=()=>{if(params.get('embedded')==='portfolio'&&window.parent!==window){const origin=params.get('parentOrigin');if(origin){try{const u=new URL(origin);if(u.origin===u.href.replace(/\/$/,''))window.parent.postMessage({type:'ncfe-close'},u.origin);}catch{/* Invalid configured parent. */}}}setClosed(true);};
  if(params.get('view')==='app'||!desktop)return <>{children}</>;
  if(closed)return <div className={s.closed}><h1>Prototype demo closed</h1><p>Independent academic NCFE redesign.</p><button className={s.primary} onClick={()=>setClosed(false)}>Reopen prototype</button><a href="https://siddhibhavya.github.io/">Return to portfolio</a></div>;
  const url=new URL(window.location.href);url.searchParams.set('view','app');url.searchParams.delete('embedded');url.searchParams.delete('parentOrigin');
  return <div className={s.desktopStage}><section className={s.demoWindow} aria-label="NCFE prototype demo"><header className={s.demoTitle}><h1>Prototype Demo</h1><button aria-label="Close prototype demo" onClick={close}>×</button></header><div className={s.demoBody}><div className={s.phoneFrame}><iframe ref={frame} title="NCFE independent academic prototype" src={url.href}/></div><aside className={s.demoControls}><button onClick={()=>send('restart')}>Restart</button><button onClick={()=>send('back')}>Back</button><p>Independent academic redesign.<br/>Not an official NCFE application.</p></aside></div></section></div>;
}
