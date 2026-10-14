import {chromium} from 'playwright';
const browser=await chromium.launch();
const page=await browser.newPage({viewport:{width:407,height:884}});
const errors=[];page.on('pageerror',error=>errors.push(error.message));
for(const route of ['onboarding','home','learn/textbooks','learn/videos','learn/search','learn/topics/money-transactions','learn/topics/monthly-budget','learn/topics/financial-inclusion','learn/topics/insurance-safety-nets','learn/topics/pmjdy','initiatives','initiatives/nflat','initiatives/mssp','initiatives/fetp','initiatives/fepa','initiatives/fact','initiatives/elms','initiatives/fetp/register','initiatives/mssp/register','initiatives/fepa/register','initiatives/fact/register','initiatives/nflat/register','initiatives/elms/register','account/login','about','impact','findisha/messages','findisha','help','announcements']){
 await page.goto(`http://127.0.0.1:5173/NCFE-PROTOTYPE/?view=app#/${route}`);await page.locator('h1').first().waitFor();await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(image=>image.decode()));await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));});await page.screenshot({path:`docs/screenshots/audit-${route.replaceAll('/','-')}.png`});
 const failedImages=await page.locator('img').evaluateAll(images=>images.filter(image=>!image.complete||!image.naturalWidth).map(image=>image.getAttribute('src')));
 const overflow=await page.locator('main').evaluate(element=>element.scrollWidth>element.clientWidth+1);
 console.log(JSON.stringify({route,failedImages,overflow}));
}
await page.goto('http://127.0.0.1:5173/NCFE-PROTOTYPE/?view=app#/home');await page.getByRole('button',{name:'Open menu'}).click();await page.screenshot({path:'docs/screenshots/audit-menu.png'});
await page.setViewportSize({width:1440,height:1000});await page.goto('http://127.0.0.1:5173/NCFE-PROTOTYPE/#/home');await page.frameLocator('iframe').getByRole('heading',{name:'Home',exact:true}).waitFor();await page.screenshot({path:'docs/screenshots/audit-wrapper.png'});await page.getByRole('button',{name:'Feedback',exact:true}).click();await page.frameLocator('iframe').getByRole('dialog').waitFor();await page.screenshot({path:'docs/screenshots/audit-feedback.png'});console.log('page errors',errors);await browser.close();
