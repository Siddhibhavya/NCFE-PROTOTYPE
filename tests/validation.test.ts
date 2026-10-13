import {describe,it,expect} from 'vitest';
import {validateForm,fictionalValues} from '../src/content/forms';
describe('registration validation',()=>{
 it('requires every FETP field',()=>expect(Object.keys(validateForm('fetp',{}))).toHaveLength(6));
 it('accepts fictional test data for both representative journeys',()=>{expect(validateForm('fetp',fictionalValues)).toEqual({});expect(validateForm('elms',fictionalValues)).toEqual({});});
 it('rejects invalid email and weak demo password',()=>{const errors=validateForm('elms',{...fictionalValues,email:'invalid',password:'short'});expect(errors.email).toContain('fictional email');expect(errors.password).toContain('8 characters');});
});
