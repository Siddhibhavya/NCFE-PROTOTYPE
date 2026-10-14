import { useTranslation, LocaleProvider } from './i18n';
import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { StateProvider, useApp } from './state';
import { Presentation } from './Presentation';
import { Icon, Logo, Page, StatusBar, HomeIndicator } from './components/UI';
import { Onboarding } from './features/Onboarding';
import { Announcements, Home, Textbooks, Topic, TopicsSearch, Videos } from './features/Learning';
import { Initiatives, Programme, Registration, Review, RegistrationSuccess, LoginDemo } from './features/Initiatives';
import { FinDisha, Help, Messages, SupportDemo } from './features/Support';
import { FeedbackForm } from './features/Feedback';
import { Menu } from './components/Menu';
import { GuidedTour } from './components/GuidedTour';
import s from './styles/App.module.css';
import { About } from './features/About';
import { Impact } from './features/Impact';
function Shell() {
    const t = useTranslation();
    const app = useApp();
    const location = useLocation();
    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);
    const [feedback, setFeedback] = useState(false);
    const main = useRef<HTMLElement>(null);
    const scroll = useRef<Record<string, number>>({});
    const formRoute=location.pathname.endsWith('/register')||location.pathname==='/account/login';
    const activeTab=formRoute?'/learn':['/about','/impact'].includes(location.pathname)?'/initiatives':location.pathname;
    const onboarding = location.pathname === '/onboarding';
    useEffect(()=>{app.setWarning('');},[location.pathname, app.setWarning]);
    useEffect(()=>{if(window.parent!==window)window.parent.postMessage({type:'ncfe-warning',message:app.warning},window.location.origin);},[app.warning]);
    useEffect(() => { document.documentElement.lang = app.language; }, [app.language]);
    useEffect(() => { const el = main.current; if (!el)
        return; el.scrollTo({top:scroll.current[location.pathname]??0,behavior:'instant'}); el.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true }); return () => { scroll.current[location.pathname] = el.scrollTop; }; }, [location.pathname]);
    useEffect(() => { const receive = (event: MessageEvent) => { if (event.origin !== window.location.origin || event.source !== window.parent || event.data?.type !== 'ncfe-wrapper')
        return; if(document.querySelector('[data-tour-layer]')&&['back','restart','feedback'].includes(event.data.action))return; if (event.data.action === 'back') {
        if(feedback){setFeedback(false);app.setWarning('');return;}
        if(menu){setMenu(false);return;}
        if ((window.history.state?.idx ?? 0) > 0)
            navigate(-1);
        else
            navigate('/home');
    } if(event.data.action==='ready')window.parent.postMessage({type:'ncfe-ready'},window.location.origin); if(event.data.action==='dismiss-warning')app.setWarning(''); if (event.data.action === 'feedback') { setFeedback(true); } if (event.data.action === 'restart') {
        setMenu(false);
        setFeedback(false);
        app.resetDemo();
        navigate('/onboarding');
    } }; window.addEventListener('message', receive); if(window.parent!==window)window.parent.postMessage({type:'ncfe-ready'},window.location.origin); return () => window.removeEventListener('message', receive); }, [app, navigate, feedback, menu]);
    return <div className={`${s.shell} ${onboarding ? s.onboardShell : ''} ${app.dark ? s.dark : ''}`} lang={app.language}><a className={s.skipLink} href="#main-content">{t("Skip to content")}</a><StatusBar />{!onboarding && <header className={s.header}><Link to="/home" aria-label={t("NCFE prototype Home")}><Logo /></Link><div className={s.headerActions}>{!formRoute&&location.pathname!=='/learn/topics/pmjdy'&&<Link data-tour-id="search" className={`${s.iconButton} ${location.pathname==='/home'?s.homeSearch:''}`} to="/learn/search" aria-label={t("Topics Search")}><Icon name="search"/></Link>}<Link className={s.iconButton} to="/announcements" aria-label={t("Notifications")}><Icon name="notification"/></Link><button data-tour-id="menu" className={s.iconButton} onClick={() => setMenu(previous=>!previous)} aria-expanded={menu} aria-controls="ncfe-menu" aria-label={t("Open menu")}><Icon name="menu"/></button></div></header>}<main id="main-content" ref={main} className={s.main} tabIndex={-1}><Routes><Route path="/" element={<Navigate to="/onboarding" replace/>}/><Route path="/onboarding" element={<Onboarding />}/><Route path="/about" element={<About />}/><Route path="/impact" element={<Impact />}/><Route path="/home" element={<Home />}/><Route path="/announcements" element={<Announcements />}/><Route path="/events" element={<Navigate to="/home" replace/>}/><Route path="/learn" element={<Navigate to="/learn/textbooks" replace/>}/><Route path="/learn/textbooks" element={<Textbooks />}/><Route path="/learn/search" element={<TopicsSearch />}/><Route path="/learn/videos" element={<Videos />}/><Route path="/learn/topics/:topicId" element={<Topic />}/><Route path="/initiatives" element={<Initiatives />}/><Route path="/initiatives/:programmeId" element={<Programme />}/><Route path="/initiatives/:programmeId/register" element={<Registration />}/><Route path="/initiatives/:programmeId/review" element={<Review />}/><Route path="/initiatives/:programmeId/success" element={<RegistrationSuccess />}/><Route path="/account/login" element={<LoginDemo />}/><Route path="/findisha" element={<FinDisha />}/><Route path="/findisha/messages" element={<Messages />}/><Route path="/help" element={<Help />}/><Route path="/help/:channel" element={<SupportDemo />}/><Route path="/study" element={<Navigate to="/home" replace/>}/><Route path="/privacy" element={<Navigate to="/home" replace/>}/><Route path="*" element={<Page title={t("Page not found")} back><Link to="/home">{t("Return Home")}</Link></Page>}/></Routes></main>{!onboarding && <nav className={s.nav} aria-label={t("Primary navigation")}>{[{ to: '/home', label: 'Home', icon: 'home' }, { to: '/learn/textbooks', label: 'Learn', icon: 'book' }, { to: '/initiatives', label: 'FL initiatives', icon: 'initiatives' }, { to: '/findisha', label: 'FinDisha', icon: 'chatbot' }].map(item => <Link data-tour-id={item.icon==='book'?'learning':item.icon==='chatbot'?'findisha':item.icon} key={item.to} to={item.to} aria-current={activeTab.startsWith(item.to.split('/').slice(0, 2).join('/')) ? 'page' : undefined}><Icon name={item.icon as 'home' | 'book' | 'initiatives' | 'chatbot'}/><span>{t(item.label)}</span></Link>)}</nav>}{menu && <Menu onClose={()=>setMenu(false)}/>}<HomeIndicator /><GuidedTour completedLanguageSelection={app.completedLanguageSelection} route={location.pathname} menuOpen={menu}/>{feedback && <FeedbackForm onClose={() => setFeedback(false)}/>}</div>;
}
export default function App() { return <Presentation><StateProvider><LocaleProvider><Shell /></LocaleProvider></StateProvider></Presentation>; }
