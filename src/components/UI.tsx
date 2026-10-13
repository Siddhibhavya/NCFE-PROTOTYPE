import { useTranslation } from '../i18n';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { asset, icons, type IconName } from '../content/design';
import s from '../styles/App.module.css';
export function Icon({ name }: {
    name: IconName;
}) { const t = useTranslation(); return <img className={s.icon} src={asset('18-4998', icons[name])} alt={t("")}/>; }
export function Logo() { const t = useTranslation(); return <span className={s.logo} style={{ maskImage: `url(${asset('111-7492', 'imgImage22')})` }}><img src={asset('111-7492', 'imgImage23')} alt={t("National Centre for Financial Education")}/></span>; }
export function Back({ fallback = '/home' }: {
    fallback?: string;
}) { const t = useTranslation(); const navigate = useNavigate(); return <button className={s.back} onClick={() => { if ((window.history.state?.idx ?? 0) > 0)
    navigate(-1);
else
    navigate(fallback); }} aria-label={t("Go back")}>{t("\u2039 Back")}</button>; }
export function Page({ title, children, back = false }: {
    title: string;
    children: ReactNode;
    back?: boolean;
}) { return <section className={s.page}>{back && <Back />}<h1 className={title === 'Home' ? s.srOnly : undefined} tabIndex={-1}>{title}</h1>{children}</section>; }
export function ActionLink({ to, children }: {
    to: string;
    children: ReactNode;
}) { return <Link className={s.primary} to={to}>{children}</Link>; }
export function Dialog({ title, children, onClose, feedback = false, languageConfirmation = false }: {
    title: string;
    children: ReactNode;
    onClose: () => void;
    feedback?: boolean;
    languageConfirmation?: boolean;
}) {
    const t = useTranslation();
    const titleId = useId();
    const ref = useRef<HTMLDialogElement>(null);
    const closeRef = useRef(onClose);
    closeRef.current = onClose;
    useEffect(() => { const dialog = ref.current; if (!dialog)
        return; const previous = document.activeElement as HTMLElement | null; dialog.showModal(); return () => { dialog.close(); previous?.focus(); }; }, []);
    return <dialog ref={ref} className={`${feedback ? s.feedbackDialog : s.dialog} ${languageConfirmation ? s.languageConfirmation : ''}`} aria-labelledby={titleId} onCancel={event => { event.preventDefault(); closeRef.current(); }}><div className={s.dialogInner}>{!languageConfirmation && <button className={s.close} aria-label={t("Close dialog")} onClick={onClose}>{feedback ? <img src={asset('295-16869', 'imgVector')} alt={t("")}/> : '×'}</button>}<h2 id={titleId}>{title}</h2>{children}</div></dialog>;
}
export function PrototypeNote() { const t = useTranslation(); return <p className={s.prototypeNote}>{t("Independent academic prototype \u00B7 Not an official NCFE application. ")}<Link to="/study">{t("Usability test")}</Link>{t(" \u00B7 ")}<Link to="/privacy">{t("Privacy")}</Link></p>; }
