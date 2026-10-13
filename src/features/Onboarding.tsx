import { useTranslation } from '../i18n';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Logo, PrototypeNote } from '../components/UI';
import { languages, useApp, type Language } from '../state';
import { onboardingLanguages } from '../content/onboarding-languages';
import { asset } from '../content/design';
import s from '../styles/App.module.css';
import o from '../styles/Onboarding.module.css';

export function Onboarding() {
  const t = useTranslation();
  const navigate = useNavigate();
  const app = useApp();
  const [pending, setPending] = useState<Language | null>(null);
  const [selected, setSelected] = useState<Language | null>(null);
  const [query, setQuery] = useState('');
  const option = languages.find(language => language.id === pending);
  const matching = onboardingLanguages.filter(language => `${language.native} ${language.name}`.toLowerCase().includes(query.toLowerCase()));
  return <section className={o.onboarding}>
    <div className={o.identity}><Logo /><p>{t('National Centre for Financial Education')}</p></div>
    <h1 tabIndex={-1}>{t('Choose your language')}</h1>
    <form role="search" onSubmit={event => event.preventDefault()}>
      <label htmlFor="language-search">{t('Choose or search your language.')} <img src={asset('111-7492', 'imgInfo')} alt="" /></label>
      <div className={o.searchField}><img src={asset('111-7492', 'imgLeadingIcon')} alt="" /><input id="language-search" type="search" placeholder={t('Search for…')} value={query} onChange={event => setQuery(event.target.value)} /><button type="button" aria-label="Clear language search" onClick={() => setQuery('')}><img src={asset('111-7492', 'imgTrailingIcon1')} alt="" /></button><button type="submit" aria-label="Search languages"><img src={asset('111-7492', 'imgIcon')} alt="" /></button></div>
    </form>
    <div className={o.languages} role="group" aria-label={t('Available languages')}>
      {matching.map(language => <button key={language.locale} disabled={!language.id} aria-describedby={!language.id ? 'language-availability' : undefined} className={`${o.tile} ${selected === language.id ? o.selected : ''}`} aria-pressed={selected === language.id} onClick={() => { if (language.id) { setSelected(language.id); setPending(language.id); } }}><strong lang={language.locale} className={language.id === 'hi' ? o.hindi : language.id === 'or' ? o.odia : undefined}>{language.native}</strong><span>{t(language.name)}</span></button>)}
    </div>
    {query && !matching.length && <p role="status">{t('No matching language.')}</p>}
    <p id="language-availability" className={window.parent !== window ? s.srOnly : s.notice}>{t('English, Hindi and Odia are available. Hindi and Odia text is a draft translation for usability testing. Programme and policy names remain unchanged.')}</p>
    <PrototypeNote />
    {pending && option && <Dialog languageConfirmation title={t('Confirm your language?')} onClose={() => setPending(null)}><p>{t('Use the selected language for this app?')}</p><div className={s.actions}><button className={s.primary} onClick={() => { app.setLanguage(pending); navigate('/home'); }}>{t('Yes')}</button><button className={s.secondary} onClick={() => setPending(null)}>{t('No')}</button></div></Dialog>}
  </section>;
}
