import { useEffect, useRef, useState } from 'react';
import s from './styles/App.module.css';
import { asset } from './content/design';
export function Presentation({children}:{children:React.ReactNode}) {
  const params=new URLSearchParams(window.location.search);
  const [desktop,setDesktop]=useState(window.innerWidth>=768);
  const [scale,setScale]=useState(()=>Math.min(.78,(window.innerHeight-136)/892));
  const [closed,setClosed]=useState(false);
  const frame=useRef<HTMLIFrameElement>(null);
  useEffect(()=>{const update=()=>{setDesktop(window.innerWidth>=768);setScale(Math.max(.35,Math.min(.78,(window.innerHeight-136)/892)));};window.addEventListener('resize',update);return()=>window.removeEventListener('resize',update);},[]);
  const send=(action:string)=>frame.current?.contentWindow?.postMessage({type:'ncfe-wrapper',action},window.location.origin);
  const close=()=>{if(params.get('embedded')==='portfolio'&&window.parent!==window){const origin=params.get('parentOrigin');if(origin){try{const u=new URL(origin);if(u.origin===u.href.replace(/\/$/,''))window.parent.postMessage({type:'ncfe-close'},u.origin);}catch{/* Invalid configured parent. */}}}setClosed(true);};
  if(params.get('view')==='app'||!desktop)return <>{children}</>;
  if(closed)return <div className={s.closed}><h1>Prototype demo closed</h1><p>Independent academic NCFE redesign.</p><button className={s.primary} onClick={()=>setClosed(false)}>Reopen prototype</button><a href="https://siddhibhavya.github.io/">Return to portfolio</a></div>;
  const url=new URL(window.location.href);url.searchParams.set('view','app');url.searchParams.delete('embedded');url.searchParams.delete('parentOrigin');
  return <div className={s.desktopStage}><section className={s.demoWindow} aria-label="NCFE prototype demo"><header className={s.demoTitle}><h1>Prototype Demo</h1><button aria-label="Close prototype demo" onClick={close}>×</button></header><div className={s.demoBody}><div className={s.phoneSlot} style={{width:420*scale,height:892*scale}}><div className={s.phoneFrame} style={{transform:`scale(${scale})`}}><div className={s.deviceStatus} aria-hidden="true"><span>9:41</span><span className={s.dynamicIsland}/><div>{['imgCellularConnection','imgWifi','imgFrame'].map(name=><img key={name} src={asset('111-7492',name)} alt=""/>)}</div></div><iframe ref={frame} title="NCFE independent academic prototype" src={url.href}/><div className={s.homeIndicator} aria-hidden="true"><span/></div></div></div><aside className={s.demoControls}><button onClick={()=>send('restart')}>Restart</button><button onClick={()=>send('back')}>Back</button><button onClick={()=>send('feedback')}>Feedback</button><p><strong>Language availability</strong><br/>English, Hindi and Odia are available. Other language cards are disabled.</p><p>Hindi and Odia are draft translations. Programme and policy names stay unchanged; original images may contain English.</p><p>Forms and support use fictional demonstrations. Unavailable videos are labelled. Feedback currently works in demonstration mode.</p><p>Independent academic redesign.<br/>Not an official NCFE application.</p></aside></div></section></div>;
}
