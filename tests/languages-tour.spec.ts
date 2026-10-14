import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {fillProgramme} from './audit-helpers';
const catalogue=Object.assign({},...['translations','programme-translations','additional-translations'].map(name=>JSON.parse(readFileSync(`src/content/${name}.json`,'utf8')))) as Record<string,string[]>;
const translate=(text:string,language:'en'|'hi'|'or')=>language==='en'?text:catalogue[text==='FL initiatives'?'Initiatives':text]?.[language==='hi'?0:1]??text;
test('all three languages stay together and switch using the preserved resources through real navigation and forms',async({page})=>{
 await page.setViewportSize({width:407,height:884});await page.goto('?view=app#/onboarding');
 const native=['English','हिन्दी','ଓଡ଼ିଆ'];const group=page.getByRole('group');
 await expect(group.locator('button:not(:disabled)')).toHaveCount(3);await expect(group.locator('button:disabled')).toHaveCount(21);
 await group.locator('button').filter({has:page.locator('strong[lang="hi"]')}).click();await page.getByRole('button',{name:'No',exact:true}).click();await expect(group.locator('button').filter({has:page.locator('strong[lang="en"]')})).toHaveAttribute('aria-pressed','true');await expect(page.locator('html')).toHaveAttribute('lang','en');
 const boxes=await Promise.all(native.map(name=>group.getByRole('button').filter({has:page.locator('strong').filter({hasText:new RegExp('^'+name+'$')})}).boundingBox()));
 expect(boxes[0]!.x).toBe(16);expect(Math.abs(boxes[0]!.y-241)).toBeLessThan(.5);expect(boxes[0]!.width).toBe(183);
 expect(Math.round(boxes[0]!.y)).toBe(Math.round(boxes[1]!.y));expect(boxes[2]!.y).toBeGreaterThan(boxes[0]!.y);expect(Math.round(boxes[0]!.x)).toBe(Math.round(boxes[2]!.x));expect(new Set(boxes.map(box=>Math.round(box!.width))).size).toBe(1);expect(await group.locator('button strong').allTextContents()).toEqual(['English','हिन्दी','ଓଡ଼ିଆ','অসমীয়া','বাংলা','भोजपुरी','बड़ो','डोगरी','ગુજરાતી','ಕನ್ನಡ','کٲشُر','कोंकणी','मैथिली','മലയാളം','মণিপুরী','मराठी','नेपाली','ਪੰਜਾਬੀ','राजस्थानी','संताली','سنڌي','தமிழ்','తెలుగు','اردو']);
 await page.screenshot({animations:'disabled',path:'docs/screenshots/language-restored-group.png'});
 let current:'en'|'hi'|'or'='en';
 for(const language of ['hi','or','en'] as const){
  if(current!=='en'||language==='en'){await page.getByRole('button',{name:translate('Open menu',current)}).click();await page.locator('a[href="#/onboarding"]').click();}
  await group.getByRole('button').filter({has:page.locator('strong[lang="'+language+'"]')}).click();await page.getByRole('button',{name:translate('Yes',current),exact:true}).click();
  current=language;await expect(page.locator('html')).toHaveAttribute('lang',language);await expect(page.getByRole('heading',{name:translate('Announcements',language),exact:true})).toBeVisible();
  if(language==='hi')await page.getByRole('button',{name:'Skip',exact:true}).click();
  await page.getByRole('navigation').getByRole('link',{name:translate('Learn',language),exact:true}).click();await expect(page.getByRole('heading',{name:'E-LMS',exact:true})).toBeVisible();
  await page.getByRole('navigation').getByRole('link',{name:translate('FL initiatives',language),exact:true}).click();await expect(page.getByRole('heading',{name:translate('NCFE Financial Education Initiatives',language)})).toBeVisible();
  await page.locator('a[href="#/initiatives/elms"]').click();await page.locator('a[href="#/initiatives/elms/register"]').click();await expect(page.locator('form input')).toHaveCount(7);await fillProgramme(page);await page.locator('button[type="submit"]').click();await page.getByRole('button',{name:translate('Yes',language),exact:true}).click();await page.getByRole('button',{name:translate('Done',language),exact:true}).click();await expect(page).toHaveURL(/#\/initiatives\/elms$/);
  await page.screenshot({animations:'disabled',path:`docs/screenshots/language-restored-${language}.png`});
 }
});
