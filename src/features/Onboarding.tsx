import { useTranslation } from '../i18n';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Logo, PrototypeNote } from '../components/UI';
import { availableLanguages, languages, useApp, type Language } from '../state';
import { onboardingLanguages } from '../content/onboarding-languages';
import { asset } from '../content/design';
import s from '../styles/App.module.css';
import o from '../styles/Onboarding.module.css';

export function Onboarding() {
  const t = useTranslation();
  const navigate = useNavigate();
  const app = useApp();
  const [pending, setPending] = useState<Language | null>(null);
  const [selected, setSelected] = useState<Language | null>(app.language);
  const [query, setQuery] = useState('');
  const option = languages.find(language => language.id === pending);
  const cancelSelection=()=>{setPending(null);setSelected(app.language);};
  const matching = onboardingLanguages.filter(language => `${language.native} ${language.name}`.toLowerCase().includes(query.toLowerCase()));
  return <section className={`${o.onboarding} ${app.dark?o.dark:''}`}>
    <div className={o.identity}><Logo /><p>{t('National Centre for Financial Education')}</p></div>
    <h1 tabIndex={-1}>{t('Choose your language')}</h1>
    <form role="search" onSubmit={event => event.preventDefault()}>
      <label htmlFor="language-search">{t('Choose or search your language.')} <img src={asset('111-7492', 'imgInfo')} alt="" /></label>
      <div className={o.searchField}><img src={asset(app.dark?'onboarding-dark':'111-7492', 'imgLeadingIcon')} alt="" /><input id="language-search" type="search" placeholder={t('Search for…')} value={query} onChange={event => {setQuery(event.target.value);app.setWarning('');}} /><button type="button" aria-label="Voice language search" onClick={()=>app.setWarning('Voice search is unavailable in this prototype.')}><img src={asset(app.dark?'onboarding-dark':'111-7492','imgTrailingIcon')} alt=""/></button><button type="button" aria-label="Clear language search" onClick={() => {setQuery('');app.setWarning('');}}><img src={asset(app.dark?'onboarding-dark':'111-7492', 'imgTrailingIcon1')} alt="" /></button><button type="submit" aria-label="Search languages"><img src={asset(app.dark?'onboarding-dark':'111-7492', 'imgIcon')} alt="" /></button></div>
    </form>
    <div className={o.languages} role="group" aria-label={t('Available languages')}>
      {matching.map(language => {const enabled=!!language.id&&availableLanguages.includes(language.id);return <button key={language.locale} disabled={!enabled} aria-disabled={!enabled} className={`${o.tile} ${selected === language.id ? o.selected : ''}`} aria-pressed={enabled&&selected === language.id} onClick={() => { if (enabled&&language.id) { setSelected(language.id); setPending(language.id); } }}><strong lang={language.locale} className={language.id === 'hi' ? o.hindi : language.id === 'or' ? o.odia : undefined}>{language.native}</strong><span>{t(language.name)}</span></button>;})}
    </div>
    {query && !matching.length && <p role="status">{t('No matching language.')}</p>}
    <PrototypeNote />
    {pending && option && <Dialog languageConfirmation title={t('Confirm your language?')} onClose={cancelSelection}><p>{t('Use the selected language for this app?')}</p><div className={s.actions}><button className={s.primary} onClick={() => { app.setLanguage(pending); navigate('/home'); }}>{t('Yes')}</button><button className={s.secondary} onClick={cancelSelection}>{t('No')}</button></div></Dialog>}
  </section>;
}
