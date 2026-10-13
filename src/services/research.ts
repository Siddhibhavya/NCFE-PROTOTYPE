import type { Language } from '../state';

export const studyVersion='ncfe-2026-01';
export const researchEnabled=import.meta.env.VITE_RESEARCH_ENABLED==='true' && !!import.meta.env.VITE_FIREBASE_API_KEY && !!import.meta.env.VITE_FIREBASE_APP_ID;
export type Mode='independent'|'facilitated';
export type Outcome='completed'|'not-completed'|'skipped';
export type TaskResult={taskId:string;outcome:Outcome;difficulty:number|null;comment:string};
export type Feedback={rating:number;category:string;language:Language;comment:string};
const day=24*60*60*1000;
async function connection(){
 const [{initializeApp,getApps},{getAuth,signInAnonymously},{getFirestore}]=await Promise.all([import('firebase/app'),import('firebase/auth'),import('firebase/firestore')]);
 const app=getApps()[0]??initializeApp({apiKey:import.meta.env.VITE_FIREBASE_API_KEY,authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,appId:import.meta.env.VITE_FIREBASE_APP_ID});
 const auth=getAuth(app);await auth.authStateReady();const user=auth.currentUser??(await signInAnonymously(auth)).user;
 return {db:getFirestore(app),uid:user.uid,auth};
}
export async function startTest(language:Language,mode:Mode){
 if(!researchEnabled)return null;
 const {db,uid}=await connection();const {doc,setDoc,serverTimestamp,Timestamp}=await import('firebase/firestore');
 const id=crypto.randomUUID();
 await setDoc(doc(db,'research',uid,'tests',id),{owner:uid,studyVersion,language,mode,status:'started',results:[],createdAt:serverTimestamp(),updatedAt:serverTimestamp(),expiresAt:Timestamp.fromMillis(Date.now()+90*day)});
 return id;
}
export async function finishTest(id:string|null,results:TaskResult[],language:Language){
 if(!researchEnabled||!id)return 'demonstration' as const;
 const {db,uid}=await connection();const {doc,updateDoc,serverTimestamp,Timestamp}=await import('firebase/firestore');
 const completed=results.length===4&&results.some(r=>r.outcome!=='skipped');
 await updateDoc(doc(db,'research',uid,'tests',id),{language,status:completed?'completed':'all-skipped',results,updatedAt:serverTimestamp(),expiresAt:Timestamp.fromMillis(Date.now()+90*day)});
 return 'saved' as const;
}
export async function sendFeedback(feedback:Feedback,consent:boolean){
 if(!researchEnabled||!consent)return 'demonstration' as const;
 const {db,uid}=await connection();const {doc,setDoc,serverTimestamp,Timestamp}=await import('firebase/firestore');
 await setDoc(doc(db,'research',uid,'feedback',crypto.randomUUID()),{...feedback,owner:uid,studyVersion,createdAt:serverTimestamp(),expiresAt:Timestamp.fromMillis(Date.now()+90*day)});
 return 'saved' as const;
}
export async function withdrawResponses(){
 if(!researchEnabled)return 'demonstration' as const;
 // Do not create a new anonymous account just to withdraw.
 const {getApps}=await import('firebase/app');if(!getApps().length)return 'empty' as const;
 const {getAuth}=await import('firebase/auth');const auth=getAuth();await auth.authStateReady();if(!auth.currentUser)return 'empty' as const;
 const {getFirestore,collection,query,limit,getDocs,writeBatch}=await import('firebase/firestore');const db=getFirestore();const uid=auth.currentUser.uid;
 for(const kind of ['tests','feedback']){
  for(;;){const records=await getDocs(query(collection(db,'research',uid,kind),limit(100)));if(records.empty)break;const batch=writeBatch(db);records.docs.forEach(record=>batch.delete(record.ref));await batch.commit();}
 }
 return 'withdrawn' as const;
}
