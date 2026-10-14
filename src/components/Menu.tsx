import { useTranslation } from '../i18n';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Dialog } from './UI';
import { asset } from '../content/design';
import { useApp } from '../state';
import s from '../styles/App.module.css';
export function Menu({onClose}:{onClose:()=>void}){const t=useTranslation();
  const app=useApp();
  useEffect(()=>{
    // The native modal makes the underlying header inert; handle its original
    // hamburger hit area without adding or moving any visible controls.
    const toggle=(event:MouseEvent)=>{
      const trigger=document.querySelector('[aria-controls="ncfe-menu"]');
      if(!trigger)return;
      const bounds=trigger.getBoundingClientRect();
      if(event.detail>0&&event.clientX>=bounds.left&&event.clientX<=bounds.right&&event.clientY>=bounds.top&&event.clientY<=bounds.bottom){event.preventDefault();event.stopPropagation();onClose();}
    };
    document.addEventListener('click',toggle,true);
    return()=>document.removeEventListener('click',toggle,true);
  },[onClose]);
  return <Dialog title={t("Menu")} drawer onClose={onClose}><div className={s.menuIdentity}><img src={asset('menu','identity')} alt={t("National Centre for Financial Education")}/></div><div className={s.menu}><Link data-tour-id="about" to="/about" onClick={onClose}><span className={s.menuIcon}><img src={asset('menu','about')} alt=""/></span>{t("About NCFE")}</Link><Link to="/impact" onClick={onClose}><span className={s.menuIcon}><img src={asset('menu','impact')} alt=""/></span>{t("Impact")}</Link><Link to="/findisha/messages" onClick={onClose}><span className={s.menuIcon}><img src={asset('menu','messages')} alt=""/></span>{t("Messages Log")}</Link><Link to="/onboarding" onClick={onClose}><span className={s.menuIcon}><img src={asset('menu','language')} alt=""/></span>{t("Language")} <span className={s.menuLanguage}>{app.language==='hi'?'हिन्दी':app.language==='or'?'ଓଡ଼ିଆ':'English'}<img className={s.menuDropdown} src={asset('menu','dropdown')} alt=""/></span></Link><button aria-pressed={app.dark} onClick={()=>app.setDark(!app.dark)}><span className={s.menuIcon}><img src={asset('menu','mode')} alt=""/></span>{t(app.dark?'Dark Mode':'Light Mode')}<span className={s.modeSwitch} aria-hidden="true"/></button><Link to="/help" onClick={onClose}><span className={s.menuIcon}><img src={asset('menu','help')} alt=""/></span>{t("Help")}</Link><button onClick={()=>{onClose();app.setWarning('The approved Privacy Policy content has not been supplied.');}}><span className={s.menuIcon}><img src={asset('menu','privacy')} alt=""/></span>{t("Privacy Policy")}</button></div></Dialog>;}
