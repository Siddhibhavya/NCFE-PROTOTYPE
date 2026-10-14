import {test,expect,type Page} from '@playwright/test';
async function offer(page:Page){await page.setViewportSize({width:407,height:884});await page.goto('?view=app#/onboarding');await page.getByRole('button',{name:'English Default'}).click();await page.getByRole('button',{name:'Yes',exact:true}).click();await expect(page.getByRole('dialog',{name:'Explore NCFE'})).toBeVisible();}
const layer=(page:Page)=>page.locator('[data-tour-layer]');
test('tour runs only after Start, targets real controls, blocks other taps and finishes through the actual drawer',async({page})=>{
 await offer(page);await expect(layer(page)).toHaveCount(0);await page.getByRole('button',{name:'Start Tour'}).click();
 const targets=['home','learning','search','initiatives','findisha','menu','about'];
 for(let index=0;index<targets.length;index++){
  const control=page.locator(`[data-tour-id="${targets[index]}"]`);await expect(layer(page).getByRole('status')).toContainText(`${index+1} / 7`);await expect(control).toBeFocused();await expect(layer(page).getByRole('button',{name:'Skip',exact:true})).toBeVisible();
  const box=await control.boundingBox();expect(box!.x).toBeGreaterThanOrEqual(0);expect(box!.y).toBeGreaterThanOrEqual(0);expect(box!.y+box!.height).toBeLessThanOrEqual(884.5);
  if(index===0)await page.screenshot({animations:'disabled',path:'docs/screenshots/tour-home.png'});
  const url=page.url();await page.mouse.click(400,400);await expect(page).toHaveURL(url);await expect(layer(page).getByRole('status')).toContainText(`${index+1} / 7`);
  const card=await layer(page).getByRole('status').boundingBox();await page.mouse.click(card!.x+10,card!.y+10);await expect(layer(page).getByRole('status')).toContainText(`${index+1} / 7`);
  if(targets[index]==='about'){
   await expect(page.getByRole('dialog',{name:'Menu'})).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog',{name:'Menu'})).toBeVisible();
   await page.setViewportSize({width:375,height:812});await expect(layer(page).getByRole('button',{name:'Skip',exact:true})).toBeVisible();await expect.poll(async()=>{const target=await control.boundingBox();const spotlight=await layer(page).locator('[aria-hidden="true"]').boundingBox();return Math.abs(spotlight!.y-(target!.y-4));}).toBeLessThan(.5);await page.screenshot({animations:'disabled',path:'docs/screenshots/tour-drawer.png'});
  }
  if(index===0)await page.keyboard.press('Enter');else await control.click();
  if(index===1)await expect(page).toHaveURL(/#\/learn\/textbooks$/);
  if(index===2)await expect(page).toHaveURL(/#\/learn\/search$/);
  if(index===3)await expect(page).toHaveURL(/#\/initiatives$/);
  if(index===4)await expect(page).toHaveURL(/#\/findisha$/);
 }
 await expect(page.getByRole('dialog',{name:'Tour complete'})).toBeVisible();await expect(page).toHaveURL(/#\/about$/);await page.getByRole('button',{name:'Finish',exact:true}).click();await expect(layer(page)).toHaveCount(0);await expect(page.getByRole('dialog')).toHaveCount(0);await page.getByRole('button',{name:'Our Vision',exact:true}).click();await expect(page.getByRole('button',{name:'Our Vision',exact:true})).toHaveAttribute('aria-expanded','true');
 expect(await page.evaluate(()=>({...localStorage}))).toEqual({});expect(await page.evaluate(()=>({...sessionStorage}))).toEqual({});
});
test('Skip preserves the current route, restores interaction and is reachable with the keyboard',async({page})=>{
 await offer(page);await page.getByRole('button',{name:'Start Tour'}).click();await expect(page.locator('[data-tour-id="home"]')).toBeFocused();await page.keyboard.press('Tab');await expect(layer(page).getByRole('button',{name:'Skip',exact:true})).toBeFocused();await page.keyboard.press('Enter');await expect(layer(page)).toHaveCount(0);await expect(page).toHaveURL(/#\/home$/);
 await page.locator('[data-tour-id="learning"]').click();await expect(page).toHaveURL(/#\/learn\/textbooks$/);
 await page.getByRole('button',{name:'Open menu'}).click();await page.locator('a[href="#/onboarding"]').click();await page.getByRole('button',{name:'English Default'}).click();await page.getByRole('button',{name:'Yes',exact:true}).click();await expect(page.getByRole('dialog',{name:'Explore NCFE'})).toHaveCount(0);
});
test('one activation cannot advance twice and reduced motion removes spotlight transitions',async({page})=>{
 await offer(page);await page.emulateMedia({reducedMotion:'reduce'});await page.getByRole('button',{name:'Start Tour'}).click();await expect(layer(page).getByRole('status')).toContainText('1 / 7');
 await page.locator('[data-tour-id="home"]').evaluate((control:HTMLElement)=>{control.click();control.click();});await expect(layer(page).getByRole('status')).toContainText('2 / 7');await expect(layer(page).locator('[aria-hidden="true"]')).toHaveCSS('transition-duration','0s');
 await layer(page).getByRole('button',{name:'Skip',exact:true}).click();await expect(layer(page)).toHaveCount(0);
});
test('intro is offered at the language-completion boundary, and a new page session may offer it again',async({page})=>{
 await page.goto('?view=app#/home');await expect(page.getByRole('dialog')).toHaveCount(0);await offer(page);await page.screenshot({animations:'disabled',path:'docs/screenshots/tour-intro.png'});await page.getByRole('button',{name:'Skip',exact:true}).click();await page.reload();await expect(page.getByRole('dialog')).toHaveCount(0);await page.getByRole('button',{name:'Open menu'}).click();await page.locator('a[href="#/onboarding"]').click();await page.getByRole('button',{name:'English Default'}).click();await page.getByRole('button',{name:'Yes',exact:true}).click();await expect(page.getByRole('dialog',{name:'Explore NCFE'})).toBeVisible();
});
test('Skip works at every step and retains an open drawer when that is the current state',async({page})=>{
 const targets=['home','learning','search','initiatives','findisha','menu','about'];
 for(let last=0;last<targets.length;last++){
  if(last>0)await page.goto('about:blank');
  await offer(page);await page.getByRole('button',{name:'Start Tour'}).click();
  for(let index=0;index<last;index++){await expect(layer(page).getByRole('status')).toContainText(`${index+1} / 7`);await page.locator(`[data-tour-id="${targets[index]}"]`).click();}
  await expect(layer(page).getByRole('status')).toContainText(`${last+1} / 7`);const url=page.url();await layer(page).getByRole('button',{name:'Skip',exact:true}).click();await expect(layer(page)).toHaveCount(0);await expect(page).toHaveURL(url);
  if(last===6){await expect(page.getByRole('dialog',{name:'Menu'})).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);}
 }
});
test('wrapper commands cannot interrupt an active tour or make Skip inaccessible',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('#/onboarding');const app=page.frameLocator('iframe');await app.getByRole('button',{name:'English Default'}).click();await app.getByRole('button',{name:'Yes',exact:true}).click();await app.getByRole('button',{name:'Start Tour'}).click();
 for(const command of ['Feedback','Back','Restart']){await page.getByRole('button',{name:command,exact:true}).click();await expect(app.locator('[data-tour-layer]').getByRole('status')).toContainText('1 / 7');await expect(app.getByRole('dialog')).toHaveCount(0);}
 await app.getByRole('button',{name:'Skip',exact:true}).click();await page.getByRole('button',{name:'Feedback',exact:true}).click();await expect(app.getByRole('dialog')).toBeVisible();
});
