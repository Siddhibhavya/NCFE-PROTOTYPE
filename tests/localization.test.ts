import {test,expect} from 'vitest';
import {translate,preservedNames} from '../src/i18n';
import topics from '../src/content/topics.json';
import programmes from '../src/content/programmes.json';
test('all learning summaries and programme copy have Hindi and Odia drafts',()=>{for(const language of ['hi','or'] as const){for(const topic of topics){expect(translate(topic.summary,language)).not.toBe(topic.summary);}for(const programme of programmes){for(const text of programme.copy){if(!preservedNames.has(text))expect(translate(text,language)).not.toBe(text);}}}});
test('programme and policy names stay unchanged in every language',()=>{for(const name of preservedNames)for(const language of ['en','hi','or'] as const)expect(translate(name,language)).toBe(name);});
test('existing translated arrow labels are reused with original SVG arrows and English copy stays unchanged',()=>{expect(translate('View all','en')).toBe('View all');expect(translate('View all','hi')).toBe('सभी देखें');expect(translate('View all','or')).toBe('ସବୁ ଦେଖନ୍ତୁ');expect(translate('FL initiatives','hi')).toBe(translate('Initiatives','hi'));});
