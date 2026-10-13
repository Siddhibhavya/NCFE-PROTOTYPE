import { useTranslation } from '../i18n';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Page, PrototypeNote } from '../components/UI';
import { useApp } from '../state';
import { startTest, finishTest, researchEnabled, withdrawResponses, type Mode, type TaskResult, type Outcome } from '../services/research';
import s from '../styles/App.module.css';
import f from '../styles/Forms.module.css';
export const tasks = [
    { id: 'language', title: 'Select your preferred language', instruction: 'Choose a language and confirm it.', to: '/onboarding' },
    { id: 'bank-accounts', title: 'Find information about bank accounts', instruction: 'Use the learning pages to find information about bank accounts.', to: '/home' },
    { id: 'fetp-registration', title: 'Find FETP and begin registration', instruction: 'Locate FETP, open its details, and begin the fictional registration.', to: '/home' },
    { id: 'non-voice-support', title: 'Locate non-voice support', instruction: 'Find a support option that does not require speaking.', to: '/home' },
];
type Session = {
    mode: Mode;
    id: string | null;
    results: TaskResult[];
    index: number;
    ended: boolean;
};
// In-memory session survives route navigation and never contains form drafts.
let session: Session | null = null;
export function Study() {
    const t = useTranslation();
    const app = useApp();
    const [active, setActive] = useState(session);
    const [mode, setMode] = useState<Mode>('independent');
    const [share, setShare] = useState(false);
    const [outcome, setOutcome] = useState<Outcome>('completed');
    const [difficulty, setDifficulty] = useState('');
    const [comment, setComment] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [saved, setSaved] = useState(false);
    const update = (next: Session | null) => { session = next; setActive(next); };
    const begin = async () => { setBusy(true); setError(''); try {
        const id = share && researchEnabled ? await startTest(app.language, mode) : null;
        update({ mode, id, results: [], index: 0, ended: false });
    }
    catch {
        setError('The study could not connect. You can still use demonstration mode.');
    }
    finally {
        setBusy(false);
    } };
    const record = (skip = false) => { if (!active)
        return; if (!skip && outcome !== 'skipped' && !difficulty) {
        setError('Choose a task difficulty or skip the task.');
        document.getElementById('task-difficulty')?.focus();
        return;
    } const results = [...active.results, { taskId: tasks[active.index].id, outcome: skip ? 'skipped' as const : outcome, difficulty: skip || outcome === 'skipped' ? null : Number(difficulty), comment: comment.trim() }]; update({ ...active, results, index: active.index + 1, ended: results.length === tasks.length }); setDifficulty(''); setComment(''); setOutcome('completed'); setError(''); };
    const finish = async () => { if (!active)
        return; setBusy(true); setError(''); try {
        await finishTest(active.id, active.results, app.language);
        setSaved(true);
    }
    catch {
        setError('Results could not be saved. They remain here so you can retry.');
    }
    finally {
        setBusy(false);
    } };
    return <Page title={t("Usability testing")} back>{!active ? <><p>{t("Try four short tasks in this independent academic prototype. Use fictional information only. You can skip any task or explore without taking part.")}</p><div className={f.form}><fieldset><legend>{t("Testing mode")}</legend><label><input type="radio" name="testing-mode" checked={mode === 'independent'} onChange={() => setMode('independent')}/>{t(" Independent testing")}</label><label><input type="radio" name="testing-mode" checked={mode === 'facilitated'} onChange={() => setMode('facilitated')}/>{t(" Facilitated testing")}</label></fieldset>{researchEnabled ? <label><input type="checkbox" checked={share} onChange={event => setShare(event.target.checked)}/>{t(" I consent to share anonymous task outcomes, difficulty, selected language, mode and optional comments for 90 days. Registration and chat text are not collected.")}</label> : <p className={s.notice}>{t("Demonstration mode. Task recording works on this screen without saving data to Firebase.")}</p>}<Link to="/privacy">{t("Read privacy and withdrawal information")}</Link><button className={s.primary} disabled={busy} onClick={() => void begin()}>{t(busy?"Starting…":share?"Start and share study responses":"Start demonstration test")}</button><Link to="/home">{t("Explore without taking part")}</Link></div></> : active.ended ? <div className={s.card}><h2>{t("Tasks finished")}</h2><p>{active.results.filter(result => result.outcome === 'completed').length}{" / 4 "}{t("tasks reported complete. Skipped tasks are recorded separately.")}</p><ul>{active.results.map(result => <li key={result.taskId}>{t(tasks.find(task=>task.id===result.taskId)?.title??"")}{t(": ")}{t(result.outcome)}</li>)}</ul>{saved ? <p role="status">{t(active.id?"Your anonymous study responses were saved.":"Demonstration completed. No responses were sent or saved.")}</p> : <button className={s.primary} disabled={busy} onClick={() => void finish()}>{t(busy?"Submitting…":active.id?"Submit study responses":"Finish demonstration")}</button>}<div className={s.actions}><button className={s.secondary} disabled={busy} onClick={() => { update(null); setSaved(false); }}>{t("Start another test")}</button><Link className={s.primary} to="/home">{t("Return Home")}</Link></div></div> : <><p className={s.muted}>{t("Task ")}{active.index + 1}{t(" of ")}{tasks.length}{t(" \u00B7 ")}{t(active.mode==="facilitated"?"Facilitated testing":"Independent testing")}</p><h2>{t(tasks[active.index].title)}</h2><p>{t(tasks[active.index].instruction)}</p><Link className={s.primary} to={tasks[active.index].to}>{t("Open prototype for this task")}</Link><p className={s.notice}>{t("Use the menu or the \u201CUsability test\u201D link to return here after trying the task. This is your own task report, not an automatic assessment.")}</p><div className={f.form}><label htmlFor="task-outcome">{t("Task outcome")}</label><select id="task-outcome" value={outcome} onChange={event => setOutcome(event.target.value as Outcome)}><option value="completed">{t("Completed")}</option><option value="not-completed">{t("Could not complete")}</option><option value="skipped">{t("Skipped")}</option></select><label htmlFor="task-difficulty">{t("Task difficulty")}</label><select id="task-difficulty" value={difficulty} disabled={outcome === 'skipped'} onChange={event => setDifficulty(event.target.value)}><option value="">{t("Choose difficulty")}</option>{['Very easy', 'Easy', 'Neither easy nor difficult', 'Difficult', 'Very difficult'].map((label, index) => <option key={label} value={index + 1}>{t(label)}</option>)}</select><label htmlFor="task-comment">{t("Optional feedback")}</label><textarea id="task-comment" value={comment} onChange={event => setComment(event.target.value)} maxLength={2000} placeholder={t("No names, contact details or financial information.")}/><div className={s.actions}><button className={s.primary} onClick={() => record()}>{t("Record and continue")}</button><button className={s.secondary} onClick={() => record(true)}>{t("Skip task")}</button></div><Link to="/privacy">{t("Stop and withdraw responses")}</Link></div></>}{error && <p role="alert" className={f.error}>{t(error)}</p>}<PrototypeNote /></Page>;
}
export function Privacy() { const t = useTranslation(); const [status, setStatus] = useState(''); const [busy, setBusy] = useState(false); const withdraw = async () => { setBusy(true); try {
    const result = await withdrawResponses();
    session = null;
    setStatus(result === 'withdrawn' ? 'Your saved responses from this browser identity were deleted.' : result === 'empty' ? 'No saved study identity was found in this browser.' : 'Demonstration reset. No research data was saved.');
}
catch {
    setStatus('Withdrawal could not connect. Your responses have not been deleted. Try again when connected.');
}
finally {
    setBusy(false);
} }; return <Page title={t("Prototype privacy")} back><p>{t("This is an independent academic redesign, not an official NCFE application.")}</p><h2>{t("Try the prototype without sharing data")}</h2><p>{t("All learning, registration, feedback and support demonstrations work without data collection. Fictional registration details and FinDisha messages stay in memory and disappear on reload. Your selected language is stored on this device.")}</p><h2>{t("Optional study responses and feedback")}</h2><p>{t(researchEnabled?"Only responses you agree to submit are sent to Firebase.":"Research collection is currently disabled. Feedback and task submissions are demonstrations.")}</p><p>{t("When enabled, Firebase stores an anonymous browser identifier, study version, language, testing mode, task outcome, difficulty, rating, category, optional comments and timestamps. No visit analytics, registration details or conversation text are collected. A browser session is not a verified count of unique people.")}</p><p>{t("Responses are retained for 90 days after submission. Raw responses are not publicly readable. Only reviewed, anonymous aggregates may be published; visits and general feedback never count as completed usability tests.")}</p><h2>{t("Withdrawal")}</h2><p>{t("Use the button below in the same browser used to submit responses. If you clear browser storage, the prototype cannot identify previous responses for you.")}</p><button className={s.secondary} disabled={busy} onClick={() => void withdraw()}>{t(busy?"Withdrawing…":"Withdraw my responses")}</button>{status && <p role="status">{t(status)}</p>}<h2>{t("Study contact")}</h2><p>{t("Prototype placeholder: a study contact has not been added. No contact details or official support service are implied.")}</p><PrototypeNote /></Page>; }
