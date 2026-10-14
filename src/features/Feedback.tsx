import { useTranslation } from '../i18n';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Dialog } from '../components/UI';
import { asset } from '../content/design';
import { useApp } from '../state';
import s from '../styles/App.module.css';
import f from '../styles/Feedback.module.css';
import { savePrototypeFeedback } from '../services/prototypeData';
export const feedbackCategories=['In general','Onboarding','Home','Learn','FL initiatives','FinDisha','Help centre'];
export function FeedbackForm({onClose}:{onClose:()=>void}){
 const t=useTranslation();const app=useApp();const [rating,setRating]=useState(0);const [category,setCategory]=useState('In general');const [comment,setComment]=useState('');const [error,setError]=useState('');const [submitted,setSubmitted]=useState(false);const [busy,setBusy]=useState(false);
 const close=()=>{app.setWarning('');onClose();};
 const submit=async(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();if(!rating){setError('Choose a prototype rating.');document.getElementById('rating-1')?.focus();return;}setBusy(true);setError('');try{await savePrototypeFeedback({rating,category,comment:comment.trim()});setSubmitted(true);}catch{setError('Feedback could not be submitted. Please try again.');}finally{setBusy(false);}};
 return <Dialog title={t("Rate Prototype")} feedback onClose={close}><form className={f.form} onSubmit={event=>void submit(event)}><fieldset disabled={busy||submitted}><legend className={s.srOnly}>{t("Prototype rating")}</legend><div className={s.stars}>{[1,2,3,4,5].map(value=><label className={s.starOption} key={value}><input id={`rating-${value}`} type="radio" name="prototype-rating" checked={rating===value} onChange={()=>{setRating(value);setError('');app.setWarning('');}} aria-label={t(`${value} out of 5 stars`)}/><img src={asset('295-16869',value<=rating?'imgStar2':'imgStar6')} alt=""/></label>)}</div></fieldset><label htmlFor="feedback-category" className={f.heading}>{t("Screen Reviewed")}</label><p className={f.hint}>{t("Which part of the screen are you reviewing?")}</p><select id="feedback-category" disabled={busy||submitted} value={category} onChange={event=>setCategory(event.target.value)}>{feedbackCategories.map(item=><option key={item} value={item}>{t(item)}</option>)}</select><label htmlFor="feedback-comment" className={f.heading}>{t("Give Feedback")}</label><textarea id="feedback-comment" disabled={busy||submitted} value={comment} onChange={event=>setComment(event.target.value)} maxLength={2000}/>{error&&<p className={f.error} role="alert">{t(error)}</p>}{submitted&&<p role="status">{t("Thank you. Your anonymous feedback was saved.")}</p>}<div className={s.actions}><button className={s.primary} type="submit" disabled={busy||submitted}>{t(busy?"Submitting…":"Submit")}</button><button className={s.secondary} type="button" onClick={close}>{t("Close")}</button></div></form></Dialog>;
}
