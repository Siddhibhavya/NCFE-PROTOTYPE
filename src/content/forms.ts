import programmeFields from './programme-fields.json';
export type Field = {key:string;label:string;type?:string;hint?:string;required?:boolean};
export const formFields:Record<string,Field[]>={...programmeFields,
  elms:[{key:'firstName',label:'First name'},{key:'surname',label:'Surname'},{key:'phone',label:'Phone number',type:'tel'},{key:'location',label:'State / Union Territory'},{key:'username',label:'Username'},{key:'email',label:'Email address',type:'email'},{key:'password',label:'Password',type:'password'}]
};
export function fieldsFor(id:string){return formFields[id]??[];}
export function validateForm(id:string,values:Record<string,string>){const errors:Record<string,string>={};for(const field of fieldsFor(id)){const value=values[field.key]?.trim()??'';if(!value&&field.required!==false)errors[field.key]=`${field.label} is required.`;else if(value&&field.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))errors[field.key]='Enter a valid email address.';else if(value&&field.type==='tel'&&value.replace(/\D/g,'').length<10)errors[field.key]='Enter a contact number with at least 10 digits.';else if(value&&field.type==='password'&&(!/[a-z]/.test(value)||!/[A-Z]/.test(value)||!/[0-9]/.test(value)||!/[\W_]/.test(value)||value.length<8))errors[field.key]='Use at least 8 characters with mixed case, a number and a symbol.';}return errors;}
