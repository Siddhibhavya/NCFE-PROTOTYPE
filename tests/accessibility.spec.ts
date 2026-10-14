import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {openApp} from './audit-helpers';
test('keyboard/focus structure and non-visual WCAG checks across audited screens',async({page})=>{
 await page.setViewportSize({width:407,height:884});
 for(const route of ['onboarding','home','learn/textbooks','learn/topics/money-transactions','initiatives','initiatives/fetp/register','about','help','findisha']){await openApp(page,route);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).disableRules(['color-contrast']).analyze();expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),route).toEqual([]);}
 await page.goto('?view=app#/initiatives/fetp/register');await page.getByRole('button',{name:'Submit',exact:true}).click();await expect(page.locator('input').first()).toBeFocused();
 await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('main')).toHaveCSS('scroll-behavior','auto');
});
