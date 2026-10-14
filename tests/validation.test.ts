import {describe,it,expect} from 'vitest';
import {fieldsFor,validateForm} from '../src/content/forms';
const valuesFor=(id:string)=>Object.fromEntries(fieldsFor(id).map(field=>[field.key,field.type==='email'?'teacher@example.com':field.type==='tel'?'0000000000':field.type==='password'?'DemoOnly1!':'Example']));
describe('registration validation',()=>{
 it('validates programme-specific required fields and permits optional address lines',()=>{for(const id of ['fetp','mssp','fepa','fact','nflat','elms']){expect(Object.keys(validateForm(id,{}))).toHaveLength(fieldsFor(id).filter(field=>field.required!==false).length);const values=valuesFor(id);for(const field of fieldsFor(id).filter(field=>field.required===false))delete values[field.key];expect(validateForm(id,values)).toEqual({});}});
 it('rejects invalid email and weak password',()=>{const errors=validateForm('elms',{...valuesFor('elms'),email:'invalid',password:'short'});expect(errors.email).toContain('valid email');expect(errors.password).toContain('8 characters');});
});
