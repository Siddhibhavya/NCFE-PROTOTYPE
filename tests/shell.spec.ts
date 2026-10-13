import {test,expect} from '@playwright/test';
test('language confirmation, cancel, navigation and original fixed shell',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('?view=app#/onboarding');
 await page.getByRole('button',{name:'हिन्दी Hindi'}).click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.getByRole('button',{name:'Cancel',exact:true}).click();
 await expect(page.getByRole('button',{name:'हिन्दी Hindi'})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:'English Default'}).click();
 await page.getByRole('button',{name:'Confirm',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Home',exact:true})).toBeVisible();
 await expect(page.locator('header')).toHaveCSS('height','56.4531px');
 await page.getByRole('navigation').getByRole('link',{name:'Learn',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Textbooks',exact:true})).toBeVisible();
 await page.getByRole('link',{name:'Topics Search',exact:true}).first().click();
 await page.getByRole('searchbox',{name:'Search topics'}).fill('bank accounts');
 await page.getByRole('link',{name:/Banking: Financial inclusion/}).click();
 await expect(page.getByRole('heading',{name:'Banking: Financial inclusion',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Go back'}).click();
 await expect(page.getByRole('searchbox',{name:'Search topics'})).toHaveValue('bank accounts');
});
test('capture shell and onboarding phase evidence',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('?view=app#/onboarding');await page.screenshot({path:'docs/screenshots/phase-3-onboarding.png'});
 await page.goto('?view=app#/home');await page.screenshot({path:'docs/screenshots/phase-2-shell.png'});
 await page.setViewportSize({width:1024,height:1000});await page.goto('#/onboarding');await page.frameLocator('iframe').getByRole('heading',{name:'Choose your language'}).waitFor();await page.screenshot({path:'docs/screenshots/phase-2-desktop-wrapper.png'});
});
