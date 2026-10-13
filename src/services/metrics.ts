import type {TaskResult} from './research';
export type TestRecord={owner:string;studyVersion:string;status:string;results:TaskResult[]};
// Compute privately. Only the returned non-identifying counts may be published.
export function aggregateTests(records:TestRecord[],version:string){
 const tests=records.filter(record=>record.studyVersion===version);
 const completed=tests.filter(record=>record.status==='completed'&&record.results.length===4&&record.results.some(result=>result.outcome!=='skipped'));
 const identifiers=['language','bank-accounts','fetp-registration','non-voice-support'];
 return {studyVersion:version,startedTests:tests.length,completedTests:completed.length,anonymousTestingBrowsers:new Set(tests.map(record=>record.owner)).size,completedTestingBrowsers:new Set(completed.map(record=>record.owner)).size,taskResults:Object.fromEntries(identifiers.map(id=>{
  const results=completed.flatMap(record=>record.results.filter(result=>result.taskId===id));
  const attempted=results.filter(result=>result.outcome!=='skipped');const successful=attempted.filter(result=>result.outcome==='completed');
  return [id,{attempted:attempted.length,completed:successful.length,skipped:results.length-attempted.length,completionRate:attempted.length?successful.length/attempted.length:null}];
 }))};
}
