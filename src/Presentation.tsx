import { useEffect, useRef, useState } from 'react';
import s from './styles/App.module.css';
export function Presentation({children}:{children:React.ReactNode}) {
  const params=new URLSearchParams(window.location.search);
  const fit=()=>Math.max(.1,Math.min(1,(window.innerWidth-(window.innerWidth<1100?56:48))/425,(window.innerHeight-(window.innerWidth<1100?172:136))/902));
  const [scale,setScale]=useState(fit);
  const [closed,setClosed]=useState(false);
  const [warning,setWarning]=useState('');
  const [ready,setReady]=useState(false);
  const frame=useRef<HTMLIFrameElement>(null);
  useEffect(()=>{const update=()=>setScale(fit());window.addEventListener('resize',update);return()=>window.removeEventListener('resize',update);},[]);
  useEffect(()=>{const receive=(event:MessageEvent)=>{if(event.origin!==window.location.origin||event.source!==frame.current?.contentWindow)return;if(event.data?.type==='ncfe-ready')setReady(true);if(event.data?.type==='ncfe-warning')setWarning(typeof event.data.message==='string'?event.data.message:'');};window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive);},[]);
  const send=(action:string)=>frame.current?.contentWindow?.postMessage({type:'ncfe-wrapper',action},window.location.origin);
  const close=()=>{if(params.get('embedded')==='portfolio'&&window.parent!==window){const origin=params.get('parentOrigin');if(origin){try{const u=new URL(origin);if(u.origin===u.href.replace(/\/$/,''))window.parent.postMessage({type:'ncfe-close'},u.origin);}catch{/* Invalid configured parent. */}}}setReady(false);setWarning('');setClosed(true);};
  if(params.get('view')==='app')return <>{children}</>;
  if(closed)return <div className={s.closed}><button className={s.primary} onClick={()=>setClosed(false)}>Reopen prototype</button><a href="https://siddhibhavya.github.io/">Return to portfolio</a></div>;
  const url=new URL(window.location.href);url.searchParams.set('view','app');url.searchParams.delete('embedded');url.searchParams.delete('parentOrigin');
  return <div className={s.desktopStage}><section className={s.demoWindow} aria-label="NCFE prototype demo"><header className={s.demoTitle}><h1>Prototype Demo</h1><button aria-label="Close prototype demo" onClick={close}>×</button></header><div className={s.demoBody}><div className={s.phoneSlot} style={{width:425*scale,height:902*scale}}><div className={s.phoneFrame} style={{transform:`scale(${scale})`}}><iframe ref={frame} title="NCFE prototype" src={url.href} onLoad={()=>send('ready')}/></div></div><aside className={s.demoControls}><button disabled={!ready} onClick={()=>send('restart')}>Restart</button><button disabled={!ready} onClick={()=>send('back')}>Back</button><button disabled={!ready} onClick={()=>send('feedback')}>Feedback</button>{warning&&<div className={s.contextWarning} role="status"><p>{warning}</p><button aria-label="Dismiss warning" onClick={()=>{setWarning('');send('dismiss-warning');}}>×</button></div>}</aside></div></section></div>;
}
