import { useTranslation } from '../i18n';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from '../components/UI';
import { asset } from '../content/design';
import { useApp, type Language } from '../state';
import { researchEnabled, sendFeedback } from '../services/research';
import s from '../styles/App.module.css';
import f from '../styles/Feedback.module.css';
export const feedbackCategories = ['Onboarding and language selection', 'Home', 'Learning and videos', 'Financial literacy programmes', 'FinDisha and Help', 'Overall experience'];
export function FeedbackForm({ onClose }: {
    onClose: () => void;
}) {
    const t = useTranslation();
    const { language } = useApp();
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(language);
    const [rating, setRating] = useState(0);
    const [category, setCategory] = useState('Overall experience');
    const [comment, setComment] = useState('');
    const [consent, setConsent] = useState(false);
    const [busy, setBusy] = useState(false);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const submit = async (event: React.FormEvent) => { event.preventDefault(); if (!rating) {
        setError('Choose a prototype rating.');
        document.getElementById('rating-1')?.focus();
        return;
    } if (researchEnabled && !consent) {
        setError('Choose whether to share this feedback or use the demonstration.');
        return;
    } setBusy(true); setError(''); try {
        const result = await sendFeedback({ rating, category, language: selectedLanguage, comment: comment.trim() }, consent);
        setStatus(result === 'saved' ? 'Thank you. Your anonymous feedback was saved.' : 'Thank you. Feedback demonstration completed; nothing was sent or saved.');
    }
    catch {
        setError('Feedback could not be saved. Your text is still here. Try again or close without submitting.');
    }
    finally {
        setBusy(false);
    } };
    return <Dialog title={t("Rate Prototype")} feedback onClose={() => { if (!busy)
        onClose(); }}>{status ? <div role="status"><p>{t(status)}</p><button className={s.primary} onClick={onClose}>{t("Close")}</button></div> : <form onSubmit={event => void submit(event)} noValidate className={f.form}><fieldset aria-describedby={error ? 'feedback-error' : undefined}><legend className={s.srOnly}>{t("Prototype rating \u00B7 Required")}</legend><div className={s.stars}>{[1, 2, 3, 4, 5].map(value => <label key={value} className={s.starOption}><input id={`rating-${value}`} type="radio" name="prototype-rating" value={value} checked={rating === value} onChange={() => { setRating(value); setError(''); }} required aria-label={t(`${value} out of 5 stars`)}/><img src={asset('295-16869', value <= rating ? 'imgStar2' : 'imgStar6')} alt={t("")}/></label>)}</div></fieldset><label htmlFor="feedback-category" className={f.heading}>{t("Screen Reviewed")}</label><p className={f.hint}>{t("Which part of the screen are you reviewing?")}</p><select id="feedback-category" value={category} onChange={event => setCategory(event.target.value)}>{feedbackCategories.map(item => <option key={item} value={item}>{t(item)}</option>)}</select><label htmlFor="feedback-language">{t("Language")}</label><select id="feedback-language" value={selectedLanguage} onChange={event => setSelectedLanguage(event.target.value as Language)}><option value="en" lang="en">{t("English")}</option><option value="hi" lang="hi">{t("\u0939\u093F\u0928\u094D\u0926\u0940 \u00B7 Hindi")}</option><option value="or" lang="or">{t("\u0B13\u0B21\u0B3C\u0B3F\u0B06 \u00B7 Odia")}</option></select><label htmlFor="feedback-comment" className={f.heading}>{t("Give Feedback")}</label><textarea id="feedback-comment" lang={selectedLanguage} value={comment} onChange={event => setComment(event.target.value)} maxLength={2000} placeholder={t("Optional. Write in your preferred language.")}/><p className={f.hint}>{t("Please leave out names, contact details and financial information.")}</p>{researchEnabled ? <label className={f.consent}><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)}/>{t("I agree to share this anonymous rating and feedback for the study, retained for 90 days.")}</label> : <p className={f.hint}>{t("Demonstration mode. This form works without Firebase and does not save responses.")}</p>}<Link to="/privacy" onClick={onClose}>{t("Privacy and withdrawal")}</Link>{error && <p role="alert" id="feedback-error" className={f.error}>{t(error)}</p>}<div className={s.actions}><button type="submit" className={s.primary} disabled={busy}>{t(busy?"Submitting…":"Submit")}</button>{researchEnabled && <button type="button" className={s.secondary} disabled={busy} onClick={() => setStatus('Feedback demonstration completed; nothing was sent or saved.')}>{t("Use demonstration")}</button>}<button type="button" className={s.secondary} disabled={busy} onClick={onClose}>{t("Close")}</button></div></form>}</Dialog>;
}
