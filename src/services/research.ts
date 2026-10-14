import type { Language } from '../state';
export const studyVersion='ncfe-2026-01';
// No approved backend workflow: no Firebase, authentication or persistent identity.
export const researchEnabled=false;
export type Mode='independent'|'facilitated';
export type Outcome='completed'|'not-completed'|'skipped';
export type TaskResult={taskId:string;outcome:Outcome;difficulty:number|null;comment:string};
export type Feedback={rating:number;category:string;language:Language;comment:string};
export async function startTest(language:Language,mode:Mode):Promise<string|null>{void language;void mode;return null;}
export async function finishTest(id:string|null,results:TaskResult[],language:Language):Promise<'demonstration'|'saved'>{void id;void results;void language;return 'demonstration';}
export async function sendFeedback(feedback:Feedback,consent:boolean):Promise<'demonstration'|'saved'>{void feedback;void consent;return 'demonstration';}
export async function withdrawResponses():Promise<'demonstration'|'empty'|'withdrawn'>{return 'demonstration';}
