import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Dialog } from './UI';
import appStyles from '../styles/App.module.css';
import styles from '../styles/Tour.module.css';

export type TourStep = { target: string; title: string; description: string };
export const ncfeTourSteps: TourStep[] = [
  {target:'home',title:'Home',description:'Home is your starting point. Tap Home to begin.'},
  {target:'learning',title:'Learning',description:'Tap Learn to explore the learning resources.'},
  {target:'search',title:'Search',description:'Tap Search to find learning topics.'},
  {target:'initiatives',title:'Initiatives',description:'Tap FL initiatives to explore NCFE programmes.'},
  {target:'findisha',title:'FinDisha',description:'Tap FinDisha to open the financial literacy assistant.'},
  {target:'menu',title:'Menu',description:'Tap the hamburger to open the side drawer.'},
  {target:'about',title:'About NCFE',description:'Tap About NCFE to learn about the organisation.'}
];

type Phase = 'idle' | 'intro' | 'active' | 'complete';
type Rect = {left:number;top:number;width:number;height:number};
const descriptionId='ncfe-tour-description';

// This controller is entirely transient. Reloading starts a new permitted session.
export function useGuidedTour(steps:TourStep[], completedLanguageSelection:boolean, route:string) {
  const [phase,setPhase]=useState<Phase>('idle');
  const [index,setIndex]=useState(0);
  const offered=useRef(false);
  const busy=useRef(false);
  const pendingFrame=useRef(0);
  const phaseRef=useRef(phase);
  phaseRef.current=phase;
  useEffect(()=>{
    if(completedLanguageSelection&&route==='/home'&&!offered.current){
      offered.current=true;
      setPhase('intro');
    }
  },[completedLanguageSelection,route]);
  useEffect(()=>{busy.current=false;},[phase,index]);
  const advance=()=>{
    if(busy.current||phase!=='active')return;
    busy.current=true;
    // Let the real control finish its route/drawer action before changing targets.
    pendingFrame.current=requestAnimationFrame(()=>{if(phaseRef.current!=='active')return;if(index+1===steps.length)setPhase('complete');else setIndex(previous=>previous+1);});
  };
  useEffect(()=>()=>cancelAnimationFrame(pendingFrame.current),[]);
  return {phase,index,step:steps[index],advance,isBusy:()=>busy.current,skip:()=>{cancelAnimationFrame(pendingFrame.current);phaseRef.current='idle';setPhase('idle');},start:()=>{setIndex(0);setPhase('active');}};
}

export function GuidedTour({completedLanguageSelection,route,menuOpen}:{completedLanguageSelection:boolean;route:string;menuOpen:boolean}) {
  const tour=useGuidedTour(ncfeTourSteps,completedLanguageSelection,route);
  const [rect,setRect]=useState<Rect|null>(null);
  const [host,setHost]=useState<HTMLElement>(document.body);
  const layer=useRef<HTMLDivElement>(null);
  const target=useRef<HTMLElement|null>(null);
  const skip=useRef<HTMLButtonElement>(null);
  const current=useRef(tour);
  current.current=tour;

  useEffect(()=>{
    if(tour.phase!=='active')return;
    let frame=0;
    let described:HTMLElement|null=null;
    let oldDescription:string|null=null;
    const restoreDescription=()=>{if(described){if(oldDescription===null)described.removeAttribute('aria-describedby');else described.setAttribute('aria-describedby',oldDescription);}};
    const measure=()=>{
      const dialog=document.getElementById('ncfe-menu');
      setHost(previous=>previous===(dialog??document.body)?previous:dialog??document.body);
      const element=document.querySelector<HTMLElement>(`[data-tour-id="${current.current.step.target}"]`);
      if(element){
        const bounds=element.getBoundingClientRect();
        if(bounds.width&&bounds.height&&bounds.left>=0&&bounds.top>=0&&bounds.right<=innerWidth+.5&&bounds.bottom<=innerHeight+.5){
          if(target.current!==element){
            restoreDescription();described=element;oldDescription=element.getAttribute('aria-describedby');
            element.setAttribute('aria-describedby',[oldDescription,descriptionId].filter(Boolean).join(' '));
            target.current=element;element.focus({preventScroll:true});
          }
          const next={left:bounds.left,top:bounds.top,width:bounds.width,height:bounds.height};
          setRect(previous=>previous&&Object.keys(next).every(key=>Math.abs(previous[key as keyof Rect]-next[key as keyof Rect])<.25)?previous:next);
        }else{target.current=null;setRect(null);}
      }else{target.current=null;setRect(null);}
      frame=requestAnimationFrame(measure);
    };
    target.current=null;setRect(null);measure();
    return()=>{cancelAnimationFrame(frame);restoreDescription();};
  },[tour.phase,tour.index,route,menuOpen]);

  useEffect(()=>{
    if(tour.phase!=='active')return;
    const allowed=(event:Event)=>event.target instanceof Node&&(target.current?.contains(event.target)||skip.current?.contains(event.target));
    const block=(event:Event)=>{if(!allowed(event)){event.preventDefault();event.stopImmediatePropagation();}};
    const click=(event:MouseEvent)=>{
      if(skip.current?.contains(event.target as Node))return;
      if(current.current.isBusy()){event.preventDefault();event.stopImmediatePropagation();return;}
      if(!target.current?.contains(event.target as Node)){block(event);return;}
      current.current.advance();
    };
    const focus=(event:FocusEvent)=>{if(!allowed(event))(target.current??skip.current)?.focus({preventScroll:true});};
    const keyboard=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();return;}
      if(event.key==='Tab'){event.preventDefault();if(document.activeElement===skip.current)target.current?.focus({preventScroll:true});else skip.current?.focus({preventScroll:true});return;}
      if(['Enter',' '].includes(event.key))block(event);
    };
    document.addEventListener('pointerdown',block,true);document.addEventListener('click',click,true);
    document.addEventListener('focusin',focus,true);document.addEventListener('keydown',keyboard,true);
    return()=>{document.removeEventListener('pointerdown',block,true);document.removeEventListener('click',click,true);document.removeEventListener('focusin',focus,true);document.removeEventListener('keydown',keyboard,true);const element=target.current;target.current=null;if(element?.isConnected)element.focus({preventScroll:true});};
  },[tour.phase]);

  useEffect(()=>{
    const element=layer.current;if(tour.phase!=='active'||!element)return;
    // A manual popover stays above a native modal drawer without replacing it.
    element.showPopover();return()=>{if(element.matches(':popover-open'))element.hidePopover();};
  },[tour.phase,host]);

  if(tour.phase==='idle')return null;
  if(tour.phase==='intro'||tour.phase==='complete')return <Dialog title={tour.phase==='intro'?'Explore NCFE':'Tour complete'} onClose={tour.skip}><div className={styles.intro}><p>{tour.phase==='intro'?'Explore the app with a short guided tour.':'You can now explore the app.'}</p><div className={appStyles.actions}>{tour.phase==='intro'?<><button className={appStyles.primary} onClick={tour.start}>Start Tour</button><button className={appStyles.secondary} onClick={tour.skip}>Skip</button></>:<button className={appStyles.primary} onClick={tour.skip}>Finish</button>}</div></div></Dialog>;
  const left=Math.max(0,(rect?.left??0)-4),top=Math.max(0,(rect?.top??0)-4);
  const right=Math.min(innerWidth,(rect?rect.left+rect.width:0)+4),bottom=Math.min(innerHeight,(rect?rect.top+rect.height:0)+4);
  const cardWidth=Math.min(280,innerWidth-24);
  const cardLeft=Math.max(12,Math.min(innerWidth-cardWidth-12,(rect?.left??0)+(rect?.width??0)/2-cardWidth/2));
  const cardTop=rect?(bottom+140<innerHeight?Math.max(58,bottom+12):Math.max(58,top-140)):58;
  return createPortal(<div ref={layer} popover="manual" className={styles.layer} data-tour-layer>
    {!rect?<div className={styles.shade} style={{inset:0}}/>:<>
      <div className={styles.shade} style={{left:0,top:0,right:0,height:top}}/>
      <div className={styles.shade} style={{left:0,top,width:left,height:bottom-top}}/>
      <div className={styles.shade} style={{left:right,top,right:0,height:bottom-top}}/>
      <div className={styles.shade} style={{left:0,top:bottom,right:0,bottom:0}}/>
      <div key={tour.step.target} className={styles.spotlight} style={{left,top,width:right-left,height:bottom-top}} aria-hidden="true"/>
      <div className={styles.explanation} style={{left:cardLeft,top:cardTop,width:cardWidth}} role="status" aria-live="polite"><span className={styles.count}>{tour.index+1} / {ncfeTourSteps.length}</span><h2>{tour.step.title}</h2><p id={descriptionId}>{tour.step.description}</p></div>
    </>}
    <button ref={skip} className={styles.skip} onClick={tour.skip} data-tour-skip>Skip</button>
  </div>,host);
}
