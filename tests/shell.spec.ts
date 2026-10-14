import {test,expect} from '@playwright/test';
import {openApp} from './audit-helpers';
 test('the three implemented languages are enabled and unsupported languages cannot be activated',async({page})=>{
 await page.setViewportSize({width:407,height:884});await openApp(page,'onboarding');
 const group=page.getByRole('group',{name:'Available languages'});await expect(group.getByRole('button')).toHaveCount(24);await expect(group.locator('button:disabled')).toHaveCount(21);
 const unavailable=group.getByRole('button',{name:/Assamese/});await expect(unavailable).toHaveAttribute('aria-disabled','true');await expect(unavailable).toHaveCSS('background-color','rgb(224, 224, 224)');await unavailable.evaluate((button:HTMLButtonElement)=>button.click());await expect(page.getByRole('dialog')).toHaveCount(0);
 await group.getByRole('button',{name:'English Default'}).focus();await page.keyboard.press('Tab');await expect(unavailable).not.toBeFocused();await page.keyboard.press('Shift+Tab');await page.keyboard.press('Enter');await expect(page.getByRole('dialog')).toBeVisible();await page.getByRole('button',{name:'No',exact:true}).click();await expect(page.getByRole('dialog')).toHaveCount(0);
 await group.getByRole('button',{name:'English Default'}).click();await page.getByRole('button',{name:'Yes',exact:true}).click();await expect(page.locator('html')).toHaveAttribute('lang','en');await expect(page.getByRole('heading',{name:'Home',exact:true})).toBeVisible();
});
test('fixed shell, primary destinations, search privacy and back navigation',async({page})=>{
 await page.setViewportSize({width:407,height:884});await openApp(page,'home');const before=await page.locator('header').boundingBox();await page.locator('main').evaluate(el=>el.scrollTo({top:1000,behavior:'instant'}));expect(await page.locator('header').boundingBox()).toEqual(before);
 await page.getByRole('navigation').getByRole('link',{name:'Learn',exact:true}).click();await expect(page.getByRole('heading',{name:'E-LMS',exact:true})).toBeVisible();await page.locator('header').getByRole('link',{name:'Topics Search'}).click();await page.getByRole('searchbox').fill('bank accounts');expect(page.url()).not.toContain('bank');await page.getByRole('link',{name:/Banking: Financial inclusion/}).click();await expect(page.getByRole('heading',{name:'Banking: Financial inclusion',exact:true})).toBeVisible();
 await page.getByRole('navigation').getByRole('link',{name:'FL initiatives',exact:true}).click();await expect(page.getByRole('heading',{name:'NCFE Financial Education Initiatives'})).toBeVisible();await page.getByRole('navigation').getByRole('link',{name:'FinDisha',exact:true}).click();await expect(page.getByRole('heading',{name:'Ask FinDisha'})).toBeVisible();
});
test('hamburger drawer and About NCFE accordions support keyboard, expansion and return',async({page})=>{
 await page.setViewportSize({width:407,height:884});await openApp(page,'home');await page.getByRole('button',{name:'Open menu'}).click();await expect(page.getByRole('dialog',{name:'Menu'})).toBeVisible();await page.getByRole('link',{name:'About NCFE',exact:true}).click();await expect(page.getByRole('heading',{name:'About NCFE'})).toBeVisible();
 for(const name of ['Our Vision','Our Mission','Objectives']){const button=page.getByRole('button',{name,exact:true});await expect(button).toHaveAttribute('aria-expanded','false');await button.focus();await page.keyboard.press('Enter');await expect(button).toHaveAttribute('aria-expanded','true');await button.click();await expect(button).toHaveAttribute('aria-expanded','false');}
 await page.getByRole('button',{name:'Open menu'}).click();await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Open menu'})).toBeFocused();
});
