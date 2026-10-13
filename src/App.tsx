import { useTranslation, LocaleProvider } from './i18n';
import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { StateProvider, useApp } from './state';
import { Presentation } from './Presentation';
import { Dialog, Icon, Logo, Page, PrototypeNote } from './components/UI';
import { Onboarding } from './features/Onboarding';
import { Announcements, Home, Textbooks, Topic, TopicsSearch, Videos } from './features/Learning';
import { Initiatives, Programme, Registration, Review, RegistrationSuccess, LoginDemo } from './features/Initiatives';
import { FinDisha, Help, Messages, SupportDemo } from './features/Support';
import { FeedbackForm } from './features/Feedback';
import { Study, Privacy } from './features/Study';
import s from './styles/App.module.css';
function Shell() {
    const t = useTranslation();
    const app = useApp();
    const location = useLocation();
    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);
    const [feedback, setFeedback] = useState(false);
    const main = useRef<HTMLElement>(null);
    const scroll = useRef<Record<string, number>>({});
    const onboarding = location.pathname === '/onboarding';
    useEffect(() => { document.documentElement.lang = app.language; }, [app.language]);
    useEffect(() => { const el = main.current; if (!el)
        return; el.scrollTop = scroll.current[location.pathname] ?? 0; el.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true }); return () => { scroll.current[location.pathname] = el.scrollTop; }; }, [location.pathname]);
    useEffect(() => { const receive = (event: MessageEvent) => { if (event.origin !== window.location.origin || event.source !== window.parent || event.data?.type !== 'ncfe-wrapper')
        return; if (event.data.action === 'back') {
        if ((window.history.state?.idx ?? 0) > 0)
            navigate(-1);
        else
            navigate('/home');
    } if (event.data.action === 'feedback') { setFeedback(true); } if (event.data.action === 'restart') {
        app.resetDemo();
        navigate('/onboarding');
    } }; window.addEventListener('message', receive); return () => window.removeEventListener('message', receive); }, [app, navigate]);
    return <div className={`${s.shell} ${onboarding ? s.onboardShell : ''} ${app.dark ? s.dark : ''}`} lang={app.language}><a className={s.skipLink} href="#main-content">{t("Skip to content")}</a>{!onboarding && <header className={s.header}><Link to="/home" aria-label={t("NCFE prototype Home")}><Logo /></Link><div className={s.headerActions}><Link className={s.iconButton} to="/learn/search" aria-label={t("Topics Search")}><Icon name="search"/></Link><Link className={s.iconButton} to="/announcements" aria-label={t("Notifications")}><Icon name="notification"/></Link><button className={s.iconButton} onClick={() => setMenu(true)} aria-label={t("Open menu")}><Icon name="menu"/></button></div></header>}<button className={s.feedbackTrigger} onClick={() => setFeedback(true)} aria-label={t("Give Feedback")}><span className={s.mobileLabel} aria-hidden="true">{t("F")}</span><span className={s.desktopLabel}>{t("Feedback")}</span></button><main id="main-content" ref={main} className={s.main} tabIndex={-1}>{!onboarding && <div>{app.language !== 'en' && <p className={s.notice}>{t("Draft translation for usability testing. Programme and policy names remain unchanged. Text in original images may remain in English.")}</p>}</div>}<Routes><Route path="/" element={<Navigate to="/onboarding" replace/>}/><Route path="/onboarding" element={<Onboarding />}/><Route path="/home" element={<Home />}/><Route path="/announcements" element={<Announcements />}/><Route path="/events" element={<Announcements events/>}/><Route path="/learn" element={<Navigate to="/learn/textbooks" replace/>}/><Route path="/learn/textbooks" element={<Textbooks />}/><Route path="/learn/search" element={<TopicsSearch />}/><Route path="/learn/videos" element={<Videos />}/><Route path="/learn/topics/:topicId" element={<Topic />}/><Route path="/initiatives" element={<Initiatives />}/><Route path="/initiatives/:programmeId" element={<Programme />}/><Route path="/initiatives/:programmeId/register" element={<Registration />}/><Route path="/initiatives/:programmeId/review" element={<Review />}/><Route path="/initiatives/:programmeId/success" element={<RegistrationSuccess />}/><Route path="/account/login" element={<LoginDemo />}/><Route path="/findisha" element={<FinDisha />}/><Route path="/findisha/messages" element={<Messages />}/><Route path="/help" element={<Help />}/><Route path="/help/:channel" element={<SupportDemo />}/><Route path="/study" element={<Study />}/><Route path="/privacy" element={<Privacy />}/><Route path="*" element={<Page title={t("Page not found")} back><Link to="/home">{t("Return Home")}</Link></Page>}/></Routes></main>{!onboarding && <nav className={s.nav} aria-label={t("Primary navigation")}>{[{ to: '/home', label: 'Home', icon: 'home' }, { to: '/learn/textbooks', label: 'Learn', icon: 'book' }, { to: '/initiatives', label: 'Initiatives', icon: 'initiatives' }, { to: '/findisha', label: 'FinDisha', icon: 'chatbot' }].map(item => <Link key={item.to} to={item.to} aria-current={location.pathname.startsWith(item.to.split('/').slice(0, 2).join('/')) ? 'page' : undefined}><Icon name={item.icon as 'home' | 'book' | 'initiatives' | 'chatbot'}/><span>{t(item.label)}</span></Link>)}</nav>}{menu && <Dialog title={t("Menu")} onClose={() => setMenu(false)}><div className={s.menu}><Link to="/findisha/messages" onClick={() => setMenu(false)}>{t("Messages Log")}</Link><Link to="/onboarding" onClick={() => setMenu(false)}>{t("Language")}</Link><button aria-pressed={app.dark} onClick={() => app.setDark(!app.dark)}>{t(app.dark ? 'Light Mode' : 'Dark Mode')}</button><Link to="/help" onClick={() => setMenu(false)}>{t("Help")}</Link><Link to="/study" onClick={() => setMenu(false)}>{t("Usability testing")}</Link><Link to="/privacy" onClick={() => setMenu(false)}>{t("Privacy and withdrawal")}</Link></div><PrototypeNote /></Dialog>}{feedback && <FeedbackForm onClose={() => setFeedback(false)}/>}</div>;
}
export default function App() { return <Presentation><StateProvider><LocaleProvider><Shell /></LocaleProvider></StateProvider></Presentation>; }
