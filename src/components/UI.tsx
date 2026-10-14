import { useTranslation } from '../i18n';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { asset, icons, type IconName } from '../content/design';
import { useApp } from '../state';
import s from '../styles/App.module.css';
export function Icon({ name }: {
    name: IconName;
}) { const t = useTranslation(); return <img className={s.icon} src={asset('18-4998', icons[name])} alt={t("")}/>; }
export function Logo() { const t = useTranslation(); return <span className={s.logo} style={{ maskImage: `url(${asset('111-7492', 'imgImage22')})` }}><img src={asset('111-7492', 'imgImage23')} alt={t("National Centre for Financial Education")}/></span>; }
export function Back({ fallback = '/home', label = 'Back', destination }: {
    fallback?: string;
    label?: string;
    destination?: string;
}) { const t = useTranslation(); const navigate = useNavigate(); return <button className={s.back} onClick={() => { if(destination){navigate(destination);return;} if ((window.history.state?.idx ?? 0) > 0)
    navigate(-1);
else
    navigate(fallback); }} aria-label={t("Go back")}><span className={s.backArrow} aria-hidden="true">‹</span><span>{t(label)}</span></button>; }
export function Page({ title, children, back = false }: {
    title: string;
    children?: ReactNode;
    back?: boolean;
}) { const t=useTranslation(); return <section className={s.page}>{back && <Back />}<h1 className={title === 'Home' ? s.srOnly : undefined} tabIndex={-1}>{t(title)}</h1>{children}</section>; }
export function ActionLink({ to, children }: {
    to: string;
    children: ReactNode;
}) { return <Link className={s.primary} to={to}>{children}</Link>; }
export function Dialog({ title, children, onClose, feedback = false, languageConfirmation = false, drawer = false, submission = false }: {
    title: string;
    children: ReactNode;
    onClose: () => void;
    feedback?: boolean;
    languageConfirmation?: boolean;
    drawer?: boolean;
    submission?: boolean;
}) {
    const t = useTranslation();
    const titleId = useId();
    const ref = useRef<HTMLDialogElement>(null);
    const closeRef = useRef(onClose);
    closeRef.current = onClose;
    useEffect(() => { const dialog = ref.current; if (!dialog)
        return; const previous = document.activeElement as HTMLElement | null; dialog.showModal(); return () => { dialog.close(); previous?.focus(); }; }, []);
    return <dialog id={drawer?"ncfe-menu":undefined} ref={ref} className={`${feedback ? s.feedbackDialog : s.dialog} ${languageConfirmation ? s.languageConfirmation : ''} ${drawer?s.drawer:''} ${submission?s.submissionDialog:''}`} aria-labelledby={titleId} onClick={event=>{if(event.target===ref.current){const bounds=ref.current.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)closeRef.current();}}} onCancel={event => { event.preventDefault(); closeRef.current(); }}><div className={s.dialogInner}>{!languageConfirmation && !drawer && <button className={s.close} aria-label={t("Close dialog")} onClick={onClose}>{feedback ? <img src={asset('295-16869', 'imgVector')} alt={t("")}/> : '×'}</button>}<h2 id={titleId} className={drawer?s.srOnly:undefined}>{title}</h2>{children}</div></dialog>;
}
export function PrototypeNote() { return null; }
export function StatusBar(){const {dark}=useApp();const {pathname}=useLocation();const screen=dark?'onboarding-dark':pathname==='/onboarding'?'111-7492':pathname==='/findisha'?'200-14368':'18-4998';return <div className={s.deviceStatus} aria-hidden="true"><span>9:41</span><div>{['imgCellularConnection','imgWifi','imgFrame'].map(name=><img key={name} src={asset(screen,name)} alt=""/>)}</div></div>;}
export function HomeIndicator(){return <div className={s.homeIndicator} aria-hidden="true"><span/></div>;}
