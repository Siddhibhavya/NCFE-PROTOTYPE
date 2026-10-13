import {test,expect} from '@playwright/test';
test.beforeEach(async({page})=>{await page.setViewportSize({width:390,height:844});});
test('feedback validation and submission work without collecting data',async({page})=>{
 const firebaseRequests:string[]=[];page.on('request',request=>{if(/googleapis.com|firebaseio.com/.test(request.url()))firebaseRequests.push(request.url());});
 await page.goto('?view=app#/home');await page.getByRole('button',{name:'Give Feedback',exact:true}).click();
 await page.getByRole('button',{name:'Submit',exact:true}).click();await expect(page.getByRole('alert')).toContainText('Choose a prototype rating');
 await page.getByRole('radio',{name:'4 out of 5 stars'}).check();await page.getByLabel('Screen Reviewed').selectOption('Learning and videos');await page.getByLabel('Language',{exact:true}).selectOption('or');await page.getByRole('textbox',{name:'Give Feedback',exact:true}).fill('ଭଲ ଲାଗିଲା');
 await page.screenshot({path:'docs/screenshots/phase-6-feedback.png'});
 await page.getByRole('button',{name:'Submit',exact:true}).click();await expect(page.getByRole('status')).toContainText('nothing was sent or saved');expect(firebaseRequests).toEqual([]);
 await page.getByRole('button',{name:'Close',exact:true}).click();await expect(page.getByRole('button',{name:'Give Feedback',exact:true})).toBeFocused();
});
test('guided testing survives navigation and supports skips without Firebase',async({page})=>{
 await page.goto('?view=app#/study');await page.getByRole('radio',{name:'Facilitated testing',exact:true}).check();await page.getByRole('button',{name:'Start demonstration test'}).click();await page.getByRole('link',{name:'Open prototype for this task'}).click();await page.goBack();await expect(page.getByRole('heading',{name:'Select your preferred language'})).toBeVisible();
 await page.getByLabel('Task difficulty',{exact:true}).selectOption('2');await page.getByRole('button',{name:'Record and continue'}).click();
 for(let i=0;i<3;i++)await page.getByRole('button',{name:'Skip task',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Tasks finished'})).toBeVisible();await page.getByRole('button',{name:'Finish demonstration'}).click();await expect(page.getByRole('status')).toContainText('No responses were sent or saved');await page.screenshot({path:'docs/screenshots/phase-7-study.png'});
});
for(const language of ['hi','or'] as const){
 test(`${language}: selected language changes interface, topic content and search; preserves programme/policy names`,async({page})=>{
  await page.goto('?view=app#/onboarding');await page.getByRole('button',{name:language==='hi'?'हिन्दी Hindi':'ଓଡ଼ିଆ Odia'}).click();await page.getByRole('button',{name:'Confirm',exact:true}).click();await expect(page.locator('html')).toHaveAttribute('lang',language);
  await page.getByRole('navigation').getByRole('link',{name:language==='hi'?'सीखें':'ଶିଖନ୍ତୁ',exact:true}).click();await expect(page.getByRole('heading',{name:language==='hi'?'पाठ्यपुस्तकें':'ପାଠ୍ୟପୁସ୍ତକ'})).toBeVisible();
  await page.locator('header a[href="#/learn/search"]').click();await page.getByRole('searchbox').fill(language==='hi'?'बैंक खाते':'ଖାତା');await page.getByRole('link',{name:language==='hi'?/बैंकिंग: वित्तीय समावेशन/:/ବ୍ୟାଙ୍କିଂ: ଆର୍ଥିକ ଅନ୍ତର୍ଭୁକ୍ତି/}).click();await expect(page.getByText(language==='hi'?/वित्तीय समावेशन का अर्थ/:/ଆର୍ଥିକ ଅନ୍ତର୍ଭୁକ୍ତିର ଅର୍ଥ/)).toBeVisible();await page.screenshot({path:`docs/screenshots/translated-${language}.png`});
  await page.locator('header a[href="#/home"]').click();await page.getByRole('link',{name:'Pradhan Mantri Jan Dhan Yojana',exact:true}).click();await expect(page.getByRole('heading',{name:'Pradhan Mantri Jan Dhan Yojana',exact:true})).toBeVisible();
  await page.getByRole('navigation').getByRole('link',{name:language==='hi'?'कार्यक्रम':'କାର୍ଯ୍ୟକ୍ରମ',exact:true}).click();await page.locator('a[href="#/initiatives/fetp"]').click();await expect(page.getByRole('heading',{name:'Financial Education Training Programme',exact:true})).toBeVisible();await expect(page.getByText(language==='hi'?/FETP स्कूल शिक्षकों/:/FETP ବିଦ୍ୟାଳୟ ଶିକ୍ଷକଙ୍କ/)).toBeVisible();
 });
}
test('responsive content stays inside all requested widths and mobile has no portfolio X',async({page})=>{
 for(const width of [320,375,390,430,768,1024,1440]){
  await page.setViewportSize({width,height:1000});
  for(const route of ['home','onboarding','initiatives/elms/register','help']){
   await page.goto(`?view=app#/${route}`);await expect(page.locator('h1')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);expect(await page.locator('main').evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBe(true);
  }
 }
 await page.setViewportSize({width:390,height:844});await page.goto('#/home');await expect(page.getByRole('button',{name:'Close prototype'})).toHaveCount(0);
});
