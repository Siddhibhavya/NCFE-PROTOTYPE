import {test,expect} from '@playwright/test';
test('Home uses the original Search asset, measured cards and a separate tip heading and quote surface',async({page})=>{
 await page.setViewportSize({width:407,height:884});await page.goto('?view=app#/home');await page.evaluate(()=>document.fonts.ready);
 const search=page.locator('header [data-tour-id="search"]');await expect(search).toBeVisible();await expect(search.locator('img')).toHaveAttribute('src',/5534b\.svg$/);
 expect(Math.abs((await search.boundingBox())!.y-52)).toBeLessThan(.5);
 const event=page.locator('main>a');const programme=page.locator('main a[href="#/events"]').last();expect(Math.round((await programme.boundingBox())!.width)).toBe(378);
 await page.screenshot({animations:'disabled',path:'docs/screenshots/home-corrected.png'});await page.locator('main').evaluate(el=>el.scrollTo({top:el.scrollHeight,behavior:'instant'}));
 const tip=page.locator('article').filter({has:page.getByRole('heading',{name:'Financial Literacy Tip'})});await expect(tip).toHaveCSS('background-color','rgba(0, 0, 0, 0)');await expect(tip.locator('p')).toHaveCSS('background-color','rgb(255, 255, 255)');await page.screenshot({animations:'disabled',path:'docs/screenshots/home-tip-corrected.png'});
 await search.click();await expect(page).toHaveURL(/#\/learn\/search$/);await expect(page.getByRole('searchbox')).toBeVisible();expect(await event.count()).toBe(0);
});
test('the original language grid and drawer remain within smaller mobile viewports',async({page})=>{
 for(const width of [320,375,407]){
  await page.setViewportSize({width,height:884});await page.goto('?view=app#/onboarding');await page.evaluate(()=>document.fonts.ready);expect(await page.locator('main').evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);const pills=await page.getByRole('group').getByRole('button').all();for(const pill of pills){const bounds=await pill.boundingBox();expect(bounds!.x).toBeGreaterThanOrEqual(0);expect(bounds!.x+bounds!.width).toBeLessThanOrEqual(width);}
  await page.goto('?view=app#/home');await page.getByRole('button',{name:'Open menu'}).click();expect(await page.getByRole('dialog').locator('div').first().evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);await page.keyboard.press('Escape');
 }
});
test('close controls stay inside their own surfaces across narrow and desktop windows',async({page})=>{
 for(const width of [320,375,768,1024,1440]){
  await page.setViewportSize({width,height:900});await page.goto('#/home');const app=page.frameLocator('iframe');await app.getByRole('link',{name:/Online training guidelines/}).click();await expect(page.getByRole('status')).toBeVisible();
  for(const [container,button] of [[page.locator('section').first().locator('header'),page.getByRole('button',{name:'Close prototype demo'})],[page.getByRole('status'),page.getByRole('button',{name:'Dismiss warning'})]] as const){const parent=await container.boundingBox(),control=await button.boundingBox();expect(control!.x).toBeGreaterThanOrEqual(parent!.x);expect(control!.y).toBeGreaterThanOrEqual(parent!.y);expect(control!.x+control!.width).toBeLessThanOrEqual(parent!.x+parent!.width+.5);expect(control!.y+control!.height).toBeLessThanOrEqual(parent!.y+parent!.height+.5);}
  await expect(page.getByRole('button',{name:'Dismiss warning'})).toHaveCSS('width','32px');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.getByRole('button',{name:'Dismiss warning'}).click();await page.getByRole('button',{name:'Feedback',exact:true}).click();await expect(app.getByRole('dialog')).toBeVisible();await app.getByRole('button',{name:'Close dialog'}).click();await expect(app.getByRole('dialog')).toHaveCount(0);
 }
});
test('reduced motion disables new transitions and preserves the accordion chevron position',async({page})=>{
 await page.setViewportSize({width:407,height:884});await page.goto('?view=app#/about');const button=page.getByRole('button',{name:'Our Vision',exact:true});const before=await button.locator('img').boundingBox();await button.click();await expect(button).toHaveAttribute('aria-expanded','true');const after=await button.locator('img').boundingBox();expect(Math.abs(after!.x+after!.width/2-before!.x-before!.width/2)).toBeLessThan(.5);expect(Math.abs(after!.y+after!.height/2-before!.y-before!.height/2)).toBeLessThan(.5);
 await page.emulateMedia({reducedMotion:'reduce'});await expect(button.locator('img')).toHaveCSS('transition-duration','0s');await expect(page.locator('main')).toHaveCSS('scroll-behavior','auto');
});
